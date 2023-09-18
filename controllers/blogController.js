import db from "../models/index.js";


const { blogs: Blog, authors: Author } = db;
 
const createBlog = async (req, res) => {
  const info = {
    //blogId: req.body.blogId,
    authorId: req.body.authorId,
    title: req.body.title,
    description: req.body.description,
  };
  const blog = await Blog.create(info);
  res.status(201).send(blog);
  console.log(blog);
};


const getAllBlogs = async (req, res) => {
  const blogs = await Blog.findAll({});
  res.status(200).send(blogs);
};


const getOneBlog = async (req, res) => {
  const id = req.params.id;
  const blog = await Blog.findOne({ where: { id: id } });
  res.status(200).send(blog);
};

export {
  createBlog,
  getAllBlogs,
  getOneBlog
};
