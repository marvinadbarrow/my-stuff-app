
export const OptionSelect = ({chooseLabel, selectID, infoLevel1, areaName, infoSetter, infoSetter2, infoSetter3, container, infoLevel2, infoLevel3, boxDetails}) =>{


    const setInfo = (infoObject) =>{
        infoSetter(infoObject)
    }

    const setInfo2 = (infoObject) =>{
        infoSetter2(infoObject)
    }

    const setInfo3 = (infoObject) =>{
        infoSetter3(infoObject)
    }

console.log(chooseLabel, selectID, infoLevel1, areaName)
if(areaName == 'location'){




    return(
        <>
<div className="options-container" >
            <label htmlFor="location-select" >Choose a location:</label><br/>
            <select id="location-select"   onChange={(e) =>{

                
                container.map((location, indexOfLocation) =>{
                    if(location.id == e.target.value){
                        // console.log(e.target.value)
       //if location id is equal to selected option set destination location information

       let newObject = {
        "location_index": indexOfLocation,
        "location_id": e.target.value,
        "location_name": location.location_name
       }
    setInfo(newObject)
                    }
                })


}}>
                {// map through location names and render each as an option
container.map((location) =>{
return (
    <>
    <option value={location.id}>{location.location_name}</option>
    </>
)
})
   }

   { // if no selection has been made, display the word 'select' to hint next step to user
   !infoLevel1.hasOwnProperty('location_index') &&
   <option value="" className="default-option"  selected="selected">select</option>
   }

            </select>
</div>


        </>
    )

}
else if(areaName == 'section'){

    return(
        <>
<div className="options-container" >
<label htmlFor="section-select">Choose a section:</label><br/>

<select id="section-select" onChange={(e) =>{
    container[infoLevel1.location_index].location_contents.map((section, indexOfSection) =>{
        if(section.id == e.target.value){
// if section id is equal to selected option set destination section information
let newObject = {
    "section_index": indexOfSection,
    "section_id": e.target.value,
    "section_name": section.section_name
   }
setInfo2(newObject)
                    }
                })


}}>

{
!infoLevel1.location_index ? console.log('no section info'): 
container[infoLevel1.location_index].location_contents.map(sections =>{
  return (
    <option value={sections.id} >{sections.section_name}</option>
  )
})
}
   { // if no selection has been made, display the word 'select' to hint next step to user
   !infoLevel2.hasOwnProperty('section_index') &&
   <option value="" className="default-option"  selected="selected">select</option>
   }
</select>
</div>

        </>
    )

}
else{ // then areaName must be box

    return(
        <>

<div className="options-container" >
    <label htmlFor="box-select">Choose a box:</label><br/>
    <select id="box-select"  onChange={(e) =>{
    container[infoLevel1.location_index].location_contents[infoLevel2.section_index].section_contents.map((boxes, indexOfBox) =>{
        if(boxes.id == e.target.value){



// if box id is equal to selected option set destination box information
let newObject = {
    "box_index": indexOfBox,
    "box_id": e.target.value,
    "box_name": boxes.box_name
   }
setInfo3(newObject)
                        // destinationBox = `Box: ${boxes.box_name}`
                    }
                })
}}>

        {
!infoLevel2.section_index ? console.log('no section info'): 
container[infoLevel1.location_index].location_contents[infoLevel2.section_index].section_contents.map(boxes =>{
  return (
    <option value={boxes.id} >{boxes.box_name}</option>
  )
})
        }
           { // if no selection has been made, display the word 'select' to hint next step to user
   !infoSetter3.hasOwnProperty('box_index') &&
   <option value="" className="default-option"  selected="selected">select</option>
   }
    </select>
</div>
        </>
    )


}
}