
const mockDb = {
    authors: [
      {
        authorId: '1',
        name: 'Author 1',
        email: 'author1@example.com',
        password: 'password1',
      },
      {
        authorId: '2',
        name: 'Author 2',
        email: 'author2@example.com',
        password: 'password2',
      },
    ],
    blogs: [
      {
        blogId: '1',
        title: "Updated Title",
        description: "Updated Description.",
        authorId: '1',
      },
      {
        blogId: '2',
        title: 'Blog 2',
        description: 'Description 2',
        authorId: '2',
      },
      {
        blogId: '3',
        title: 'Blog 3',
        description: 'Description 3',
        authorId: '3',
      },
      
    ],
  };
  
  module.exports = mockDb;
  