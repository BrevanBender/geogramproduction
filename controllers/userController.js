const express = require('express')
const res = require('express/lib/response')
const bcrypt = require('bcryptjs')
const User = require('../models/user')
const router = express()
const Post = require('../models/post.js')



router.get('/', async (req, res)=>{
    console.log("index")
    try{
        const posts = await User.find()
        res.send({
            status: 200,
            success: true,
            data: posts
        })
    }catch(err){
        res.send({
            status: 500,
            success: false,
            data: err.message
        })
    }
})
router.post("/login", async (req, res) => {
    try {
      // Grab the user from the database with the username from the form
      const possibleUser = await User.findOne({ username: req.body.username });
      if (possibleUser) {
        // There is a user with this username!
        // Compare the password from the form with the database password
        if (bcrypt.compareSync(req.body.password, possibleUser.password)) {
          // It's a match! Successful login!
          req.session.isLoggedIn = true;
          req.session.userId = possibleUser._id;
          res.send({
            status: 200,
            success: true,
            data: possibleUser
        })
        } else {
          res.send({
              status: 401,
              success: false,
              data: {message:"incorrect password"}
          })
        }
      } else {
        // Let them try again?
        res.send({
            status: 401,
            success: false,
            data: {message: "username didn't match any in our database"}
        });
      }
    } catch (err) {
      console.log(err);
      res.send(500);
    }
  });

router.post("/signup", async (req, res) => {
    try{
    const hashedPassword = bcrypt.hashSync(
      req.body.password,
      bcrypt.genSaltSync(10)
    );
    
    req.body.password = hashedPassword;
    const newUser = await User.create(req.body);
    res.send({
        success: true,
        newUser: newUser
    })
    } catch(err) {
        res.send({
            success: false,
            data: {newUser: "newUser"}
        })
    }
    
  });

module.exports = router