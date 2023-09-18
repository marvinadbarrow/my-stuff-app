import { NewItem } from "./NewItem"

export const TransferButton = ({objectPath, itemName, transferItem, buttonText, newBoxItems, transferBox}) =>{

// console.log(objectPath)
// console.log(objectPath, newBoxItems, itemName)


if(objectPath.hasOwnProperty('new_item_string')){
    objectPath.new_item_string = ''
    // removed new_item_string which was causing issues

}

// console.log(objectPath, itemName, )


    // added both  newBoxItems and itemName be sent to transfr page
    function preparTransfer(objectPath, nameofItem, boxContents){

        // if the variable for modified box name exists in local storage then delete the entry from local storage, it's abscense will allow duplicate destination box names to render as coloured red on the transfer page, which needs the local storage item to initially not exist in order for the duplicate to display red. 
        if(localStorage.getItem('modified_box_name')){
            localStorage.removeItem('modified_box_name')
            console.log('local storage variable below')
            console.log(JSON.parse(localStorage.getItem('modified_box_name')))
        }



// if box contents exist, execute transfer item, otherwise execute transfer box
boxContents !== undefined ?
transferItem(objectPath,'transfer page', nameofItem, boxContents):
transferBox(objectPath ,'transfer page')
            }
 

    return(
        <>

        <div className='transfer-btn-div'>


<button className="transfer-button" onClick={()=>{
objectPath.hasOwnProperty('new_item_string') ?     
    preparTransfer(objectPath, itemName, newBoxItems):
    preparTransfer(objectPath)
        
    }}>{buttonText}</button>
</div>
        </>
    )
}

/*

*/