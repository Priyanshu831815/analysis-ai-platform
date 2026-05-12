const userModel = require("../models/user.model")
const  validator = require('validator')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const BlackListTokenModel = require("../models/blacklisttoken.model")




/**
 * @name Userregister
 * @description Handles user registration by validating input, hashing password, and storing user in database
 * @route POST /api/auth/user/register
 * @access Public
 * @param {Object} req.body - { username, email, password }
 * @returns {Object} JSON response with success status, message, and user data or token
 */


const Userregistercontroller = async(req,res) =>{

try{
const {username,email,password}= req.body

    if(!username || !email || !password){
     return res.status(400).json({success:false , message:"missing required details"})
    }

    if (!validator.isLength(username, { min: 3, max: 20 })) {
      return res.status(400).json({
        success: false,
        message: 'Username must be between 3 and 20 characters'
      })
    }

 if(!validator.isEmail(email)){
    return res.status(400).json({success:false , message:'invalid email'})
 }

 if(!validator.isStrongPassword(password)){
    return res.status(400).json({success:false , message:'Password must contain uppercase, lowercase, number and symbol'})
 }

 const isUserAlreadyExists = await userModel.findOne({
    $or:[{username},{email}]
 })
    if(isUserAlreadyExists){
        /* isUserAlreadyExist.username == username &  isUserAlreadyExist.email == email  */
        return res.status(400).json({success:false , message:' account has already exist with this email address or username'})
    }
 const hashedpassword = await bcrypt.hash(password,10)
const user = await userModel.create({
    username:username,
    email:email,
    password:hashedpassword
})

const token = jwt.sign({
    id:user._id,
    username:user.username
},process.env.JWT_SECRET, {expiresIn:'1d'})
  res.cookie('token',token,{
   httpOnly: true,
         secure:process.env.NODE_SECURE_KEY,
         sameSite: 'tax',
         maxAge: 24 * 60 * 60 * 1000,
          path: "/"
  })

 return res.status(201).json({success:true , message:'user registered successfully',user:{
    id:user._id,
    email:user.email,
    username:user.username
 }

 })

}
catch(error){
       console.error(error)
      return res.status(500).json({success:false , message:'internal server error'})
}
}

/**
 * @name Userlogincontroller
 * @description Handel user login by validating email and password and generate Jwt token for authenticated user
 * @route POST /api/auth/user/login
 * @access Public
 */

const Userlogincontroller = async(req,res) =>{

   try{
      const {email,password} = req.body

      if(validator.isEmpty(email) || validator.isEmpty(password)){
         return res.status(400).json({success:false , message:'missing required details'})
      }
      
      if(!validator.isEmail(email)){
         return res.status(400).json({success:false , message:'invalid email'})
      }

      const user = await userModel.findOne({
         email:email
      })

      if(!user){
         return res.status(404).json({success:false , message:'user does not exist with this email'})
      }

      const isvalidpassword = await bcrypt.compare(password,user.password)

      if(!isvalidpassword){
         return res.status(401).json({success:false , message:"invalid password"})
      }

      const token = jwt.sign({
         id:user._id,
         username:user.username
      },process.env.JWT_SECRET, {expiresIn:'1d'})

      res.cookie('token',token,{
         httpOnly: true,
         secure:process.env.NODE_SECURE_KEY,
         sameSite: 'lax',
         maxAge: 24 * 60 * 60 * 1000,
         path: "/"
      })

     return res.status(200).json({success:true , message:'user successfully logged In',user:{
    id:user._id,
    email:user.email,
    username:user.username
      }})
      
   }
   catch(error){
      console.error(error)
    return  res.status(500).json({success:false , message:'internal server error'})
   }

}

/**
 * @name UserlogoutController
 * @description Handel user logout by clearing token from user cookies and add token in blacklist
 * @route Post /api/auth/user/logout
 * @access Public
 */

const Userlogoutcontroller = async (req,res) =>{
   try{
        const token = req.cookies.token
        if(token){
         try{
                await BlackListTokenModel.create({token})
         }
         catch(error){
            console.error('error while adding token to blacklist',error)
         }
        }
        res.clearCookie('token',{
          httpOnly: true,
        secure:process.env.NODE_SECURE_KEY,
         sameSite: 'lax',
         maxAge: 24 * 60 * 60 * 1000,
         path: "/"
        })
     return  res.status(200).json({success:true , message:'user successfully logged out'})
   }
   catch(error){
        console.error(error)
       return res.status(500).json({success:false , message:'internal server error'})
   }
}

/**
 * @name getUserProfileController
 * @description Handel get current user detail information for authenticated user and expect token in the cookies
 * @route GET /api/auth/user/get-profile
 * @access Private
 */

const getUserprofilecontroller = async (req,res) =>{
    try{
      const user = await userModel.findById(req.user.id).select('-password -__v -createdAt -updatedAt')
      if (!user) {
        return res.status(404).json({ success: false, message: 'User not found' })
    }
      return res.status(200).json({success:true , message:'user profile details fetch successfully',user:{
         id:user.id, 
         username:user.username,
         email:user.email
      }})
    }
    catch(error){ 
      console.error(error)
      return res.status(500).json({success:false , message:'internal server error'})
    }
}

module.exports = {
   Userregistercontroller,
   Userlogincontroller,
   Userlogoutcontroller,
   getUserprofilecontroller
}
