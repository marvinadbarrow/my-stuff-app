export const Form = ({createFunction, placeholder, value, newValue, setFunction, label, buttonName, formClicked}) =>{


    return (
        <>
          <form className='new-item-form' id="item-creation-form" onSubmit={createFunction}>
          <label htmlFor="new-item-text">{label}</label>
<input value={value} id='new-item-text' type="text" placeholder={placeholder} 
onChange={e => setFunction(e.target.value)}
onClick={() =>{
 // the purpose of formClicked() is to reset the search field when user clicks into the input on the search page. As such it should only run when the form is returned is the search form; so set a condtion with shortcutting, to only run the function when the placeholder string is 'search item'. This will stop errors appeasing when user is trying to add a new location, section, box or item, which require clicking into a form input. 
  placeholder == 'search item' &&  
  formClicked(label)}}
  />

<button type="submit" className="add-item"

>{buttonName}</button>
</form>
<h4 className="sections-title">{newValue}</h4>
        
        
        </>
    )

}