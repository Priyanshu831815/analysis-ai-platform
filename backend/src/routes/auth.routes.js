const express = require ('express')
const authController = require('../controllers/auth.controller')
const router = express.Router()
const authMiddleware = require('../middleware/auth.middleware')
const rateLimit = require('express-rate-limit')


const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: { message: 'Too many attempts, try again after 15 minutes' }
})

/**
 * @route POST /api/auth/user/register
 * @description Register a new user
 * @access Public 
 */

router.post('/user/register',limiter,authController.Userregistercontroller)

/**
 * @route POST /api/auth/user/login
 * @description login a user with email and password
 * @access Public 
 */
router.post('/user/login',limiter,authController.Userlogincontroller)


/**
 * @route Post /api/auth/user/logout
 * @description logout a user and clear token from user cookies and add token in blacklist
 * @access Public
 */

router.post('/user/logout',authController.Userlogoutcontroller)

/**
 * @route GET /api/auth/user/get-profile
 * @description get user profile information
 * @access Private
 */
  
router.get('/user/get-profile',authMiddleware.authuserMiddleware,authController.getUserprofilecontroller)





module.exports = router