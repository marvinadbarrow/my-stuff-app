
import { DisplayOrigin } from "./DisplayOrigin"

export const OriginElement = ({locationName, sectionName, sectionItems, boxDetails, boxName}) =>{



    return(

        <>
                    <div className="element-div-transfer-origin medium-border">
            <p className="results-para heading-clr-origin text-shadow-heading"><em>{'ORIGIN'}</em></p>
            <p className="results-para">Location:<br/> {locationName}</p>
   <p className="results-para">Section:<br/> {sectionName}</p>

   {
// if section items property exists, desplay element to list all items in a box transfer
sectionItems.hasOwnProperty('parent_section_name') &&
<DisplayOrigin sectionItems={sectionItems}/>
   }

   {// only rendered if transfer type is item
   boxDetails.hasOwnProperty('new_item_string') && 
   <p className="results-para">{boxName}</p>
}
            </div>
        
        </>
    )
}


/*
props for display origin

locationName
sectionName
sectionItems
boxDetails
boxName


*/