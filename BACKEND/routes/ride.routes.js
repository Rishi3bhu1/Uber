const express = require("express");
const router = express.Router();
const {body,query} = require("express-validator")
const rideController = require("../controllers/ride.controller.js");
const authMiddleware = require("../middlewares/auth.middleware.js");
router.post('/create',
    authMiddleware.authUser,
    body('pickup').isString().isLength({min:3}).withMessage('Pickup address is required'),
    body('destination').isString().isLength({min:3}).withMessage('Destination address is required'),
    body('vehicleType').isString().isLength({min:3}).withMessage('Vehicle type is required'),
    rideController.createRide
)

router.get('/get-fare',
    authMiddleware.authUser,
    query('pickup').isString().isLength({min:3}).withMessage('pickup address is required'),
    query('destination').isString().isLength({min:3}).withMessage('destination address is required'),
    rideController.getFare
)

router.post("/confirm",
    authMiddleware.authCaptain,
    body('rideId').isMongoId().withMessage('Invalid ride id'),
    rideController.confirmRide
)

router.get('/start-ride',
    authMiddleware.authCaptain,
    query('rideId').isMongoId().withMessage('Invalid ride id'),
    query('otp').isString().isLength({ min: 6, max: 6 }).withMessage('Invalid OTP'),
    rideController.startRide
)

module.exports = router