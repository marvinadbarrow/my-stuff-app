import { useEffect, useState } from 'react'
import { DeleteButton } from './DeleteButton';
import { ViewAreaButton } from './ViewAreaButton';
import { TransferButton } from './TransferButton';
export  const NewBox = ({id, boxName, contentsLength, viewBoxContents, boxDeleteCall, parentId, sectionId, sectionBoxes, transferBox, container}) =>{


// console.log(`
// boxId: ${id}
// parentId: ${parentId}
// sectionId: ${sectionId}
// boxName: ${boxName}
// `)

// add section id to sectionBoxes object
sectionBoxes.section_id = sectionId

// get the name of the parent location and add location_name property to sectionBoxes, setting its value using parent location name. 
container.map(objects =>{
    if(objects.id == parentId){
 sectionBoxes.location_name = objects.location_name
    }
})

function deleteBox (id){
    boxDeleteCall(id)
}

let itemNumber; // variable to display number of items in box
let viewButtonText  // variable to display text on button for viewing contents if they exist or adding content if not. 

contentsLength > 1 ? itemNumber = 'Items': itemNumber = 'Item'
contentsLength === 0 ? viewButtonText = 'Add Items': viewButtonText = 'View Items'
return(
<>
<li key={id} className="list_item"><div className="item-div"><p className="list-para">{boxName}</p>

{
    // the below div contains item total display and all buttons so that they display evenly on each row
}
<div className="all-buttons-container">

<p className="items-total">{itemNumber}: {contentsLength}</p>

 <ViewAreaButton className={"view-contents"} openArea={viewBoxContents}  id={id} areaName={boxName} buttonText={viewButtonText} generalArea={'box'}/>  

{
// below button takes you to transfer page
}
 <TransferButton  itemName={boxName} transferBox={transferBox} objectPath={sectionBoxes} buttonText={'Move Box'}/>

{contentsLength === 0 && 
<DeleteButton className={"delete"}  name={''}  deleteFunction={deleteBox} id={id}/>
 }
</div>


</div>
</li> 
</>
)}

