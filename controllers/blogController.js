// blogController.js

const { sendResponse } = require("../utils/response.js");
const blogService = require("../services/blogServices.js");

const addBlog = async (req, res, next) => {
  try {
    let info = {
      title: req.body.title,
      description: req.body.description,
      authorId: req.authorId,
    };
    const blog = await blogService.addBlog(info);
    sendResponse(res, blog, 201);
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

    sendResponse(res, blog, 200);
  } catch (error) {
    next(error);
  }
};

const getAllBlogs = async (req, res) => {
  try {
    const blogs = await blogService.getAllBlogs(req, res);
    sendResponse(res, blogs, 200);
  } catch (error) {
    next(customError(500, "Error fetching all blogs."));
  }
};

const getBlogsByAuthor = async (req, res) => {
  try {
    const authorId = req.params.authorId;
    const blogs = await blogService.getBlogsByAuthor(authorId);
    sendResponse(res, blogs, 200);
  } catch (error) {
    next(customError(500, "Error getting blogs by author."));
  }
};

const updateBlogById = async (req, res) => {
  try {
    const blogId = req.params.blogId;

    const updatedBlog = await blogService.updateBlogById(blogId, req.body);

    if (!updatedBlog) {
      throw customError(404, "Blog not found.");
    }

    sendResponse(res, updatedBlog, 200);
  } catch (error) {
    next(error);
  }
};

const deleteBlogById = async (req, res) => {
  try {
    const blogId = req.params.blogId;
    const rowCount = await blogService.deleteBlogById(blogId);

    if (rowCount === 0) {
      throw customError(404, "Blog not found.");
    }

    res.status(204).send("Post Removed");
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
