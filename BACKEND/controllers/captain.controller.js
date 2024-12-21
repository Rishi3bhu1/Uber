const Captain = require('../models/captain.model');
const captainService = require('../services/captain.service.js');
const BlacklistToken = require('../models/blacklistToken.model.js');
const {validationResult} = require('express-validator');
module.exports.registerCaptain = async (req, res, next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()})
    }
    const {fullname,email,password,vehicle} = req.body;
    const captainExist = await Captain.findOne({email});
    if(captainExist){
        return res.status(400).json({message:'Captain already exist'});
    }
    const hashedPassword = await Captain.hashPassword(password);
    try {
        const captain = await captainService.createCaptain({ 
            firstname :fullname.firstname, 
            lastname:fullname.lastname, 
            email, 
            password:hashedPassword, 
            color:vehicle.color, 
            plate:vehicle.plate,
            capacity:vehicle.capacity,
            vehicleType:vehicle.vehicleType   
        });
        const token = captain.generateAuthToken();
        res.status(201).json({ token, captain });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

module.exports.loginCaptain = async (req, res, next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()})
    }
    const { email, password } = req.body;
    const captainExist = await Captain.findOne({ email }).select('+password');
    if (!captainExist) {
        return res.status(404).json({ message: 'Captain doesnt exist' });
    }
    try {
        const isMatch = await captainExist.comparePasswords(password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }
        const token = captainExist.generateAuthToken();
        const options = {
            httpOnly: true,
            secure: true
        }
        res.cookie('token', token,options);
        res.status(201).json({ token, captainExist });
    } catch (error) {
        return res.status(404).json({ message: error.message });
    }
}

module.exports.getCaptainProfile = async (req, res, next) => {
    const captain = req.captain;
    res.status(200).json(captain);
}

module.exports.logoutCaptain = async (req, res, next) => {
    res.clearCookie('token');
    const token = req.cookies.token || req.headers.authorization.split(' ')[1];
    await BlacklistToken.create({ token });
    res.status(200).json({ message: 'Logged out successfully' });
}