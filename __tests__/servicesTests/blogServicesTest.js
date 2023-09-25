const db = require("../../models");
const blogServices = require("../../services/blogServices.js");
const mockDb = require("../../__mocks__/mockDB.js")
const httpMocks = require('node-mocks-http');
const Blog = db.blogs;
describe('Blog Service test', () => {
    describe('Add blog test', () => {
        it('should create a blog', async () => {
            let info = {
                title: 'Blog 1',
                description: 'Description 1',
            };
            const mockBlog = mockDb.blogs[0]
            const mockCreate = jest.spyOn(Blog, "create").mockResolvedValue(mockBlog);
            const result = await blogServices.addBlog(info);
            expect(result).toEqual(mockBlog);
            expect(mockCreate).toHaveBeenCalledWith(info);
            mockCreate.mockRestore();   
            
        })
    })
    
    // describe("View Single Blog", () => {
    //     it("should get a blog by ID", async () => {
    //         const blogId = "2";
    //         const mockBlog = mockDb.blogs[1]
    //         jest.spyOn(Blog, "findOne").mockResolvedValue(mockBlog);
    //         const result = await blogServices.getBlogById(blogId);
    //         expect(Blog.findOne).toHaveBeenCalledWith({ where: { blogId: blogId } });
    //         expect(result).toEqual(mockBlog);
    //     });
    // });
    
    describe("View All Blogs", () => {
        it("should get all blogs", async () => {
            const page = 0;
            const size = 2;
            const blogs = mockDb.blogs;
            
            jest.spyOn(Blog, "findAndCountAll").mockResolvedValue(blogs);
            
            const result = await blogServices.getAllBlogs(page, size);
            
            expect(Blog.findAndCountAll).toHaveBeenCalledWith({
                limit: size,
                offset: page * size,
            });
            expect(result).toEqual(blogs);
        });
    });
    
    
    describe('updateBlogById Service Test', () => {
        
        it('should update a blog by ID', async () => {
            
            jest.spyOn(Blog, 'update').mockResolvedValue([1]);
            jest.spyOn(Blog, 'findOne').mockResolvedValue(mockDb.blogs[0]); 
            
            const blogId = '1'; 
            const updatedData = { title: 'Updated Title', description: 'Updated Description' };
           
            const result = await blogServices.updateBlogById(blogId, updatedData);
            
            
            expect(Blog.update).toHaveBeenCalledWith(
                { title: updatedData.title, description: updatedData.description },
                {
                    where: { blogId: blogId },
                    returning: true,
                }
                );
            expect(Blog.update).toHaveBeenCalledTimes(1);
            expect(Blog.findOne).toHaveBeenCalledTimes(1);
                expect(result).toEqual(mockDb.blogs[0]); 
            });
            
        it('should return null for non-existent blog ID', async () => {
                
                jest.spyOn(Blog, 'update').mockResolvedValue([0]);
                
                
                const nonExistentBlogId = '10'; 
                const updatedData = { title: 'Updated Title', description: 'Updated Description' };
                const result = await blogServices.updateBlogById(nonExistentBlogId, updatedData);
                
                
                expect(Blog.update).toHaveBeenCalledWith(
                    { title: updatedData.title, description: updatedData.description },
                    {
                        where: { blogId: nonExistentBlogId },
                        returning: true,
                    }
                    );
                    expect(result).toBeNull(); 
                });
            });
            describe("Delete Single Blog", () => {
                it("should delete a blog by ID", async () => {
                    const blogId = "3";
                    const mockBlog = mockDb.blogs[2]
                    jest.spyOn(Blog, "destroy").mockResolvedValue(mockBlog);
                    const result = await blogServices.deleteBlogById(blogId);
                    expect(Blog.destroy).toHaveBeenCalledWith({ where: { blogId: blogId } });
                    expect(result).toEqual(mockBlog);
                });
            });
            
        })