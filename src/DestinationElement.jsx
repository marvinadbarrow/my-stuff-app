import { DestinationBoxes } from "./DestinationBoxes"

export const DestinationElement = ({selectedLocationInfo, selectedSectionInfo, sectionItems, testContainer, newBoxName, transferApplied, selectedBoxInfo, modifiedBoxName, existingDuplicates}) =>{

    
console.log(selectedLocationInfo)
return(<>

<div className="element-div-transfer-destination medium-border">
            <p className="results-para heading-clr-destination text-shadow-heading"><em>{'DESTINATION'}</em></p>

            {selectedLocationInfo.hasOwnProperty('location_name') && 
                 <p className="results-para">Location:<br/> <b>{selectedLocationInfo.location_name}</b></p>       
            }

    {selectedSectionInfo.hasOwnProperty('section_name') && 
    <p className="results-para">Section:<br/> <b>{selectedSectionInfo.section_name}</b></p>
    }
   {    // if section items property exists, desplay element to list all items in a box transfer
sectionItems.hasOwnProperty('parent_section_name') &&
// only show section boxes once section is selected
selectedSectionInfo.section_name &&


<DestinationBoxes testContainer={testContainer} selectedSectionInfo={selectedSectionInfo} selectedLocationInfo={selectedLocationInfo} sectionItems={sectionItems} newBoxName={newBoxName} transferApplied={transferApplied} modifiedBoxName={modifiedBoxName} existingDuplicates={existingDuplicates}/>


   }

   {  
   selectedBoxInfo !== undefined  &&
   selectedBoxInfo.hasOwnProperty('box_index') && //  and  paragraph for selected box name only shown if a box is selected in select menu
      <p className="results-para">Box:<br/> <b>{selectedBoxInfo.box_name}</b></p>
   }
            </div>
</>)
}