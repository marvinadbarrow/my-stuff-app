import { AllLocationsButton } from "./AllLocationsButton"
import { SearchButton } from "./SearchButton"
import { BackToStartButton } from "./BackToStartButton"
import { VideoShelf } from "./VideoShelf"

export const VideoUserGuide = ({returnToStart, openSearch, openAllLocations}) =>{

function backToStart(){
    // on main app page, the function returnToStart takes the 'start page' parameter and executes setViewArea to 'start page' allowing main page to open up
    returnToStart('start page')
}

function backToLocations(){
    openAllLocations('main') 
}



    return(


        <>

        <div className="inner-location">
<button className="close-location" onClick={backToLocations}>All Locations</button>
<BackToStartButton functionName={backToStart}/>
        </div>
        <SearchButton generalArea={'search page'} openSearch={openSearch}/>
        <div className="video-holder">
<VideoShelf/>

        </div>
        </>
    )
}