const jwt = require('jsonwebtoken')

module.exports = (req, res, next)=>{
    try{
        const token = req.header('x-auth-token')
        jwt.verify(token, "super-secret")
    }catch(err){
        res.status(401).json({err})
    }
}