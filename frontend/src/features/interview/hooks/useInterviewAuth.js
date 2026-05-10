import { InterviewContext } from "../interview.context";
import { useContext, useEffect } from "react";  // ✅ removed useCallback
import {
  generateInterviewReport,
  generateInterviewReportById,
  getAllinterviewReports,
  generateresumepdf
} from "../services/Interview.api";
import { useParams } from "react-router";

export const useInterviewAuth = () => {
  const context = useContext(InterviewContext);

  if (!context) {
    throw new Error("useInterviewAuth must be used inside InterviewContext");
  }

  const { loading, setLoading, report, setReport, reports, setReports } = context;
  const { interviewId } = useParams();
  

  // called from component — re-throws so component can handle UI feedback
  const handelgenerateReport = async ({ jobDescription, selfDescription, resumeFile }) => {
    setLoading(true);
    let response = null
    try {
       response = await generateInterviewReport({ jobDescription, selfDescription, resumeFile });
      setReport(response.interviewReport);
      
    } catch (error) {
      throw error;  // ✅ component catches this and shows error to user
    } finally {
      setLoading(false);
    }
    return response.interviewReport;
  };

  // ✅ no useCallback — plain async functions, effect only depends on interviewId
  const getReportById = async (interviewId) => {
    setLoading(true);
    let response = null
    try {
     response = await generateInterviewReportById(interviewId);
      setReport(response.interviewReport);

    } catch (error) {
      console.error("Failed to fetch report:", error);  // ✅ don't re-throw, effect can't catch it
    } finally {
      setLoading(false);
    }
      return response.interviewReport;
  };

  const getReports = async () => {
    setLoading(true);
    let response  = null
    try {
       response = await getAllinterviewReports();
      setReports(response.interviewReport);
    
    } catch (error) {
      console.error("Failed to fetch reports:", error);  // ✅ same — effect can't catch
    } finally {
      setLoading(false);
    }

    return response.interviewReport;
  };

  const getResumePdf = async(interviewReportId)=>{
    setLoading(true)
    let response = null
    try{
       response = await generateresumepdf({interviewReportId})
       const url = window.URL.createObjectURL(new Blob([response], {type:"application/pdf"}))
       const link = document.createElement('a')
       link.href = url
       link.setAttribute("download", `resume_${interviewReportId}.pdf`)
       document.body.appendChild(link)
       link.click()
        link.remove()  // ✅ cleanup the link after click
         window.URL.revokeObjectURL(url)
    }
    catch(error){
   console.error("Faild to download resume  ", error)
    }
    finally {
      setLoading(false);
    }
  }

  // ✅ only interviewId as dep — no infinite loop risk
  useEffect(() => {
    if (interviewId) {
      getReportById(interviewId);
    } else {
      getReports();
    }
  }, [interviewId]); 

  return { loading, report, reports, handelgenerateReport, getReportById, getReports, getResumePdf };
};