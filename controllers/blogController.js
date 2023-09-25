// blogController.js

const { sendResponse } = require("../utils/response.js");
const blogService = require("../services/blogServices.js");
const { customError } = require("../errorHandler/customError.js");
const addBlog = async (req, res, next) => {
  try {
    let info = {
      title: req.body.title,
      description: req.body.description,
      authorId: req.authorId,
    };
    const blog = await blogService.addBlog(info);
    sendResponse(req, res, blog, 201);
  } catch (error) {
    next(customError(400, "Error while creating the blog."));
  }
};

const getBlogById = async (req, res, next) => {
  try {
    const blogId = req.params.blogId;
    const blog = await blogService.getBlogById(blogId);

    if (!blog) {
      throw customError(404, "Blog not found.");
    }

    sendResponse(req, res, blog, 200);
  } catch (error) {
    next(error);
  }
};

const getAllBlogs = async (req, res,next) => {
  try {
    const pageAsNumber = Number.parseInt(req.query.page);
    const sizeAsNumber = Number.parseInt(req.query.size);
  
    let page = 0;
    if (!Number.isNaN(pageAsNumber) && pageAsNumber > 0) {
      page = pageAsNumber;
    }
  
    let size = 10;
    if (
      !Number.isNaN(sizeAsNumber) &&
      !(sizeAsNumber > 10) &&
      !(sizeAsNumber < 1)
    ) {
      size = sizeAsNumber;
    }
    const blogs = await blogService.getAllBlogs(page, size);
    sendResponse(req, res, blogs, 200);
  } catch (error) {
    next(customError(500, "Error fetching all blogs."));
  }
};

const getBlogsByAuthor = async (req, res) => {
  try {
    const authorId = req.params.authorId;
    const blogs = await blogService.getBlogsByAuthor(authorId);
    sendResponse(req, res, blogs, 200);
  } catch (error) {
    next(customError(500, "Error getting blogs by author."));
  }
};

const updateBlogById = async (req, res, next) => {
  try {
    const blogId = req.params.blogId;

    const updatedBlog = await blogService.updateBlogById(blogId, req.body);

    if (!updatedBlog) {
      throw customError(404, "Blog not found.");
    }

    sendResponse(req, res, updatedBlog, 200);
  } catch (error) {
    next(error);
  }
};

const deleteBlogById = async (req, res,next) => {
  try {
    const blogId = req.params.blogId;
    const rowCount = await blogService.deleteBlogById(blogId);

    if (rowCount === 0) {
      throw customError(404, "Blog not found.");
    }

    
    sendResponse(req,res,"Post Removed", 204 )
  } catch (error) {
    next(error);
  }
};

module.exports = {
  addBlog,
  getBlogById,
  getAllBlogs,
  getBlogsByAuthor,
  updateBlogById,
  deleteBlogById,
};
