const express = require('express')
const res = require('express/lib/response')
const Location = require('../models/locations')
const router = express()




router.get('/', async (req, res)=>{
    console.log("index")
    try{
        const posts = await Location.find()
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
    const newpost = await Location.create(req.body)
    console.log(newpost)
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
module.exports = router