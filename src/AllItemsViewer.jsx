import { useEffect, useState, useMemo } from 'react'
import { AllItemsObject } from './AllItemsObject'
import { AllLocationsButton } from './AllLocationsButton';
import { BackToBoxViewerButton } from './BackToBoxViewerButton';
import { ViewAreaButton } from './ViewAreaButton';
export  const AllItemsViewer = ({allSectionItems, openAllLocations, openSection, sectionItems, container, openLocation, openBox}) =>{

  // the below should be the array of box objects otherwise known as section_contents. 
console.log(sectionItems)


    let objectBox = ''; 
    let tempArray = []


let locationId = sectionItems[0].parent_container_id
let sectionId = sectionItems[0].section_id
let nameOfLocation = sectionItems[0].location_name
let nameOfSection = sectionItems[0].parent_section_name


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

  // send each object and the open box function as a prop
  return(
 <AllItemsObject boxObject={objects} openBox={openBox}/> 
  )
  
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