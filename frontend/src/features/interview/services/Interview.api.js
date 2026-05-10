import axiosInstance from "../../../api/axiosInstance"

/**
 * @description Service to generate interview report based on user self description and resume , job description
 * 
 */

export const generateInterviewReport = async ({jobDescription, selfDescription, resumeFile}) =>{
    const formData = new FormData()
        formData.append("jobDescription",jobDescription)
        formData.append("selfDescription",selfDescription)
        formData.append("resume",resumeFile)
    try{
       const response = await axiosInstance.post('/interview/',formData,{
        headers:{
            "Content-Type":"multipart/form-data"
        }
       })

       return response.data
    }
    catch(error){
     console.error(error)
     throw error
    }

}

/**
 * @description Service to get interview report by interviewId
 * 
 */
export const generateInterviewReportById = async (interviewId) =>{

    try{
      const response = await axiosInstance.get(`/interview/report/${interviewId}`)

      return response.data
      
    }
    catch(error){
    console.error(error)
     throw error
    }

}  

/**
 * @description Service to get all interview report of the specific logged user
 */

export const getAllinterviewReports = async () =>{
    try{
    const response = await axiosInstance.get('/interview/')
     return response.data
    }
    catch(error){
       console.error(error)
       throw error
    }
}

/**
 * @description Service to generate resume pdf based on user sefDescription and resume content and job description 
 * 
 */

export const generateresumepdf = async ({interviewReportId}) =>{
    try{
        const response = await axiosInstance.post(`/interview/resume/pdf/${interviewReportId}`,null,{
             responseType: "blob"
        })
        return response.data
    }
    catch(error){
       console.error(error)
       throw error

    }
}

  