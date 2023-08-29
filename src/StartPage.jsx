import { useEffect, useState } from 'react'
import './App.css'
import{v4} from 'uuid'
import { SearchForm } from './SearchForm'
const [search, setSearch] = ('')

export  const StartPage = ({viewArea, openSearch, openAllLocations}) =>{

 const   openUserGuide = () =>{

    console.log('Video userguide')
 }

    return(
    <>



{  // show search button and view locations button  if viewrea string is 'start page'
viewArea == "start page" && 
<>
<div className='start-page-btns-div'>
<button className="start-page-btns" onClick={() =>{openSearch("search page");
}}>Search Items </button> 

<button className="start-page-btns" onClick={() =>{openAllLocations('main');
}}>View/edit locations </button>

<button className="start-page-btns" onClick={() =>{openUserGuide('main');
}}>Video userguide</button>
</div>

</>


}




    </>
    )
    
    }
    