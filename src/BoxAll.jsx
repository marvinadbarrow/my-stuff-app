import { useEffect, useState } from 'react'
export function BoxAll({itemKey, itemName}) {


    // console.log({item_key:itemKey, item_name:itemName})
  



    return (
        <>
        <li key={itemKey} className="item-name">{itemName}</li>
            </>
        
        )

}


