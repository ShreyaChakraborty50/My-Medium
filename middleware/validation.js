const db = require('../models')
const Author = db.authors

const { customError } = require('../errorHandler/customError');
const validator = require('../utils/validator');


const missingSignUpFieldMiddleware =  (req,res,next) =>{
   
    if (!req.body.name || !req.body.email || !req.body.password) {
        
        next(customError(400,"Email or password missing."))
        
    }
   
    next()
}
const missingLogInFieldMiddleware =  (req,res,next) =>{
    if ( !req.body.email || !req.body.password) {
        
        next(customError(400,"Email or password missing."))
    }
    
    next()
}

const isEmailAlreadyUsedMiddleware = async(req, res, next) =>{
   
    try{
        const used = await Author.findOne({ where:  { email : req.body.email } });
        console.log(used)
        if (!used){
            console.log("Hello")
            next();
        }
        console.log("Hello")
        next(customError(400, 'Email already in use'))
    }
    catch(error){
        next(customError(500, 'Internal Server Error'))
    }     
   
}

const validationMiddleware = (req, res, next) => {
    try {
        if (!validator.isEmailValid(req.body.email)) {
           
            next(customError(400,"Email is invalid"))
        }

        if (!validator.isPasswordValid(req.body.password)) {
            
            next(customError(400, 'Password must be 8 characters long!'))
        }

        next();
    } catch(error) {
        // error.message = "Something wrong with user provided input!"
        // error.statusCode = 500
        // next(error)
        next(customError(500, 'Something wrong with user provided input!'))
    }
}

module.exports = {
    missingSignUpFieldMiddleware,
    missingLogInFieldMiddleware,
    isEmailAlreadyUsedMiddleware,
    validationMiddleware
}