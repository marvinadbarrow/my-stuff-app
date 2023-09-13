import { useEffect, useState } from 'react'
import{v4} from 'uuid'
import { NewBoxForm } from './NewBoxForm'
import { NewBox } from './NewBox'

// this will open when section is clicked. 
export  const SectionViewer = ({addBox, closeSection, openBox, container, deleteBox, areaSpecific, parentId, sectionId, openAllLocations,  allItemsArray, allSectionItems, openSearch, transferBox}) =>{

    const [boxLocation, setLocation] = useState(areaSpecific) 


let sectionContents;
let thisLocation;
let thisSection
let indexOfLocation;
let indexOfSection;

container.map((locations, idOflocation) =>{
    if(locations.id == parentId){
        thisLocation = locations // location object
        indexOfLocation = idOflocation // index of location
locations.location_contents.map((sections, idOfSection) =>{
            if(sections.id == sectionId){
        thisSection = sections // section object
        indexOfSection = idOfSection // index of section
        sectionContents = sections.section_contents // boxes
            }
        })
    }
})


function viewBoxContents (general, specific, id){
openBox(general, specific, id)
}

function testCloseSection (){
    closeSection(thisLocation) 
}

function boxDeleteCall (boxId) {
 deleteBox(boxId)
}



    return (
        <>
    <NewBoxForm boxLocation={boxLocation} testCloseSection={testCloseSection} container={container} parentId={parentId} addBox={addBox} sectionId={sectionId} openAllLocations={openAllLocations} allItemsArray={allItemsArray} allSectionItems={allSectionItems}  openSearch={openSearch} sectionLocation={thisLocation}/>


    {sectionContents.length < 1 &&     
    <div>No boxes in this section</div>}


        <ul key={v4()}  className="items-list-box">

    {// map section contents that contains all boxes and for each object, render a new box using id, boxName, contentsLength variables, and viewBoxContents and boxDeleteCall functions as props. Will try to do away with boxpath here
    
    sectionContents.map(sectionBoxes =>{
        return ( <>
<NewBox key={v4()}  id={sectionBoxes.id} boxName={sectionBoxes.box_name} 
            contentsLength={sectionBoxes.box_contents.length}
 viewBoxContents={viewBoxContents} boxDeleteCall={boxDeleteCall} parentId={parentId} sectionId={sectionId} sectionBoxes={sectionBoxes} transferBox={transferBox} container={container}/>
                </>)
   })
}
        </ul>
        </>
             )
           }

/*

*/