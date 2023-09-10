export const DuplicateWarning = ({duplicateFound, newBoxName, setExistingDuplicates, applyBoxNameChange}) =>{

const processDuplicate = () =>{

    applyBoxNameChange(newBoxName)
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
    if(newBoxName !== duplicateFound && newBoxName.length > 2){
processDuplicate()
     
    }

    
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