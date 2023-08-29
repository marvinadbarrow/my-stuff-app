import { useState } from 'react'
import { SearchButton } from './SearchButton';
import { Form } from './Form';
import { BackToStartButton } from './BackToStartButton';
export function NewLocationForm({ formSubmit, closeMainArea, openSearch }) {
    const [location, setLocation] = useState('')

function createLocation (e) {
e.preventDefault();
if(location.length < 3) return
formSubmit(location)
setLocation('')
  }

  const backToStartPage = () =>{
        closeMainArea('start page')
    }

    return(
    <>
<SearchButton   openSearch={openSearch}  />
<div className="inner-location">
<BackToStartButton functionName={backToStartPage} />
</div>
<Form createFunction={createLocation} placeholder={'Add a New Location'} label={'New Location'} value={location} newValue={'My Locations'} setFunction={setLocation} buttonName={'Add'}/>
    </>
    )
}


