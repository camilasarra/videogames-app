import React, { useState } from 'react'
import { useSelector, useDispatch } from "react-redux"
import { getVideogamesNames } from '../../redux/actions'


export default function SearchBar() {
 
const dispatch = useDispatch()
 const [name, setName] = useState("")
 const [prevName, setPrevName] = useState("")

 function handleInputChange(event){
     event.preventDefault()
     setName(event.target.value)
     //console.log("NAME:", name)    
 
//console.log("videogames names:", videogamesNames)
 }

function handleSubmit(event){
  //console.log("HOLA", event);
  event.preventDefault()
  setPrevName(name)
  dispatch(getVideogamesNames(name))
  setName("")
}
  
return (
   <div>
        <form onSubmit={(event) => handleSubmit(event)}>
      <input 
              type="text"
              onChange={(event) => handleInputChange(event)}
              />
      <button  
              type='submit' 
              >Search by Name</button>
        </form>
    </div>
)
}