const User = require("../models/user.model.js")
const {validationResult} = require("express-validator");
const userService = require("../services/user.service.js");
const BlacklistToken = require("../models/blacklistToken.model.js");
module.exports.registerUser = async (req,res,next)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()})
    }
    const {fullname,email,password} = req.body;
    const userExist = await User.findOne({email});
    if(userExist){
        return res.status(400).json({message:'User already exist'});
    }
    const hashedPassword = await User.hashPassword(password);
    const user = await userService.createUser({
        firstname:fullname.firstname,
        lastname:fullname.lastname,
        email,
        password:hashedPassword
    })
    console.log(user)
    const token = user.generateAuthToken();
    res.status(201).json({token,user})
}

module.exports.loginUser = async(req,res,next)=>{
    const {email,password} = req.body;
    const userExist = await User.findOne({email}).select('+password');
    try {
        if(!userExist){
            return res.status(404).json({message:'User doesnt exist'})
        }
        const isMatch = await userExist.comparePasswords(password);
        if(!isMatch){
            return res.status(401).json({message:'Invalid email or password'})
        }
        const token = userExist.generateAuthToken();
        const options = {
            httpOnly:true,
            secure:true
        }
        res.cookie('token',token,options)
        return res.status(201).json({token,userExist})
    }
    catch (error) {
        return res.status(404).json({message:error.message})   
    }
}

module.exports.getUserProfile = async(req,res,next)=>{
    const user = req.user;
    res.status(200).json(user)
}

module.exports.logoutUser = async(req,res,next)=>{
    res.clearCookie('token');
    const token = req.cookies.token||req.headers.authorization.split(' ')[1];
    await BlacklistToken.create({token});
    res.status(200).json({message:'Logged out successfully'})
}