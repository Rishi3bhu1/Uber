const rideService = require('../services/ride.service.js');
const {validationResult} = require('express-validator');
const mapService = require("../services/maps.service.js")
const {sendMessageToSocketId} = require("../socket.js");
const Ride = require('../models/ride.model.js');
module.exports.createRide = async (req, res, next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()})
    }
    const {pickup,destination,vehicleType} = req.body;
    try{
        const ride = await rideService.createRides({user:req.user._id,pickup,destination,vehicleType});
        const pickupCoordintes = await mapService.getAddressCoordinate(pickup);
        const captainInRadius = await mapService.getCaptainInTheRadius(pickupCoordintes.lat,pickupCoordintes.lng,2);
        ride.otp=""
        const rideWithUser = await Ride.findOne({ _id:ride._id}).populate('user',"-password")
        console.log(rideWithUser)
        captainInRadius.map(async(captain)=>{
            sendMessageToSocketId(captain.socketId,{
                event:"new-ride",
                data:rideWithUser
            })
        })
        res.status(201).json(ride);
    }catch(error){
        return res.status(400).json({message:error.message})
    }
}

module.exports.getFare = async(req,res,next)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()})
    }
    const {pickup,destination} = req.query;
    try {
        const fare = await rideService.getFare(pickup,destination);
        return res.status(200).json(fare)
    } catch (error) {
        return res.status(500).json({message:error.message})
    }
}

module.exports.confirmRide  = async(req,res)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { rideId } = req.body;
    try {
        const ride = await rideService.confirmRide({ rideId, captain: req.captain });
        sendMessageToSocketId(ride.user.socketId, {
            event: 'ride-confirmed',
            data: ride
        })
        return res.status(200).json(ride);
    } catch (err) {

        console.log(err);
        return res.status(500).json({ message: err.message });
    }
}

module.exports.startRide = async(req,res)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const {rideId,otp} = req.query;
    try {
        const ride = await rideService.startRide({rideId,otp,captain:req.captain})
        console.log(ride);
        sendMessageToSocketId(ride.user.socketID,{
            event:'ride-started',
            data:ride
        })
        return res.status(200).json(ride);
    } catch (error) {
        return res.status(500).json({message:err.message});
    }
}