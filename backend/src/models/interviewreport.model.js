const mongoose = require('mongoose')

/**
 * -job description schema:String
 * -selfdescription: String
 * -resume text : String
 * 
 * -matchscore : Number
 * -Technical questions :[{
 *  question:"",
 * intention:"",
 * answer:""
 * }]
 * -Behaviour questions:[question:"",
 * intention:"",
 * answer:""
 * }]
 *-Skill gaps:[{
 *    skills:"",
 *     severity: string,
 *     enum:["low","medium","high"]
 * }]
 *-Prepration plan:[{              
 *             
 *         day:Number,
 *         focus: String,
 *         tasks: String
 *           }]
 * 
 * 
 * 
 */

 const technicalQuestionSchema = new mongoose.Schema({
    question:{
        type: String,
        required: [true,'Technical questions is required']
    },
    intention:{
        type: String,
        required: [true,'intention is required']
    },
    answer:{
        type:String,
         required: [true,'answer is required']
    }
 },{
    _id: false
 })

 const behaviouralQuestionSchema = new mongoose.Schema({
    question:{
        type: String,
        required: [true,'Technical questions is required']
    },
    intention:{
        type: String,
        required: [true,'intention is required']
    },
    answer:{
        type:String,
         required: [true,'answer is required']
    }
 },{
    _id: false
 })


 const skillGapSchema = new mongoose.Schema({
     skill:{
        type:String,
        required:[true,"Skill is required"]
     },
     severity:{
        type:String,
        enum:["low","medium","high"]
     }
 },{
    _id:false
 })

 const preparationPlanSchema = new mongoose.Schema({
    day:{
        type:Number,
        required:[true,"Day is required"]
    },

    focus:{
        type:String,
        required:[true,"Fous is required"]
    },
    tasks:[{
        type:String,
        required:[true,"Task is required"]
    }]

 })




const InterviewreportSchema = new mongoose.Schema({
    jobDescription:{
        type:String,
        required: true
    },
    resume:{
         type: String
    },
    selfDescription:{
        type: String
    },
    matchScore:{
        type:String,
        min:0,
        max:100
    },
  technicalQuestion:[ technicalQuestionSchema ],
  behaviouralQuestion:[ behaviouralQuestionSchema ],
  skillGaps:[ skillGapSchema ],
  preparationPlan:[ preparationPlanSchema ],
  user:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'user'
  },

title:{
type:String,
required:[true,"Job title is required"]
}
    

},{
    timestamps:true
})


const interviewReportModel = mongoose.models.Interviewreport || mongoose.model('Interviewreport', InterviewreportSchema)

module.exports = interviewReportModel