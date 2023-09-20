const db = require("../models");
const Author = db.authors;

const { customError } = require("../errorHandler/customError");
const validator = require("../utils/validator");

const missingSignUpFieldMiddleware = (req, res, next) => {
  try {
    if (!req.body.name || !req.body.email || !req.body.password) {
      throw customError(400, "One of the required fields is missing");
    }

    next();
  } catch (error) {
    next(error);
  }
};
const missingLogInFieldMiddleware = (req, res, next) => {
  try {
    if (!req.body.email || !req.body.password) {
      throw customError(400, "Email or password missing.");
    }

    next();
  } catch (error) {
    next(error);
  }
};

const isEmailAlreadyUsedMiddleware = async (req, res, next) => {
  try {
    const used = await Author.findOne({ where: { email: req.body.email } });
    if (used) {
      throw customError(400, "Email already in use");
    }
    next();
  } catch (error) {
    next(error);
  }
};

const validationMiddleware = (req, res, next) => {
  try {
    if (!validator.isEmailValid(req.body.email)) {
      throw customError(400, "Email is invalid");
    }

    if (!validator.isPasswordValid(req.body.password)) {
      throw customError(400, "Password must be 8 characters long!");
    }

    next();
  } catch (error) {
    next(customError(500, "Something wrong with user provided input!"));
  }
};

module.exports = {
  missingSignUpFieldMiddleware,
  missingLogInFieldMiddleware,
  isEmailAlreadyUsedMiddleware,
  validationMiddleware,
};
