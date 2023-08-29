import { SearchButton } from './SearchButton';
import { AllLocationsButton } from './AllLocationsButton';
import { Form } from './Form';
export  const NewSectionForm = ({location, backToLocations, createSection, section, setSection, openSearch}) =>{

    return (
<>
<SearchButton   openSearch={openSearch} generalArea={'location'} location={location}/>
<div className="inner-location">
<AllLocationsButton backToLocations={backToLocations}/>
    </div>
    <Form setFunction={setSection} createFunction={createSection} placeholder={'Add a New Section'} value={section} newValue={location} label={'New Section'} buttonName={'Add'}/>
</>

    )
}

