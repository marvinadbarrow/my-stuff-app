import containerImage from './images/container.png'
import { useState } from 'react'
import { NewItemForm } from './NewItemForm';
import { NewItem } from './NewItem';
// inside the parameter brackets is the property 
export  const BoxViewer = ({addBoxItem, closeBox, viewArea, container, deleteBoxItem, areaSpecific, parentId, sectionId, openAllLocations, openLocation, openSearch,  closeSection,}) =>{

    const [location, setLocation] = useState(areaSpecific) 


    let locationContents;
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
    container.map((location, locationIndex) =>{
        if(location.id == parentId){
thisLocationIndex = locationIndex
thisLocation = location // get main location 
thisLocationId = location.id

locationContents = location.location_contents // get location sections
locationContents.map((eachSection, sectionIndex) =>{ // map location sections

    if(eachSection.id == sectionId){
        thisSectionIndex = sectionIndex
        thisSection = eachSection
        sectionName = eachSection.section_name
        thisSectionId = eachSection.id
        eachSection.section_contents.map((eachBox, eachBoxIndex) =>{

            if(eachBox.box_name == areaSpecific){
    thisBoxIndex = eachBoxIndex
    thisBox = eachBox
    boxId = eachBox.id
    boxContents = thisBox.box_contents;
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
        'location_id': thisLocationId,
        'location_index': thisLocationIndex,
        'location_contents': locationContents,
        'section': thisSection,
        'section_index': thisSectionIndex,
        'section_name': sectionName,
        'section_id': sectionId,
        'box': thisBox,
        'box_index': thisBoxIndex,
        'box_name': areaSpecific,
        'box_id': boxId,
        'box_contents': boxContents,
        'new_item_string':''
    }



//----------------------------------------------------------------------------

function createBoxItem (itemString) {
// only allow item creation if three or more characters are inputted
    if(itemString.length < 3){
        alert('item name must be at least three characters long');
        return
    }
// add the string to boxPath object
    boxPath.new_item_string = itemString

addBoxItem(boxPath)

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
closeBox(boxPath.section_name)
}

// deletes an empty box
function boxItemDeleteCall (itemId, boxItems, boxObject) {
deleteBoxItem(itemId, boxItems, boxObject)

}

let newBoxItems = [...boxPath.box_contents];
// if there are no box items then this variable is used in newItemForm to render the string 'no items in this box' at the bottom of the form
let numberOfItems = newBoxItems.length

    
return (
    <>

        <NewItemForm  createBoxItem={createBoxItem} backToBoxViewer={backToBoxViewer} location={location} parentId={parentId} sectionId={sectionId} container={container} openAllLocations={openAllLocations} openLocation={openLocation}  numberOfItems={numberOfItems} openSearch={openSearch} testCloseSection={testCloseSection}/>

<ul className="item-unordered-list">
{
newBoxItems.map(item =>{

let itemName = item.itemString;
let itemId = item.id;
let itemParentName = item.parent_Box; // note the accidental title case on this property (the capital 'B' of the word 'Box')
let itemParentId = item.parent_box_id;


return(
<NewItem boxPath={boxPath} boxItemDeleteCall={boxItemDeleteCall} newBoxItems={newBoxItems} itemName={itemName} itemId={itemId} itemParentName={itemParentName} itemParentId={itemParentId} numberOfItems={numberOfItems}/>
)

})
}
</ul>


          
</>
    
)



}
