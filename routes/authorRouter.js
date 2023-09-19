const authenticationController =  require('../controllers/authenticationController.js')
const authorController = require('../controllers/authorController.js')
const router = require('express').Router()
const { missingSignUpFieldMiddleware, missingLogInFieldMiddleware, isEmailAlreadyUsedMiddleware, validationMiddleware } = require('../middleware/validation.js');


router.post('/signup', missingSignUpFieldMiddleware, validationMiddleware, isEmailAlreadyUsedMiddleware, authenticationController.addAuthor)

router.post('/login', missingLogInFieldMiddleware,validationMiddleware, authenticationController.loginAuthor)

router.get('/', authorController.getAllAuthors)

router.get('/:authorId', authorController.getAuthorById)



module.exports= router;