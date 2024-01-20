import React from 'react'
import Videogame from '../videogame/Videogame'
import styles from './Videogames.module.css'

export default function Videogames({ allVideogames }) {
  
    
  return (
    <div className={styles.container}>
          {
          allVideogames?.map((vg) =>{
            return(
            <Videogame 
              key={vg.id}
              id={vg.id}
              name={vg.name}
              image={vg.image}
              genres={vg.genres}
              rating={vg.rating}
            />
            )
          })
        }
    </div>
  )
}
