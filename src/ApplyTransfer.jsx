import { v4 } from "uuid";

export const ApplyTransfer = ({attemptTransfer, processTransferItem, boxDetails}) =>{

const transferAttempt = () =>{
        // go to execute attempt at transfer (pending satisfied conditions)
        attemptTransfer('yes')
        processTransferItem(boxDetails)
}

    return (<>
    <button className="apply-transfer-btn small-border" onClick={() =>{
transferAttempt()
        }}>Apply transfer</button>
        </>)
}