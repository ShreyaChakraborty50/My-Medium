const db = require('../models')
const jwt = require("jsonwebtoken")
const {sendResponse} = require('../utils/response.js')
const Author = db.authors
const bcrypt = require('bcrypt');


const addAuthor = async (req, res, next) => {
    try {
        let info = {
            name: req.body.name,
            email: req.body.email,
            password: await bcrypt.hash(req.body.password, 10)
        }
        
        const author = await Author.create(info)
        console.log(author.authorId);
        
        jwt.sign({ authorId: author.authorId }, process.env.SECRET_KEY, { expiresIn: '3000s' }, (err, token) => {
            if (err) {
                next(err)
            }
            else {
                
                res.status(200).json(token)
            }
            sendResponse(res,{token},200)
        }) 
    } catch(error) {
       
        next(customError(403,"Unauthorized."));
    }
}

const loginAuthor = async (req, res) => {
    try {
        
        const author = await Author.findOne({
            where: {
                email: req.body.email
            }
        });
        if (!author) {
            
            throw(customError(401,"Authentication failed."))
        }
        
        
        const isSame = await bcrypt.compare(req.body.password, author.password);
        if (!isSame) {
           
            throw(customError(401,"Email or Password doesn't match."))
        }
        
        jwt.sign({ authorId: author.authorId }, process.env.SECRET_KEY, { expiresIn: '3000s' }, (err, token) => {
            if (err) {

                throw(customError(401,"Error while creating token."))
            }
            
            
            sendResponse(res,token,200)
        })
        
        
    } catch (error) {
        next(error)
        throw(customError(403,"Unauthorized."))
    }
};








module.exports = {
    addAuthor,
    loginAuthor
}

