
import { useEffect, useState } from 'react'
import{v4} from 'uuid'
import { BoxAll } from './BoxAll';

export  const AllItemsObject = ({tempArray}) =>{

// console.log(tempArray)

let boxName = tempArray[0].item_object.parent_Box;
return(
    <>

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