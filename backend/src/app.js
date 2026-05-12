const express = require ('express')
const helmet = require('helmet')
//const mongoSanitize = require('express-mongo-sanitize')


const authrouter = require('./routes/auth.routes')
const interviewrouter = require('./routes/interview.routes')
const app = express()
const cors = require('cors')
const cookieparser = require('cookie-parser')

app.use(cors({
    origin:'http://localhost:5173',
    credentials:true
}))

// ✅ 2. security headers
app.use(helmet());



app.use(express.json())
app.use(cookieparser())


// prevent MongoDB injection
//app.use(mongoSanitize())



//define and configure express app and routes

app.use('/api/auth', authrouter)
app.use('/api/interview',interviewrouter)


module.exports = app