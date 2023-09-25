
const blogController = require("../../controllers/blogController.js")
const blogService = require("../../services/blogServices.js");
const mockDb = require("../../__mocks__/mockDB.js")
const responsefile = require("../../utils/response.js")
const {customError} = require("../../errorHandler/customError.js")
const httpMocks = require('node-mocks-http');

describe('Blog controller test', () => {
  describe('Add blog test', () => {
    it('shlould give Blog Validation Error', async () => {
      const req = { body: {} }
      const res = {}
      const next = jest.fn()
      
      await blogController.addBlog(req, res, next)
      expect(next).toHaveBeenCalledWith(customError(400,'Error while creating the blog.' ))
    })
    
    it('should add blog successfully', async () => {
      var req  = httpMocks.createRequest({
        
        body: {
          title: 'Blog 1',
          description: 'Description 1'
          
        },
        authorId: '1',
        headers: {
          accept: 'application/json'
        }
      });
      
      let info = {
        title: req.body.title,
        description: req.body.description,
        authorId: req.authorId,
      };
      var res = httpMocks.createResponse();
      
      const expectedResponse = {
        data: mockDb.blogs[0],
      }
      const next = jest.fn()
      
      jest.spyOn(blogService, 'addBlog').mockResolvedValueOnce(expectedResponse.data)
      
      await blogController.addBlog(req, res, next)
      expect(blogService.addBlog).toHaveBeenCalledTimes(1)
      
      var data = res._getJSONData(); 
      var resStatusCode = res.statusCode
      expect(blogService.addBlog).toHaveBeenCalledWith(info)
      expect(data).toStrictEqual(expectedResponse)
      expect(resStatusCode).toBe(201)
    })
  })
  
  
  describe('View Blog Test', () => {
    it('should get all blogs', async () => {
      const req =  httpMocks.createRequest( {
        query: {
          page : 0,
          size : 5
        }
      })
      
      
      const res = httpMocks.createResponse();
      const expectedResponse = {
        
        data: mockDb.blogs,
      }
      const next = jest.fn()
      
      jest.spyOn(blogService, 'getAllBlogs').mockResolvedValueOnce(expectedResponse.data)
      
      
      const response = await blogController.getAllBlogs(req, res, next)
      expect(blogService.getAllBlogs).toHaveBeenCalledTimes(1)
      
      var data = res._getJSONData(); 
      var resStatusCode = res.statusCode
      expect(blogService.getAllBlogs).toHaveBeenCalledWith(req.query.page, req.query.size)
      
      
      expect(data).toStrictEqual(expectedResponse)
      expect(resStatusCode).toBe(200)
    })
    
    it('View single blog', async () => {
      const req =  httpMocks.createRequest( {
        params: {
          blogId : 1
          
        }
      })
      var res = httpMocks.createResponse();
      const expectedResponse = {
        
        data: mockDb.blogs[0],
      }
      const next = jest.fn()
      
      jest.spyOn(blogService, 'getBlogById').mockResolvedValueOnce(expectedResponse.data)
      
      const response = await blogController.getBlogById(req, res, next)
      expect(blogService.getBlogById).toHaveBeenCalledTimes(1)
      var data = res._getJSONData(); 
      var resStatusCode = res.statusCode
      expect(blogService.getBlogById).toHaveBeenCalledWith(req.params.blogId)
      
      
      expect(data).toStrictEqual(expectedResponse)
      expect(resStatusCode).toBe(200)
    })
  })
  
  describe('Update blog test', () => {
    
  
      it('should edit blog successfully', async () => {
        const req =  httpMocks.createRequest( {
          body: {
          title: 'Blog 1' ,
          description: 'Description 1'
          },
          params: {
            blogId : '1'
            
          }
        })
        
        var res = httpMocks.createResponse();
        
        const expectedResponse = {
          data: mockDb.blogs[0],
        }
        const next = jest.fn()
        
        jest.spyOn(blogService, 'updateBlogById').mockResolvedValueOnce(expectedResponse.data)
        
        await blogController.updateBlogById(req, res, next)
        expect(blogService.updateBlogById).toHaveBeenCalledTimes(1)
        
        var data = res._getJSONData(); 
        var resStatusCode = res.statusCode
        expect(blogService.updateBlogById).toHaveBeenCalledWith(req.params.blogId, req.body)
        expect(data).toStrictEqual(expectedResponse)
        expect(resStatusCode).toBe(200)
      })
    })
    describe('Delete blog test', () => {
      
   
  
      it('should delete blog successfully', async () => {
        const req =  httpMocks.createRequest( {
          
          params: {
            blogId : '1'
            
          }
        })
        
        var res = httpMocks.createResponse();
        
        const expectedResponse = {
          data: mockDb.blogs[2],
        }
        const next = jest.fn()
        
        jest.spyOn(blogService, 'deleteBlogById').mockResolvedValueOnce(expectedResponse.data)
        
        await blogController.deleteBlogById(req, res, next)
        expect(blogService.deleteBlogById).toHaveBeenCalledTimes(1)
        
        var data = res._getJSONData(); 
        var resStatusCode = res.statusCode
        expect(blogService.deleteBlogById).toHaveBeenCalledWith(req.params.blogId)
        
        expect(resStatusCode).toBe(204)
       })
      })
  
  })
  
  
  
  
  
  
  