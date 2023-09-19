const db = require('../models')
const jwt = require("jsonwebtoken")
const {sendResponse} = require('../utils/response.js')
const Author = db.authors
const bcrypt = require('bcrypt');
//const { isEmailAlreadyUsedMiddleware } = require('../middleware/validation');
//const validator = require('../utils/validator');
//create author

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
                console.log(token)
                res.status(200).json(token)
            }
            sendResponse(res,{token},200)
        }) 
    } catch(error) {
        console.log(error)
        next(error);
    }
}
// login
const loginAuthor = async (req, res) => {
    try {
        
        const author = await Author.findOne({
            where: {
                email: req.body.email
            }
        });
        if (!author) {
            return res.status(401).send("Authentication failed");
        }
        
        
        const isSame = await bcrypt.compare(req.body.password, author.password);
        if (!isSame) {
            return res.status(401).send({
                message: "Email or Password doesn't Match"
            });
        }
        
        jwt.sign({ authorId: author.authorId }, process.env.SECRET_KEY, { expiresIn: '3000s' }, (err, token) => {
            if (err) {
                console.error(err)
                return res.send('Error');
            }
            console.log(token);
            // return res.json({
            //     token
            // })
            sendResponse(res,token,200)
        })
        
        
    } catch (error) {
        next(error)
    }
};








module.exports = {
    addAuthor,
    loginAuthor
}

