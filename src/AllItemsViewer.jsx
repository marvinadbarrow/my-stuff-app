import { useEffect, useState, useMemo } from 'react'
import { AllItemsObject } from './AllItemsObject'
import { AllLocationsButton } from './AllLocationsButton';
import { BackToBoxViewerButton } from './BackToBoxViewerButton';
import { ViewAreaButton } from './ViewAreaButton';
export  const AllItemsViewer = ({allSectionItems, openAllLocations, openSection, sectionItems, container, openLocation, openBox}) =>{




    let objectBox = ''; 
    let tempArray = []


let locationId = sectionItems[0].location_id
let sectionId = sectionItems[0].section_id
let indexOfLocation;
let nameOfLocation
let indexOfSection;
let nameOfSection;

  container.map((locations, locationIndex) =>{ 
    if(locations.id == locationId){
      indexOfLocation = locationIndex;
      nameOfLocation = locations.location_name;
      locations.location_contents.map((sections, sectionIndex) =>{
        if(sections.id == sectionId){
            indexOfSection = sectionIndex
            nameOfSection = sections.section_name
        }
      })
   }
    })

function backToMainLocation(general, specific, id){
openLocation(general, specific, id)

}

    function backToLocations(e) {
        openAllLocations('main')
  }   


function backToSection (general, specific,  id) {
openSection(general, specific, id)
}


return(
<>

<div className="inner-location">
 

            <AllLocationsButton backToLocations={backToLocations}/>

            <ViewAreaButton openArea={backToMainLocation} className={"close-location back-btn"} generalArea={'location'} areaName={nameOfLocation} id={locationId} buttonText={nameOfLocation}/>
            
            <ViewAreaButton generalArea={'section'} areaName={nameOfSection} id={sectionId} buttonText={nameOfSection} openArea={backToSection} className={"close-location back-btn"}/>

            </div>

<h4 className="sections-title"> {nameOfLocation} - {nameOfSection}</h4>
 

 <div className="all-boxes-div">
 {


sectionItems.map(objects =>{ // map through all section objects
  if(objects.box_id !== objectBox){ //if current box id isn't box name variable
    objectBox = objects.box_id // change box name variable to current box id
  
    // filter sortedSectionItems for only objects which have the same box id
  tempArray = [...sectionItems.filter(objects => objects.box_id == objectBox)]
// console.log(tempArray)
  // console.log(tempArray) 
  // return a allItemsObject component with the array for processing
  return(
<AllItemsObject tempArray={tempArray} openBox={openBox}/>
  )
  }
  })

 }


</div>



</>
)
}

/*
PARAMETERS FOP RETURN TO SECTION
 testCloseSection={testCloseSection} nameOfLocation={nameOfLocation}
*/