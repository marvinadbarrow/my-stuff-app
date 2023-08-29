export const BackToBoxViewerButton = ({backToBoxViewer, nameOfSection}) =>{

    
        return(
    
            <>
<button className="close-location back-btn" onClick={backToBoxViewer}>{nameOfSection}</button>
         </>
        )
    }