
import { useEffect, useState } from 'react'
import{v4} from 'uuid'
import { BoxAll } from './BoxAll';

export  const AllItemsObject = ({tempArray}) =>{



let boxName = tempArray[0].item_object.parent_Box;
let boxId = tempArray[0].box_id
let areaName = 'box'


// the below code creates the boxPath object so that the box can be opened from this


console.log(`
areaName: ${areaName}
boxName: ${boxName}
boxId: ${boxId}
`)
// the above should be the parameters required to open a specific box and view its content. 
return(
    <>
{

  // here I'm going to try to make the box clicable, and enable user to go directly to view items in the clicked box. It should be a simple case of activating the viewBox function with the require parameters. Happ
}
<div className="box-contents-div">
    <p className="box-name"><b><u>{boxName}</u></b></p>
    <ul key={v4()}className="box-list">
      
    {tempArray.map(object =>{


      // console.log(object)
return(
  <BoxAll itemKey={object.item_id} itemName={object.item_name}/>
)


      
    })}
    </ul>
    </div>
    </>
)


}