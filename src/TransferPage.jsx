import { useState } from "react";
import { ViewAreaButton } from "./ViewAreaButton";
import { v4 } from "uuid";
import { useImmer } from "use-immer";
import { useEffect } from "react";
import { AllItemsObject } from "./AllItemsObject";
import { DisplayOrigin } from "./DisplayOrigin";
import { DestinationBoxes } from "./DestinationBoxes";
import { DuplicateWarning } from "./DuplicateWarning";
import { ApplyTransfer } from "./ApplyTransfer";
import { OptionSelect } from "./OptionSelect";
import { DestinationElement } from "./DestinationElement";
import { OriginElement } from "./OriginElement";
import { SelectElement } from "./SelectElement";



export const TransferPage = ({boxDetails, container, allItemsArray, openBox, openSection, sectionItems, transferBoxAccept, addBoxItem, deleteBoxItem, inventoryChange, allArrayChange}) =>{

const [selectedLocationInfo, setSelectedLocationInfo] = useState({})
const [selectedSectionInfo, setSelectedSectionInfo] = useState({})
const [selectedBoxInfo, setSelectedBoxInfo] = useState({})
const [locationIndex, setLocationIndex] = useState('')
const [transferApplied, setTransferApplied] = useState('')
const [newDestination, setNewDestination] = useState({})
const [testContainer, setTestContainer] = useImmer(container)
const [testAllItemsArray, setTestAllItemsArray] = useImmer(allItemsArray)
const [existingDuplicates, setExistingDuplicates] = useState(0)
const [duplicateFound, setDuplicateFound] = useState('')
const [newBoxName, setNewBoxName] = useState('')
const [modifiedBoxName, setModifiedBoxName] = useState('')
const [beginSelect, setBeginSelect] = useState('')
  // useEffect will send new container to App for state change. 
  // but will also send details of old item and new item in all items array
  useEffect(() =>{
inventoryChange(testContainer)
  }, [testContainer])

  // once the item has been removed, updated and pushed back to the draft all items array, send the array to main page to replace the original via state
useEffect(()=>{
    allArrayChange(testAllItemsArray)
},[testAllItemsArray])



console.log("section items")
console.log(sectionItems) // these should be empty on page load
console.log("new box name")
console.log(newBoxName) // these should be empty on page load
console.log("modified box name")
console.log(modifiedBoxName) // these should be empty on page load
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
let duplicateBoxWarning;

console.log(sectionItems)

// Only the item ID is needed in order to search allItemsArray, the useState values, which are the location, section and box ids will replace the current item object properties. 

// if sectionItems is empty, an item is being transferred
if(sectionItems == ''){
 locationName = boxDetails.location_name
 sectionName = boxDetails.section_name
 boxName = boxDetails.box_name
itemName = boxDetails.new_item_string
objectType = 'Item'; 
generalArea = 'box'; 
areaName = boxName;
originId = boxDetails.box_id
destinationBox = 'Box:' // updated at time of menu select

}else{ // sectionItems is not empty so a box is being transferred
    locationName = sectionItems.location_name
    sectionName = sectionItems.parent_section_name
    // if newBoxName is a non-empty string, a duplicate box name existed in the destination and user has modified the original box name to avoid duplication at the destination.  The display name at the top of the page will then take the modified name instead of the default name that is used when an attempt is being made to transfer a box. 
    if(newBoxName !== ''){
        itemName = newBoxName
    }else{
        itemName = sectionItems.box_name 
    }

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

// establishing the modified box name
function applyBoxNameChange(modifiedName){
    
    if(modifiedName !== undefined || modifiedName !==''){
        // check for existence of modified nam
        console.log('modified name exists')
        console.log(modifiedName)
        setModifiedBoxName(modifiedName)
        // setExistingDuplicates(0)
    }
        else{
            // modified name isn't processing (find out why)
            console.log('modified is undefined or missing')
        }

}

// transfer item process
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
        // console.log(itemID)

        // indexes for origin
        let origLoc = boxDetails.location_index;
        let origSec = boxDetails.section_index;
        let origBox = boxDetails.box_index;
        // indexes for destination
        let destLoc = selectedLocationInfo.location_index
        let destSec = selectedSectionInfo.section_index
        let destBox = selectedBoxInfo.box_index
        // to store index of item in all items array
        let indexOfItemInAllArray; 


        
// destination contents (where the item object will go to)        
        let contentsOfNewBox = container[destLoc].location_contents[destSec].section_contents[destBox].box_contents

// original box
let boxOrig = testContainer[origLoc].location_contents[origSec].section_contents[origBox].box_contents

// NEW MOTHOD --------------------------------------


// a better item getter from ORIGIN 
let betterTransObj
boxOrig.map((objects, objectsIndex) =>{
    if(objects.itemString == itemNamestring){
        betterTransObj = boxOrig[objectsIndex]
    }
})

// better item getter from  ALL items array
let betterAllObj;
testAllItemsArray.map((objects, allObjectsIndex) =>{
    if(objects.item_id == itemID){
        betterAllObj = testAllItemsArray[allObjectsIndex]
    }
})

// create new physical item for new physical location ----------
let alteredTransObj = {
    "id":betterTransObj.id,
    "itemString":betterTransObj.itemString,
    "parent_Box":selectedBoxInfo.box_name,
    "parent_box_id":selectedBoxInfo.box_id,
}

// push physical item to its physical destination box 
setTestContainer(draft =>{
    // push item to new box array
    draft[destLoc].location_contents[destSec].section_contents[destBox].box_contents.push(alteredTransObj)

    // filter item out of old box array
    draft[origLoc].location_contents[origSec].section_contents[origBox].box_contents = 
    draft[origLoc].location_contents[origSec].section_contents[origBox].box_contents.filter(object => object.id !== itemID) 
})

// create new object with destination details. 
let alteredAllItemsObj = {
    'box_id': selectedBoxInfo.box_id, // change to new box name
    'item_id':betterAllObj.item_id, // does not change
    'item_name':betterAllObj.item_name, // does not change

    'item_object': {
        "id": itemID, // does not change
        "parent_Box": selectedBoxInfo.box_name,  // name of new box
        "itemString": itemNamestring, // does not change
        "parent_box_id":selectedBoxInfo.box_id // id of new box
    },

    'location_id': selectedLocationInfo.location_id,  // id of new location
    'section_id': selectedSectionInfo.section_id,  // id of new section

    }
    
// search for the index of the object in all items array
testAllItemsArray.map((objects, indexOfObject) =>{
    if(objects.item_id == itemID){
        indexOfItemInAllArray = indexOfObject
        console.log(testAllItemsArray[indexOfObject])
    }
    })


    setTestAllItemsArray(draft =>{
// replace the original item object with new object with updated destination
    draft[indexOfItemInAllArray] = alteredAllItemsObj
})
    }
}

