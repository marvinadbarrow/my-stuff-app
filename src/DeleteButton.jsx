export const DeleteButton = ({className, name, deleteFunction, id}) =>{

console.log(className, name, deleteFunction, id)
    return(

<>
<button className={className}  name={name} onClick={() =>{deleteFunction(id)}} >DELETE</button>



</>

    )
}