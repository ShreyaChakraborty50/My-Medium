const db = require("../../models");
const blogServices = require("../../services/blogServices.js");
const mockDb = require("../../__mocks__/mockDB.js");
const httpMocks = require('node-mocks-http');
const Blog = db.blogs;

describe('Blog Service test', () => {
  
  let createMock;
  let findOneMock;
  let findAndCountAllMock;
  let updateMock;
  let destroyMock;

  beforeEach(() => {
    
    createMock = jest.spyOn(Blog, "create");
    findOneMock = jest.spyOn(Blog, "findOne");
    findAndCountAllMock = jest.spyOn(Blog, "findAndCountAll");
    updateMock = jest.spyOn(Blog, "update");
    destroyMock = jest.spyOn(Blog, "destroy");
  });

  afterEach(() => {
    
    createMock.mockRestore();
    findOneMock.mockRestore();
    findAndCountAllMock.mockRestore();
    updateMock.mockRestore();
    destroyMock.mockRestore();
  });

  describe('Add blog test', () => {
    it('should create a blog', async () => {
      let info = {
        title: 'Blog 1',
        description: 'Description 1',
      };
      const mockBlog = mockDb.blogs[0];

     
      createMock.mockResolvedValue(mockBlog);

      const result = await blogServices.addBlog(info);

      expect(result).toEqual(mockBlog);
      expect(createMock).toHaveBeenCalledWith(info);
    });
  });

  describe("View Single Blog", () => {
    it("should get a blog by ID", async () => {
      const blogId = "2";
      const mockBlog = mockDb.blogs[1];

     
      findOneMock.mockResolvedValue(mockBlog);

      const result = await blogServices.getBlogById(blogId);

      expect(Blog.findOne).toHaveBeenCalledWith({ where: { blogId: blogId } });
      expect(result).toEqual(mockBlog);
    });
  });

  describe("View All Blogs", () => {
    it("should get all blogs", async () => {
      const page = 0;
      const size = 2;
      const blogs = mockDb.blogs;

     
      findAndCountAllMock.mockResolvedValue(blogs);

      const result = await blogServices.getAllBlogs(page, size);

      expect(result).toEqual(blogs);
      expect(Blog.findAndCountAll).toHaveBeenCalledWith({
        limit: size,
        offset: page * size,
      });
    });
  });

  describe('updateBlogById Service Test', () => {
    it('should update a blog by ID', async () => {
      const blogId = '1';
      const updatedData = { title: 'Updated Title', description: 'Updated Description' };

     
      updateMock.mockResolvedValue([1]);
      findOneMock.mockResolvedValue(mockDb.blogs[0]);

      const result = await blogServices.updateBlogById(blogId, updatedData);

      expect(result).toEqual(mockDb.blogs[0]);
      expect(updateMock).toHaveBeenCalledWith(
        { title: updatedData.title, description: updatedData.description },
        {
          where: { blogId: blogId },
          returning: true,
        }
      );
      expect(updateMock).toHaveBeenCalledTimes(1);
      expect(findOneMock).toHaveBeenCalledTimes(1);
    });

    it('should return null for non-existent blog ID', async () => {
      const nonExistentBlogId = '10';
      const updatedData = { title: 'Updated Title', description: 'Updated Description' };

      
      updateMock.mockResolvedValue([0]);

      const result = await blogServices.updateBlogById(nonExistentBlogId, updatedData);

      expect(result).toBeNull();
      expect(updateMock).toHaveBeenCalledWith(
        { title: updatedData.title, description: updatedData.description },
        {
          where: { blogId: nonExistentBlogId },
          returning: true,
        }
      );
    });
  });

  describe("Delete Single Blog", () => {
    it("should delete a blog by ID", async () => {
      const blogId = "3";
      const mockBlog = mockDb.blogs[2];

      // Mock the destroy method to return the deleted blog
      destroyMock.mockResolvedValue(mockBlog);

      const result = await blogServices.deleteBlogById(blogId);

      expect(result).toEqual(mockBlog);
      expect(destroyMock).toHaveBeenCalledWith({ where: { blogId: blogId } });
    });
  });
});
