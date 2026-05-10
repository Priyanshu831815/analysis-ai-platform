const pdfParse = require('pdf-parse')
const {generateInterviewReport,generateResumepdf} = require('../services/ai.service')
const interviewReportModel = require('../models/interviewreport.model')

/**
 * @route POST /api/interview/generate-report
 * @description controller to generate an interview report based on candidate resume self description and job description
 * @access Private
 * 
 */

const getinterviewreportController = async(req,res)=>{
    try{
     const resumeFile = req.file
       if(!resumeFile){
         return res.status(400).json({success:false , message:'Resume file is required'})
       }
     const resumeContent = await (new pdfParse.PDFParse(Uint8Array.from(req.file.buffer))).getText()
     const { selfDescription, jobDescription }= req.body

      if(!selfDescription || !jobDescription) {
      return res.status(400).json({
        message: 'selfDescription and jobDescription are required'
      })
    }

     const interviewReportByAi = await generateInterviewReport({
        resume:resumeContent.text,
        selfDescription,
        jobDescription
     })

     const interviewReport = await interviewReportModel.create({
        user:req.user.id,
        resume:resumeContent.text,
        selfDescription,
        jobDescription,
        ...interviewReportByAi
     })

     res.status(201).json({ success:true,
        message:'Interview report created successfully',
        interviewReport
     })
}


catch(error){
console.error('Interview report error:', error)
    res.status(500).json({ success:false , message: error.message })
}
}

const getinterviewreportByIdController = async(req,res) =>{
   try{
     const { interviewId } = req.params
     if(!interviewId){
      return res.status(400).json({success:false , message:'interviewId is required'})
     }
     const interviewReport = await interviewReportModel.findOne({_id: interviewId, user: req.user.id})
     if(!interviewReport){
      return res.status(404).json({success:false,message:'Interview report not found'})
     }
    return res.status(200).json({
      success:true , message:"Interview report fetched successfully",
      interviewReport  
     })
   }
   catch(error){
    if(error.name === 'CastError'){
    return res.status(400).json({
      success: false, 
      message: 'Invalid interview ID format'  // ✅ Clean message
    })
  }
  res.status(500).json({success:false, message: error.message})
   }
}

/**
 * @description Controller to get all interview reports of the logged in user but only show role and your resume score
 * 
 */

  const  getAllinterviewReportsController = async (req,res) =>{
    try{
       const interviewReport  = await interviewReportModel
       .find({user: req.user.id})
       .sort({createdAt: -1})
       .select("-resume -selfDescription -jobDescription -__v -technicalQuestions -behavioralQuestions -skillGaps -preparationPlan ")
       if(interviewReport.length ===0){
        return res.status(404).json({success:false , message:"data not found"})
       }

       return res.status(200).json({
        success:true,
        message:"Interview report fetched successfully",
        interviewReport
       })
    }
    catch(error){
      console.error('Error fetching interview report:', error)
    res.status(500).json({ success:false,message: error.message })

    }
  }

   /**
    * @description  Controller to generate resume PDF based on user self description, resume and job description.
    */

   const generateResumePdfController = async(req,res) =>{
    try{
     const {interviewReportId} = req.params
     console.log(interviewReportId)
     if(!interviewReportId){
     return res.status(404).json({success:false, message:"interviewReport id is not exist"})
     }
     const interviewReport = await interviewReportModel.findById(interviewReportId)

     if(!interviewReport){
        return res.status(404).json({success:false,message:"interviewreport is not found"})}

        const {resume,jobDescription,selfDescription} = interviewReport
        console.log("interviewReport fields:", {
  resume,
  jobDescription, 
  selfDescription
});
        const pdfBuffer = await generateResumepdf({resume,selfDescription,jobDescription})

        res.set({
          "Content-Type":"application/pdf",
          "Content-Disposition": `attachment; filename=resume_${interviewReportId}.pdf`,
           "Content-Length": pdfBuffer.length,
     })
     res.send(pdfBuffer)
    }
    catch(error){
      console.error('Error to generate pdf resume pased on the jobDescription and selfDiscription, resume', error)
    res.status(500).json({ success:false,message: error.message })
    }
   }

module.exports = { getinterviewreportController, getinterviewreportByIdController,getAllinterviewReportsController,generateResumePdfController}