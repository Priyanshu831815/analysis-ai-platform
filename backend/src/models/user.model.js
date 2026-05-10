const mongoose = require('mongoose')


const UserSchema = new mongoose.Schema({
    username:{
        type:String,
        unique:[true , "username already taken"],
        required:true
    },
    email:{
        type:String,
        unique:[true,"account already exist with this email"],
        required:true
    },
    password:{
        type:String,
        required:true
    }
})


const userModel = mongoose.models.user || mongoose.model('user',UserSchema)


module.exports = userModel 