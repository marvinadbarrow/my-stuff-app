import containerImage from './images/container.png'
import { useState } from 'react'
// inside the parameter brackets is the property 
export  const BoxViewer = ({addBoxItem, closeBox, viewArea, container, deleteBoxItem, areaSpecific, parentIndex, boxParentIndex, boxIndex}) =>{

console.log(boxIndex)
let containerType = viewArea;
let allLocations = container;
let boxName = areaSpecific;
let primaryLocationIndex = parentIndex;
let sectionIndex = boxParentIndex;
let indexOfBox = boxIndex;

console.log(`
containerType:  ${containerType}
allLocations:  ${allLocations}
boxName:  ${boxName}
primaryLocationIndex:  ${primaryLocationIndex}
sectionIndex:  ${sectionIndex}
indexOfBox:  ${indexOfBox}
`)

let mainLocation = container[primaryLocationIndex]
let mainLocationSections = container[primaryLocationIndex].location_contents
let sectionBoxes = container[primaryLocationIndex].location_contents[sectionIndex].section_contents

// console.log(mainLocation) // wardrobe etc   
// console.log(mainLocationSections) // drawers
// console.log(sectionBoxes) // shows all boxes in the section, current and siblings

sectionBoxes.map(box =>{
    box.box_index ? indexOfBox = box.box_index: console.log('no index');
    // console.log(box.box_name)
    // console.log(box.box_contents)
    // console.log(indexOfBox)
})

// NOTE* closeLocation, viewArea and addItem are all functions passed as props to the locationViewer element in the main app. 
const [location, setLocation] = useState(areaSpecific) 
    const [itemString, setItem] = useState('')


// map for extracting parent object where the items are contained
let itemizer;
let locationIndex;

if(parentIndex >=0 && boxParentIndex >=0){
    itemizer = container[parentIndex].location_contents[boxParentIndex].section_contents
    // example container[wardrobe].location_contents[Top Shelf].section_contents
}else{
    {container.map((locationContainer, index) =>{
 
        if (locationContainer.location_name == location){
            itemizer = locationContainer.location_contents;
            locationIndex = index;
        }
    })}

}




    
// create a new list item
// this needs to be replaced by createSection.... and will have to be reposition inside of boxed and unboxed after you click into a box from inside a section. 


    function createBoxItem (e) {
            e.preventDefault();
// only create names if  three or more characters are inputted
            if(itemString.length < 3) return
            let boxContents = sectionBoxes[indexOfBox].box_contents;

                addBoxItem(itemString, boxName, indexOfBox, sectionIndex, primaryLocationIndex, boxContents)
            setItem('') // clear input after request sent
      }
      
// takes user back to locations shelf
function backToBoxViewer () {
    let boxParent = sectionBoxes[indexOfBox].section_name;
    closeBox(boxParent)
}





// takes user back to locations shelf
function boxItemDeleteCall (itemId, location) {
    console.log(itemId, location, locationIndex, container)
    deleteBoxItem(itemId, locationIndex)
}

    return (
<>
<div className="inner-location">
    <p className="location-name">{location}</p>
    <button className="close-location" onClick={backToBoxViewer}>Return to box</button>
    </div>

{

    // inside here should be SECTION VIEW because this is inside an individual location so all of the below needs to go inside the 'BOX' viewer so here is where you add new 'sections'. 
}
  <form className='new-item-form' id="item-creation-form" onSubmit={createBoxItem}>
            <label htmlFor="new-item-text">New box item</label>
          <input value={itemString} id='new-item-text' type="text" placeholder='Add box Item' 
          onChange={e => setItem(e.target.value)}
            />
    
    <button type="submit" className="add-item"

    >Add</button>
    </form>
    <h4 className="sections-title">{location}</h4>
<ul className="items-list">

{sectionBoxes[indexOfBox].box_contents.map((item, index) =>{

console.log(item.section_name)
 return   <>
<li className="item-name" key={item.id}><div className="box-item-div">
    <p className="item-para"><span className='item-position'>{index}. </span>{item.itemString}
    </p><button className="box-item-delete">Delete</button></div>
    </li>

{/* <li key={item.id} className="list_item"><div className="item-div"><p className="list-para">{item.item_name}</p><button className="delete" onClick={() =>{itemDeleteCall(item.id, itemizer)}}>Delete</button></div></li> */}

</>

})

 }
</ul>


  
</>

    )
}
