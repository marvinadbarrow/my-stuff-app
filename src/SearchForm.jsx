import { useEffect, useState } from 'react'
import './App.css'
import { BackToStartButton } from './BackToStartButton';
import { Form } from './Form';
import { ViewAreaButton } from './ViewAreaButton';
import { AdviceBlob } from './AdviceBlob';
export  const SearchForm = ({viewArea, closeSearch, searchCirteria, openAllLocations, container, parentId, sectionId, areaSpecific, preSearchArea, openLocation, openSection, boxDetails, openBox}) =>{
    const [search, setSearch] = useState('')
    const [searchLength, setSearchLength] = useState('')
let locationArea;
let sectionArea;
let boxArea; // currently don't need this variable


    container.map(objects =>{
    if(objects.id == parentId){
        console.log(objects)
        console.log(objects.location_name)
        locationArea = objects.location_name
    }if(sectionId){
objects.location_contents.map(content =>{
    if(content.id == sectionId){
   console.log(content)
   console.log(content.section_name)
   sectionArea = content.section_name
    }
})
    }
    })



let layerNumber;

if(preSearchArea == 'location'){
// note, presearcharea is only location if you came from location. 
    layerNumber = 1
}else if(preSearchArea == 'section'){
// note, presearcharea is only section if you came from section. 
    layerNumber = 2
}else if(preSearchArea == 'box'){ // presearch == 'box'
    layerNumber = 3
    // boxPath = 'defined';
}else{
    // do nothing because you haven't navigated to an area yet, so no buttons appear
}


function backToMainBox(currentpath, id){
    openBox(currentpath, id)      }

function backToMainLocation(general, specific, id){
    openLocation(general, specific, id)  
}

function backToMainSection(general, specific, id){
openSection(general, specific, id)  
}

 // if searchLength is too short then this variable will be assigned the string 'too short', otherwise it will be assigned the string 'long enough'.  The string can then be used to dictate whether or not the advice blob should display. 

function getResults(e){
    e.preventDefault();

        // 'switch' length of input string.  Only run search if string is two or more characters long when return or the 'search' button pressed - the item with the smallest item string length is 2 (TV for example) so I've made that the miminum search length;  
switch(search.length){
case 0:
case 1:
    // alert('please enter at least two characters');
  setSearchLength('too short')
  return
default:
    setSearch('')
    // convert the string to lower case because all objects that are searched have their item name string converted to lowercase first to avoid case issues when searching.
    searchCirteria(search.toLowerCase())
    setSearchLength('')

}
        }

// when the form is clicked into, set search length back to default and this will cause the blob that obscures part of the input, to disappear
const formClicked = (label) =>{
    setSearchLength('')
}

        

    // go back to start page
const backToStartPage = () =>{
    closeSearch('start page')
    }

        // go back to main locations view
function viewLocations(){
openAllLocations('main')
}

    return(
    <>
<div className="inner-location">
{ layerNumber > 0 &&
        <ViewAreaButton className={"close-location back-btn"} generalArea={'location'} areaName={locationArea} buttonText={locationArea} openArea={backToMainLocation}  id={parentId}/>}

{ layerNumber > 1 &&
        <ViewAreaButton className={"close-location back-btn"} generalArea={'section'} areaName={sectionArea} buttonText={sectionArea} openArea={backToMainSection}  id={sectionId}/>}

{ layerNumber > 2 &&
    <ViewAreaButton className={"close-location back-btn"} generalArea={'box'} areaName={areaSpecific} buttonText={areaSpecific} openArea={backToMainBox} id={boxDetails.boxId} boxPath={boxDetails}/>
}

</div>

<div className="inner-location">
<button className="close-location" onClick={viewLocations}>All Locations</button>
<BackToStartButton functionName={backToStartPage} />
</div>


 <div className='advice-div-container'>
{searchLength == 'too short' && 
<>
<div className="advice-div">
<AdviceBlob />
</div>
</>
}
</div>         
<Form  createFunction={getResults} placeholder={'Search Item'} label={'Search for an item'} value={search} newValue={''} setFunction={setSearch} buttonName={'Search'} formClicked={formClicked}/>



   </>
    )
    
    }
/*
 id={locationId}

 openArea={backToMainLocation}

<form className='new-item-form' id="item-creation-form" onSubmit={getResults}>
<label htmlFor="new-item-text">Search for an item</label>
<input value={search} id='new-item-text' type="text" placeholder='Search Item' 
onChange={e => setSearch(e.target.value)}
/>
<button type="submit" className="add-item">search</button>
</form>

A NOTE ON DISPLAYING BACK BUTTONS. 
return to box button only appears if the boxPath variable is defined, and that happens when an object is created and sent as a parameter (maybe)

PreSearchArea: main
Since all locations button exists already, if preSearchArea is 'main' then there is no need to show 'any' of the buttons, because you didn't come from any of the inner areas; i.e. location, section or box. 

PreSearchArea: start page
The above also applies if the PresearchArea is 'start page' 

PreSearchArea: location
Then only the returnt o location button is needed. 

PreSearchArea: section
Return to section and return to location buttons needed 


PreSearchArea: box
Return to section and return to location buttons needed, AND, return to box will appear because the 'boxPath' variable should be defined (as an object)

maybe you can create a variable that takes a number, from 0 to 3, indicating the number of buttons required.  
So '0' is zero buttons, but then you can use other values of the number to decide which buttons to display - for example, below: 

number > 0 Show location button

number > 1 show section button

number > 2 show box button 

the above conditions can be used in shortcutting... 
if number = 3 all buttons appear
if number = 2 section and location buttons appear
if number = 1 location button appears
if number = 0 no button appears. 



WORK WITH PRE-SEARCH AREA - DONE!

FIND OUT WHAT NEEDS TO BE ADJUSTED SO THAT SEARCH PAGE SHOWS IF YOU WERE NOT IN A PREVIOUS AREA - DONE!

MOVE BUTTONS UP ONE LEVEL SO THAT THERE'S ENOUGH SPACE TO DISPLAY ALL 5 BUTTONS WHEN YOU'VE MOVED TO 'SEARCH' FROM A BOX - DONE!

*/



/*

NEXT THINGS TO WORK ON --------------------
WORK ON NAVIGATION FROM BOX AREA

*/