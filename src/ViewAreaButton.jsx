



export const ViewAreaButton = ({className, buttonText, openArea, id, areaName, generalArea, boxPath}) =>{


// console.log(generalArea, areaName, id, openArea, boxPath)
// console.log(typeof boxPath)

    // function for opening boxes differs from location/section opener so an alternative button is used with the unique function. 
    return(
        <>
{boxPath !== undefined  &&
    <button className={className} onClick={() =>{
        console.log('opening box...')
        // no need for the id parameter since the boxPath.boxId property holds the id of the box, and that is extracted inside the openBox function.
        openArea(boxPath, id)}}>{buttonText}</button>  
}

{boxPath == undefined &&
<button className={className} onClick={() =>{
    console.log('opening section or location...')
    
    openArea(generalArea, areaName, id)}}>{buttonText}</button>}    
        </>
        
            )
}

/*
boxPath !== undefined

*/