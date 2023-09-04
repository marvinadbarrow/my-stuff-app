import containerImage from './images/container.png'
import { useState } from 'react'
import { NewItemForm } from './NewItemForm';
import { NewItem } from './NewItem';
// inside the parameter brackets is the property 
export  const BoxViewer = ({addBoxItem, closeBox, viewArea, container, deleteBoxItem, areaSpecific, parentId, sectionId, openAllLocations, openLocation, openSearch,  closeSection, transferItem}) =>{

    const [location, setLocation] = useState(areaSpecific) 

    console.log(`
    parentId: ${parentId}
    sectionId: ${sectionId}
    areaSpecific: ${areaSpecific}
       `) 

       console.log(container)
// after a box has been created using the itemString sent from the form, the container is updated in state.  Then, when user clicks to view a box, the above 3 props are used when mapping the container to pull out location,  section and box name; they are used for when user clicks on a box so its items are displayed. 

    let locationContents;
    let sectionContents
    let locationName
    let thisLocation;
    let thisLocationId;
    let thisLocationIndex;
    let thisSection;
    let thisSectionId;
    let thisSectionIndex;
    let thisBox;
    let thisBoxIndex;
    let boxId;
    let boxContents;
    let sectionName;
// the purpose of this mapping is to get all of the detials so that the internal of the clikced box is shown

// container.map(otherLocation =>{
//     console.log(otherLocation.id)
// })

    container.map((mylocation, locationIndex) =>{
        if(mylocation.id == parentId){
thisLocationIndex = locationIndex
thisLocation = mylocation // get main location 
locationName = mylocation.location_name;
// console.log(locationName)
thisLocationId = mylocation.id
locationContents = mylocation.location_contents // get location sections


// map location contents
locationContents.map((eachSection, sectionIndex) =>{ // map location sections

    if(eachSection.id == sectionId){
        thisSectionIndex = sectionIndex
        thisSection = eachSection
        sectionName = eachSection.section_name
        thisSectionId = eachSection.id
        sectionContents = eachSection.section_contents


        // map section contents
        sectionContents.map((eachBox, eachBoxIndex) =>{
console.log(eachBox)
console.log(eachBox.box_name)
console.log(areaSpecific)
            if(eachBox.box_name == areaSpecific){
    thisBoxIndex = eachBoxIndex
    thisBox = eachBox
    boxId = eachBox.id
    boxContents = eachBox.box_contents;
            }
        })
    }
})




}
    })
// note that indexes are useful for the deletion or amendment of array elements, but, id's are useful for actually retrieving the current indexes in the path that lead to the intended delete object. 
// object to be used for deleting, opening, updating box contents with new items
    let boxPath = {
        'all_locations': container, 
        'location': thisLocation,
        'location_name': locationName,
        'location_id': thisLocationId,
        'location_index': thisLocationIndex,
        'location_contents': locationContents,
        'section': thisSection,
        'section_index': thisSectionIndex,
        'section_name': sectionName,
        'section_id': sectionId,
        'box_object': thisBox,
        'box_index': thisBoxIndex,
        'box_name': areaSpecific,
        'box_id': boxId,
        'box_contents': boxContents,
        'new_item_string':''
    }


console.log(boxPath)
//----------------------------------------------------------------------------

function createBoxItem (itemString) {
// only allow item creation if three or more characters are inputted
    if(itemString.length < 3){
        alert('item name must be at least three characters long');
        return
    }
// add the string to boxPath object
console.log(boxPath, itemString) // this should give you the 'current item' you wish to create, and boxPath provides the path details to the new item; the correct location/section/box, so the function can write those pathways to the object created in allItemsArray that represents the new item. 
addBoxItem(boxPath, itemString)

}


let sectionLocation;
container.map((location) =>{
    if(location.id == parentId){
 sectionLocation = location
    }
})

//----------------------------------------------------------------------------

// closes a section, which opens user up to parent location
function testCloseSection (){
    closeSection(sectionLocation) 
}

// takes user back to sections where all boxes can be seen
function backToBoxViewer () {
    // just takes the section name which is obviously common to any box path for the particular section. 
    console.log(boxPath)
closeBox(boxPath.section_name)
}

// deletes an empty box
function boxItemDeleteCall (itemId, boxItems, boxObject) {
deleteBoxItem(itemId, boxItems, boxObject)

}

let newBoxItems = [...boxPath.box_contents];
// the this array is used to  render items contained in box contents or, if the array is empty, to render the message 'no items in this box' at the bottom of the new item form. 
let numberOfItems = newBoxItems.length

    console.log(newBoxItems)
return (
    <>

        <NewItemForm  createBoxItem={createBoxItem} backToBoxViewer={backToBoxViewer} location={location} parentId={parentId} sectionId={sectionId} container={container} openAllLocations={openAllLocations} openLocation={openLocation}  numberOfItems={numberOfItems} openSearch={openSearch} testCloseSection={testCloseSection}/>

<ul className="item-unordered-list">
{
newBoxItems.map(item =>{
// the below variables are for the item name, and id, and the parent box name and id. 
let itemName = item.itemString;
let itemId = item.id;
let itemParentName = item.parent_Box; // note the accidental title case on this property (the capital 'B' of the word 'Box') this is the box name
let itemParentId = item.parent_box_id; // this is the box id

/*
props sent to NewItem ~

Strings: 
item name
item id
box name
box id

Numbers: 
box contents total

Arrays: 
box contents

objects:
box path




Functions: 
- item delete
- transfer item

The only reason why boxPath is needed is to provide an 'easy' pathway to the all of the items that are in the box content property of boxPath. 

*/



return(
<NewItem boxPath={boxPath} boxItemDeleteCall={boxItemDeleteCall} newBoxItems={newBoxItems} itemName={itemName} itemId={itemId} itemParentName={itemParentName} itemParentId={itemParentId} numberOfItems={numberOfItems}  transferItem={transferItem}/>
)

})
}
</ul>


          
</>
    
)



}
