const { customError } = require('../errorHandler/customError.js');
const blogService = require('../services/blogServices.js')
const jwt = require("jsonwebtoken")

const verifyToken = (req,res,next)=>{
  const bearerHeader = req.headers['authorization'];
  console.log(bearerHeader)
  if(typeof bearerHeader !== 'undefined'){
    const bearer = bearerHeader.split(" ")
    const token = bearer[1]
    req.token = token
    
    jwt.verify(req.token, process.env.SECRET_KEY, (err, authData) =>{
      console.log('authdata: ', authData)
      if(err){
        console.error(err)
        res.send({result : "invalid token"})
      }
      console.log(authData.authorId);
      req.authorId = authData.authorId
      next();
    })
  }
  else{
    res.send({
      result : 'Token is not valid'
    })
  }
  
}
const authorize = async (req, res, next) => {
  try {
    const blogId = req.params.blogId;
    const blog = await blogService.getBlogById(blogId);
    
    if (!blog) {
      throw(customError(404,"Blog not found."))
    }
    
    if (blog.authorId === req.authorId) {
      next();
    } else {
      throw(customError(403,"Unauthorized."))
    }
  } catch (error) {
    
    next(customError(500,"Error authorizing blog access."))
    
  }
};

module.exports ={
  verifyToken,
  authorize
}
