const db = require('../models')
const Blog = db.blogs

const pagination = async(req, res, next) => {
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
    
    
    const blogWithCount = await Blog.findAndCountAll({
        limit: size,
        offset: page * size
    });
    res.send({
        content: blogWithCount.rows,
        totalPages: Math.ceil(blogWithCount.count / Number.parseInt(size))
    });
    next();
}
module.exports = {
    pagination
}