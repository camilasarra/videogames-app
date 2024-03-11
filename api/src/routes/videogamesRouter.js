const {Router} = require("express")

const { getVideogames, 
    getVideogamesId, 
    getVideogamesName,
    postNewVideogame,
} = require('../controllers/videogamesController')

const videogamesRouter = Router() 

videogamesRouter.get('/', getVideogames)

videogamesRouter.get('/name', getVideogamesName)

videogamesRouter.post('/post', postNewVideogame)

videogamesRouter.get('/:id', getVideogamesId)


    

module.exports = videogamesRouter