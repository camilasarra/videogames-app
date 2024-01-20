import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { cleanFilters, updateFilters } from '../../redux/actions'


export default function FilterBar() {

    const [filters, setFilters] = useState({
        source: "",
        genres: [],
        order: null
    })

    useEffect(()=>{

           dispatch(updateFilters(filters)) 

    },[filters])

    
    const dispatch = useDispatch();

    const genres = useSelector((state) => state.genres)
    // console.log(videogames)

    useEffect(()=> {
      return () => {
        dispatch(cleanFilters())
      }
  }, [])

  
    function handleFilter(event) {
     setFilters({
        ...filters,
        [event.target.name]:event.target.value
     })
        
    } 
   
    function clearFilters(){
      setFilters({
        source: '',
        genres: [],
        order: null
      })
    }
   //    console.log("filters", filters)

  return (
    <div>

<select
 id="source"
 name="source"
 onChange={handleFilter}
>
            
            <option value="all">All videogames</option>
            <option value="api">API videogames</option>
            <option value="db">DB videogames</option>
            </select>
 
          <select
            id="genres"
            name="genres"
            value={filters.genres} 
            onChange={handleFilter}
            >
  
              <option disabled >Genres</option>
              <option value="All">All</option>
            
            {genres.map(g => (
              <option key={g} defaultValue="genres" value={g}>{g}</option>
            ))}

            </select>
           
            <select name="order" onChange={handleFilter}>
          <option value=""  defaultValue='order'>
            order
          </option>
          <option value="az">A - Z</option>
          <option value="za">Z - A</option>
          <option value="higher">higher rating</option>
          <option value="lower">lower rating</option>
        
        </select>
        <button onClick={clearFilters}>Clear Filters</button>
    </div>
  )
}
