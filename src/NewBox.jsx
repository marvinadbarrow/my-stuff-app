import { useEffect, useState } from 'react'
import { DeleteButton } from './DeleteButton';
import { ViewAreaButton } from './ViewAreaButton';
export  const NewBox = ({id, boxName, contentsLength, viewBoxContents, boxDeleteCall, thisPath}) =>{

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
<p className="items-total">{itemNumber}: {contentsLength}</p>

 <ViewAreaButton className={"view-contents"} openArea={viewBoxContents}  id={id} boxPath={thisPath} buttonText={viewButtonText}/>  

{contentsLength === 0 && 
<DeleteButton className={"delete"}  name={''}  deleteFunction={deleteBox} id={id}/>
 }



</div>
</li> 
</>
)}

