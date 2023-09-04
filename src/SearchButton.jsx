




export const SearchButton = ({openSearch, generalArea, location}) =>{

    return(

        <>
        <div className='start-page-btns-div'>
<button className="search-page-btn" onClick={() =>{openSearch("search page", generalArea);
}}>Search Items </button> 
</div>
        </>
    )
}