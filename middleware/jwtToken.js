const blogService = require('../services/blogService.js')
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
        return res.status(404).json({ message: 'Blog not found' });
      }
  
      if (blog.authorId === req.authorId) {
        next();
      } else {
        return res.status(403).json({ message: 'Unauthorized' });
      }
    } catch (error) {
      console.error('Error authorizing blog access: ', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  };

module.exports ={
    verifyToken,
    authorize
}
