import { useState } from 'react'
import { NewSection } from './NewSection'
import { NewSectionForm } from './NewSectionForm'
// going to put variables before functions in the destrucured parameters
export  const LocationViewer = ({areaSpecific, container, parentId, openSection, addSection, closeLocation,  deleteSection, openSearch}) =>{

     const [location, setLocation] = useState(areaSpecific)
    const [locationIndexSet, setLocationIndexSet]  = useState('')
    const [section, setSection] = useState('')


function viewSection(general, specific,  id){

    openSection(general, specific,  id)
    }
    // if it has a value, use parent index to get array containing sections. 

// create SECTION
function createSection (e) {
    e.preventDefault();
    if(section.length < 3) return // section name must have > 2 characters 

    container.map((object, index) =>{object.location_name === location &&
                addSection(section, location, index, container[index]) // if 'location matches location_name in array object, execute addSection()
    })

setSection('') // clear section name if addSection() is executed
}
// DELETE SECTION 
function sectionDeleteCall (id) {

    deleteSection(id)
}
// takes user back to locations shelf
function backToLocations () {
    closeLocation()
}

let sections;
console.log(parentId)
container.map((mainLocations, index) =>{
    if( mainLocations.id == parentId){  
        sections = container[index].location_contents
       } 
})

    return (
<>
<NewSectionForm setSection={setSection} createSection={createSection} backToLocations={backToLocations} location={location} section={section} openSearch={openSearch}/>

<ul className="items-list">
{sections.map((locationSections, index) =>{
    let contentsLength = locationSections.section_contents.length

        return(    
<NewSection id={locationSections.id} locationSectionName={locationSections.section_name}  sectionDeleteCall={sectionDeleteCall}  sections={sections} containerName={locationSections.container_name} contentsLength={contentsLength} viewSection={viewSection}/>
        )
           })
} 
</ul>
  
</> 

    )
}


