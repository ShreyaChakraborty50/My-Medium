// blogController.js

const {sendResponse} = require('../utils/response.js')
const blogService = require('../services/blogService.js')

// Create a blog
const addBlog = async (req, res) => {
    try {
        let info = {
            title: req.body.title,
            description: req.body.description,
            authorId: req.authorId
        }
        const blog = await blogService.addBlog(info);
        sendResponse(res,blog,201)
    } catch (error) {
        console.error('Error creating blog:', error);
        
    }
};

// get a blog by Id
const getBlogById = async (req, res) => {
    try {
        const  blogId = req.params.blogId;
        const blog = await blogService.getBlogById(blogId);
        
        if (!blog) {
            return res.status(404).json({ message: 'Blog not found' });
        }
        console.log(blog)
        sendResponse(res,blog,200)
    } catch (error) {
        console.error('Error fetching blog by ID:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

//View All Blogs
const getAllBlogs = async (req, res) => {
    try {
        const blogs = await blogService.getAllBlogs(req,res);
        sendResponse(res,blogs,200)
    } catch (error) {
        console.error('Error fetching all blogs:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};
// Blogs by author
const getBlogsByAuthor = async(req, res)=> {
    try {
        const authorId  = req.params.authorId;
        const blogs = await blogService.getBlogsByAuthor(authorId);
        sendResponse(res,blogs,200)
    } catch (error) {
        console.error('Error getting blogs by author:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}
//Update Blog by ID
const updateBlogById = async (req, res) => {
    try {
        const  blogId  = req.params.blogId;
        
        const updatedBlog = await blogService.updateBlogById(blogId, req.body);
        
        if (!updatedBlog) {
            return res.status(404).json({ message: 'Blog not found' });
        }
        
        sendResponse(res,updatedBlog,200)

    } catch (error) {
        console.error('Error updating blog:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

// Delete a blog by ID
const deleteBlogById = async (req, res) => {
    try {
        const  blogId  = req.params.blogId;
        const rowCount = await blogService.deleteBlogById(blogId);
        
        if (rowCount === 0) {
            return res.status(404).json({ message: 'Blog not found' });
        }
        
        res.status(204).send('Post Removed');
    } catch (error) {
        console.error('Error deleting blog:', error);
        res.status(500).json({ message: 'Internal Server Error' });
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
