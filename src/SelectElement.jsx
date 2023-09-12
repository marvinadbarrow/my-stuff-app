import { OptionSelect } from "./OptionSelect"


export const SelectElement = ({selectedLocationInfo, setSelectedLocationInfo, selectedSectionInfo, setSelectedSectionInfo, boxDetails, setSelectedBoxInfo, container, transferApplied}) =>{


        //         "location_index": 0,
    //         "location_id": container[0].id,
    //         "location_name": container[0].location_name



    return (
        <>
        {
// LOCATION SELECTOR

transferApplied !== 'yes' && // if transfer applied not yet set show location select menu. Also, using infoLevel1 to set default values on location select to be the first location, i.e. BLACK CHEST.  
<>
 <OptionSelect chooseLabel={'Choose a location'} selectID={'location.id'} infoLevel1={{"location_index": 0, "location_id": container[0].id, "location_name": container[0].location_name}} areaName={'location'} infoSetter={setSelectedLocationInfo} container={container} infoSetter2={setSelectedSectionInfo}  infoSetter3={setSelectedBoxInfo}/> 



{ // if a location is selected, which means the location_index property will exist in selectedLocationInfo,  display section select menu
selectedLocationInfo.location_name && 
<>
{ // index not showing for BLACK CHEST, not even attempting to so that seems to mean that when selection is made on Black chest, it's not registered here although it's registered in the destination element. 
console.log(selectedLocationInfo.location_index)

}
{// SECTION SELECTOR - the log below should show the sections
console.log(container[selectedLocationInfo.location_index].location_contents)
}
<OptionSelect chooseLabel={'Choose a section'} selectID={'section.id'} infoLevel1={selectedLocationInfo} infoLevel2={selectedSectionInfo} areaName={'section'} infoSetter2={setSelectedSectionInfo} container={container} infoSetter3={setSelectedBoxInfo}/> 
</>
}


{ // if a section is selected from menu
    selectedSectionInfo.section_name &&
    // if an item is being transferred then display box select menu
    boxDetails.hasOwnProperty('new_item_string') &&

    <>
    {
        // BOX SELECTOR
    }
        <OptionSelect chooseLabel={'Choose a box'} selectID={'box.id'} infoLevel1={selectedLocationInfo} infoLevel2={selectedSectionInfo} areaName={'box'} infoSetter3={setSelectedBoxInfo} container={container}/> 
    </>
}
        


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


