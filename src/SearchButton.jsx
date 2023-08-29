




export const SearchButton = ({openSearch, generalArea, location}) =>{

generalArea !== undefined ? console.log(`
general area: ${generalArea}
specific location: ${location}
`) : console.log('not box area')

    return(

        <>
        <div className='start-page-btns-div'>
<button className="search-page-btn" onClick={() =>{openSearch("search page", generalArea);
}}>Search Items </button> 
</div>
        </>
    )
}