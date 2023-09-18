
import { useState } from "react";
import { v4 } from "uuid";
export const DestinationBoxes = ({selectedLocationInfo, selectedSectionInfo, testContainer, sectionItems, newBoxName, transferApplied, modifiedBoxName, existingDuplicates}) =>{


// if incoming modified box name has a value then set it as state otherwise leave previous state, but I'm not sure it will work and might have to use local storage to solve this.


    return(
        <>
 <div className="transfer-box-output small-border">
<p className="transfer-box-heading"><b>Box Names:</b></p>
<ul key={v4()} className="box-contents-for-transfer">
<div className="list-div"> 
    { // this DIV will only display 5 or 6 destination boxes; the rest will be hidden but can be seen using the scroll bar or mousewheel. 

    testContainer[selectedLocationInfo.location_index].location_contents[selectedSectionInfo.section_index].section_contents.map(box =>{
        console.log(box.box_name)
        let nameOfClass;



// transfer isn't applied yet but a duplicate box is found at destination (that can happen when the section menu is )


// TRANSFER NOT YET APPLIED
      if(transferApplied !== 'yes'){

if(box.box_name == sectionItems.box_name){ // if duplicate box exists at destination
    if(localStorage.getItem('modified_box_name')){
        
   console.log(JSON.parse(localStorage.getItem('modified_box_name')))
        // this is the stage between changing the name and retrying the transfer. Since the box name is modified the transfer won't cause a conflict so the originally redded name can now return to the normal color. 
        nameOfClass = "transfer-box-item" // remove warning color in readiness to transfer altered box name
    }else{
// this is the stage prior to retry, and prior to name modification so keep the duplicate box name red. 
        nameOfClass = "transfer-box-item warning-red"
    }

}else{ // otherwise no duplicate exists and the regular colours are used
    nameOfClass = "transfer-box-item" 
}
      }

else{ // TRANSFER IS HAS BEEN APPLIED
if(localStorage.getItem('modified_box_name')){ 
    // if the modified box name variable is saved to local storage then 'existing duplicates < 1' is true because it is set to zero at the same time as the local storage save; and 'existing duplicates < 1' allows the transfer to complete. 
        if(box.box_name == JSON.parse(localStorage.getItem('modified_box_name'))){ // whichever box in the destination has the local storage variable name is the box which was transferred so color it green. 
            nameOfClass = "transfer-box-item success-green"
            console.log('modified success green')

    }else{ // other evaluated boxes do not have the local storage variable name and so, they are not the transferred box, so are rendered with regular colours. 
            nameOfClass = "transfer-box-item"     
        }

}else{ // no modification has occurred; so there are two possible cases. 1) there is a duplicate which means that  'existing duplicates < 1' is false
    if(existingDuplicates > 0){
        if(box.box_name == sectionItems.box_name){ // the evaluated box is causes a duplication conflict so color it warning red
            nameOfClass = "transfer-box-item warning-red" 
        }else{
            // the evaluated box does not conflict with the transfer box so color it with regular colours
            nameOfClass = "transfer-box-item"  
        }

    }else{
    // 'existingDuplicates < 1' so there is no duplication
    if(box.box_name == JSON.parse(localStorage.getItem('modified_box_name'))){ // the evaluated box is the tranferred box so color success green
        nameOfClass = "transfer-box-item success-green" ;

    }else{ // the evaluated box is not the transfer box so color it regular
        nameOfClass = "transfer-box-item" 
    }
    }
}}
   

return(
    <li id={box.id} className={nameOfClass}>{box.box_name}</li>
)
        })
    }
</div>
</ul>
</div>
        </>
    )
}

/*

 if(transferApplied !== 'yes'){

if(box.box_name == sectionItems.box_name){ // if a duplicate box exists
    if(modifiedBoxName !== ''){ // if modified box name exists
        nameOfClass = "transfer-box-item" // name has been changed so 
    }else{
        nameOfClass = "transfer-box-item warning-red"
    }

}else{ // the section has been selected but the box names doesn't match sectionItems.box_name so color it normal
    nameOfClass = "transfer-box-item" 
}
      }

else{       // TRANSFER IS APPLIED
if(newBoxName == ""){ // if new box name  hasn't been given
    if(existingDuplicates < 1){ // there were no duplicates so the transfer is a success
        if(box.box_name == sectionItems.box_name){ // if destination box has sectionItems box name, then there was no dublicate and the natching name should be colored green to indicate a successful transfer of the original item
            nameOfClass = "transfer-box-item success-green"
        }else{ // transfer applied but box name doesn't match sectionitems name, it must be one of the other baxes that were already in the section so color it normal
            nameOfClass = "transfer-box-item"     
        }
    }else{// there was a duplicate
        if(box.box_name == sectionItems.box_name){ //duplicate exist and a match is found so color it red; note that this is where a new box name has not yet been set
            nameOfClass = "transfer-box-item warning-red"
        }else{ // otherwise the name is not a duplicate so color it normal
            nameOfClass = "transfer-box-item" 

    }}


}else{ // new box name does exist so a the transfer box had a duplicate name (might need to use modifiedName as an alternative but will test it)
if(box.box_name == newBoxName){
    nameOfClass = "transfer-box-item success-green"   
}else{ // none of the other boxes has new box name so color them normal
    nameOfClass = "transfer-box-item" 
}}





   {// if a duplicate DOES exist, refers to the box name that WAS red prior to the tranfer apply attempt, in other words, there was a duplicate, but now, there is a duplicate, but the box name has not been modified. So the duplicated box name SHOULD remain red; and the the transfer applied will be reset to 'no', and also, the tranfer will not be written to the destination because existing duplicates is greater than zero, so nothing is set.  COLOR hte duplication name as red and all of the others as regular. The red box MUST be the actual duplication box already at destination since no transfer occurred due to duplicate number being 1 or greater.  
        if(box.box_name == sectionItems.box_name){ //duplicate exist and a match is found so color it red; note that this is where a new box name has not yet been set
            nameOfClass = "transfer-box-item warning-red"
        }else{ // otherwise the name is not a duplicate so color it normal
            nameOfClass = "transfer-box-item" 

    }}



*/