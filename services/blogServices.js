const db = require('../models')
const Author = db.authors
const Blog = db.blogs


const addBlog = async (info) => {
    
    const blog = await Blog.create(info);       
    return blog;
    
};


const getBlogById = async (blogId) => {
    
    const blog = await Blog.findOne({ where: { blogId: blogId}});
    console.log(blog)
    return blog;
    
};


const getAllBlogs = async (req,res) => {
    
    const pageAsNumber = Number.parseInt(req.query.page);
    const sizeAsNumber = Number.parseInt(req.query.size);
    
    let page = 0;
    if(!Number.isNaN(pageAsNumber) && pageAsNumber > 0){
        page = pageAsNumber;
    }
    
    let size = 10;
    if(!Number.isNaN(sizeAsNumber) && !(sizeAsNumber > 10) && !(sizeAsNumber < 1)){
        size = sizeAsNumber;
    }
    
    const blogs = await Blog.findAndCountAll({
        limit: size,
        offset: page * size
    });
    
    return blogs
    
};

async function getBlogsByAuthor(authorId) {
    
    const author = await Author.findOne({ where: { authorId: authorId}});
    
    if (!author) {
        return null; 
    }
    
    
    const blogs = await Blog.findAll({
        where: { AuthorId: author.id },
    });
    
    return blogs;
    
};
// update
const updateBlogById = async (blogId, body) => {
    
    const title = body.title;
    const description = body.description;
    const [rowCount] = await Blog.update(
        { title, description },
        {
            where: { blogId: blogId },
            returning: true, 
        }
        );
        
        if (rowCount === 0) {
            return null; 
        }
        console.log(rowCount)
        const updatedBlog = await getBlogById(blogId);
        return updatedBlog;
        
    };
    // Delete a blog by ID
    const deleteBlogById = async (blogId) => {
        
        const rowCount = await Blog.destroy({
            where: { blogId: blogId },
        });
        console.log(blogId)
        return rowCount;
        
    };
    
    module.exports = {
        addBlog,
        getAllBlogs,
        getBlogById,
        getBlogsByAuthor,
        updateBlogById,
        deleteBlogById,
    };
    