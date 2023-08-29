import { useEffect, useState } from 'react'
import './App.css'


export  const SearchResults = ({searchResults, container}) =>{
console.log(searchResults)
           

    return(
    <>


<div className="results-list">

{searchResults.length > 0 && <>

{searchResults.map(result =>{

let locationName;
let sectionName;
let boxName;


container.map((locations) =>{
    if(locations.id == result.location_id){
      locationName = locations.location_name;
  
      // map the location
      locations.location_contents.map((sections) =>{
             if(sections.id == result.section_id){
    
        // map the section      
          sectionName = sections.section_name;
          sections.section_contents.map((boxes) =>{
                  // map the box 
            if(boxes.id == result.box_id){
              boxName = boxes.box_name;
              }
          })
        }
      })
  
      
    }
  })

    return(

        <>


<div className="results-div">
   <p className="results-para"><em>{result.item_name}</em></p>
   <p className="results-para">Location: {locationName}</p>
   <p className="results-para">Section: {sectionName}</p>
   <p className="results-para">Box: {boxName}</p>
   </div>

        
        
        </>
    )
})}

</>


}

</div>

    </>
    )
    
    }