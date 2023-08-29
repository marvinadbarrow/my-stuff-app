import { useEffect, useState } from 'react'
import './App.css'
import { SearchForm } from './SearchForm'
import { SearchResults } from './SearchResults'

export  const SearchPage = ({results, closeSearch, allItemsArray, container, openAllLocations, openSection, openLocation, sectionId, parentId, areaSpecific, preSearchArea, boxDetails, openBox}) =>{
const [searchResults, setSearchResults] = useState([])
const [resultsAdvice, setResultsAdvice] = useState(0)

console.log(container)
function   searchCirteria(search){





    const results = allItemsArray.filter(objects => objects.item_name.toLowerCase().includes(search));
    results.length < 1 ? setResultsAdvice(1):  setResultsAdvice(2)
  setSearchResults([...results])
}


    return(
    <>




<SearchForm closeSearch={closeSearch} searchCirteria={searchCirteria} openAllLocations={openAllLocations} openSection={openSection} parentId={parentId} sectionId={sectionId} areaSpecific={areaSpecific} preSearchArea={preSearchArea} openLocation={openLocation} container={container} boxDetails={boxDetails} openBox={openBox}/>

{resultsAdvice === 0 && 'No searches yet'}
{resultsAdvice === 1 && 'No such item in storage'}
{resultsAdvice === 2 &&

<h4>Number of results: {searchResults.length}</h4>
}

<SearchResults searchResults={searchResults} container={container}/>
    </>
    )
    
    }