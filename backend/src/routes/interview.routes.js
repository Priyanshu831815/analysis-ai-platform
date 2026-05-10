const express = require('express')

const router = express.Router()

const authMiddleware = require('../middleware/auth.middleware')
const interviewcontroller = require('../controllers/interview.controller')
const upload = require("../middleware/file.middleware")
/**
 * @route POST /api/interview/
 * @description Generate an interview report based on candidate's resume self-description and job-description
 * @access Private
 */
  
router.post('/',authMiddleware.authuserMiddleware,upload.single("resume"),interviewcontroller.getinterviewreportController)

/**
 * @route GET /api/interview/report/:interviewId
 * @description get the all field of the single interview report for a specific user by interviewId
 * @access Private
 */

 router.get('/report/:interviewId',authMiddleware.authuserMiddleware,interviewcontroller.getinterviewreportByIdController)

 /**
  * @route GET api/interview/
  * @description get all interview reports of logged in user
  * @access Private
  */ 
  router.get('/',authMiddleware.authuserMiddleware,interviewcontroller.getAllinterviewReportsController)  

  /**
   * @route GET /api/interview/resume/pdf
   * @description generate resume pdf on the basis of user self description, resume content and job description.
   * @access Private
   */

    router.post('/resume/pdf/:interviewReportId',authMiddleware.authuserMiddleware,interviewcontroller.generateResumePdfController)








module.exports = router
