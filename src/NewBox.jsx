import { useEffect, useState } from 'react'
import { DeleteButton } from './DeleteButton';
import { ViewAreaButton } from './ViewAreaButton';
import { TransferButton } from './TransferButton';
export  const NewBox = ({id, boxName, contentsLength, viewBoxContents, boxDeleteCall, parentId, sectionId, sectionBoxes, transferBox, container}) =>{

let newSectionBoxes = {

    "box_contents":sectionBoxes.box_contents, 
    "box_name":sectionBoxes.box_name,
    "location_name":sectionBoxes.location_name,
    "parent_container_id":sectionBoxes.parent_container_id,
    "parent_section_name":sectionBoxes.parent_section_name,
    "section_id":sectionBoxes.section_id,

  

}

// add section id to sectionBoxes object
newSectionBoxes.section_id = sectionId

// get the name of the parent location and add location_name property to newSectionBoxes, setting its value using parent location name. 
container.map(objects =>{
    if(objects.id == parentId){
 newSectionBoxes.location_name = objects.location_name
    }
})

function deleteBox (id){
    boxDeleteCall(id)
}

let itemNumber; // variable to display number of items in box
let viewButtonText  // variable to display text on button for viewing contents if they exist or adding content if not. 

// if contents length is 1, then word is 'item', but for all other values, zero included, word is 'items'
switch (contentsLength) {
    case 1: itemNumber = 'item'        
        break;

    default: itemNumber = 'Items'
        break;
}

contentsLength === 0 ? viewButtonText = 'Add Items': viewButtonText = 'View Items'
return(
<>
<li key={id} className="boxes-list-item">
    
    <div className="item-div-box"><p className="list-para">{boxName}</p>

{
    // the below div contains item total display and all buttons so that they display evenly on each row
}
<div className="all-buttons-container-new-box">

<p className="items-total">{itemNumber}: {contentsLength}</p>

 <ViewAreaButton className={"view-contents"} openArea={viewBoxContents}  id={id} areaName={boxName} buttonText={viewButtonText} generalArea={'box'}/>  

{// if box name is unboxed don't render the transfer button because there will always be a duplicate named 'unboxed' in the transfer destination, AND, unboxed isn't actually a box per se' so, for now items will have to be moved manually
    boxName.toLowerCase() !== 'unboxed' &&

// below button takes you to transfer page
<TransferButton  itemName={boxName} transferBox={transferBox} objectPath={newSectionBoxes} buttonText={'Move Box'}/>
}





</div>

{contentsLength === 0 && 
<DeleteButton className={"delete"}  name={''}  deleteFunction={deleteBox} id={id}/>
 }
</div>

</li> 
</>
)}

