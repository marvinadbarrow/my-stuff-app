import { useEffect, useState, useMemo } from 'react'
import { AllItemsObject } from './AllItemsObject'
import { AllLocationsButton } from './AllLocationsButton';
import { BackToBoxViewerButton } from './BackToBoxViewerButton';
import { ViewAreaButton } from './ViewAreaButton';
export  const AllItemsViewer = ({allSectionItems, openAllLocations, openSection, sectionItems, container, openLocation}) =>{




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


// create a temporary array for sorting and use
const sortedSectionItems = [...sectionItems]

// look up and understand this code
sortedSectionItems.sort((a, b) => (a.box_id.replaceAll('-','')).localeCompare(b.box_id.replaceAll('-','')))

console.log(sortedSectionItems)


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

// ISSUE MUST ABSOLUTELY BE WITH THIS CODE HERE ---

// FOUND PART OF THE PROBLEM. The objects are no longer in order when you add two items to a box, but before you add item 2, you've added other items to the allItemsArray. The items are ordered according to when you put them into the sections, and not necessarily in the order they are displayed in the all items view. So the code below is meeting two box id's that are not consecutive and therefore produces extra boxes.  Maybe the solution is to sort allItems array by box identification before saving to local storage. // or maybe you can even use a temporary array which can be a sorted version of section items and map THAT instead of section items.... that's it.  WOW. Done... see SORT METHOD ABOVE

sortedSectionItems.map(objects =>{ // map through all section objects
  console.log(objectBox)
  if(objects.box_id !== objectBox){ //if current box id isn't box name variable
    objectBox = objects.box_id // change box name variable to current box id
  
    // filter sortedSectionItems for only objects which have the same box id
  tempArray = [...sortedSectionItems.filter(objects => objects.box_id == objectBox)]
// console.log(tempArray)
  // console.log(tempArray) 
  // return a allItemsObject component with the array for processing
  return(
<AllItemsObject tempArray={tempArray}/>
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