import { NewItem } from "./NewItem"

export const TransferButton = ({objectPath, itemName, transferItem, buttonText, newBoxItems, transferBox}) =>{

console.log(objectPath)
// console.log(objectPath, newBoxItems, itemName)


if(objectPath.hasOwnProperty('new_item_string')){
    objectPath.new_item_string = ''
    // removed new_item_string which was causing issues

}

console.log(objectPath, itemName, )


    // added both  newBoxItems and itemName be sent to transfr page
    function preparTransfer(objectPath, nameofItem, boxContents){

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

        if(objectPath.hasOwnProperty('box_contents')){

            transferItem(objectPath, 'transfer page')
        }else{
    // otherwise, send updated section and transfer page string for state update      
            transferItem(objectPath,'transfer page')}
*/