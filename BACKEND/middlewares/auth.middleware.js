const User = require('../models/user.model.js');
const jwt = require('jsonwebtoken');
const BlacklistToken = require('../models/blacklistToken.model.js');
module.exports.authUser = async(req,res,next)=>{
    try {
    const token = req.cookies.token||req.headers.authorization.split(' ')[1];
    if(!token){
        return res.status(401).json({message:'Unauthorized'})
    }
    const isBlacklisted = await BlacklistToken.findOne({token});
    if(isBlacklisted){
        return res.status(401).json({message:'Unauthorized'})
    }
        const decoded = jwt.verify(token,process.env.JWT_SECRET);
        const user = await User.findById(decoded._id);
        if(!user){
            return res.status(404).json({message:'User not found'})
        }
        req.user = user;
        return next();
    } catch (error) {
        return res.status(401).json({message:'Unauthorized'})
    }
}