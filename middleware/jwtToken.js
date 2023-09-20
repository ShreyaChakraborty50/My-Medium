const { customError } = require("../errorHandler/customError.js");
const blogService = require("../services/blogServices.js");
const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const bearerHeader = req.headers["authorization"];

  if (!bearerHeader) {
    next(customError(400, "No token is given"));
  }

  req.token = bearerHeader.split(" ")[1];

  jwt.verify(req.token, process.env.SECRET_KEY, (err, authData) => {
    if (err) {
      throw customError(404, "Token is invalid");
    }
    req.authorId = authData.authorId;
    next();
  });
};
const authorize = async (req, res, next) => {
  try {
    const blogId = req.params.blogId;
    const blog = await blogService.getBlogById(blogId);

    if (!blog) {
      next(customError(404, "Blog not found."));
    }
    if (blog.authorId !== req.authorId) {
      next(customError(403, "Unauthorized."));
    }
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = {
  verifyToken,
  authorize,
};
