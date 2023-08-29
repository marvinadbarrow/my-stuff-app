export const BackToSectionViewerButton = ({testCloseSection, nameOfLocation}) =>{


        return(
    
            <>
<button className="close-location back-btn" onClick={testCloseSection}>{nameOfLocation}</button>
            </>
        )
    }
