const db = require("../models");
const authorService = require("../services/authorServices.js");
const { authorDTO } = require("../utils/authorDTO.js");
const { sendResponse } = require("../utils/response.js");

const getAuthorById = async (req, res) => {
  try {
    let authorId = req.params.authorId;
    let author = await authorService.getAuthorById(authorId);
    sendResponse(res, authorDTO(author), 200);
  } catch (error) {
    next(customError(500, "Error while fetching author by ID."));
  }
};

const getAllAuthors = async (req, res) => {
  try {
    const authors = await authorService.getAllAuthors();
    const authorsDTOArray = authors.map((author) => authorDTO(author));

    sendResponse(res, authorsDTOArray, 200);
  } catch (error) {
    next(customError(500, "Error fetching authors."));
  }
};

module.exports = {
  getAuthorById,
  getAllAuthors,
};
