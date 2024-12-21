const express = require("express");
const router = express.Router();
const captainController = require("../controllers/captain.controller.js");
const authMiddleware= require("../middlewares/auth.middleware.js");
const {body} = require("express-validator");
router.post("/register",
    [
        body('email').isEmail().withMessage('Enter a valid email address'),
        body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
        body('fullname.firstname').notEmpty().withMessage('Name is required'),
        body('vehicle.color').isLength({min:3}).withMessage('Color must be atleast 3 characters long'),
        body('vehicle.plate').isLength({min:3}).withMessage('Plate must be atleast 3 characters long'),
        body('vehicle.capacity').isLength({min:1}).withMessage('Capacity must be atleast 1'),
        body('vehicle.vehicleType').isIn(['car','auto','motorcycle']).withMessage('Vehicle type is required')
    ],captainController.registerCaptain
)
router.post("/login",[
    body('email').isEmail().withMessage('Enter a valid email address'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
],captainController.loginCaptain)

router.get("/profile",authMiddleware.authCaptain,captainController.getCaptainProfile);

router.get("/logout",authMiddleware.authCaptain,captainController.logoutCaptain);

module.exports = router;