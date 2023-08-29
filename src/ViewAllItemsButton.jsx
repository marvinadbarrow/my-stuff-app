export const ViewAllItemsButton = ({boxLocation, viewAllItems}) =>{


    return(
        <>
        <button className="view-entire-section" onClick={viewAllItems}>view all {boxLocation} items</button>
        
        </>
    )
}