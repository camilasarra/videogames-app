const {Router} = require("express")

const { getVideogames, 
    getVideogamesId, 
    getVideogamesName,
    postNewVideogame,
    getVideogamesPages
} = require('../controllers/videogamesController')

const videogamesRouter = Router() 

videogamesRouter.get('/videogames', getVideogames)

videogamesRouter.get('/videogames/name', getVideogamesName)

videogamesRouter.post('/videogames/post', postNewVideogame)

videogamesRouter.get('/videogames/:id', getVideogamesId)


    

module.exports = videogamesRouter