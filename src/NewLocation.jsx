import containerImage from './images/container.png'
import { DeleteButton } from './DeleteButton';
import { ViewAreaButton } from './ViewAreaButton';
export function NewLocation ({location_name, id, location_contents, openLocation, deleteLocation}){
 


 let sectionsTotal;
  location_contents.length < 1 ? sectionsTotal = 'No sections': sectionsTotal =  'sections: ' + location_contents.length;

  let advice;
  location_contents.length < 1 ? advice = 'Add Section': advice ='View';
  

    return (
        <div className="location" >
<p className="location-name">{location_name}</p>
  

  
  <ViewAreaButton className={"view-contents"} openArea={openLocation} id={id} areaName={location_name} buttonText={advice} generalArea={'location'}/>
<p className="items-number-para">{sectionsTotal}</p>

{location_contents.length === 0 && // show delete button
<DeleteButton className={'danger-delete'} name={location_name} deleteFunction={deleteLocation} id={id}/> 
}
</div>
    )
}

/*
  <img src={containerImage} alt="cabinet image" className="container-img"/>
*/