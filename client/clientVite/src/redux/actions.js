import axios from 'axios'
import { GET_VIDEOGAMES,
        GET_VIDEOGAME_DETAIL,
        ORDER_BY_NAME,
        ORDER_BY_RATING,
        FILTER_BY_GENRES,
        CREATE_VIDEOGAME,
        GET_GENRES,
        GET_VIDEOGAMES_NAMES,
        CLEAN_FILTERS,
        UPDATE_FILTERS,
        CLEAN_DETAIL,
        CLEAN_VIDEOGAMES
 } from './action-types';

const URL = 'http://localhost:3001/videogames'

export const getGenres = () => {
  return async (dispatch) => {
    try {
      const { data } = await axios('http://localhost:3001/genres');
      //console.log("DATA FROM VIDEOGAMES IS ", data)
       return dispatch( { 
          type: GET_GENRES,
          payload: data.map(g => g.name)
        })
          
    } catch (error) {
      console.error('Error fetching genres:', error);
    }
  }
}

export const getVideogames = () => {
    return async  (dispatch)=> {
      try {
        const { data } = await axios(URL);
        //console.log("DATA FROM VIDEOGAMES IS ", data)
        const allPlatforms = [... new Set(data.map((vg) => vg.platforms).flat())]

         return dispatch( { 
            type: GET_VIDEOGAMES,
            payload: data,
            platforms: allPlatforms
          })
            
      } catch (error) {
        console.error('Error fetching videogames:', error);
      }
    };
  }
 
  export const getVideogamesNames = (name) => {
    return async (dispatch) => {
      try {
        const { data } = await axios(`${URL}?name=${name}`);
        //console.log("DATA FROM VIDEOGAMES IS ", data)

         return dispatch( { 
            type: GET_VIDEOGAMES_NAMES,
            payload: data
          })
            
      } catch (error) {
        console.error('Error fetching genres:', error);
      }
    }
  }

  export const getVideogameDetail = (id) => {
    return async (dispatch) =>{
      try {
        const { data } = await axios(`${URL}/${id}`)
          return dispatch( {
            type: GET_VIDEOGAME_DETAIL,
            payload: data
        })

      }catch (error){
        console.log(error)
      }
    }
  }

  export function cleanDetail (){
      return { 
        type: CLEAN_DETAIL
      }
  }

export function cleanFilters(){
  return{
  type: CLEAN_FILTERS
}
}

export function cleanVideogames(){
  return{
    type: CLEAN_VIDEOGAMES
}
}

  export function orderByName(payload){
    return{
      type: ORDER_BY_NAME,
      payload
    }
  }

export function orderByRating(payload){
  return{
    type: ORDER_BY_RATING,
    payload
  }
}

  export function filterByGenres(genre){
    return {
      type: FILTER_BY_GENRES,
      payload: genre
    }
  }

  export function updateFilters(filters){
    return {
    type: UPDATE_FILTERS,
    payload: filters
    }
  }


  export function createVideogame(input){
    return async function (dispatch){
      try {
        const { data } = await axios.post(URL+'/post', input)
        //console.log('Videogame created', data)

        return dispatch({
          type: CREATE_VIDEOGAME,
          payload: data
        })
      } catch (error){
        console.log(error)
      }
    }

  }

