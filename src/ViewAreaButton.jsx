



export const ViewAreaButton = ({className, buttonText, openArea, id, areaName, generalArea}) =>{

    // console.log(className, buttonText, openArea, id, areaName, generalArea)
  
    // buttonText == 'Cancel Transfer'?
    // console.log(`
    // id: ${id}
    // areaName: ${areaName}
    // generalArea: ${generalArea}
    // buttonText: ${buttonText}
    // className: ${className}
    // OpenArea Function: ${openArea}
    //  `): console.log('nothng to do')

     

    return(
        <>
{

<button className={className} onClick={() =>{

    openArea(generalArea, areaName, id)}


}>{buttonText}</button> 


}
  
        </>
        
            )
}

/*
boxPath !== undefined

*/