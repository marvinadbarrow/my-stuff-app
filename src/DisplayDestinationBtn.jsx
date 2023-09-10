
import { v4 } from "uuid";
export const DisplayDestinationBtn = ({selectedLocationInfo, selectedSectionInfo, testContainer, sectionItems, newBoxName, transferApplied}) =>{





    return(
        <>
 <div className="transfer-box-output small-border">
<p className="transfer-box-heading"><b>Box Names:</b></p>
<ul key={v4()} className="box-contents-for-transfer">
<div className="list-div"> 
    { // this DIV will only display 5 or 6 destination boxes; the rest will be hidden but can be seen using the scroll bar or mousewheel. 

    testContainer[selectedLocationInfo.location_index].location_contents[selectedSectionInfo.section_index].section_contents.map(box =>{
        let nameOfClass;

      // if destination contains a box with the same name as tranfer box
        if(box.box_name == sectionItems.box_name){
// if the newBoxName doesn't exist
            if(newBoxName == ''){

                if(transferApplied !== 'yes'){ // if tranfer is not yet applied, the duplicate name conflict has not yet been resolved so give conflicting destination box name the red italic bold formatting
                nameOfClass = "transfer-box-item warning-red"
                }else{ // otherwise transfer is applied so, keep bold italic but change color to green to indicate successful transfer
                    nameOfClass = "transfer-box-item success-green"

                }

            }else{
                // otherwise a new name has been generated for the transform box that doesn't duplicate any destination box name, rever to normal formatting
                nameOfClass = "transfer-box-item" 
            }
        }else{    // the transfer box name doesn't match any box name at the destination  
                nameOfClass = "transfer-box-item" 

        }

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