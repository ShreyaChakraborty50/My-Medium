const db = require("../models");
const jwt = require("jsonwebtoken");
const { sendResponse } = require("../utils/response.js");
const Author = db.authors;
const bcrypt = require("bcrypt");
const { customError } = require("../errorHandler/customError");

const addAuthor = async (req, res, next) => {
  try {
    let info = {
      name: req.body.name,
      email: req.body.email,
      password: await bcrypt.hash(req.body.password, 10),
    };

    const author = await Author.create(info);
    console.log(author.authorId);
    const token = jwt.sign(
      { authorId: author.authorId },
      process.env.SECRET_KEY,
      { expiresIn: "3000s" },
    );
    if (!token) {
      next(customError(400, "Error signing the token"));
    }
    sendResponse(res, { token }, 201);
  } catch (error) {
    next(customError(403, "Unauthorized."));
  }
};

const loginAuthor = async (req, res, next) => {
  try {
    const author = await Author.findOne({
      where: {
        email: req.body.email,
      },
    });
    if (!author) {
      throw customError(401, "Author doesn't exist");
    }

    const isSame = await bcrypt.compare(req.body.password, author.password);
    if (!isSame) {
      throw customError(401, "Email or Password doesn't match.");
    }

    const token = jwt.sign(
      { authorId: author.authorId },
      process.env.SECRET_KEY,
      { expiresIn: "3000s" },
    );
    if (!token) {
      next(customError(400, "Error signing the token"));
    }
    sendResponse(res, { token }, 200);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  addAuthor,
  loginAuthor,
};
