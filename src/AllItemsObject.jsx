
import { useEffect, useState } from 'react'
import{v4} from 'uuid'
import { BoxAll } from './BoxAll';

export  const AllItemsObject = ({tempArray, openBox}) =>{



let locationId = tempArray[0].location_id;
let sectionId = tempArray[0].section_id;
let boxId = tempArray[0].box_id
let areaName = 'box'
let boxName = tempArray[0].item_object.parent_Box;
// the above are the the parameters required to open a specific box and view its content.

// go to view items in their parent box when the element is clicked
function openClickedBox(general, specific, boxId, itemName, sectionId, parentId){
    openBox(general, specific, boxId, itemName, sectionId, parentId)
}

 return(
    <>

<div className="box-contents-div" onClick={()=>{
 //  div listing items contained in the associated box made clickable to enable user to go directly to view (and edit if desiered) items inside the box.
openClickedBox(areaName, boxName, boxId, 'no name', sectionId, locationId)

}}>
    <p className="box-name"><b><u>{boxName}</u></b></p>
    <ul key={v4()}className="box-list">
      
    {tempArray.map(object =>{


      // console.log(object)
return(
  <BoxAll itemKey={object.item_id} itemName={object.item_name}/>
)
;       
    })}
    </ul>
    </div>
    </>
)


}









