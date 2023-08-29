import { useState } from 'react'
import { SearchButton } from './SearchButton'
import { AllLocationsButton } from './AllLocationsButton'
import { BackToSectionViewerButton } from './BackToSectionViewerButton'
import { BackToBoxViewerButton } from './BackToBoxViewerButton'
import { Form } from './Form'
// inside the parameter brackets is the property 
export  const NewItemForm = ({createBoxItem, backToBoxViewer, location, parentId, sectionId, container, openAllLocations, openLocation,  numberOfItems, openSearch,  testCloseSection}) =>{
    const [item, setItem] = useState('')

function createItem (e){
  e.preventDefault();
createBoxItem(item)
setItem('') // clear input after request sent
}



let nameOfSection; 
let nameOfLocation;
  container.map((locations) =>{ 
    if(locations.id == parentId){
      nameOfLocation = locations.location_name
      locations.location_contents.map((sections) =>{
        if(sections.id == sectionId){
          nameOfSection = sections.section_name

          }
      })
   }
    })

// go back to all locations
function backToLocations(){
  openAllLocations('main')
}

return(
<>

<SearchButton   openSearch={openSearch} generalArea={'box'} location={location}/>

<div className="inner-location">            
<AllLocationsButton backToLocations={backToLocations}/>
<BackToSectionViewerButton  testCloseSection={testCloseSection} nameOfLocation={nameOfLocation}/>
<BackToBoxViewerButton backToBoxViewer={backToBoxViewer} nameOfSection={nameOfSection}/>    
</div>
<Form placeholder={'Add Item'} createFunction={createItem} label={'New item'} value={item} newValue={location} setFunction={setItem}  buttonName={'Add'}/>
{numberOfItems < 1 && 'no items in this box'}
 
</>
)
}

