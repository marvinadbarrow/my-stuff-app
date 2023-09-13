
import { NewLocation } from './NewLocation'
export function LocationShelf ({container, openLocation, deleteLocation}) {
// container is the current array with all location objects
// request delete is the function that takes the parameters innerContainer.location_name, innerContainer.id and innerContainer.location_contents, to display the location contents and location name, but which uses the id to identify which array object to filter out of the array so it will not be re-rendered. 

    return (
<>

{// if no locations have been created show the 'no existing locations' message
container.length === 0 && "No Existing Locations"}

{container.map((innerContainer, index) =>{

return (
// do the mapping from outside of the component, and send the details needed to construct a component as props
  <NewLocation  key={innerContainer.id} location_name={innerContainer.location_name} id={innerContainer.id} location_contents={innerContainer.location_contents}  openLocation={openLocation} index={index} deleteLocation={deleteLocation}/>
  
)

})}

 

  </>
    )
}

