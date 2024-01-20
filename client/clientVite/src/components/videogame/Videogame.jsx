import React from 'react'
import { Link } from 'react-router-dom';
import style from '../videogame/Videogame.module.css'

const Videogame= ( { id, name, image, genres,rating}) => {
 
  return (
    <div className={style.container}>
    <div className={style.background}>

    <div className={style.gallery}>

      
      <Link to={`/detail/${id}`}>
        {image ? (
      <img src={image} alt={name} className={style.imgvg}/>

        ) : (
          <p>imagen no disponible</p>
        )}
      <h1 className={style.name}>{name}</h1>
    </Link>
      <div className={style.overlay}>
    <div className={style.ratingContainer}>

    <div className={style.rating}></div>
    <h3 className={style.number}>{rating}</h3>  

    </div>
    {
      genres ? <h2>{genres.join(' - ')}</h2> : ''
      
    }
    </div>
   </div>
   
     </div>
     </div>
  )
}

export default Videogame;
