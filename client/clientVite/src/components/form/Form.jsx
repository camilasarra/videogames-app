import React, { useEffect, useState } from 'react'
import validation from './validation'
import { useDispatch, useSelector } from 'react-redux'
import { createVideogame, getGenres } from '../../redux/actions'
import { useNavigate } from 'react-router-dom'
import Button from '../button/button'
import styles from './Form.module.css'

export default function Form() {
const dispatch = useDispatch()
const genres = useSelector((state) => state.genres)
const navigate = useNavigate()

//console.log("STATE:", videogamesState)
//console.log('GENRES ', genres)

const [showButton, setShowButton] = useState(false)

const [ input, setInput] = useState({
      name: '',
      description: '',
      platforms: '',
      rating: '',
      released: '',
      imageURL: '',
      genres: []
})

const [errors, setErrors] = useState({ //dai lo deja vacio
  name: '',
  description: '',
  platforms: '',
  rating: '',
  released: '',
  imageURL: '',
  genres: ''
})//para almacenar los errores

useEffect(()=>{
  if(!getGenres.length){
    dispatch(getGenres())
  }
}, [])

function handleGenreChange(genre){

  if(genre === null){
    return
  }
  //console.log("genre chnge", genre)
 
  if (input.genres.includes(genre)) {
 
    setInput({
    ...input,
    genres: input.genres.filter( g => g !== genre)
    })
  
  } else {
    setInput({
    ...input,
   genres: [...input.genres, genre]
    })

  }
}

function handleChange(event){

  setInput( {
    ...input,
    [event.target.name]: event.target.value
  })

  const err = validation(input)
  setErrors(err)

  //console.log("ERRORS FROM VALIDATION :" , err)

  if(!err.description && !err.genres && !err.name){
    setShowButton(true)
  }
}
//console.log("input is", input)

function handleSubmit(event){
  event.preventDefault()
  //console.log("SUBMITTING", event)

  function handleRemoveGenreFromInput(selectedGenre) {
    const updatedGenres = input.genres.filter((genre) => genre !== selectedGenre);
    setInput({
      ...input,
      genres: updatedGenres,
    });
  }
   
  dispatch(createVideogame(input))

  
  setInput({
    name: '',
    description: '',
    platforms: '',
    rating: '',
    released: '',
    image: '',
    genres: []
  })
  alert("Videogame created")
  navigate('/home')
}

//console.log("show is ", showButton)

  return (
    <div className={styles.container}>
      <div className={styles.button}>
        <Button path='/home' text='Go Back' />

      </div>
      
      <form onSubmit={handleSubmit}>

        <label htmlFor="name" className={styles.nameLabel}>
        <input 
        name="name"
        type="text" 
        id='name' 
        placeholder='Videogame Name'
        value={input.name}
        onChange={handleChange}
        className={styles.nameInput}
        />
        </label>
      
      <br />

        <label htmlFor="description" className={styles.description}>
        <input type="text" 
               id='description' 
               name='description' 
               placeholder='Description'
               value={input.description}
               onChange={handleChange}
               className={styles.description}
               />
        </label>

       <br />
        <label htmlFor="platforms">
         
          <select
            id="platforms"
            name="platforms"
            value={input.platforms}
            onChange={handleChange}
            className={styles.platforms}
          >
           <option value="" className={styles.option}>--choose a Platform--</option>
           <option value="playstation">PlayStation</option>
                <option value="nintendoSwitch">Nintendo Switch</option>
                <option value="pc">PC</option>
                <option value="xboxOne">Xbox One</option>
                <option value="macOS">MacOs</option>
                <option value="android">Android</option>
                <option value="linux">Linux</option>
                <option value="Xbox360">Xbox 360</option>
         
            </select>
            </label> 
<br />

        <label htmlFor="rating">
        <input type="text" 
        id='rating' 
        name='rating' 
        placeholder='Rating'
        value={input.rating}
        onChange={handleChange}
        className={styles.rating}
        />
        </label>
<br />

        <label htmlFor="released">
        <input type="date" 
        id='released' 
        name='released' 
        placeholder='Released date (MM/DD/YYYY)'
        value={input.released}
        onChange={handleChange}
        className={styles.date}
        />
        </label>

<br />
        <label htmlFor="image">
          <input type="url" 
          id="image" 
          name="image" 
          placeholder="Image URL" 
          value={input.image}
          onChange={handleChange}
          className={styles.image}
          />
        </label>

<br />
       <label htmlFor="genres">Genres:</label>
      <div className={styles.customSelect}>
        <div className={styles.selectedGenres}>
          {input.genres.map((selectedGenre) => (
            <div key={selectedGenre} className={styles.selectedGenre}>
              {selectedGenre}
              <span onClick={() => handleRemoveGenreFromInput(selectedGenre)}></span>
            </div>
          ))}
        </div>
        <select
          id="genres"
          name="genres"
          value={null}
          onChange={(e) => handleGenreChange(e.target.value)}
          multiple={true}
        
        >
          {genres.map((genre) => (
            <option key={genre} value={genre}>
              {genre}
            </option>
          ))}
        </select>
      </div>
         

        {errors.name ? <div>{errors.name}</div> : ''}
         { errors.description ? <div>{errors.description}</div> : ''}
          {errors.platforms ? <div>{errors.platforms}</div> : ''}
         {errors.rating ? <div>{errors.rating}</div> : ''}
         {errors.released ?<div>{errors.released}</div> : ''}
         {
          showButton ? <button type="submit" >Create Videogame</button> : ""

         }

        
      </form>
    </div>
  )
}
