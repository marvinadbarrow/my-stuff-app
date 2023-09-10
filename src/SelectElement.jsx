import { OptionSelect } from "./OptionSelect"


export const SelectElement = ({selectedLocationInfo, setSelectedLocationInfo, selectedSectionInfo, setSelectedSectionInfo, boxDetails, setSelectedBoxInfo, container}) =>{


    return (
        <>
        {
// OPTION SELECTOR
 <OptionSelect chooseLabel={'Choose a location'} selectID={'location.id'} infoLevel1={selectedLocationInfo} areaName={'location'} infoSetter={setSelectedLocationInfo} container={container}/> 
}


{ // if a location is selected then display section select menu
selectedLocationInfo.location_index && 
<>

{// OPTION SELECTOR
}
<OptionSelect chooseLabel={'Choose a section'} selectID={'section.id'} infoLevel1={selectedLocationInfo} infoLevel2={selectedSectionInfo} areaName={'section'} infoSetter2={setSelectedSectionInfo} container={container}/> 
</>
}


{ // if a section is selected from menu
    selectedSectionInfo.section_index &&
    // if an item is being transferred then display box select menu
    boxDetails.hasOwnProperty('new_item_string') &&

    <>
    
        <OptionSelect chooseLabel={'Choose a box'} selectID={'box.id'} infoLevel1={selectedLocationInfo} infoLevel2={selectedSectionInfo} areaName={'box'} infoSetter3={setSelectedBoxInfo} container={container}/> 
    </>
}
        
        </>
    )

}

    /*
    props for SelectElement
    selectedLocationInfo
    setSelectedLocationInfo
    selectedSectionInfo
    setSelectedSectionInfo
    boxDetails
    setSelectedBoxInfo
    container

     -- components to import

    */


