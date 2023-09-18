
import { DisplayOrigin } from "./DisplayOrigin"

export const OriginElement = ({locationName, sectionName, sectionItems, boxDetails, boxName}) =>{



    return(

        <>
                    <div className="element-div-transfer-origin medium-border">
            <p className="results-para heading-clr-origin text-shadow-heading"><em>{'ORIGIN'}</em></p>
            <p className="origin-para">Location:<br/> <b>{locationName}</b></p>
   <p className="origin-para">Section:<br/> <b>{sectionName}</b></p>

   {
// if section items property exists, desplay element to list all items in a box transfer
sectionItems.hasOwnProperty('parent_section_name') &&
<DisplayOrigin sectionItems={sectionItems}/>
   }

   {// only rendered if transfer type is item
   boxDetails.hasOwnProperty('new_item_string') && 
   <p className="origin-para"><b>{boxName}</b></p>
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