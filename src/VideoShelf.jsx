
import { useState } from 'react'
import containerImage from './images/container.png'
import transferBox from '../transferbox.png'
import transferItem from '../transferitem.png'



// note, had quite an issue importing the transferBox image into this component.  Kept on getting a message saying that the file was not recognized and asking if the file exists.  It was in the images folder; although the container image, also in the folder did not have the same issue.  I've moved it to the main folder and navigated to that folder and the issue has resolved.  


export const VideoShelf = ({}) =>{

    return(
        <>
        <div className="video-container-div">
            
            <img src={transferBox} alt="" className="vid-thumbnail" />
            <p className="user-guide-para">Transfer a box</p>
        </div>

        <div className="video-container-div">
            
            <img src={transferItem} alt="" className="vid-thumbnail" />
            <p className="user-guide-para">Transfer an item</p>
        </div>


        </>
    )
}