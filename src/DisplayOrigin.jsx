import { v4 } from "uuid";

export const DisplayOrigin = ({sectionItems}) =>{


    return (<>
        <div className="transfer-box-output small-border">
        <p className="transfer-box-heading"><b>Box contents:</b></p>
        <ul key={v4()} className="box-contents-for-transfer">
        <div className="list-div"> 
            { // this DIV will only display 5 or 6 box items; boxes having > 6 items will causes the y-overflow to be hidden and the y-axis scrollbar will appear; user can also mousewheel scroll down to view the rest of the box items. List items alternate in color for easier readability
                sectionItems.box_contents.map(contents =>{
        return(
            <li key={contents.id} className="transfer-box-item">{contents.itemString}</li>
        )
                })
            }
        </div>
        </ul>
        </div>
        </>)
}