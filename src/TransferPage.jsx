import { useState } from "react";
import { ViewAreaButton } from "./ViewAreaButton";
import { v4 } from "uuid";
import { produce } from "immer";
export const TransferPage = ({boxDetails, container, allItemsArray, openBox, openSection, sectionItems, transferBoxAccept, addBoxItem, deleteBoxItem}) =>{

const [selectedLocationInfo, setSelectedLocationInfo] = useState({})
const [selectedSectionInfo, setSelectedSectionInfo] = useState({})
const [selectedBoxInfo, setSelectedBoxInfo] = useState({})
const [locationIndex, setLocationIndex] = useState('')
const [transferApplied, setTransferApplied] = useState('')
const [newDestination, setNewDestination] = useState({})

console.log(boxDetails)
console.log(container)

let objectType;
let locationName;
let sectionName;
let boxName;
let itemName;
let areaName;
let generalArea;
let backButtonText;
let destinationButtonText;
let destinationAreaGeneral;
let destinationAreaSpecific;
let destinationId
let originId
let destinationBox;


// Only the item ID is needed in order to search allItemsArray, the useState values, which are the location, section and box ids will replace the current item object properties. 

// if box details  item string property then an item is to be transferred
if(boxDetails.hasOwnProperty('new_item_string')){
 locationName = boxDetails.location_name
 sectionName = boxDetails.section_name
 boxName = boxDetails.box_name
itemName = boxDetails.new_item_string
objectType = 'Item'; 
generalArea = 'box'; 
areaName = boxName;
originId = boxDetails.box_id
destinationBox = 'Box:' // updated at time of menu select

}else{ // if box details has no item string property then it must be empty of properties, which means sectionItems contains properties so a box is being transferred
    locationName = sectionItems.location_name
    sectionName = sectionItems.parent_section_name
    itemName = sectionItems.box_name 
    objectType = 'box'; 
    generalArea = 'section'; // variable
    areaName = sectionItems.parent_section_name
    originId = sectionItems.section_id 
    destinationBox = ''

}



// the origin will either be box or section - those details are in the box above the button. 
backButtonText = ` Go to ${objectType} Origin`
destinationButtonText = ` Go to ${objectType} Destination`



// if an item is being transferred get the id from selectedBoxInfo state and set it as the destination id.
if(selectedBoxInfo.box_name){
destinationAreaGeneral = 'box';
destinationAreaSpecific = selectedBoxInfo.box_name
destinationId = selectedBoxInfo.box_id
}else if(selectedSectionInfo.section_name){
    destinationAreaGeneral = 'section';
    destinationAreaSpecific = selectedSectionInfo.section_name
    destinationId = selectedSectionInfo.section_id    
}



function processTransferItem(boxInfo){
    // only process transfer item if box details has properties 
    if(boxDetails.hasOwnProperty('new_item_string')){
        let itemNamestring = boxInfo.new_item_string
        let itemID  //you need the item id for deletion
        boxInfo.box_contents.map(boxObject =>{
            if(boxObject.itemString == itemNamestring){
                itemID = boxObject.id
            }
        
        })
        
        let destLocationIndex = selectedLocationInfo.location_index
        let destSectionIndex = selectedSectionInfo.section_index
        let destBoxIndex = selectedBoxInfo.box_index
        console.log(`
        location index: ${destLocationIndex}
        section index: ${destSectionIndex}
        box index: ${destBoxIndex}
        `)
        
        let contentsOfOldBox = container[boxDetails.location_index].location_contents[boxDetails.section_index].section_contents[boxDetails.box_index].box_contents
        
        
        let contentsOfNewBox = container[destLocationIndex].location_contents[destSectionIndex].section_contents[destBoxIndex].box_contents
        

        let newBoxInfo ={
            'all_Locations':container,
            'location_id':selectedLocationInfo.location_id,
            'section_id':selectedSectionInfo.section_id,
            'box_id':selectedBoxInfo.box_id,
            'box_name':selectedBoxInfo.box_name,
            'box_contents': contentsOfNewBox 
        }

                // just realized that newBoxInfo.box_contents is incorrect, it's supposed to be the 'content of the NEW BOX' which you probably need all the indexes for from location down to 
        console.log(contentsOfOldBox)
        console.log(contentsOfNewBox) // new box information
        



        console.log(boxInfo) // original box information
        console.log(`
        item string: ${itemNamestring}
        item ID: ${itemID}
        `)
        
        // INVESTIGATE THIS ISSUE - by swapping these two function calls around i.e. deleting the box item first, and then adding a box item to the new location, the item gets deleted from allItemsArray, but does not get deleted from the box at location, and although it initially gets altered in the container and state is set, the container seems to revert back to the old, unedited one.  I don't know why this is occuring but will have a think about it. 





        // addBoxItem (newBoxInfo, itemNamestring)
        // // note that the parameters are reversed for addBoxItem and deleteBoxItem
        // deleteBoxItem(itemID, boxInfo, itemNamestring)
        
        // note, an entirely new boxDetails needs to be created
        
        
        



        



    }


// got it; you actually need a new box content because this is the old one
// parameters needed
// got it; you actually need a new box content because this is the old one
// parameters needed
/* 
boxPath.location_id
boxPath.section_id
boxPath.box_id
boxPath.box_name
boxPath.box_contents (array boxes in new section)

*/
}

function backToOrigin(general, specific, id){

    if(boxDetails.hasOwnProperty('new_item_string')){ // if box details exist
        // note that, since user will be navigating to a different box than the original, if the destination box is in a different section, then the sectionId in state will not be not be a valid parameter for navigating to the new box; (trivially, if the location has changed, then the section  will have also changed, and both parameters will be incorrect).  The destination parentId and sectionId are generated in the map functions used for generating destination details when menu items are selected. 


        console.log(boxDetails.box_contents)
        console.log(`
        id: ${id}
        areaName: ${specific}
        generalArea: ${general}
         `)
    
// if the transfer object is an item, then section id and location id are not needed because they are already set. 
openBox(general, specific, id, boxDetails )    

       }else{ 
        
        
        console.log(sectionItems)
        
        
        
        // no properties in box details - an entire box is being transferred
openSection(general, specific, id)


       }    
    }


function goToDestination(general, specific, id){
    if(boxDetails !== undefined){
        let itemName = '' // parameter not needed
        let sectionId = selectedSectionInfo.section_id;
        let parentId = selectedLocationInfo.location_id;
        openBox(general, specific, id, itemName, sectionId, parentId) 
        }
}

// EDIT BOX TRANSFER ITEMS
function processBoxItems(originBoxId, originSectionId, originalLocationId, destinationSection, destinationLocation ){



    // check total item numbers differ by the amount of box items (latter should be less)

    console.log(sectionItems)
console.log(`
originBoxId: ${originBoxId}
originSectionId: ${originSectionId}
originalLocationId: ${originalLocationId}
destinationLocation: ${destinationLocation.location_id}
destinationSection: ${destinationSection.section_id}
`)

// first we need to create a list of all items in the box along with their id's (for deletion), so begin by getting the box items
let itemsForDelete = sectionItems.box_contents

itemsForDelete.map(items =>{
    console.log(items.id)
})

// transferBoxAccept(finalArrayEdit)
}






// EXECUTE TRANSFER
function attemptTransfer(confirm){
console.log('transfer attempt')

    // conditions for accepting transfer
if(boxDetails !== ''){ // if box details is not just an empty string

// if a box is selected in options menu
    if(selectedBoxInfo.box_name){ // accept transfer
setTransferApplied(confirm)
    } // otherwise alert user that all categories must be selected
    else{alert('please select location, section AND box before attempting tranfer')}
}
 // OTHERWISE: 
 else if(sectionItems !== undefined){ // if section details exist 
    if(selectedSectionInfo.section_name){ // and section menu has been selected
   
        setTransferApplied(confirm) // then accept transfer
processBoxItems(sectionItems.id, sectionItems.section_id, sectionItems.parent_container_id, selectedSectionInfo, selectedLocationInfo)
// otherwise alert user that both location and section options must be selected
    }else{alert('please select location AND section before attempting tranfer')}

    
        } // OTHERWISE no section is selected yet so
        

}

    return (
        <>

        <div className="tranfer-object-info-div">
            <p className="tranfer-info-para">Transferring {objectType}: <b>"{itemName}"</b></p>
        </div>
        <div className="transfer-elements-container">
        {
    // DISPLAY ORIGIN
}
            <div className="element-div-transfer-origin medium-border">
            <p className="results-para heading-clr-origin text-shadow-heading"><em>{'ORIGIN'}</em></p>
            <p className="results-para">Location:<br/> {locationName}</p>
   <p className="results-para">Section:<br/> {sectionName}</p>

   {
// if section items property exists, desplay element to list all items in a box transfer
sectionItems.hasOwnProperty('parent_section_name') &&
<>
<div className="transfer-box-output small-border">
<p className="transfer-box-heading"><b>Box contents:</b></p>
<ul key={v4()} className="box-contents-for-transfer">
<div className="list-div"> 
    { // this DIV will only display 5 or 6 box items; boxes having > 6 items will causes the y-overflow to be hidden and the y-axis scrollbar will appear; user can also mousewheel scroll. List items alternate in color for easier readability
        sectionItems.box_contents.map(contents =>{
return(
    <li id={contents.id} className="transfer-box-item">{contents.itemString}</li>
)
        })
    }
</div>
</ul>
</div>
</>


   }

   {// only rendered if transfer type is item
   boxDetails.hasOwnProperty('new_item_string') && 
   <p className="results-para">{boxName}</p>
}

            </div>



            { // SUCCESS MESSAGE
            transferApplied == 'yes'  &&
<div className="successful-transfer">
    <h3 className="sucess-confirmed">TRANSFER SUCCESSFUL</h3>
</div>


}
            { // SELECT MENUS
            // show the select menus only if transfer has not been applied
            transferApplied !== 'yes' &&
    // element displaying select menus
           <div className="element-div select-div medium-border">



            <div className="options-container" >
            <label htmlFor="location-select" >Choose a location:</label><br/>
            <select id="location-select"   onChange={(e) =>{
                container.map((location, indexOfLocation) =>{
                    if(location.id == e.target.value){
                        console.log(e.target.value)
       //if location id is equal to selected option set destination location information
                        setSelectedLocationInfo({
                            "location_index": indexOfLocation,
                            "location_id": e.target.value,
                            "location_name": location.location_name
                        })
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
   !selectedLocationInfo.hasOwnProperty('location_index') &&
   <option value="" className="default-option"  selected="selected">select</option>
   }

            </select>
        </div>






{ // if a location is selected then display section select menu
selectedLocationInfo.location_index &&
<div className="options-container" >
<label htmlFor="section-select">Choose a section:</label><br/>

<select id="section-select" onChange={(e) =>{
    container[selectedLocationInfo.location_index].location_contents.map((section, indexOfSection) =>{
        if(section.id == e.target.value){
// if section id is equal to selected option set destination section information
                setSelectedSectionInfo({
                    "section_index": indexOfSection,
                    "section_id": e.target.value,
                    "section_name":section.section_name
                        })
                    }
                })


}}>

{
!selectedLocationInfo.location_index ? console.log('no section info'): 
container[selectedLocationInfo.location_index].location_contents.map(sections =>{
  return (
    <option value={sections.id} >{sections.section_name}</option>
  )
})
}
   { // if no selection has been made, display the word 'select' to hint next step to user
   !selectedSectionInfo.hasOwnProperty('section_index') &&
   <option value="" className="default-option"  selected="selected">select</option>
   }
</select>
</div>
}


{ // if a section is selected from menu
    selectedSectionInfo.section_index &&
    // if an item is being transferred then display box select menu
    boxDetails.hasOwnProperty('new_item_string') &&
    <div className="options-container" >
    <label htmlFor="box-select">Choose a box:</label><br/>
    <select id="box-select"  onChange={(e) =>{
    container[selectedLocationInfo.location_index].location_contents[selectedSectionInfo.section_index].section_contents.map((boxes, indexOfBox) =>{
        if(boxes.id == e.target.value){



// if box id is equal to selected option set destination box information
                setSelectedBoxInfo({
                    "box_index": indexOfBox,
                    "box_id": e.target.value,
                    "box_name":boxes.box_name,
                        })

                        destinationBox = `Box: ${boxes.box_name}`
                    }
                })
}}>

        {
!selectedSectionInfo.section_index ? console.log('no section info'): 
container[selectedLocationInfo.location_index].location_contents[selectedSectionInfo.section_index].section_contents.map(boxes =>{
  return (
    <option value={boxes.id} >{boxes.box_name}</option>
  )
})
        }
           { // if no selection has been made, display the word 'select' to hint next step to user
   !selectedBoxInfo.hasOwnProperty('box_index') &&
   <option value="" className="default-option"  selected="selected">select</option>
   }
    </select>
</div>

}

            </div>
        } 





{
    // DISPLAY DESTINATION 
}
            <div className="element-div medium-border">
            <p className="results-para heading-clr-destination text-shadow-heading"><em>{'DESTINATION'}</em></p>

            {selectedLocationInfo.hasOwnProperty('location_name') && 
                 <p className="results-para">Location:<br/> <b>{selectedLocationInfo.location_name}</b></p>       
            }

    {selectedSectionInfo.hasOwnProperty('section_name') && 
    <p className="results-para">Section:<br/> <b>{selectedSectionInfo.section_name}</b></p>
    }
   

   {   selectedBoxInfo.hasOwnProperty('box_index') && //  and only shown if a box is selected in select menu
      <p className="results-para">Box:<br/> <b>{selectedBoxInfo.box_name}</b></p>
   }

            </div>


        </div>
{ transferApplied !== 'yes' && // hide advance and return buttons if transfer not applied (using ViewAreaButton component)

<div className="transfer-btn-container">


<ViewAreaButton className={"cancel-transfer-btn small-border"} openArea={backToOrigin}  id={originId} areaName={areaName} buttonText={'Cancel Transfer'} generalArea={generalArea}/>



    <button className="apply-transfer-btn small-border" onClick={() =>{
        // go to execute attempt at transfer (pending satisfied conditions)
        attemptTransfer('yes')
        processTransferItem(boxDetails)
        }}>Apply transfer</button>
       
</div>

}


{ transferApplied == 'yes' && // show destination and origin navigation buttons if transfer has been applied (using ViewAreaButton component)
        <div className="navigation-btn-container">

            <ViewAreaButton className={"navigation-btn origin small-border"} openArea={backToOrigin}  id={originId} areaName={areaName} buttonText={backButtonText} generalArea={generalArea}/>

            <ViewAreaButton className={"navigation-btn destination  small-border"} openArea={goToDestination}  id={destinationId} areaName={destinationAreaSpecific} buttonText={destinationButtonText} generalArea={destinationAreaGeneral}/>
        </div>
        }
        
        </>
    )
}

/*

parameters needed for view area button
className
 buttonText
 openArea
 id
 areaName
 generalArea


 DON'T DO THIS YET, UNTIL YOU HAVE ALL OF THE PARAMETERS YOU NEED TO NAVIGATE TO THE ORIGIN OR DESTINATION

 

            <ViewAreaButton className={"navigation-btn destination  small-border"} openArea={goToDestination}  id={id} areaName={boxName} buttonText={viewButtonText} generalArea={'box'}/>


            // previous back to origin/cancel button
*/