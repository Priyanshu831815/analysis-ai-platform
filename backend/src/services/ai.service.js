const { GoogleGenAI } = require("@google/genai")
const { z } = require("zod")
const { zodToJsonSchema } = require("zod-to-json-schema")
const puppeteer = require('puppeteer')

const ai = new GoogleGenAI({ apiKey: process.env.GOOGLE_GENAI_API_KEY })

const interviewReportSchema = z.object({
    matchScore: z.number().describe("A score between 0 and 100 indicating how well the candidate's profile matches the job describe"),
    technicalQuestion: z.array(z.object({
        question: z.string().describe("The technical question can be asked in the interview"),
        intention: z.string().describe("The intention of interviewer behind asking this question"),
        answer: z.string().describe("How to answer this question, what points to cover, what approach to take etc.")
    })).describe("Technical questions that can be asked in the interview along with their intention and how to answer them"),
    behaviouralQuestion: z.array(z.object({
        question: z.string().describe("The technical question can be asked in the interview"),
        intention: z.string().describe("The intention of interviewer behind asking this question"),
        answer: z.string().describe("How to answer this question, what points to cover, what approach to take etc.")
    })).describe("Behavioral questions that can be asked in the interview along with their intention and how to answer them"),
    skillGaps: z.array(z.object({
        skill: z.string().describe("The skill which the candidate is lacking"),
        severity: z.enum([ "low", "medium", "high" ]).describe("The severity of this skill gap, i.e. how important is this skill for the job and how much it can impact the candidate's chances")
    })).describe("List of skill gaps in the candidate's profile along with their severity"),
    preparationPlan: z.array(z.object({
        day: z.number().describe("The day number in the preparation plan, starting from 1"),
        focus: z.string().describe("The main focus of this day in the preparation plan, e.g. data structures, system design, mock interviews etc."),
        tasks: z.array(z.string()).describe("List of tasks to be done on this day to follow the preparation plan, e.g. read a specific book or article, solve a set of problems, watch a video etc.")
    })).describe("A day-wise preparation plan for the candidate to follow in order to prepare for the interview effectively"),
    title: z.string().describe("The title of the job which the interview report is generated")
})

const generateInterviewReport = async ({ resume, selfDescription, jobDescription }) => {
    const prompt = `Generate an interview report for a candidate with the following details:
                    Resume: ${resume}
                    Self Description: ${selfDescription}
                    Job Description: ${jobDescription}

    Important Instructions:
    - Generate minimum 10 technical questions with detailed answers
    - Generate minimum 5 behavioral questions with detailed answers
    - Identify at least 5 skill gaps with severity
    - Create a 7 day preparation plan with daily tasks`

    try {
        const response = await ai.models.generateContent({
            model: "gemini-3-flash-preview",
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseJsonSchema: zodToJsonSchema(interviewReportSchema),
            }
        })
        return JSON.parse(response.text)
    } catch (error) {
        console.error("Error generating interview report:", error.message)
        throw error
    }
}

const generatePdfFromHtml = async (htmlresumecontent) => {
    try {
        const browser = await puppeteer.launch()
        const page = await browser.newPage();
        
        await page.setContent(htmlresumecontent, {
            waitUntil: "networkidle0"
        })
        
        // FIXED: Changed "formate" to "format", added printBackground
        const pdfBuffer = await page.pdf({
            format: "A4",
            printBackground: true, 
            margin: {
                top: "0",
                bottom: "0",
                left: "3mm",
                right: "3mm"
            }
        })
        
        await browser.close()
        return pdfBuffer
        
    } catch(error) {
        console.error("Error failed to convert html resume into pdf:", error.message)
        throw error
    }
}

const generateResumepdf = async ({ resume, selfDescription, jobDescription }) => {
    const resumepdfSchema = z.object({
        htmlresumecontent: z.string().describe("The HTML content of the resume which can be converted to PDF using any library like puppeteer")
    })
    
    // FIXED: Updated prompt to strictly enforce single-page CSS and brevity
    const prompt = `Generate a resume for a candidate with the following details:

    Resume: ${resume}
    Self Description: ${selfDescription}
    Job Description: ${jobDescription}
    
 the response should be a JSON object with a single field "html" which contains the HTML content of the resume which can be converted to PDF using any library like puppeteer.
                        The resume should be tailored for the given job description and should highlight the candidate's strengths and relevant experience. The HTML content should be well-formatted and structured, making it easy to read and visually appealing.
                        The content of resume should be not sound like it's generated by AI and should be as close as possible to a real human-written resume.
                        you can highlight the content using some colors or different font styles but the overall design should be simple and professional.
                        The content should be ATS friendly, i.e. it should be easily parsable by ATS systems without losing important information.
                        The resume should not be so lengthy, it should ideally be 1 page long when converted to PDF. Focus on quality rather than quantity and make sure to include all the relevant information that can increase the candidate's chances of getting an interview call for the given job description.
                        extract the link of the github and linkdin from the resume and also make sure the education is correctly extract from the resume and attach in the new resume also add summary as heading for better result and try to generate only one page resume and ATS frindely.
                        adjust the whole content in the only one page don't leave extra space below remeper it.
                        Dont leave extra space below the content. 
                        `
    
    try {
        const response = await ai.models.generateContent({
            model: 'gemini-3-flash-preview',
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseJsonSchema: zodToJsonSchema(resumepdfSchema)
            }   
        }) 
        
        const jsonContent = JSON.parse(response.text)
        const pdfBuffer = await generatePdfFromHtml(jsonContent.htmlresumecontent)
        return pdfBuffer
        
    } catch (error) {
        console.error("Error generating Html type resume content:", error.message)
        throw error
    }
}

module.exports = {
    generateInterviewReport,
    generateResumepdf
}