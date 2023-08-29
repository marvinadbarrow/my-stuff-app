import containerImage from './images/container.png'
import { useState } from 'react'
import { DeleteButton } from './DeleteButton'
import { ViewAreaButton } from './ViewAreaButton'
// inside the parameter brackets is the property 
export  const NewSection = ({ id, locationSectionName,  sections, containerName,  sectionDeleteCall, contentsLength, viewSection}) =>{
    // the contentsLength prop is used to decide if the delete button displays or not. If zero, no contents exist so show delete button, otherwise don't show.

    const [checkedStatus, setCheckedStatus] = useState('')
    

 let boxes;
 // if contents contain nothing, use 'create boxes' on button for viewing section contents
contentsLength === 0 ? boxes = 'Add boxes': boxes = 'Open';

function deleteThisSection (id){
    console.log('delete this section')
sectionDeleteCall(id)
setCheckedStatus('') // return the checked status to unchecked since the checkboxes, which was checked, has been deleted
}

    return (
<>
{sections.length === 0 && <p className='section-info'><em>No Sections exist</em></p>}

{ <li key={id} className='section-item'><div className="section-div"><p className='section-info'>{locationSectionName}</p>

<ViewAreaButton className={"open-section"} openArea={viewSection} areaName={locationSectionName} id={id} buttonText={boxes} generalArea={'section'}/> 

{contentsLength === 0 &&  
<DeleteButton className={"danger-delete-section"}  name={locationSectionName}  deleteFunction={deleteThisSection} id={id}/>
}
</div></li>
}
</>
    )
}

/*
    
 */


