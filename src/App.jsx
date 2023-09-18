import { useEffect, useState } from 'react'
import './App.css'
import{v4} from 'uuid'
// import NewLocationSetter from './new_location_set'

// import containerImage from './images/container.png'
import { NewLocationForm } from './NewLocationForm'
import { LocationShelf } from './LocationsShelf'
import { LocationViewer } from './LocationViewer'
import { SectionViewer } from './SectionViewer'
import { BoxViewer } from './BoxViewer'
import { StartPage } from './StartPage'
import { SearchPage } from './SearchPage'
import { AllItemsViewer } from './AllItemsViewer'
import { TransferPage } from './TransferPage'
import { VideoUserGuide } from "./VideoUserGuide";

// localStorage.clear()

function App() {


// console.log(localStorage)
  // create a function which takes a state variable, which can be assigned the clicked location name as a string, when the variable is a string, the location will open, otherwise the main page will render when the variable is an empty string. 
  const [viewArea, setviewArea] = useState('start page') // precise area to be viewed
  const [areaSpecific, setAreaSpecific] = useState('')
  const [parentId, setParentId] = useState('')
  const [sectionId, setSectionId] = useState('')
  const [boxId, setBoxId] = useState('')
  const [sectionItems, setSectionItems] = useState()
  const [boxDetails, setBoxDetails] = useState({})
  const [preSearchArea, setPreSearchArea] = useState('')

  // the below state contains all items created.
  const [allItemsArray, setAllItemsArray] = useState(() =>{
    const savedItems = localStorage.getItem('all_items')
    if(savedItems == null){
      return []
    }
    return JSON.parse(savedItems)
  })

  // console.log(allItemsArray)
 // useState variable is either a stored array in localStorage or an empty array if none exists. 
  const [container, setContainer] = useState(() =>{
const whatsStored = localStorage.getItem('storage_containers'); // assign variable to local storage item for locations array
if(whatsStored == null){ // if no locations exist
  return [] // return an empty array
}
// otherwise parse what's stored and return-
  return JSON.parse(whatsStored) 
  })

  // useEffect will update local storage when container array is changed. 
  useEffect(() =>{
    localStorage.setItem('storage_containers', JSON.stringify(container));
  }, [container])

  useEffect(() =>{
    localStorage.setItem('all_items', JSON.stringify(allItemsArray));
  }, [allItemsArray])


console.log(container)


    // keeping a copy of all items array in local storage since I almost deleted it. 
    // localStorage.setItem('all_items_spare', JSON.stringify(allItemsArray))
    // console.log(JSON.parse(localStorage.getItem('all_items_spare')))

    // same for container items
    // localStorage.setItem('spare_inventory', JSON.stringify(container))
    //    console.log(JSON.parse(localStorage.getItem('spare_inventory')))




function allSectionItems(sectionObjects){
if(sectionObjects.length > 0){
  console.log(sectionObjects)
setSectionItems(sectionObjects)
  setviewArea("all section items")
}

}

function inventoryChange(newContainerArray){
  setContainer(newContainerArray)
}

function allArrayChange(allObjectsNew){

  setAllItemsArray(allObjectsNew)
}

// console.log(allItemsArray)

// for creation and deletion of specific items in the inventory
  function addBoxItem (boxPath, itemString){
console.log(boxPath)
// THIS code for avoiding duplicate ITEMS is not working (SOLVED - forgot to increment the 'number' variable if a duplicate exists)
    let number = 0;
    if(boxPath.box_contents.length > 0){ // if there are other contents in the same box
            boxPath.box_contents.map(item =>{ // map the contents and check if the newString is already inside the box contents; which would mean that the box already has an item with that name (used .toLowerCase() so that the duplicates are looked for independent of string case)
        if(item.itemString.toLowerCase() == itemString.toLowerCase()){
        alert('this item already exists:' + itemString ) // alert user of duplicate
        number += 1 // increment 'number' which will cause the below if condition to fail and so a new item will not be created. 
         }
      })
    }

    

    if(number < 1){
      
      // if no duplicate exists create a new item object
      let newBoxItem = {
        id:v4(),
        parent_Box: boxPath.box_name,
        itemString: itemString,
        parent_box_id: boxPath.box_id
      }

// getting index  for location, section and box; 
let locationIndex;
let sectionIndex;
let boxIndex;

container.map((locations, location_Index) =>{
  if(locations.id == boxPath.location_id){
    locationIndex = location_Index;

    // map the location
    locations.location_contents.map((sections, sections_index) =>{
           if(sections.id == boxPath.section_id){
  
      // map the section      
        sectionIndex = sections_index;
        sections.section_contents.map((boxes, boxes_index) =>{
                // map the box 
          if(boxes.id == boxPath.box_id){
            boxIndex = boxes_index;
            }
        })
      }
    })

    
  }
})


         // Create a new box contents (CREATE AND ADD TO ARRAY)
const newBoxContents = [...container[locationIndex].location_contents[sectionIndex].section_contents[boxIndex].box_contents, newBoxItem,]

// Create a new box and replace the old contents   (MODIFY OBJECT)
const newBox = {...container[locationIndex].location_contents[sectionIndex].section_contents[boxIndex], box_contents: newBoxContents} 

// Create new section contents to house box    (CREATE ARRAY)
const newSectionContents = [...container[locationIndex].location_contents[sectionIndex].section_contents]

//  replace old box with new one using box index  (MODIFY ARRAY)
newSectionContents[boxIndex] = newBox

// create a new section for altered section contents   (MODIFY OBJECT)  
const newSection = {...container[locationIndex].location_contents[sectionIndex], section_contents: newSectionContents}

// create new location contents array for new section    (CREATE ARRAY)
const newLocationContentsArray = [...container[locationIndex].location_contents ]

// mutate the array with the new section   (MODIFY ARRAY)
newLocationContentsArray[sectionIndex] = newSection;

// now make a copy of the old location, parent to the section and update its contents
const newLocationObject = {...container[locationIndex], location_contents:newLocationContentsArray}

// create a new array for all locations, spreading old locations
const newLocationContainer = [...container]

// mutate the array by replacing the old location
newLocationContainer[locationIndex] = newLocationObject;

// create an object which contains newBoxItem, and properties containing, location, section and box indexes
let itemElement = {
'item_name':newBoxItem.itemString,
'item_object': newBoxItem,
'location_id': boxPath.location_id,
'section_id': boxPath.section_id,
'box_id': boxPath.box_id,
'item_id':newBoxItem.id
}

// add itemElement to currently saved items array and render. 

setAllItemsArray(currentItems =>{
  return  [...currentItems, itemElement ]
})


// re-render with new locations array
setContainer(newLocationContainer)
alert(`${itemString} - successfully added`)
    }


  }

  // ISSUE HERE: boxItems not used. 
  function deleteBoxItem (itemId, boxObject, itemString){

    console.log(boxObject)
if(!itemId || !boxObject){console.log(`
Item ID or box parent object of item  is missing, cannot procede with deletion - check origin of parameters (DeleteButton or NewItem component)
`)}
let locationIndex = boxObject.location_index
let sectionindex = boxObject.section_index
let boxIndex = boxObject.box_index

  const  updatedItems = boxObject.box_contents.filter(items => items.id !== itemId)
console.log(updatedItems) // CORRECT
  // create new variable for old box_contents array
// let newBoxContents = [...container[locationIndex].location_contents[sectionindex].section_contents[boxIndex].box_contents]
// newBoxContents = updatedItems // update the box_contents array with changed items
 

// update the box object and set state with update
boxObject.box_contents = updatedItems
setBoxDetails(boxObject)


// create a new box variable out of the old one and replace the existing box_contents with the updated array
let newBox = {...container[locationIndex].location_contents[sectionindex].section_contents[boxIndex], box_contents: updatedItems}
console.log(newBox) // CORRECT
// create a new section into which the box will go into its box_contents array. 
let newSectionContents = [...container[locationIndex].location_contents[sectionindex].section_contents]

// update using index of box in section_contents
newSectionContents[boxIndex] = newBox

console.log(newSectionContents)  // CORRECT
// box contents are still altered. 


// create a new section object from the old and update it with new section contents
let  newSection = {...container[locationIndex].location_contents[sectionindex], section_contents:newSectionContents}

console.log(newSection)  // CORRECT - box contents still good

// create a new location contents array
let newLocationContents = [...container[locationIndex].location_contents]

// and use section index to replace the old original section with the new
newLocationContents[sectionindex] = newSection


console.log(newLocationContents)    // CORRECT LOCATION CONTENTS - box contents still good



// create new location (which is an object) and update the location contents
let newLocation = {...container[locationIndex], location_contents: newLocationContents}

console.log(newLocation)   // CORRECT LOCATION DETAILS  box contents still good


// create new container so that the old location object can be replaced. 
let newContainer = [...container]

newContainer[locationIndex] = newLocation
console.log(newContainer) // CORRECT container 

// filter all item objects whose id is not the id of the object
let newAllItemsArray = allItemsArray.filter(objects => objects.item_id !== itemId)


setContainer(newContainer)
// set new allItems array
setAllItemsArray(newAllItemsArray)

// console.log(allItemsArray)
// alert(`${itemString} - successfully deleted`)

      }
   
  function transferItem (detailsOfBox, pageSet, itemName, newBoxItems){
detailsOfBox.new_item_string = itemName

// clear sectionItems so that, on the transfer page, sectionItems and BoxItems are mutually exclusive; both can never be avialable at the same time, which will avoid conflicts when displaying elements associated with each type of item category. 
setSectionItems('')

 // save box details for later access on item transfer page 
    setBoxDetails({...detailsOfBox})
 // set vew area to open transfer page     
    setviewArea(pageSet)

     }


function transferBox(sectionDetails, pageSet){

  // clearing inner box details so there is no conflict with section details, since they cause different elements to be rendered to the page, based on the availability (or unavailability) of the type of details. 
  setBoxDetails('')

  // set section items so the details of the box can be found and made ready for transfer along with the box. 
  setSectionItems({...sectionDetails})
 // set vew area to open transfer page     
 setviewArea(pageSet)

}

function transferBoxAccept(newArray){
  // setAllItemsArray(newArray)
}


// --- BOXES, creating, opening, closing, deleting
function addBox (box, boxLocation, parentId){



let number = 0;
let indexOfLocation
let indexOfSection;
let oldSectionContents;
           // need index of section as well as index of parent id
               container.map((location, index) =>{
        if(location.id == parentId){
          indexOfLocation = index
          location.location_contents.map((contents, secIndex) =>{
            if(contents.section_name == boxLocation){
              indexOfSection = secIndex
              oldSectionContents = contents.section_contents}            
          })

        }
    })
    // if other boxes exist check for duplicate names
    if(oldSectionContents.length > 0){
      oldSectionContents.map(boxObjects =>{ // for each item in the sections contents
        // if a duplicate box name is found, increment number
        boxObjects.box_name.toString().toLowerCase() == box.toString().toLowerCase() ?   number++ : number = number;
      })
    }

// if no other boxes exist, there can be no duplicate box names, so 'number' is trivially zero and a new box can be created using the 'box' parameter string. If  other boxes DO exist, but no duplicate names are found a new box can be created using the 'box' parameter string. If a duplicate box name IS found, number is incremented, so number < 1 is false, so no new box will be created
if(number < 1){

  // create a new box object 
  let newAddedBox =  {
    id: v4(), // box id
    box_name: box,
    parent_section_name: boxLocation, // section  name
    parent_container_id: parentId,  // section  index
    box_contents: [], // container for items in box
   }



   // Create a new section_contents from old contents, and place new box in it
const newBoxContents = [...container[indexOfLocation].location_contents[indexOfSection].section_contents, newAddedBox]

// Create new section object from old section which contained the old section contents and update it with the new section contents
const newSectionObject = {...container[indexOfLocation].location_contents[indexOfSection], section_contents:newBoxContents}


// create a new array from the old location_contents (which are the sections objects)
const newLocationContentsArray = [...container[indexOfLocation].location_contents ]

// now mutate the above array by replacing the old object (that doesn't have the updated box) with a NEW object
newLocationContentsArray[indexOfSection] = newSectionObject


// now make a copy of the old location, parent to the section and update its contents
const newLocationObject = {...container[indexOfLocation], location_contents:newLocationContentsArray}

// create a new array for all locations, spreading old locations
const newLocationContainer = [...container]

// mutate the array by using making use of indexOfLocation, to mutate the old container

newLocationContainer[indexOfLocation] = newLocationObject;


setContainer(newLocationContainer)
}else{alert(`This location: ${box}
already exists`)}

}
function openBox(general, specific, boxId, boxItems, sectionIdUpdate, parentIdUpdate) {

  console.log(boxItems)
  console.log(`
 

  general: ${general}
  specific: ${specific}
  boxId: ${boxId}
   `)
   if(sectionIdUpdate !== undefined){
    console.log(`sectionIdUpdate: ${sectionIdUpdate}`)
   }
   if(parentIdUpdate !== undefined){
    console.log(`parentIdUpdate: ${parentIdUpdate}`)
   }
  
   if(boxItems !== undefined){
    console.log(boxItems)
    console.log('STATE parent ID' +  parentId)
    console.log('box parent ID' +  boxItems.location_id)
    console.log('STATE section ID' +  sectionId)
    console.log('box section ID' +  boxItems.section_id)
  }
   


// the sectionId and parentId parameters are for when a search is made and user wishes to open the box containing the item - logically the search would not be made from inside the box of the searched item because you can already see the contents in the box where you clicked the search button - so the item searched for would be in another box, meaning that sectionId and parentId in state may not correspond to the the parent and section id of the address of the box the user wishes to navigate to, so the exact pathway will be incorrect.  Also, if the user went directly to the search page without navigating anyhere else first, then there would be no section or parent id at all, so these id's must  generated at time of clicking the search result box and extracting from the data given in the object associated with that box.  

  if(sectionIdUpdate !== undefined){
    console.log('updating section id...')
    setParentId(parentIdUpdate)}
  if(parentIdUpdate !== undefined){
    console.log('updating location id...')
    setSectionId(sectionIdUpdate)}




  setviewArea(general)
  setAreaSpecific(specific)
  setBoxId(boxId)
  }  
  function closeBox (sectionName) {
    setviewArea('section')
    setAreaSpecific(sectionName)
    }  
  function deleteBox (id) {

// get location and section indexes
  let indexOfLocation;
  let indexOfSection;
  let lengthOfBoxContents
  let nameOfBox; 
// map all locations
    container.map((locations, locationIndex) =>{
      if(locations.id == parentId){
        indexOfLocation = locationIndex;
// map specific location
        container[indexOfLocation].location_contents.map((section, sectionIndex) =>{
          if(section.id == sectionId){
            indexOfSection = sectionIndex;
            section.section_contents.map(boxes =>{
              if(boxes.id == id){
nameOfBox = boxes.box_name
lengthOfBoxContents = boxes.box_contents.length
console.log(lengthOfBoxContents)
              }
            })
          }
        })
      }


    })
// it's entirely possible to do this deletion without boxPath, by simply using location and section indexes to access section contents (i.e. the boxes), spread them into an array, and then use the below filter on the array, and then carry on with the rest of the function using the filtered array as a starting point. LET'S TEST IT
    console.log(container[indexOfLocation].location_contents[indexOfSection].section_contents)

// the above variable filters the section contents so that the clicked box is eliminated from the array; this is no issue normally because the box delete button only appears when a box is empty, and this function is normally activated from that button.  But this function will also be activated by the 'transfer' box accept function, so we need to set the condition that this variable should only be made when the box to be deleted has no contents.  I think it's also a good secondary precaution because, should the button appear while the box has contents, because of a bug, then the user risks deleting a box without realizing it contained items.  So a warning in place to alert user that the box they are attempting to delete has  items is a good idea. This will ensure that, in the transfer process, the box will not be deleted until ALL of the items are first removed.  

if(lengthOfBoxContents < 1){

  let testSectionContents = container[indexOfLocation].location_contents[indexOfSection].section_contents.filter(boxes => boxes.id !== id)

  console.log(testSectionContents)
  
  
  
      // create new section contents and filter to remove clicked box object
      let newSectionContents = container[indexOfLocation].location_contents[indexOfSection].section_contents.filter(boxes => boxes.id !== id)
    
  
  
      // // create new section object and replace section_contents with above array
      let newSection = {...container[indexOfLocation].location_contents[indexOfSection], section_contents:newSectionContents}
  
      // now create new location contents 
      let newLocationContents = [...container[indexOfLocation].location_contents]
  
      // and replace the old section with the above using the section index
      newLocationContents[indexOfSection] = newSection
  
  
      // create a new location object and update it's location contents with the above array
      let newLocation = {...container[indexOfLocation], location_contents: newLocationContents}
  
      // create a new container array
      let newContainer = [...container]
  
    // replace the original location with the updated one
      newContainer[indexOfLocation] = newLocation
  
    // set new container
    setContainer(newContainer)

}else{ // if box contains contents then alert user to delete box. 
  alert(`this box cannot be deleted because it contains items
box name: ${nameOfBox}
please delete all items from the box if you wish to procede with deletion
`)}


  }


// --- SECTIONS, creating, opening, closing, deleting

function addSection (sectionName, containerName, containerIndex, parentContents) {
console.log(parentContents)

  let number = 0;

    container[containerIndex].location_contents.map((everySection) =>{
      // if a duplicate name is found, increment number
      everySection.section_name.toString().toLowerCase() == sectionName.toString().toLowerCase() ?   number++ : number = number;
    });
    
    console.log(number)
    // if number < 1, no duplicate name was found so create new section object, item array, location object and container and run state again
if(number < 1){

// generate a new item from the input value text. 
let newAddedSection =  {
  id: v4(),
  section_name: sectionName,
  container_name: containerName,
  section_contents: [
    // automaticall add a new box inside the section, which will have the name 'unboxed' so that if no boxes are to be used in the section the items can be placed in the 'unboxed' area
    {
    id: v4(), // box id
    box_name: 'unboxed',
    parent_section_name: sectionName, // section parent name
    parent_container_id: '',  // section parent index
    box_contents: [], // container for items in box
   }
  
  ], // container for all box object
 }

 // now set the id of the newly created section of the property of  parent_container_id which is a property of the newly created box inside of the section
 newAddedSection.section_contents.parent_container_id = newAddedSection.id
 
// Create a new section array from old and add new section
const newLocationContents = [...container[containerIndex].location_contents, newAddedSection]

// Create new location object from old and replace old contents array with updated contents array
const newLocationConentsParent = {...container[containerIndex], location_contents: newLocationContents }

// create new locations array from old
const newContainerStore = [...container]

// mutate
newContainerStore[containerIndex] = newLocationConentsParent


//console.log(newContainerStore) // this should replace the old container
setContainer(newContainerStore)

}else{alert(`This item: ${sectionName}
already exists`)}


   


 // now the items need to be added to the location_contents array within the location object. 

console.log('adding new section :' + sectionName)
}
function openSection (general, specific,  id) {
setviewArea(general)
setAreaSpecific(specific)
setSectionId(id)
}  
function closeSection (parentObject) {
  setviewArea('location')
  console.log(parentObject)
  setAreaSpecific(parentObject.location_name)
  }
function deleteSection (id) {
console.log('parent ID: ' + parentId)
console.log('section ID: ' + sectionId)


// for new filtered array of location_contents
let updatedSections;

let indexOfLocation;
container.map((locations, locationIndex) =>{ 
  if(locations.id == parentId){
    indexOfLocation = locationIndex;
    // filter sections not having the passed 'id'
    updatedSections = locations.location_contents.filter(contents => contents.id !== id)

// create a new location contents array from old 
let newLocationContents = [...container[indexOfLocation].location_contents]

// update new location contents with the filtered array containing the sections
newLocationContents =  updatedSections;

// create a new location object in which to house the new location contents and update its contents
let newLocation = {...container[indexOfLocation], location_contents: newLocationContents}

// create a new container array from old
let newContainer = [...container]

// replace the old location object with the new updated one
newContainer[indexOfLocation] = newLocation

// render new container
setContainer(newContainer)
}

})


}
  


// --- LOCATIONS, creating, opening, closing, deleting
  function addLocation (locationName){
    let number = 0;
  container.map(eachLocation =>{
    // if a duplicate name is found, increment number
    eachLocation.location_name.toString().toLowerCase() == locationName.toString().toLowerCase() ?   number++ : number = number;
  })
  
  // if number < 1, no duplicate name was found so create new location object
  if(number < 1){
      setContainer(currentContainers => {
      // currentContainers is the prevous container and t
          return  [
            ...currentContainers,  {
                        id: v4(),
            location_name: locationName,
            location_contents: []
              }
             ]
        });
  
  }else{alert(`This location: ${locationName}
  already exists`)}
  
  
    // otherwise if number > 0, duplicate name was found so alert user that location already exists
  
  
  }
function openLocation (general, specific, id) {
 setviewArea(general)
  setAreaSpecific(specific)
  setParentId(id)
  
}
function closeLocation () {
  //resetting viewArea name to an empty string will replace the items page with main page
  setviewArea('main')
  }
function deleteLocation (id) {
  alert('element with ID: ' + id + ' was deleted')
  setContainer(currentContainers => {
    return currentContainers.filter(container => container.id !== id)
  })
}

function closeSearch (area){
  setviewArea(area)
}

function openSearch (area, generalArea){
setviewArea(area)
setPreSearchArea(generalArea)
}

function openUserGuide(area){
  setviewArea(area)
}


function returnToStart (area){
  setviewArea(area)
  }


function openAllLocations (area){
  setviewArea(area)
  }

  function fixLocationId (){

//     let index = 5
// let realParentId = container[index].location_contents[0].section_contents[0].parent_container_id
// let parentName = container[index].location_name
// let parentId = container[index].id
// let locationObject = {...container[index]}

// console.log(locationObject)
// console.log(`
// real parent ID: ${realParentId}
// parentName: ${parentName}
// ALTERED parentId: ${parentId}
//  `)
 

 
// locationObject.id = realParentId

// console.log(locationObject)

// let fixedLocationsArray = [...container]

// fixedLocationsArray[index] = locationObject

// console.log(fixedLocationsArray)

// // setContainer([...fixedLocationsArray])
// // setBoxDetails('')

// // 6d0c84cd-179e-41c0-86e2-b7c7992e32eb
// let idSearch = '6d0c84cd-179e-41c0-86e2-b7c7992e32eb'
// let idSearch2 ='44796d36-c580-4f67-a6df-992107d77fd0'
// allItemsArray.map(objects =>{
//   if(objects.section_id == idSearch2){
//     console.log(objects.item_name)
//     console.log(objects.section_id)
//   }
// })

// let removalID = 'b98c9c09-89d8-43ba-b597-86a7d437f847'

// let newSectionContents = container[6].location_contents[0].section_contents.filter(boxes => boxes.id !== removalID) // new array with boxes



let newSection = container[6].location_contents[0] // new section 
newSection.section_contents = [] //empty specific section contents with new boxes

let newLocation =  container[6]// create new location

newLocation.location_contents[0] = newSection // updated with edited section



let newContainer = [...container] // create new container
newContainer[6] = newLocation // update with edited location



console.log('edited section')
console.log(newSection)
console.log('edited location')
console.log(newLocation)
console.log('container')
console.log(newContainer)

// NOTE THIS EXECUTES FROM START PAGE INSIDE THE USERVIDEO BUTTON'S ONCLICK

// let newLocationContents = container[6].location_contents//new location contents
// newLocationContents[0] = newLocationContents// updated specific section in location contents wwith new section

// let newLocation = container[6] // OBJECT
// newLocation.location_contents = newLocationContents// updated 

// let newcontainer = [...container]
// newcontainer[6] = newLocation // REPLACE OBJECT


// setContainer(newContainer)


// console.log('edited section')
// console.log(container[6].location_contents[0])
// console.log('new location')
// console.log(newLocation)
// console.log('container')
// console.log(newcontainer)
 }



  return (
    <>

<h1 className="app-title">My Stuff</h1>
{ viewArea == 'user guide' &&
<VideoUserGuide openSearch={openSearch} openAllLocations={openAllLocations} returnToStart={returnToStart} s/>

}

{viewArea == "transfer page" &&
<TransferPage viewArea={viewArea} parentId={parentId} sectionid={sectionId} container={container} boxDetails={boxDetails} allItemsArray={allItemsArray} openBox={openBox} openSection={openSection} sectionItems={sectionItems} transferBoxAccept={transferBoxAccept} addBoxItem={addBoxItem} deleteBoxItem={deleteBoxItem} inventoryChange={inventoryChange} allArrayChange={allArrayChange}/>

}

{viewArea == "all section items" &&
<AllItemsViewer allSectionItems={allSectionItems} sectionItems={sectionItems}  openAllLocations={openAllLocations} openSection={openSection} container={container} openSearch={openSearch}  openLocation={openLocation} openBox={openBox}/>

}

{viewArea == "start page" && 
<StartPage viewArea={viewArea} openSearch={openSearch}  openAllLocations={openAllLocations} fixLocationId={fixLocationId} openUserGuide={openUserGuide}/>
}


{viewArea == "search page" && 
<SearchPage viewArea={viewArea} closeSearch={closeSearch}  openAllLocations={openAllLocations} allItemsArray={allItemsArray} container={container} openSection={openSection}  parentId={parentId} sectionId={sectionId} areaSpecific={areaSpecific} preSearchArea={preSearchArea} openLocation={openLocation} openBox={openBox}  boxId={boxId}/>
}


    {viewArea == 'main' &&     
// // if viewArea IS an empty string then render form and locations shelf (woo hoo, it works)
<>
<NewLocationForm formSubmit={addLocation} returnToStart={returnToStart} openSearch={openSearch}  />
<div className="locations-container">
<div className="locations-shelf">
<LocationShelf container={container} openLocation={openLocation} deleteLocation={deleteLocation}/>
</div>
  </div>   
  </>  
  }

{
// if viewArea  string is 'box' then load box viewer (view Items of Specific box)
viewArea == 'box' && <BoxViewer addBoxItem={addBoxItem} closeBox={closeBox} container={container} deleteBoxItem={deleteBoxItem} areaSpecific={areaSpecific} viewArea={viewArea}  parentId={parentId} sectionId={sectionId} openAllLocations={openAllLocations} openLocation={openLocation} openSearch={openSearch} closeSection={closeSection}  transferItem={transferItem}/>
}



{
// if viewArea   string is 'section' then load section viewer (view boxes of a section)
viewArea == 'section' && <SectionViewer addBox={addBox} closeSection={closeSection} openBox={openBox} container={container} deleteBox={deleteBox} areaSpecific={areaSpecific} parentId={parentId}  sectionId={sectionId} openAllLocations={openAllLocations} allItemsArray={allItemsArray} allSectionItems={allSectionItems} openSearch={openSearch} transferBox={transferBox}/>
}




{
// if viewArea  string is 'location' then load location viewer (view sections of a  location)
viewArea == 'location' && <LocationViewer closeLocation={closeLocation} areaSpecific={areaSpecific} container={container} deleteSection={deleteSection} addSection={addSection} openSection={openSection} parentId={parentId} openSearch={openSearch}  />
}



    </>
  )
}

export default App

/*
FOR temp notes


adjusted code for opening boxes

  // view area is intended destination so;
 
  // specific area is the intended box name so search the section contents for the id and set 'specific to the associated box name
//   let specific;
//   currentpath.section_contents.map(boxes =>{
//     if(boxes.id == currentpath.boxId){
// specific = boxes.box_name
//     }
//   })

//   console.log(`
//   specific: ${specific}
//   areaSpecific: ${areaSpecific}
//   `)



// let indexOfLocation;
// let indexOfSection;
//   container.map((locations, locationIndex) =>{
//     if(locations.id == parentId){
//       indexOfLocation = locationIndex;
// // map specific location
//       container[indexOfLocation].location_contents.map((section, sectionIndex) =>{
//         if(section.id == sectionId){
//           indexOfSection = sectionIndex;
//         }
//       })
//     }


//   })






    console.log(`
    id: ${id}
    areaName: ${areaName}
    generalArea: ${generalArea}
    buttonText: ${buttonText}
    className: ${className}
    OpenArea Function: ${openArea}
     `): console.log('nothng to do')


*/