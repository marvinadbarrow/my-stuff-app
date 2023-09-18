import { useEffect, useState } from 'react'
import './App.css'
import{v4} from 'uuid'
import { SearchForm } from './SearchForm'
const [search, setSearch] = ('')

export  const StartPage = ({viewArea, openSearch, openAllLocations, fixLocationId, openUserGuide}) =>{


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

<button className="start-page-btns" onClick={() =>{openUserGuide('user guide');

// fixLocationId()
}}>Video userguide</button>
</div>

</>


}




    </>
    )
    
    }
    

