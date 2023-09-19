const db = require('../models')
const Author = db.authors

//view one author
const getAuthorById = async (authorId) => {
   
    const blog = await Author.findOne({ where: { authorId: authorId}});
    console.log(blog)
    return blog;

};

const getAllAuthors = async () => {
   
    const authors = await Author.findAll();
    return authors;

};




//view all authors

module.exports = {
    getAuthorById,
    getAllAuthors
}