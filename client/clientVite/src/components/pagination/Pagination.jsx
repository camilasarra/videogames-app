import React from 'react'
import style from './Pagination.module.css'


export default function Pagination( { videogamesPerPage, totalVideogames, paginate }) {

  
  const pageNumbers = [];

  for(let i = 1; i <= Math.ceil(totalVideogames / videogamesPerPage); i++){
    pageNumbers.push(i)
  }


  return (
    <div className={style.container}>
            { pageNumbers.map(number => (
                <a className={style.numbers} key={number} href='#' onClick={() => paginate(number)}>{number}</a>
              ))}
    </div>
)
           
}

