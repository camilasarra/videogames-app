import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Videogames from '../videogames/Videogames'
import Pagination from '../pagination/Pagination'
import FilterBar from '../filterBar/FilterBar'
import Loading from '../loading/Loading'
import { useEffect } from 'react'
import SearchBar from '../searchBar/SearchBar'
import { getGenres, getVideogames } from '../../redux/actions'
import style from './Home.module.css'

export default function Home() { //podes poner props

  const allVideogames = useSelector((state) => state.allVideogames)
  const dispatch = useDispatch()

  const [currentPage, setCurrentPage] = useState(1)
  const videogamesPerpage = 15
  const indexOfLastVg = currentPage * videogamesPerpage;
  const indexOfFirstVg = indexOfLastVg - videogamesPerpage;
  const currentVg = allVideogames.length ? allVideogames.slice(indexOfFirstVg, indexOfLastVg) : []
  const paginate = pageNumber =>  setCurrentPage(pageNumber)
  const resetPage = () => setCurrentPage(1)
  const [isLoading, setLoading] = useState(false)

  useEffect(()=>{
    resetPage()

    if (!allVideogames.length){
      setLoading(true)
      dispatch(getVideogames()).then(() =>{
        setLoading(false)
      })

      
    }

  }, [allVideogames])

  return (

    <div> 
    <SearchBar />
    <FilterBar  resetPage={resetPage}/>

    { isLoading  
    ? <div className={style.container}><Loading /></div>
    : <div>

  
      <Videogames 
      allVideogames= {currentVg}
      currentPage={currentPage}
      videogamesPerPage={videogamesPerpage}
      />

      <br />
    <Pagination videogamesPerPage={videogamesPerpage} 
      totalVideogames={allVideogames.length} 
      paginate={paginate}/> 

    </div> 
    
    }
     
    </div>
  )
} 