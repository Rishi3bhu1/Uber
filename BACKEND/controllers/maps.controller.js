const mapService = require('../services/maps.service');
const {validationResult} = require("express-validator");
module.exports.getCoordinates = async (req, res, next) => {
    const {address} = req.query;
    try {
        const coordinates = await mapService.getAddressCoordinate(address);
        res.status(200).json(coordinates)
    } catch (error) {
        res.status(404).json({message:"Coordinates Not Found"})
    }
}

module.exports.getDistanceTime = async (req, res, next) => {
    try {
        const error = validationResult(req);
        if(!error.isEmpty()){
            return res.status(400).json({errors:error.array()})
        }
        const {origin,destination} = req.query;
        console.log(origin,destination)
        const distanceTime = await mapService.getDistanceTime(origin,destination);
        res.status(200).json(distanceTime)
    } catch (error) {
        
    }
}

module.exports.getSuggestion = async (req, res, next) => { 
    const error = validationResult(req);
    if(!error.isEmpty()){
        return res.status(400).json({errors:error.array()})
    }
    const {input} = req.query;
    try {
        const suggestions = await mapService.getSuggestions(input);
        res.status(200).json(suggestions)
    } catch (error) {
        res.status(404).json({message:"Suggestions Not Found"})
    }
}