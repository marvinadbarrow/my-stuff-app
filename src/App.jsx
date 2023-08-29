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

// localStorage.clear()

function App() {

// console.log(localStorage)
  // create a function which takes a state variable, which can be assigned the clicked location name as a string, when the variable is a string, the location will open, otherwise the main page will render when the variable is an empty string. 
  const [viewArea, setviewArea] = useState('start page') // precise area to be viewed
  const [areaSpecific, setAreaSpecific] = useState('')
  const [parentId, setParentId] = useState('')
  const [sectionId, setSectionId] = useState('')
  const [sectionItems, setSectionItems] = useState()
  const [boxDetails, setBoxDetails] = useState({})
  const [preSearchArea, setPreSearchArea] = useState('')

  // the below state contains all items created.
  const [allItemsArray, setAllItems] = useState(() =>{
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


function allSectionItems(sectionObjects){
if(sectionObjects.length > 0){
  console.log(sectionObjects)
setSectionItems(sectionObjects)
  setviewArea("all section items")
}

}

// console.log(allItemsArray)

// for creation and deletion of specific items in the inventory
  function addBoxItem (boxPath){
console.log(boxPath)
// THIS code for avoiding duplicate ITEMS is not working (SOLVED - forgot to increment the 'number' variable if a duplicate exists)
    let number = 0;
    if(boxPath.box_contents.length > 0){ // if there are other contents in the same box
            boxPath.box_contents.map(item =>{ // map the contents and check if the newString is already inside the box contents; which would mean that the box already has an item with that name (used .toLowerCase() so that the duplicates are looked for independent of string case)
        if(item.itemString.toLowerCase() == boxPath.new_item_string.toLowerCase()){
        alert('this item already exists:' + boxPath.new_item_string ) // alert user of duplicate
        number += 1 // increment 'number' which will cause the below if condition to fail and so a new item will not be created. 
         }
      })
    }

    

    if(number < 1){
      
      // if no duplicate exists create a new item object
      let newBoxItem = {
        id:v4(),
        parent_Box: boxPath.box_name,
        itemString: boxPath.new_item_string,
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

setAllItems(currentItems =>{
  return  [...currentItems, itemElement ]
})


// re-render with new locations array
setContainer(newLocationContainer)
    }


  }
  // ISSUE HERE: boxItems not used. 
  function deleteBoxItem (itemId, boxItems, boxObject){
let locationIndex = boxObject.location_index
let sectionindex = boxObject.section_index
let boxIndex = boxObject.box_index

  const  updatedItems = boxObject.box_contents.filter(items => items.id !== itemId)

  // create new variable for old box_contents array
let newBoxContents = [...container[locationIndex].location_contents[sectionindex].section_contents[boxIndex].box_contents]
newBoxContents = updatedItems // update the box_contents array with changed items

// create a new box variable out of the old one and replace the existing box_contents with the updated array
let newBox = {...container[locationIndex].location_contents[sectionindex].section_contents[boxIndex], box_contents: newBoxContents}

// create a new section into which the box will go into its box_contents array. 
let newSectionContents = [...container[locationIndex].location_contents[sectionindex].section_contents]

// update using index of box in section_contents
newSectionContents[boxIndex] = newBox

// create a new section object from the old and update it with new section contents
let  newSection = {...container[locationIndex].location_contents[sectionindex], section_contents:newSectionContents}

// create a new location contents array
let newLocationContents = [...container[locationIndex].location_contents]

// and use section index to replace the old original section with the new
newLocationContents[sectionindex] = newSection

// create new location (which is an object) and update the location contents
let newLocation = {...container[locationIndex], location_contents: newLocationContents}

// create new container so that the old location object can be replaced. 
let newContainer = [...container]

newContainer[locationIndex] = newLocation
console.log(newContainer)

// filter all item objects whose id is not the id of the object
let newAllItemsArray = allItemsArray.filter(objects => objects.item_id !== itemId)


// set new allItems array
setAllItems(newAllItemsArray)
setContainer(newContainer)
console.log(allItemsArray)
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
        boxObjects.box_name == box ?   number++ : number = number;
      })
    }

// if no other boxes exist, there can be no duplicate box names, so 'number' is trivially zero and a new box can be created using the 'box' parameter string. If  other boxes DO exist, but no duplicate names are found a new box can be created using the 'box' parameter string. If a duplicate box name IS found, number is incremented, so number < 1 is false, so no new box will be created
if(number < 1){

  // create a new box object 
  let newAddedBox =  {
    id: v4(), // box id
    box_name: box,
    parent_section_name: boxLocation, // section parent name
    parent_container_id: parentId,  // section parent index
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
function openBox(currentpath) {
  console.log(currentpath)
  // view area is intended destination so;
  setviewArea(currentpath.destination_area)
  // specific area is the intended box name so search the section contents for the id and set 'specific to the associated box name
  let specific;
  currentpath.section_contents.map(boxes =>{
    if(boxes.id == currentpath.boxId){
specific = boxes.box_name
    }
  })

  setAreaSpecific(specific)
  setBoxDetails(currentpath)
  }  
  function closeBox (sectionName) {
    setviewArea('section')
    setAreaSpecific(sectionName)
    }  
  function deleteBox (id, boxPath) {

// get location and section indexes
  let indexOfLocation;
  let indexOfSection;

    container.map((locations, locationIndex) =>{
      if(locations.id == parentId){
        indexOfLocation = locationIndex;

        container[indexOfLocation].location_contents.map((section, sectionIndex) =>{
          if(section.id == sectionId){
            indexOfSection = sectionIndex;
          }
        })
      }


    })


    // create new section contents and filter to remove clicked box object
    let newSectionContents = boxPath.section_contents.filter(boxes => boxes.id !== id)
  


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
  


    console.log()



    // setContainer(currentContainers => {
    //   return currentContainers.filter(container => container.id !== id)
    // })
  }





// --- SECTIONS, creating, opening, closing, deleting

function addSection (sectionName, containerName, containerIndex, parentContents) {
console.log(parentContents)
  let number = 0;

    container[containerIndex].location_contents.map((everySection) =>{
      // if a duplicate name is found, increment number
      everySection.item_name == sectionName ?   number++ : number = number;
    });
    
    // if number < 1, no duplicate name was found so create new item object, item array, location object and container and run state again
if(number < 1){

// generate a new item from the input value text. 
let newAddedSection =  {
  id: v4(),
  section_name: sectionName,
  container_name: containerName,
  section_contents: [], // container for all box object
 }
 
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
  console.log(specific, id)
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
    eachLocation.location_name == locationName ?   number++ : number = number;
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
  console.log(general, specific, id)
  console.log(container)
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

function closeMainArea (area){
  setviewArea(area)
  }


function openAllLocations (area){
  setviewArea(area)
  }

console.log(viewArea)



  return (
    <>

<h1 className="app-title">Find My Stuff App</h1>

{viewArea == "all section items" &&
<AllItemsViewer allSectionItems={allSectionItems} sectionItems={sectionItems}  openAllLocations={openAllLocations} openSection={openSection} container={container} openSearch={openSearch}  openLocation={openLocation}/>

}

{viewArea == "start page" && 
<StartPage viewArea={viewArea} openSearch={openSearch}  openAllLocations={openAllLocations}/>
}


{viewArea == "search page" && 
<SearchPage viewArea={viewArea} closeSearch={closeSearch}  openAllLocations={openAllLocations} allItemsArray={allItemsArray} container={container} openSection={openSection}  parentId={parentId} sectionId={sectionId} areaSpecific={areaSpecific} preSearchArea={preSearchArea} openLocation={openLocation} boxDetails={boxDetails} openBox={openBox}/>
}


    {viewArea == 'main' &&     
// // if viewArea IS an empty string then render form and locations shelf (woo hoo, it works)
<>
<NewLocationForm formSubmit={addLocation} closeMainArea={closeMainArea} openSearch={openSearch}  />
<div className="locations-container">
<div className="locations-shelf">
<LocationShelf container={container} openLocation={openLocation} deleteLocation={deleteLocation}/>
</div>
  </div>   
  </>  
  }

{
// if viewArea  string is 'box' then load box viewer (view Items of Specific box)
viewArea == 'box' && <BoxViewer addBoxItem={addBoxItem} closeBox={closeBox} container={container} deleteBoxItem={deleteBoxItem} areaSpecific={areaSpecific} viewArea={viewArea}  parentId={parentId} sectionId={sectionId} openAllLocations={openAllLocations} openLocation={openLocation} openSearch={openSearch} closeSection={closeSection}  />
}



{
// if viewArea   string is 'section' then load section viewer (view boxes of a section)
viewArea == 'section' && <SectionViewer addBox={addBox} closeSection={closeSection} openBox={openBox} container={container} deleteBox={deleteBox} areaSpecific={areaSpecific} parentId={parentId}  sectionId={sectionId} openAllLocations={openAllLocations} allItemsArray={allItemsArray} allSectionItems={allSectionItems} openSearch={openSearch} />
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

*/