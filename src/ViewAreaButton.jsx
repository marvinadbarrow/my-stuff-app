



export const ViewAreaButton = ({className, buttonText, openArea, id, areaName, generalArea}) =>{


    return(
        <>

<button className={className} onClick={() =>{
    openArea(generalArea, areaName, id)}}>{buttonText}</button>   
        </>
        
            )
}

/*
boxPath !== undefined

*/