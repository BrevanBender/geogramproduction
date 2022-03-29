const express = require('express')
const res = require('express/lib/response')
const router = express()
const Post = require('../models/post.js')

router.get('/', async (req, res)=>{
    console.log("index")
    try{
        const posts = await Post.find()
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
router.post('/', async (req, res)=>{
    try{
    const newpost = await Post.create(req.body)
    
    res.send({
        success: true,
        data: newpost
    })

}catch(err){
    res.send({
        success: false,
        data: err.message
    })
}
})
router.get('/:id', async (req, res)=>{
    try{
        const post = await Post.findById(req.params.id)
        if(!post){
            throw new Error('this post has been adopted')
        }
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
router.delete('/:id', async (req, res)=>{
    try{
        const post = await Post.findByIdAndDelete(req.params.id)
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
router.put('/:id', async (req, res)=>{
    try{
        const post = await Post.findByIdAndUpdate(req.params.id, req.body, {new: true})
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