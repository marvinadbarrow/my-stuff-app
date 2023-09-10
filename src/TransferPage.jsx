import { useState } from "react";
import { ViewAreaButton } from "./ViewAreaButton";
import { v4 } from "uuid";
import { useImmer } from "use-immer";
import { useEffect } from "react";
import { AllItemsObject } from "./AllItemsObject";
import { DisplayOrigin } from "./DisplayOrigin";
import { DisplayDestinationBtn } from "./DisplayDestinationBtn";
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
  // useEffect will send new container to App for state change. 
  // but will also send details of old item and new item in all items array
  useEffect(() =>{
inventoryChange(testContainer)
  }, [testContainer])

  // once the item has been removed, updated and pushed back to the draft all items array, send the array to main page to replace the original via state
useEffect(()=>{
    allArrayChange(testAllItemsArray)
},[testAllItemsArray])

console.log(sectionItems)
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
function applyBoxNameChange(newBoxName){
    setModifiedBoxName(newBoxName)

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
console.log('new way of getting items at origin using map')
console.log(betterTransObj)


// better item getter from  ALL items array
let betterAllObj;
testAllItemsArray.map((objects, allObjectsIndex) =>{
    if(objects.item_id == itemID){
        betterAllObj = testAllItemsArray[allObjectsIndex]
    }
})
console.log('new way for getting items in all items array using map')
console.log(betterAllObj)



// new item object for new physical location ------------------------------------
let alteredTransObj = {
    "id":betterTransObj.id,
    "itemString":betterTransObj.itemString,
    "parent_Box":selectedBoxInfo.box_name,
    "parent_box_id":selectedBoxInfo.box_id,
}


// searching for the index of the object in all items array
testAllItemsArray.map((objects, indexOfObject) =>{
if(objects.item_id == itemID){
    indexOfItemInAllArray = indexOfObject
    console.log(testAllItemsArray[indexOfObject])
}
})


// new object with destination details. 
let alteredAllItemsObj = {
    'box_id': selectedBoxInfo.box_id,
    'item_id':betterAllObj.item_id,
    'item_name':betterAllObj.item_name,

    'item_object': {
        "id": itemID,
        "parent_Box": selectedBoxInfo.box_name,
        "itemString": itemNamestring,
        "parent_box_id":selectedBoxInfo.box_id
    },

    'location_id': selectedLocationInfo.location_id,
    'section_id': selectedSectionInfo.section_id,

// you need to change the original location/section and box id you div.. and parent box and parent box id in item object
    }


    console.log(alteredAllItemsObj)
// changeTransferItemProperties(betterAllObj, alteredAllItemsObj)

// push object to destination box
setTestContainer(draft =>{
    // push item to new box array
    draft[destLoc].location_contents[destSec].section_contents[destBox].box_contents.push(alteredTransObj)

    // filter item out of old box array
    draft[origLoc].location_contents[origSec].section_contents[origBox].box_contents = 
    draft[origLoc].location_contents[origSec].section_contents[origBox].box_contents.filter(object => object.id !== itemID) 
})

setTestAllItemsArray(draft =>{
    // keep everything in the array that is not the deleted item
    draft[indexOfItemInAllArray] = alteredAllItemsObj
        // push updated item to allItemsArray 
    //     console.log(draft)
    // draft.push(alteredAllItemsObj)
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
    let destinationLocationID = destLocId
    let destinationSectionID = destSecId
    let boxItems = sectionItems.box_contents
    let thisBox;
    let boxID;
    let originLocationIndex;
    let originSectionIndex;
    let originalBoxIndex;
    let transferBox;




    // find box with map of box contents
    boxItems.map((itemsOfBox) =>{
        if(itemsOfBox.parent_Box == originBoxName){
            thisBox = itemsOfBox
            boxID = itemsOfBox.parent_box_id
              // if a duplicate box name was previously found at the destination, then, after obtaining the box id using the old name, change theh originBoxName property the modified box name, so that it can be used to modify both the transfer box and item objects be in all items array that have the box id, as parent_box_id
if(newBoxName !== ''){
    originBoxName = newBoxName    
}
        }

    })

// get index of location and section indexes for destination which will be used to filter out the box from the section contents
testContainer.map((location, locationIndex) =>{
    if(location.id == originLocationId){
        // get location index
        originLocationIndex = locationIndex
        location.location_contents.map((section, sectionIndex) =>{
            if(section.id == originSectionId){
                // get section index
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
// origin and destination locations/sections indexes
let transitObj ={
    // previous location  index, name, id
    "locA_index":originLocationIndex,
    "locA_name":locationName,
    "locA_id":originLocationId,

    // previous location  index, name, id
    "secA_index":originSectionIndex,
    "secA_name":originSectionName,
    "secA_id":originSectionId,


        // previous box  index, name, id
    "boxA_index":originalBoxIndex,
    "boxA_name":originBoxName,
    "boxA_id":boxID,
    

    // new location // index, name, id
    "locB_index":selectedLocationInfo.location_index,
    "locB_name":selectedLocationInfo.location_name,
    "locB_id":selectedLocationInfo.location_id,

    // new section index, name, id
    "secB_index":selectedSectionInfo.section_index,
    "secB_name":selectedSectionInfo.section_name,
    "secB_id":selectedSectionInfo.section_id,


    "origin":'', // origin section
    "destination":'', // destination section
    "box_details":'' // details of transfer box
}
console.log(transitObj)
console.log(testContainer)
// original section check
transitObj.origin = testContainer[transitObj.locA_index].location_contents[transitObj.secA_index]

// box details (as they are in the section) - 
transitObj.box_details = testContainer[transitObj.locA_index].location_contents[transitObj.secA_index].section_contents[transitObj.boxA_index]

// destination section
transitObj.destination = testContainer[transitObj.locB_index].location_contents[transitObj.secB_index]
 

// if newBoxName is not an empty string, the transfer box name was a duplicate  of a box name at the destination.  The newBoxName is set in state as a modification of the original transfer box name.  The boxA_name property of transitObj, is changed to this modification so that when (on line 467), the destination section is mapped and a comparison is made to see if the box name property of transitObj is a duplicate of any other the boxes in the destination, since the original duplicate name is no longer  written to that boxA_name variable, there will be no conflict and all of the other steps, those of editing the box and all items array objects with the new destination id's, can continue as normal.  

console.log(transitObj) // contains origina and destination details
console.log(transitObj.origin) //origin section
console.log(transitObj.destination) // destination section
console.log(transitObj.box_details) // transfer box

// create a new box object by spreading the contents of the old box object; that way the new can be mutated without affecting the old
let newBoxDetails = {
    ...transitObj.box_details,
}


// BOOM.... FOUND IT...  HERE IS WHERE LOCATION ID AND SECTION ID WERE ACCIDENTALLY SWAPPED. LINES 412 AND 414, VARIABLES WERE ASSIGNED WRONG VALUES.. i.e. section id was assigned location id, and location id was assigned section id.  Hopefully this is a fix. 

// change  original section id and name to destination section id and name
newBoxDetails.parent_section_name = transitObj.secB_name // new section name
newBoxDetails.section_id = transitObj.secB_id // new location id
newBoxDetails.location_name = transitObj.locB_name // new location name 
newBoxDetails.parent_container_id = transitObj.locB_id // new section id

// this is done. Now you need to change the properties in all of the allItemsArray objects that have the same box id. 

console.log(newBoxDetails)
// check old box details 
// console.log('box details prior to transfer')
// console.log(transitObj.box_details)

// check newboxDetails has correct details for the new location
// console.log(' transferred box new destination details')
// console.log(newBoxDetails)

console.log(testContainer)
// now all you have to do is push this box object, in place of the previous one, named 'transfer' box to the draft location and therefore it will have the correct details of the section in which it lands.  (the state is already set up; just change the object to be pushed)
console.log('check properties of just one object in array')
console.log(testAllItemsArray[0])

// check original array length
console.log('array length before alteration')
console.log(testAllItemsArray.length)
// get only box items
let justBoxItems = testAllItemsArray.filter(object =>object.box_id == boxID)
// check object data
console.log('array objects before alteration')
console.log(justBoxItems)


// get array without box items - will push altered items to this
let arrayWithoutItems = testAllItemsArray.filter(object =>object.box_id !== boxID)
// temporary array for altered items
console.log('array length with boxes removed')
console.log(arrayWithoutItems.length)


let tempArray = []

// map through box items
justBoxItems.map(item =>{
// create a new item from old object but with updated section/location id
let newItem;

// if there is no modified box name then use the previous box name
if(newBoxName == ''){
     newItem = {
        'item_name':item.item_name,
    'location_id':transitObj.locB_id, 
    'item_object':{
        'id':item.item_id,
        'itemString':item.item_name,
        'parent_Box':item.item_object.parent_Box,
        'parent_box_id': item.box_id,
    },
    'section_id': transitObj.secB_id,
    'box_id': item.box_id,
    'item_id':item.item_id
    }
   
}else{
// otherwise, duplicate exists and box name has been modified so the property newItem.item_object.parent_Box needs to be given the modified box name 
     newItem = {
        'item_name':item.item_name,
    'location_id':transitObj.locB_id,
    'item_object':{
        'id':item.item_id,
        'itemString':item.item_name,
        'parent_Box':newBoxName, // name change of item parent box
        'parent_box_id': item.box_id,
    },
    'section_id': transitObj.secB_id,
    'box_id': item.box_id,
    'item_id':item.item_id
    }
    

}

// push to temp array
tempArray.push(newItem)
})

console.log('temp array  - objects after alteration')
console.log(tempArray)

let completedNewArray = [...arrayWithoutItems, ...tempArray]

console.log('array length after alteration')
console.log(completedNewArray.length)



let duplicates = 0;
let duplicateName;
// destination section (the log can be checked post-transfer, because the page renders again and so the transfer box should show up in the log)
transitObj.destination = testContainer[transitObj.locB_index].location_contents[transitObj.secB_index].section_contents.map(boxes =>{
    console.log(boxes)
    if(boxes.box_name == transitObj.boxA_name){
        console.log('duplicate box name found')
        duplicates +=1;
        duplicateName = boxes.box_name
    }
})

if(duplicates > 0){
    setExistingDuplicates(1)
    setTransferApplied('no')
    setDuplicateFound(duplicateName)
}


if(existingDuplicates < 1){
// BOX FUNTION

setTestContainer(draft =>{
    // push box to new section
    draft[transitObj.locB_index].location_contents[transitObj.secB_index].section_contents.push(newBoxDetails)

    // filter box from origin section
    draft[transitObj.locA_index].location_contents[transitObj.secA_index].section_contents = 
    draft[transitObj.locA_index].location_contents[transitObj.secA_index].section_contents.filter(box => box.id !== boxID) 
});
// 
setTestAllItemsArray(completedNewArray)

}
{
    // alert will run and adjustment box will pop up
}

}

// EXECUTE TRANSFER
function attemptTransfer(confirm){
// console.log('transfer attempt')

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
processBoxItems(selectedSectionInfo.section_id, selectedLocationInfo.location_id)
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
    // TRANSFER BOX/ITEM ORIGIN DETAILS------------
    <OriginElement locationName={locationName} sectionName={sectionName} sectionItems={sectionItems} boxDetails={boxDetails} boxName={boxName}/>
}

{ // SUCCESS MESSAGE  ---------------------------------------------
transferApplied == 'yes'  &&
<div className="successful-transfer">
    <h3 className="sucess-confirmed">TRANSFER SUCCESSFUL</h3>
</div>
}

      { // SELECT MENUS ---------------------------------------------------
    // show the select menus only if transfer has not been applied
    transferApplied !== 'yes' &&
    <div className="element-div select-div medium-border">

<SelectElement selectedLocationInfo={selectedLocationInfo} setSelectedLocationInfo={setSelectedLocationInfo} selectedSectionInfo={selectedSectionInfo} setSelectedSectionInfo={setSelectedSectionInfo} boxDetails={boxDetails} setSelectedBoxInfo={setSelectedBoxInfo} container={container}/>
            </div>
        } 

{    // TRANSFER BOX/ITEM DESTINATION DETAILS
    <DestinationElement selectedLocationInfo={selectedLocationInfo} selectedSectionInfo={selectedSectionInfo} sectionItems={sectionItems} testContainer={testContainer} newBoxName={newBoxName} transferApplied={transferApplied} selectedBoxInfo={selectedBoxInfo}/> 
    
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


{ transferApplied == 'yes' && // show destination and origin navigation buttons if transfer has been applied (using ViewAreaButton component)

// and as long as no duplicates exist

        <div className="navigation-btn-container">

            <ViewAreaButton className={"navigation-btn origin small-border"} openArea={backToOrigin}  id={originId} areaName={areaName} buttonText={backButtonText} generalArea={generalArea}/>

            <ViewAreaButton className={"navigation-btn destination  small-border"} openArea={goToDestination}  id={destinationId} areaName={destinationAreaSpecific} buttonText={destinationButtonText} generalArea={destinationAreaGeneral}/>
        </div>
        }

{existingDuplicates > 0  &&

<DuplicateWarning duplicateFound={duplicateFound} newBoxName={newBoxName} setExistingDuplicates={setExistingDuplicates} applyBoxNameChange={applyBoxNameChange} setNewBoxName={setNewBoxName}/>

// duplicateFound, newBoxName, setExistingDuplicates, applyBoxNameChange
}
        
        </>
    )
}

/*

-----------------

*/