const mongoose = require('mongoose')

const blacklistTokenSchema = new mongoose.Schema({
    token:{
        type:String,
        required:[true ,"token is already required to be added to blacklist"]
    }
    
},{timestamps:true})


const blacklisttokenModel = mongoose.models.blacklist || mongoose.model("blacklist",blacklistTokenSchema)

module.exports = blacklisttokenModel