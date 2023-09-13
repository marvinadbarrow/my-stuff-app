import { useState } from 'react'
import { DeleteButton } from './DeleteButton';
import { TransferButton } from './TransferButton';
// inside the parameter brackets is the property 
export  const NewItem = ({ boxPath, boxItemDeleteCall, newBoxItems, itemName, itemId, itemParentName, itemParentId, numberOfItems, transferItem}) =>{
    const [checkedStatus, setCheckedStatus] = useState('')


// takes user back to locations shelf
function itemDeleteCall (id) {
    boxItemDeleteCall(id, boxPath, itemName)
    setCheckedStatus('')
}

    return (
<>
{numberOfItems == undefined && 'no items here'}

<li key={itemId} className="list_item">
 <div className="item-div-box-item">
<label className="list-para">
<input type="checkbox"  onClick={() =>{
    checkedStatus == ''? setCheckedStatus('checked'): setCheckedStatus('');
}}/>    
{itemName}</label>

<div className="item-button-holder">

{checkedStatus == '' && 
<TransferButton objectPath={boxPath} itemName={itemName} transferItem={transferItem} buttonText={'Move Item'} newBoxItems={newBoxItems}/>
}
{checkedStatus == 'checked' &&
<DeleteButton className={"new-delete-button"}  name={''}  deleteFunction={itemDeleteCall} id={itemId}/>
}
    
</div>

</div>
</li>
</>
    )}

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
