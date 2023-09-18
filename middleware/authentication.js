
const bcrypt = require("bcrypt");
const db = require("../models");
const jwt = require("jsonwebtoken");
const Author = db.authors;

const signup = async (req, res) => {
    try {
      const { name, email, password } = req.body;
      const info = {
        name,
        email,
        password: await bcrypt.hash(password, 10),
      };
   
      const author = await Author.create(info);
   
     
      if (author) {
        let token = jwt.sign({ id: user.id }, process.env.secretKey, {
          expiresIn: 1 * 24 * 60 * 60 * 1000,
        });
   
        res.cookie("jwt", token, { maxAge: 1 * 24 * 60 * 60, httpOnly: true });
        console.log("user", JSON.stringify(user, null, 2));
        console.log(token);
        
        return res.status(201).send(user);
      } else {
        return res.status(409).send("Details are not correct");
      }
    } catch (error) {
      console.log(error);
    }
   };
   
   module.exports ={
    signup
   }