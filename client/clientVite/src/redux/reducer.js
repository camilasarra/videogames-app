import { GET_VIDEOGAMES, 
    GET_VIDEOGAME_DETAIL,  ORDER_BY_NAME, ORDER_BY_RATING ,FILTER_BY_GENRES,
    CREATE_VIDEOGAME, GET_GENRES, GET_VIDEOGAMES_NAMES, CLEAN_FILTERS, 
    UPDATE_FILTERS, CLEAN_DETAIL, CLEAN_VIDEOGAMES
 } from "./action-types";

const aplyOrder = (videogames, order) => {

    switch(order){
        case "az":
            return videogames.sort( (a,b) => a.name.toLowerCase().localeCompare(b.name.toLowerCase()))
        case "za":
            return videogames.sort( (b,a) => a.name.toLowerCase().localeCompare(b.name.toLowerCase()))
        case "higher":
            return videogames.sort( (a,b) =>  b.rating - a.rating )
        case "lower":
            return videogames.sort( (b,a) =>  b.rating - a.rating )
        default:
            return videogames

    }
}

const initialState = { 
    allVideogames: [],
    videogamesCopy: [], // la copia del estado para no perder nada cuando modificamos filtrando x ej
    videogameDetail: {},
    videogamesNames: [],
    genres: [],
    platforms: [],
    filteredGames: [],
    isFiltered: false,
    filters: {}
}

const reducer = (state = initialState, action) =>{
    switch(action.type){
       case GET_GENRES:
           return {
            ...state,
            genres: action.payload
           }

        case GET_VIDEOGAMES:
            return {
            ...state,
            allVideogames: action.payload, //guardo en el estado la info que traigo
            videogamesCopy: action.payload
            }


        case GET_VIDEOGAME_DETAIL:
            return {
                ...state,
                videogameDetail: action.payload
            }


        case GET_VIDEOGAMES_NAMES:
            return {
                ...state,
                filteredGames: action.payload,
                allVideogames: action.payload,
                
            }
        
        case CLEAN_VIDEOGAMES:
            return {
                ...state,
                allVideogames: []
            }

       
        case CLEAN_FILTERS:
           return {
            ...state,
            allVideogames: state.videogamesCopy,
            filteredGames : [],
            filtered: false
        }

        case CLEAN_DETAIL:
            return {
                ...state,
                videogameDetail:{}
            }
                
        case CREATE_VIDEOGAME:
                return {
                    ...state,
                    allVideogames: action.payload, //guardo en el estado la info que traigo
                    videogamesCopy: action.payload
                }

        case UPDATE_FILTERS:
            //console.log("UPDATING FILTERS", action.payload)
               
            const {source, genres, order} = action.payload
                
                let games = !state.isFiltered ? [...state.videogamesCopy] : [...state.filteredGames]
                
                //console.log ("GAMES : ", games)
                let filteredBySource = []
                let filteredByGenre = []
                let orderedGames = []

                //console.log("games starts with", games)

                if (source != null && source !== "all"){
                    
                    filteredBySource = games.filter( v => v.source === source)
                    
                }
               // console.log("BY SORCE : ", filteredBySource);
                
                if (genres !== null && genres !== "all"){

                   // console.log("genres is ", genres)
                    
                    filteredByGenre = filteredBySource.length > 0
                    ? filteredBySource.filter( v => v.genres.includes(genres))
                    : games.filter( v => v.genres.includes(genres))
                    
                }
                
                //console.log("BY GENRE : ", filteredByGenre);
                    
                orderedGames = filteredByGenre.length > 0
                    ? aplyOrder(filteredByGenre, order)
                    : filteredBySource.length > 0
                        ? aplyOrder(filteredBySource, order)
                        : aplyOrder(games, order)
                    //console.log("ORDERED :", orderedGames)
                return {
                    ...state,
                    allVideogames: orderedGames
                }


        default:
            return { ...state }
    }
}

export default reducer;