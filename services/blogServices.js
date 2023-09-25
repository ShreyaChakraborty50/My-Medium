const db = require("../models");
const Author = db.authors;
const Blog = db.blogs;

const addBlog = async (info) => {
  const blog = await Blog.create(info);
  return blog;
};

const getBlogById = async (blogId) => {
  const blog = await Blog.findOne({ where: { blogId: blogId } });
  console.log(blog);
  return blog;
};

const getAllBlogs = async (page, size) => {
  const blogs = await Blog.findAndCountAll({
    limit: size,
    offset: page * size,
  });
  
  return blogs;
};

async function getBlogsByAuthor(authorId) {
  const author = await Author.findOne({ where: { authorId: authorId } });
  
  if (!author) {
    return null;
  }
  
  const blogs = await Blog.findAll({
    where: { AuthorId: author.id },
  });
  
  return blogs;
}
// update
const updateBlogById = async (blogId, body) => {
  const title = body.title;
  const description = body.description;
  const [updated] = await Blog.update(
    { title, description },
    {
      where: { blogId: blogId },
      returning: true,
    },
    );
    
    if (updated === 0) {
      return null;
    }
    
    const updatedBlog = await Blog.findOne({ where: { blogId: blogId } });
    return updatedBlog;
  };
  // Delete a blog by ID
  const deleteBlogById = async (blogId) => {
    const deleted = await Blog.destroy({
      where: { blogId: blogId },
    });
    return deleted;
  };
  
  module.exports = {
    addBlog,
    getAllBlogs,
    getBlogById,
    getBlogsByAuthor,
    updateBlogById,
    deleteBlogById,
  };
  