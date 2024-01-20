


function validation(input){
  let errors = {}
  
  if (!input.name.trim()) {
    errors.name = "The name is required";
  } else if (input.name.length < 3 || input.name.length > 50) {
    errors.name = "The videogame name must be between 3 and 50 characters";
  }
  
  if(input.description.length > 100 || input.description.length < 1){
     errors.description = "There must be a description"
  }
  if(!input.description) errors.description = "The description is required"

  if(isNaN(parseFloat(input.rating)) || input.rating < 1 || input.rating > 5){
    errors.rating = "Rating must be  valid number between 1 and 5"
  }

  if(!input.rating) errors.rating = "The rating from 1 to 5 is required"
  if(!input.platforms) errors.platforms = "The platform is required"
  if(!input.released) errors.released = "The released date is required"
  if(!input.genres || input.genres.length === 0) errors.genres = "The genres are required"
  

  return errors
}

export default validation;

/* 
const validate= (input) => {
   
}

hay que agregar la verificacion de que no llegue ningun campo vacio
*/