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
        data: newUser
    })
    } catch(err) {
        res.send({
            success: false,
            data: {newUser: "newUser"}
        })
    }
    
  });

  router.get('/:id', async(req, res)=>{
      console.log(req.params.id)
    try{
    const user = await User.findById(req.params.id)
    const posts = await Post.find({user: req.params.id})
    console.log(user)
    if(!user){
        throw new Error('No user available here')
    }
    res.send({
        success: true,
        data: {user: user,
                posts: posts}
    })
    }catch(err){
    console.log(err.message)
    res.send({
        success:false,
        data: err.message
    })
    }
    })
  router.put('/:id', async (req, res)=>{
      console.log(req.body.likes)
    try{
        const post = await User.findByIdAndUpdate(req.params.id, req.body, {new: true})
        res.send({
            success: true,
            data: post
        })
    }catch(err){
        
        res.send({
            success:false,
            data: err.message
        })
    }
})


module.exports = router