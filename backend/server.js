require('dotenv').config()
const ConnectToDB = require('./src/config/db')
const  app = require('./src/app')



//console.log("ENV CHECK:", process.env.MONGO_URI);
ConnectToDB();



app.listen(3000, ()=>{
    console.log('server is running on port 3000')
})