// back to origin, pre or post tranfer
function backToOrigin(general, specific, id){

    if(boxDetails.hasOwnProperty('new_item_string')){ 
// if the transfer object is an item, then section id and location id are not needed because they are already set. 
openBox(general, specific, id, boxDetails )    

       }else{ 
       
        setDuplicateFound('')
        
        // no properties in box details - an entire box is being transferred
openSection(general, specific, id)
       }    
    }

// go to destination,  post tranfer
function goToDestination(general, specific, id){
    if(boxDetails !== undefined){
        let itemName = '' // parameter not needed
        let sectionId = selectedSectionInfo.section_id;
        let parentId = selectedLocationInfo.location_id;
        openBox(general, specific, id, itemName, sectionId, parentId) 
        }
}

// transfer box items
function processBoxItems(destSecId, destLocId){


    console.log(sectionItems)

    let originBoxName = sectionItems.box_name
    let originSectionName = sectionItems.parent_section_name
    let originSectionId = sectionItems.section_id
    let originLocationId = sectionItems.parent_container_id
    let boxItems = sectionItems.box_contents
    let thisBox;
    let boxID;
    let originLocationIndex; // index of origin location
    let originSectionIndex; // index of origin section
    let originalBoxIndex; // index of origin box


    console.log('line 284')
console.log(originBoxName)


    // find box with map of box contents
    boxItems.map((itemsOfBox) =>{
        if(itemsOfBox.parent_Box == originBoxName){
            thisBox = itemsOfBox
            boxID = itemsOfBox.parent_box_id
              // if a duplicate box name was previously found at the destination, then, after obtaining the box id using the old name, change theh originBoxName property the modified box name, so that it can be used to modify both the transfer box and item objects be in all items array that have the box id, as parent_box_id


        }

    })

    if(modifiedBoxName == ''){ // if modified box name is an empty string (default)
        console.log('no modified name present')
        originBoxName = originBoxName    
    }else{ // modified box name exists
        originBoxName = modifiedBoxName
console.log('line 304')
console.log(' modified box name exists')
console.log('modifiedBoxName: ' + originBoxName)
    }

// get origin location,  section and box indexes which will be used to filter out the box object from its original position
testContainer.map((location, locationIndex) =>{
    if(location.id == originLocationId){
        // assign location index
        originLocationIndex = locationIndex
        location.location_contents.map((section, sectionIndex) =>{
            if(section.id == originSectionId){
                // assign section index
                originSectionIndex = sectionIndex
                section.section_contents.map((box, boxIndex)=>{
                    if(box.id == boxID){
                        originalBoxIndex = boxIndex
                    }
                })
            }
           
        })
    }

})

// object containing origin and destination details of transfer box
let transitObj ={
    // origin location  index, name, id
    "locA_index":originLocationIndex,
    "locA_name":locationName,
    "locA_id":originLocationId,

    // origin section  index, name, id
    "secA_index":originSectionIndex,
    "secA_name":originSectionName,
    "secA_id":originSectionId,


    // origin box  index, name, id (or new box name if one exists)
    "boxA_index":originalBoxIndex,
    "boxA_name":originBoxName,
    "boxA_id":boxID,
    

    // destination location index, name, id
    "locB_index":selectedLocationInfo.location_index,
    "locB_name":selectedLocationInfo.location_name,
    "locB_id":selectedLocationInfo.location_id,

    // destination section index, name, id
    "secB_index":selectedSectionInfo.section_index,
    "secB_name":selectedSectionInfo.section_name,
    "secB_id":selectedSectionInfo.section_id,


    "origin":'', // origin section
    "destination":'', // destination section
    "box_details":'' // details of transfer box
    
}
console.log('transitObj - line 363')
console.log(transitObj)

// get original section 
transitObj.origin = testContainer[transitObj.locA_index].location_contents[transitObj.secA_index]

// box details (as they are in the section) - 
transitObj.box_details = testContainer[transitObj.locA_index].location_contents[transitObj.secA_index].section_contents[transitObj.boxA_index]

// get destination section
transitObj.destination = testContainer[transitObj.locB_index].location_contents[transitObj.secB_index]
 
// create a new box object using 'spread' operator; that way it can be mutated without affecting the old box
let newBoxDetails = {
    "box_contents":'',
    "box_name":transitObj.boxA_name, 
    "id":transitObj.boxA_id,
   "parent_container_id": transitObj.locB_id,
    "parent_section_name": transitObj.secB_name
}



// to make sure that the items within box contents have the right box name after a name change due to a duplicate conflict,  you have to map through and change all of those, but I don't know if you can do it here.  
// yes it can be done, just create a copy of the box_contents array, then map through, and for each item, give it the box name, which comes from the transit object, which automatically changes if there is a box name change due to a duplicate conflict. 
// error, you can't do the above because the objects are read only, tried to map the box items but they are read-only objects so I couldn't change the parent_Box property.  

// create a new array to hold new box items (as objects) which will be created in the map below, by giving the properties of the new items the value of the properties of the old items, but giving the parent_Box property the value of 'originName' which is will be a new name if a duplicate box was found at the destination, or the original name if no duplicate was found.  The other values, item id, item name and box id do not change. 
let newBoxContents = []
console.log('line 390')
console.log(newBoxContents)

transitObj.box_details.box_contents.map(contents =>{
    // create object and assign property values
let newItemObject = {

"id": contents.id,
"itemString": contents.itemString,
"parent_Box": originBoxName, 
"parent_box_id": contents.parent_box_id
}

// push object to newBoxContents
newBoxContents.push(newItemObject)

})

console.log('box contents with updated parent_Box parameter for original or modified box name')
console.log(newBoxContents)

// then assign the new array to the box_contents property of the newbox
newBoxDetails.box_contents = newBoxContents





//change the properties in all of the allItemsArray objects that have a box id associated with the transfer box

// create a new array with just objects associated with the transfer box
let justBoxItems = testAllItemsArray.filter(object =>object.box_id == boxID)


// create another array, but this time with objects associated with the transfer box removed from the array
let arrayWithoutItems = testAllItemsArray.filter(object =>object.box_id !== boxID)


// temporarary array to hold box objects updated with destination details
let tempArray = []

// map through objects associated with the transfer box
justBoxItems.map(item =>{
// create a new item for each object, and update section and location details to match destination details
let newItem;
if(modifiedBoxName !== undefined || modifiedBoxName !==''){
    console.log('modified name exists')
    console.log(modifiedBoxName)
    newItem = {
        'item_name':item.item_name,
    'location_id':transitObj.locB_id, 
    'item_object':{
        'id':item.item_id,
        'itemString':item.item_name,
        'parent_Box':modifiedBoxName,
        'parent_box_id': item.box_id,
    },
    'section_id': transitObj.secB_id,
    'box_id': item.box_id,
    'item_id':item.item_id
    }


}else{
    console.log('modified name is undefined or missing')
    newItem = {
        'item_name':item.item_name,
    'location_id':transitObj.locB_id, 
    'item_object':{
        'id':item.item_id,
        'itemString':item.item_name,
        'parent_Box':transitObj.boxA_name,
        'parent_box_id': item.box_id,
    },
    'section_id': transitObj.secB_id,
    'box_id': item.box_id,
    'item_id':item.item_id
    }


}

//if no updated box name exists, use original, otherwise use updated


console.log(newItem)

    
// push item to temp array
tempArray.push(newItem)
})

// merge new array missing box item details with temp array containing the objects now altered. This will replace the original AllItemsArray
let completedNewArray = [...arrayWithoutItems, ...tempArray]




// checking for duplicates
let duplicates = 0; // assume no duplicate exists
let duplicateName; // variable for duplicate name (only one is needed to stop the process)

console.log("transition box name line 499")
console.log(transitObj.boxA_name)
console.log('modified box name')
console.log(modifiedBoxName)
console.log("destination section contents line 499")
console.log(transitObj.destination.section_contents)

// map destination section
transitObj.destination.section_contents.map(boxes =>{
    //  If any of its box names matches the transfer box name, increment the 'duplicates' variable
    if(boxes.box_name == transitObj.boxA_name){
        console.log('duplicate box name found')
        duplicates +=1;
        duplicateName = boxes.box_name
    }
})

// if a duplicate exists
if(duplicates > 0){
    setExistingDuplicates(1) // hides the 'apply transfer' button and shows duplicate warning element. 
    setTransferApplied('no') // keep post-transfer navigation buttons hidden
    setDuplicateFound(duplicateName) // duplicate name string for display in warning
}
else{ // no duplicate exists

    setNewBoxName('')
    if(localStorage.getItem('modified_box_name')){
        itemName = JSON.parse(localStorage.getItem('modified_box_name'))
    }

    setModifiedBoxName('')
setTestContainer(draft =>{
    // push box object to new section contents
    draft[transitObj.locB_index].location_contents[transitObj.secB_index].section_contents.push(newBoxDetails)

    // filter box object from origin section contents
    draft[transitObj.locA_index].location_contents[transitObj.secA_index].section_contents = 
    draft[transitObj.locA_index].location_contents[transitObj.secA_index].section_contents.filter(box => box.id !== boxID) 
});
// replace original AllItemsArray with the new one where objects associated with the transferbox have had their details edited to match the destination details. 
setTestAllItemsArray(completedNewArray)

}
{
    // alert will run and adjustment box will pop up
}

}

