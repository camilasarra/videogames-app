require('dotenv').config() 
const { API_KEY } = process.env
const axios = require('axios')
const { Op } = require('sequelize')
const  {Genres} = require('../db')

const getGenres = async (req, res) => {
    console.log("GETTING GENRES");
    try {
        const { data } = await axios.get(`https://api.rawg.io/api/genres${API_KEY}`)
        
        const apiGenres = data.results.map(genre => ({
            name: genre.name.toLowerCase(),
            id: genre.id
        }))
    
       console.log(apiGenres)
    
        await Promise.all(apiGenres.map(async (apiGenre) => {
            await Genres.findOrCreate({
                where: {
                    id:apiGenre.id
                },
                defaults: apiGenre,
            })
        }))
    
        const allGenres = await Genres.findAll({
            attributes: ['id', 'name']
        });

        console.log("ALL GENRES IN DB > ".allGenres)

        const genresSplit = allGenres.map((genre) => ({
            ...genre.dataValues,
            name: genre.name.split(', ')
        }))
        res.status(200).json(allGenres);
    
      } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Error al obtener los generos"})
      }
        }; 

module.exports = getGenres;