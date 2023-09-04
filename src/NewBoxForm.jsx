import { useEffect, useState } from 'react'
import { SearchButton } from './SearchButton';
import { AllLocationsButton } from './AllLocationsButton';
import { BackToSectionViewerButton } from './BackToSectionViewerButton'
import { Form } from './Form';
import { ViewAllItemsButton } from './ViewAllItemsButton';


export  const NewBoxForm = ({boxLocation,  createBox, testCloseSection, container, parentId, addBox, sectionId, openAllLocations, allItemsArray, allSectionItems, openSearch, sectionLocation}) =>{
    const [box, setBox] = useState('')
    // create BOX

    function createBox (e) {

      e.preventDefault();
      console.log('creating a new box...')
if(box.length < 3) return // box name must has 3 or more characters
        addBox(box, boxLocation, parentId) // new box name, id of the section to contain the box and name of that section
  
  setBox('')
  }   

  // the below variables are created to allow the user to navigate from the current box to the parent section (in addition to navigation to all-locations view)
  let indexOfLocation; 
let nameOfLocation;
  container.map((locations, locationIndex) =>{ 
    if(locations.id == parentId){
      indexOfLocation = locationIndex;
      nameOfLocation = locations.location_name
   }
    })

console.log(allItemsArray)

  // filter all items array for only objects that contain the section id, i.e. items belonging to the current section, and sort the returned array by box id, so that box items are grouped together.  
const sortedSectionItems = allItemsArray.filter(objects => 
  objects.section_id == sectionId).sort((a, b) => (a.box_id.replaceAll('-','')).localeCompare(b.box_id.replaceAll('-','')))

console.log(sortedSectionItems)

function viewAllItems (){
  // send sectionOnlyItems be rendered in APP.jsx where viewArea will be set to page for displaying items and useState will save the array object which will be sent as a prop to the display page. 
allSectionItems(sortedSectionItems)
}

  function backToLocations(){
openAllLocations('main')
  }

return(
<>
<SearchButton   openSearch={openSearch} generalArea={'section'} location={boxLocation}/>
<div className="inner-location">
<AllLocationsButton backToLocations={backToLocations}/>
<BackToSectionViewerButton testCloseSection={testCloseSection} nameOfLocation={nameOfLocation} sectionLocation={sectionLocation}/>
  </div>
<Form createFunction={createBox} placeholder={'Add a New Box'} value={box} newValue={boxLocation} setFunction={setBox} buttonName={'Add'}/>
{ // view all items in section button will only display if the section contains at least one box, which itself must contain items. 

sortedSectionItems.length > 0 &&
<ViewAllItemsButton viewAllItems={viewAllItems} boxLocation={boxLocation}/>
}

</>
)


}

