import { useState } from 'react'
import { DeleteButton } from './DeleteButton';
// inside the parameter brackets is the property 
export  const NewItem = ({ boxPath, boxItemDeleteCall, newBoxItems, itemName, itemId, itemParentName, itemParentId, numberOfItems}) =>{
    const [checkedStatus, setCheckedStatus] = useState('')

// takes user back to locations shelf
function itemDeleteCall (id) {
    boxItemDeleteCall(id, newBoxItems, boxPath)
    setCheckedStatus('')
}

    return (
<>
{numberOfItems == undefined && 'no items here'}

<li key={itemId} className="list_item">
 <div className="item-div">
<label className="list-para">
<input type="checkbox"  onClick={() =>{
    checkedStatus == ''? setCheckedStatus('checked'): setCheckedStatus('');
}}/>    
{itemName}</label>
{checkedStatus == 'checked' &&
<DeleteButton className={"delete-item"}  name={''}  deleteFunction={itemDeleteCall} id={itemId}/>
}
</div>
</li>
</>
    )}

/*



*/
