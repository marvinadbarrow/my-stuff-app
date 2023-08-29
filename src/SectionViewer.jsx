import { useEffect, useState } from 'react'
import{v4} from 'uuid'
import { NewBoxForm } from './NewBoxForm'
import { NewBox } from './NewBox'

// this will open when section is clicked. 
export  const SectionViewer = ({addBox, closeSection, openBox, container, deleteBox, areaSpecific, parentId, sectionId, openAllLocations,  allItemsArray, allSectionItems, openSearch}) =>{

    const [boxLocation, setLocation] = useState(areaSpecific) 


let sectionContents;
let thisLocation;
let thisSection


    container.map((location) =>{
        if(location.id == parentId){
thisLocation = location
thisSection = location.location_contents
thisSection.map((innerContainer) =>{
    if(innerContainer.section_name == areaSpecific){
sectionContents = innerContainer.section_contents
    }
})}
    })

let thisPath = {
    'all_locations': container, 
    'this_location': thisLocation,
    'this_section': thisSection,
    'section_contents': sectionContents,
    'specific_area': areaSpecific,
    'general_area': 'section',
    'destination_area':'box'
}


function viewBoxContents (currentPath, id){
// add 'note' property to current path object
currentPath.note = 'loop through currentPath.section_contents to find matching id of clicked box'
// add 'id' property to current path object
currentPath.boxId = id
openBox(currentPath )
}

let sectionLocation;
container.map((location) =>{
    if(location.id == parentId){
 sectionLocation = location
    }
})


function testCloseSection (){
    closeSection(sectionLocation) 
}

function boxDeleteCall (boxId) {
let indexOfBox;
let sectionBoxes = thisPath.section_contents
// map section context to get index of box object
sectionBoxes.map((boxes, boxIndex)=>{
    if(boxes.id == boxId){
indexOfBox = boxIndex
    }
})
    deleteBox(boxId, thisPath)
}

    return (
        <>
    <NewBoxForm boxLocation={boxLocation} testCloseSection={testCloseSection} container={container} parentId={parentId} addBox={addBox} thisPath={thisPath}  sectionId={sectionId} openAllLocations={openAllLocations} allItemsArray={allItemsArray} allSectionItems={allSectionItems}  openSearch={openSearch} sectionLocation={sectionLocation}/>
        <ul className="items-list">

    { sectionContents.map(sectionBoxes =>{
        return ( <>
            <NewBox id={sectionBoxes.id} boxName={sectionBoxes.box_name} 
            contentsLength={sectionBoxes.box_contents.length}
 viewBoxContents={viewBoxContents} boxDeleteCall={boxDeleteCall} thisPath={thisPath}/>
                </>)
   })
}
        </ul>
        </>
             )
           }

/*

*/