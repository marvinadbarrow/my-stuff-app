
import { useEffect, useState } from 'react'
import{v4} from 'uuid'
import { BoxAll } from './BoxAll';

export  const AllItemsObject = ({boxObject, openBox}) =>{



let boxId = boxObject.id
let areaName = 'box'
let boxName = boxObject.box_name

console.log(`
boxId: ${boxId}
areaName: ${areaName}
boxName: ${boxName}


`)
// the above are the the parameters required to open a specific box and view its content.

// go to view items in their parent box when the element is clicked
function openClickedBox(general, specific, boxId){
    openBox(general, specific, boxId)
}

 return(
    <>

<div className="box-contents-div" onClick={()=>{
 // results element of a specific box is clickable to enable user to go directly to view inside the box as in normal user view.
openClickedBox(areaName, boxName, boxId)

}}>
    <p className="all-items-box-name"><b><u>{boxName}</u></b></p>
    <ul key={v4()}className="box-list">
      
    {boxObject.box_contents.map(object =>{

return(
  <BoxAll itemKey={object.id} itemName={object.itemString}/>
)
;       
    })}
    </ul>
    </div>
    </>
)


}