// attempt TRANSFER
function attemptTransfer(confirm){

    // conditions for accepting transfer
if(boxDetails !== ''){ // if box details is not just an empty string then boxDetails exist

// if a box name is selected in the 'box' options menu
    if(selectedBoxInfo.box_name){ // accept transfer
setTransferApplied(confirm)
    } // otherwise alert user that an entire path must be selected
    else{alert('please select location, section AND box before attempting tranfer')}
}
 // OTHERWISE (box details do not exist): 
 else if(sectionItems !== undefined){ // if section details exist 
    if(selectedSectionInfo.section_name){ // and section menu has been selected
   
        setTransferApplied(confirm) // then accept transfer
processBoxItems(selectedSectionInfo.section_id, selectedLocationInfo.location_id)
// otherwise alert user that both location and section options must be selected
    }else{alert('please select location AND section before attempting tranfer')}

    
        } // OTHERWISE no section items exist.  This is unlikely to occur because it would mean that neither box items nor section items exist
        

}

    return (
        <>

        <div className="tranfer-object-info-div">
            <p className="tranfer-info-para">Transferring {objectType}: <b>"{itemName}"</b></p>
        </div>
        <div className="transfer-elements-container">
        {
    // TRANSFER BOX/ITEM ORIGIN DETAILS------------
    <OriginElement locationName={locationName} sectionName={sectionName} sectionItems={sectionItems} boxDetails={boxDetails} boxName={boxName}/>
}

{ // SUCCESS MESSAGE  ---------------------------------------------
transferApplied == 'yes'  &&
<div className="successful-transfer">
    <h3 className="sucess-confirmed">TRANSFER SUCCESSFUL</h3>
</div>
}


{

// button to promt user to begin selecting a new path for box, item to be transferred to
beginSelect == '' &&

<button className="start-select" onClick={() =>{
    setBeginSelect('select started')
}}>Start Location Select</button>

}


      { // SELECT MENUS ---------------------------------------------------


// only show select element if begin select has been shown and transfer has not been applied.  So button will disappear once transfer is complete. You should also re-rest begin Select otherwise the button won't show (not the most important thing and I may think about removing it later on)
    beginSelect == 'select started' &&
    transferApplied !== 'yes' &&
    <>
    <div className="element-div select-div medium-border">

<SelectElement selectedLocationInfo={selectedLocationInfo} setSelectedLocationInfo={setSelectedLocationInfo} selectedSectionInfo={selectedSectionInfo} setSelectedSectionInfo={setSelectedSectionInfo} boxDetails={boxDetails} setSelectedBoxInfo={setSelectedBoxInfo} container={container} transferApplied={transferApplied}/>
            </div>
            </>

}

      

        

{    // TRANSFER BOX/ITEM DESTINATION DETAILS
    <DestinationElement selectedLocationInfo={selectedLocationInfo} selectedSectionInfo={selectedSectionInfo} sectionItems={sectionItems} testContainer={testContainer} newBoxName={newBoxName} transferApplied={transferApplied} selectedBoxInfo={selectedBoxInfo} modifiedBoxName={modifiedBoxName} existingDuplicates={existingDuplicates}/> 
    
}


        </div>
{ transferApplied !== 'yes' && // hide advance and return buttons if transfer not applied (using ViewAreaButton component)


<div className="transfer-btn-container">
<ViewAreaButton className={"cancel-transfer-btn small-border"} openArea={backToOrigin}  id={originId} areaName={areaName} buttonText={'Cancel Transfer'} generalArea={generalArea}/>

{
    existingDuplicates < 1 &&
<ApplyTransfer attemptTransfer={attemptTransfer} processTransferItem={processTransferItem} boxDetails={boxDetails}/> 
        }


</div>

}


{ transferApplied == 'yes' && // show destination and origin navigation buttons if transfer has been applied and no duplicates exist

        <div className="navigation-btn-container">

            <ViewAreaButton className={"navigation-btn origin small-border"} openArea={backToOrigin}  id={originId} areaName={areaName} buttonText={backButtonText} generalArea={generalArea}/>

            <ViewAreaButton className={"navigation-btn destination  small-border"} openArea={goToDestination}  id={destinationId} areaName={destinationAreaSpecific} buttonText={destinationButtonText} generalArea={destinationAreaGeneral}/>
        </div>
        }


{// if transfer has been applied but duplicates do exist, show warning (transfer won't complete until this is resolved)
existingDuplicates > 0  &&

<>

<DuplicateWarning duplicateFound={duplicateFound} newBoxName={newBoxName} setExistingDuplicates={setExistingDuplicates} applyBoxNameChange={applyBoxNameChange} setNewBoxName={setNewBoxName} setTransferApplied={setTransferApplied}/>



</>


}
        
        </>
    )
}

/*

-----------------

console.log(`checking if:

boxDetials is empty:
false: item is being transferred
true: box is being transferred
${boxDetails == ''}

sectionItems is empty: 
false: box is being transferred
true: item is being transferred
${sectionItems == ''}
`)


*/