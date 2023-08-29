export const Form = ({createFunction, placeholder, value, newValue, setFunction, label, buttonName, formClicked}) =>{

    return (
        <>
          <form className='new-item-form' id="item-creation-form" onSubmit={createFunction}>
          <label htmlFor="new-item-text">{label}</label>
<input value={value} id='new-item-text' type="text" placeholder={placeholder} 
onChange={e => setFunction(e.target.value)}
onClick={() =>{formClicked(label)}}
  />

<button type="submit" className="add-item"

>{buttonName}</button>
</form>
<h4 className="sections-title">{newValue}</h4>
        
        
        </>
    )

}