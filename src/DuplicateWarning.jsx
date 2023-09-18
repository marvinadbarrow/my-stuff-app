import { useState } from "react"

export const DuplicateWarning = ({duplicateFound, newBoxName, setExistingDuplicates, applyBoxNameChange, setNewBoxName, setTransferApplied}) =>{


console.log(duplicateFound, newBoxName)

const processDuplicate = (nameofNewBox) =>{
    localStorage.setItem('modified_box_name',JSON.stringify(nameofNewBox))
// set newBoxName as the name of the box
applyBoxNameChange(nameofNewBox)
  
// setting existing duplicates to zero will cause the duplicates warning to disappear and will allow the 'apply transfer' button to re-appear which is necessary because, since there was a duplicate, the transfer did not complete; so the user will have to activate the transfer function again by hitting the transfer button once more.  Now that the box name has been changed and used to set new box, when apply transfer is clicked, the box will take the existing new name, and no  duplicate will be found, and this will allow the process to complete and transfer the box.
setExistingDuplicates(0);
}


    return(
    <>
    
    <div className="warning-message-element">
<div className="duplicate-box-warning medium-border">
    <b><em>WARNING - Duplicate box name exists:</em></b><br/>
     <p className="duplicate-warning-para"> the box name: -   
     <b><em> {duplicateFound}</em></b>, already exists at the transfer destination<br/> Consider <em>modifying</em> the box name by <em>'adding a number'</em> at the end of the name to represent the order in which the box was placed in the destination
     </p>
     </div>
{
    // RENAMING FORM FOR DUPLICATE BOX NAMES
}
<form action="" onSubmit={(e) =>{
        e.preventDefault();

        // if new name must have > 2 characters
 if(newBoxName.length > 2){

    // if the newly typed box name is not the same as the duplicate
if(newBoxName !== duplicateFound){
processDuplicate(newBoxName)
}else{alert('new box name is still a duplicate of a box at the destination')}

}else{alert('please rename the box with more than two characteres')}

   }} className="rename-box-form">
 <label htmlFor="rename-input">{'Modify Box Name'}</label>
 <input value={newBoxName} id='rename-input' type="text" placeholder={'New box name'} 
onChange={e => setNewBoxName(e.target.value)}
  />
<button className="reset-duplicates navigation-btn origin" typeof="submit" >Apply Name Change</button>
</form>



</div>

    
    </>
    )
}