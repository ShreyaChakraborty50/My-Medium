# My-Medium-BLOG_WEBSITE_NODEJS_EXPRESS_MYSQL_REST_API

**My-Medium** is one of my personal projects where registered authors post blogs. This repository holds the code of it's backend which is a **RESTful API**.

### Contents
- [Features](#features)
- [Tech used](#tech-used)
- [API endpoints](#api-endpoints)
   
## Features:
- authors can create their profiles (JWT-token-based authentication)
- registered authors can write blogs and edit them
- unregistered public users can read blogs

## Tech used:

**Runtime environment**
- [x] Node.js

**Database**
- [x] MySQL



## API endpoints:

#### *Indication*
- [x] **Authentication required**
- [ ] **Authentication not required**

## *User related*
### Request
- [ ] [Resgister](docs/authors/register.md): `POST localhost:3000/authors/register`

### Response

    {"author_id":1,"name":"Jonh Lenon","email":"lenon@gmail.com", "password":"!3n0nasd", "created_at":"2023-08-29T11:37:12"}
### Request  
- [ ] [Login](docs/authors/login.md): `GET localhost:3000/authors/login`

### Response

    {"author_id":1,"name":"Jonh Lenon","status":"ok"}
### Request  
- [x] [Get loggedin author's info](docs/user/getLoggedInUserInfo.md): `GET localhost:3000/authors/me`

### Response

    {"author_id":1,"name":"John Lenon"}
    

## *Blog related*
### Request
- [x] [Create a new blog](docs/blogs/createBlog.md): `POST localhost:3000/blogs`
      
 ### Response

    {"blog_id":1,"title":"Global Economy","description":"very dangerous",, "created_at":"2023-08-29T11:37:12", "updated_at":"2023-08-29T12:17:18" "status":"ok"}


&nbsp;

### Request
- [ ] [Get details of a blog](docs/blogs/getDetailsOfBlog.md): `GET localhost:3000/blogs/:blogId`

### Response

    {"blog_id":1,"title":"Global Economy","description":"very dangerous"}
    


