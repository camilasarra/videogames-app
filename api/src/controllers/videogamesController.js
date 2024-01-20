require('dotenv').config() 
const { API_KEY } = process.env
const axios = require('axios')
const { Op } = require('sequelize')
const { Videogames, Genres } = require('../db')

const getVideogames = async function (req, res) {
    
    const { name } = req.query;
    
    if (name){
        try {
            const dbNameVg = await Videogames.findAll({
                where: {
                    name: {
                        [Op.iLike]: `%${name}%`
                    }
                }   
            })
            
        const diferencia = 15 - dbNameVg.length;
    
        const apiNameRes = await axios.get(`https://api.rawg.io/api/games?key=283edef6530c4583be725ffde5407e64&search=${name}`);
            //console.log(apiNameRes.data.results)
            
        const nameVideogames = apiNameRes.data.results.map(videogame => ({
                id: videogame.id,
                name: videogame.name,
                image: videogame.background_image,
                 rating: videogame.rating,
                genres: videogame.genres.map((genre) => genre.name.split(" ").join().toLowerCase()),
                source: "api"
                
            }))
            .slice(0, diferencia)
           
    
             const allVideogames = [...dbNameVg, ...nameVideogames];
             //console.log("all videogames ", allVideogames)
    
            if(allVideogames.length === 0){
               return res.status(404).json({ error: 'No se encontraron videogames con ese nombre'})
            }
    
            return res.status(200).json(allVideogames);
    
        } catch (error) {
                //res.status(500).json({ error: "Error al buscar videogames por nombre"})
                console.log(error);
                res.status(500).json(error)
        }
    } else {

        //si no hay name trae todos los videojuegos
        try {
            let videogamesApi = []
            let next = ""

            const { data } = await axios.get(`https://api.rawg.io/api/games${API_KEY}`)
            videogamesApi.push(...data.results)
            next = data.next

            for(let i = 0; i < 4; i ++){
                const { data } = await axios.get(next)
                videogamesApi.push(...data.results)
                next = data.next
            }
          
            //console.log("LENGTH IS: ", videogamesApi.length)
           //const response = await axios.get(data.next)
    
           const dbGames = await Videogames.findAll({
                include: {
                    model: Genres,
                    attributes: ['name'],
                    through: {
                        attributes: []
                    }
                }
            })
            
        const apiVideogames = videogamesApi.map( videogame => ({
                id: videogame.id,
                name: videogame.name,
                image: videogame.background_image,
                genres: videogame.genres.map((genre) => genre.name.split(" ").join().toLowerCase()),
                rating: videogame.rating,
                platforms: videogame.platforms.map(p => p.platform.name).join(', '),
                source: 'api'
            }))
    
            //console.log("adapted api games :", apiVideogames[0])
            //console.log("games in DB", dbGames[0].dataValues)
         
            const adaptedGames = dbGames.map( videogame => ({
                //...videogame.dataValues,
                id: videogame.id,
                name: videogame.name,
                image: videogame.image,
                genres: videogame.Genres.map((genre) => genre.dataValues.name),
                rating: videogame.rating,
                platforms: videogame.platforms,
                source: "db"
            }))
          
           //console.log("adapted games :", adaptedGames)
    
            const results = [...adaptedGames, ...apiVideogames]
    
            //console.log(apiVideogames)
            res.status(200).json(results)
            
        } catch (error) {
            console.log("ERROR GETTING VGS ", error)
          res.status(500).json({error: "Error al obtener la lista de videojuegos"})
        }
    }   


}

const getVideogamesName = async function (req, res){
}

const postNewVideogame = async function (req, res){
    //console.log("req body is > ", req.body)
        
        try {
            console.log("request body > ", req.body)
            const { id, name, description, platforms, image, released, rating, genres } = req.body
              console.log(genres)
            const newVideogame = await Videogames.create({
                id,
                name,
                description,
                platforms,
                image,
                released, 
                rating,
                
            })
    
         console.log("VIDEOGAME CREATED: ", newVideogame.image)

         try {

            const genreInstance = await Genres.findAll({
                where: { name : genres }
               })
    
               //console.log("genre in DB", genreInstance)
    
               if(genreInstance.length > 0){
    
                await newVideogame.addGenre(genreInstance)
    
                res.status(201).json(newVideogame)
    
               } else {
                    res.status(400).json({ error: "Genres not found"})
               }


         } catch(e){console.log("DATABASE ERROR ", e)}
         
          
        } catch (error) {
            console.log(error)
            res.status(500).json({ error: error.message})
        }
    
}

const getVideogamesId = async function (req, res){
    const { id } = req.params
    let videogame = {}

    if ( id.toString().length > 6) {

        videogame = await Videogames.findOne({
            where: {
                id: id
            },
            include: {
                model: Genres,
                attributes: ['name'],
        }
    })

    const newGenres = videogame.Genres.map( g => g.dataValues.name)

    const result = {
        ...videogame.dataValues,
        genres: newGenres
    }

        return res.status(200).json(result)


    } else {

        try {
            //buscar el vg en la api
            const apiResponse = await axios.get(`https://api.rawg.io/api/games/${id}${API_KEY}`);
            const apiVideogame = apiResponse.data;
              
            //console.log('la data de la api es:', apiResponse.data)
            
            if(!apiVideogame) return res.status(404).json({ error: "Videogame not found"})
        
            const response = {
                id: apiVideogame.id,
                name: apiVideogame.name,
                image: apiVideogame.background_image,
                platforms: apiVideogame.platforms.map(p => p.platform.name).join(', '),
                released: apiVideogame.released,
                rating: apiVideogame.rating,
                genres: apiVideogame.genres.map(g => g.name),
                description: apiVideogame.description.replace(/<\/?p>|<br\s*\/?>/g, "")
            }
            
            res.status(200).json(response)
            //console.log(response)
    
        } catch (error) {
            res.status(500).json({ error: "error getting the details"})
        }
    }
}


module.exports = {
    getVideogames,
    getVideogamesName,
    postNewVideogame,
    getVideogamesId,
};