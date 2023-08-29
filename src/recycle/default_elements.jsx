const DefaultImages = () =>{

    return (
<>
<div className="locations-container">
  <h2 className="locations-title">My Locations</h2>
<div className="locations-shelf">



{container.map(container =>(
// forEach could be used here also and maybe it's better because you can console loge to check what's going on 

<div key={container.id} className="location">
<p className="location-name">{container.name}</p>
<div className="image-container"><img src={containerImage} alt="cabinet image" className="container-img" /></div>
</div>


))}



  </div>
  
  </div>

  
</>

    )
}

export default DefaultImages