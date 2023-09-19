const db = require('../models')
const jwt = require("jsonwebtoken")
const authorService = require('../services/authorServices.js')
const {authorDTO} = require('../utils/authorDTO.js')
const {sendResponse} = require('../utils/response.js')
const Author = db.authors


// 2. view one Author

const getAuthorById = async (req, res) => {
  try {
    let authorId = req.params.authorId
    let author = await authorService.getAuthorById(authorId)
    
    sendResponse(res,authorDTO(author),200)
  }
 catch{
  res.status(500).json({ message: 'Internal Server Error' });
 }
  
}

//view all author
const getAllAuthors = async (req, res) => {
  try {
    const authors = await authorService.getAllAuthors();
    const authorsDTOArray = authors.map(author => authorDTO(author));
   
    sendResponse(res,authorsDTOArray,200)
    console.log(authors);
  } catch (error) {
    console.error('Error fetching authors:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};


module.exports = {
  getAuthorById,
  getAllAuthors
}