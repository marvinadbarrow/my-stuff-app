
import './App.css'


export  const SearchResults = ({searchResults, container, openBox}) =>{


  function openResultArea(loc, sec, boxname, id, item, secId, locId){
 
// send parent, section and box id for setting with useState so there is a path to the box contents; and 'box', box name to set general area and specific area for the normal part that uses the then uses the path to open the box
  openBox('box', boxname, id, item, secId, locId)
  }
           
console.log(searchResults)
    return(
    <>


<div className="results-list">

{searchResults.length > 0 && <>

{searchResults.map(result =>{

let locationName;
let sectionName;
let boxName;
let idOfBox;

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
              idOfBox = boxes.id
              }
          })
        }
      })
  
  
    }
  })

    return(

        <>
<div className="results-div" resultBoxId={idOfBox} onClick={()=>{openResultArea(locationName, sectionName, boxName, idOfBox, result.item_name, result.section_id, result.location_id )}}>
   <p className="results-item-name"><em>{result.item_name}</em></p>
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