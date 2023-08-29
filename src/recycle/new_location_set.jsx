import { useState } from "react"

const NewLocationSetter = () =>{

    const [location, setLocation] = useState('')

const submitForm = (e) =>{
    setLocation({

    })
    e.preventDefault()
    console.log('processing input...')
}
// in the form the anonymous function on submit prevents the default so the page won't refresh
    return(
        <>
        <form id="location-creation-form" onSubmit={submitForm}>
        <input type="text" placeholder='New Location' onChange={e => setLocation} /><br/>
<button type="submit" className="add-location">Add New Location</button>
</form>
        </>
    )
}

export default NewLocationSetter