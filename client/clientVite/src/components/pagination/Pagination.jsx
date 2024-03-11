
import React from 'react';
import style from './Pagination.module.css';

export default function Pagination({ videogamesPerPage, totalVideogames, paginate }) {

    const pageNumbers = [];
  
    for (let i = 1; i <= Math.ceil(totalVideogames / videogamesPerPage); i++) {
      pageNumbers.push(i);
    }
  
    return (
      <div className={style.container}>
        <div className={style.first} href="#" onClick={() => paginate(1)}>
        
        </div>
        {pageNumbers.map(number => (
          <a className={style.numbers} key={number} href='#' onClick={() => paginate(number)}>{number}</a>
        ))}
        <div className={style.last} href="#" onClick={() => paginate(Math.ceil(totalVideogames / videogamesPerPage))}>
       
        </div>
      </div>
    );
}