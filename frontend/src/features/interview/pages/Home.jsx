import React, { useState, useRef } from 'react'
import { useInterviewAuth } from '../hooks/useInterviewAuth'
import { useNavigate } from 'react-router'
import { useAuth } from '../../auth/hooks/useAuth'


const Home = () => {
  const { loading, reports, handelgenerateReport} = useInterviewAuth()
 const {user,handelLogout} = useAuth()
  const [isSidebarOpen, setIsSidebarOpen] = useState(false) // State for mobile responsiveness
//  console.log(reports)
  const [form, setform] = useState({
    jobDescription: "",
    selfDescription: ""
  })

  const resumeInputRef = useRef()
  const navigate = useNavigate()

  const handleChange = (e) => {
    setform({
      ...form,
      [e.target.name]: e.target.value
    })
  }

  const handelGenerateReport = async () => {
    const resumeFile = resumeInputRef.current.files[0]
    try {
      const data = await handelgenerateReport({ jobDescription: form.jobDescription, selfDescription: form.selfDescription, resumeFile })
      setform({ jobDescription: "", selfDescription: "" })
      navigate(`/interview/${data._id}`)
    }
    catch (error) {
      console.error(error)
    }
  }

  const onLogout = async () => {
  try {
    await handelLogout()
    navigate('/login', { replace: true })
  } catch(error) {
    console.error(error)
  }
}

  if (loading) {
    return (
      <main className="min-h-screen w-full flex justify-center items-center bg-gray-50">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          <h1 className="text-lg font-semibold text-gray-600">Loading...</h1>
        </div>
      </main>
    )
  }

  return (
    <div className="flex h-screen bg-[#0b1121] text-[#f8fafc] font-sans overflow-hidden">
      
      {/* Sidebar ka poora structure */}
<aside className={`
  fixed inset-y-0 left-0 z-50 w-72 bg-[#0b1121] border-r border-[#1e293b] transform transition-transform duration-300 ease-in-out md:relative md:translate-x-0
  ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
`}>
  
  {/* ✅ flex column full height */}
  <div className="flex flex-col h-full">

    {/* TOP SECTION - fixed */}
    <div className="p-6 flex-shrink-0">
      
      {/* Logo + close */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-2.5 font-extrabold text-[15px] tracking-widest text-[#f8fafc]">
          <div className="w-2 h-2 rounded-full bg-[#3b82f6] shadow-[0_0_10px_rgba(59,130,246,0.8)]" />
          ANALYSIS.AI
        </div>
        <button onClick={() => setIsSidebarOpen(false)} className="md:hidden p-2 text-[#64748b]">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/>
          </svg>
        </button>
      </div>

      {/* New Analysis */}
      <button
        onClick={() => { setform({jobDescription: "", selfDescription: ""}); setIsSidebarOpen(false); }}
        className="w-full flex items-center gap-3 px-4 py-3 rounded-xl bg-[#1e293b] hover:bg-[#2d3a4f] transition-all text-sm font-medium text-[#94a3b8] mb-6"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"/>
        </svg>
        New Analysis
      </button>

      {/* Recent label */}
      <div className="text-[11px] font-bold text-[#475569] uppercase tracking-widest px-2">
        Recent Reports
      </div>

    </div>

    {/* MIDDLE SECTION - scrollable */}
    <div className="flex-1 overflow-y-auto px-6 pb-4 custom-scrollbar">
      <div className="space-y-3">
        {reports && reports.map((report) => (
          <div
            key={report._id}
            onClick={() => { navigate(`/interview/${report._id}`) }}
            className="group flex flex-col gap-1 px-3 py-3 rounded-xl hover:bg-[#3b82f6]/10 cursor-pointer transition-all border border-[#1e293b]/50 hover:border-[#3b82f6]/30 bg-[#0f172a]/20"
          >
            <div className="flex items-center gap-2">
              <svg className="w-3.5 h-3.5 text-[#475569] group-hover:text-[#60a5fa]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
              </svg>
              <h3 className="text-[13px] text-[#e2e8f0] group-hover:text-[#f8fafc] truncate font-semibold">
                {report.title || report.jobTitle || 'Untitled Position'}
              </h3>
            </div>
            <div className="flex flex-col pl-6">
              <p className="text-[10px] text-[#64748b]">
                Generated on {new Date(report.createdAt).toLocaleDateString()}
              </p>
              <p className={`text-[10px] font-bold mt-1 ${
                report.matchScore >= 80 ? 'text-green-500' :
                report.matchScore >= 60 ? 'text-yellow-500' : 'text-red-500'
              }`}>
                Match Score: {report.matchScore || 0}%
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>

    {/* ✅ BOTTOM SECTION - always fixed at bottom */}
    <div className="flex-shrink-0 p-4 border-t border-[#1e293b] bg-[#0b1121]">

      {/* User info */}
      <div className="flex items-center gap-3 px-2 py-2 mb-2">
        <div className="w-9 h-9 rounded-full bg-[#1e293b] border border-[#334155] flex items-center justify-center text-sm font-bold text-[#60a5fa] flex-shrink-0">
          {user?.username?.charAt(0).toUpperCase() || 'U'}
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-[13px] font-semibold text-[#f8fafc] truncate">
            {user?.username || 'User'}
          </p>
          <p className="text-[10px] text-[#475569] truncate">
            {user?.email || ''}
          </p>
        </div>
      </div>

      {/* ✅ Logout button — always visible */}
      <button
       onClick={onLogout}
        className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 hover:border-red-500/40 text-red-400 hover:text-red-300 transition-all font-medium text-sm active:scale-95"
      >
        <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"/>
        </svg>
        Logout
      </button>

    </div>

  </div>
</aside>

      {/* MOBILE OVERLAY */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* MAIN CONTENT AREA */}
      <main className="flex-1 overflow-y-auto relative custom-scrollbar flex flex-col">
        
        {/* Navbar */}
        <nav className="flex items-center justify-between px-7 py-5 border-b border-[#1e293b] sticky top-0 z-30 bg-[#0b1121]/80 backdrop-blur-md">
          <div className="flex items-center gap-4">
            {/* Hamburger Button */}
            <button 
              onClick={() => setIsSidebarOpen(true)}
              className="p-1 text-[#64748b] hover:text-[#f8fafc] md:hidden"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"/></svg>
            </button>
            <div className="flex items-center gap-2.5 font-extrabold text-[17px] tracking-widest text-[#f8fafc]">
              <div className="w-2 h-2 rounded-full bg-[#3b82f6] md:hidden" />
              <span className="md:hidden font-black">ANALYSIS.AI</span>
              <span className="hidden md:block text-sm text-[#64748b]">Dashboard</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-[10px] sm:text-xs text-[#60a5fa] bg-[#3b82f6]/10 border border-[#3b82f6]/20 px-3 py-1 rounded-full font-medium">
              AI Powered
            </span>
          </div>
        </nav>

        {/* Hero Content */}
        <div className="max-w-5xl mx-auto w-full px-4 sm:px-7 pb-20 relative z-10">
          <div className="text-center pt-10 pb-6">
            <h1 className="text-[clamp(24px,5.5vw,40px)] font-extrabold leading-[1.1] tracking-tight mb-4">
              Build Your Winning <span className="text-[#3b82f6]">Interview Strategy</span>
            </h1>
            <p className="text-sm text-[#94a3b8] max-w-xs mx-auto font-light">
              AI analyzes your profile against requirements for personalized prep.
            </p>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-8">
            <div className="bg-[#0f172a]/80 border border-[#1e293b] rounded-2xl p-6 backdrop-blur-sm focus-within:border-[#3b82f6]/50 transition-all flex flex-col min-h-[300px]">
              <div className="flex items-center justify-between mb-5 font-bold text-[14px]">
                <span className="flex items-center gap-2 text-[#f8fafc]">
                  <svg className="w-4 h-4 text-[#3b82f6]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" /><polyline points="14 2 14 8 20 8" /></svg>
                  Job Description
                </span>
                <span className="text-[10px] bg-[#1e293b] text-[#94a3b8] px-2.5 py-1 rounded-lg">Required</span>
              </div>
              <textarea
                name='jobDescription'
                value={form.jobDescription}
                onChange={handleChange}
                required
                placeholder="Paste the full job description here..."
                className="flex-1 w-full bg-transparent border-none outline-none text-[#e2e8f0] text-sm placeholder:text-[#475569] resize-none leading-relaxed"
              />
            </div>

            <div className="flex flex-col gap-5">
              <div className="bg-[#0f172a]/80 border border-[#1e293b] rounded-2xl p-6 backdrop-blur-sm transition-all">
                <div className="flex items-center justify-between mb-5 font-bold text-[14px]">
                  <span className="flex items-center gap-2 text-[#f8fafc]">
                    <svg className="w-4 h-4 text-[#3b82f6]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>
                    Resume
                  </span>
                  <span className="text-[10px] bg-[#1e293b] text-[#94a3b8] px-2.5 py-1 rounded-lg">Required</span>
                </div>
                <label className="flex flex-col items-center justify-center border border-dashed border-[#334155] rounded-2xl p-6 cursor-pointer hover:bg-[#3b82f6]/5 transition-all text-center relative">
                  <svg className="w-8 h-8 text-[#64748b] mb-2" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><polyline points="16 16 12 12 8 16" /><line x1="12" y1="12" x2="12" y2="21" /><path d="M20.39 18.39A5 5 0 0018 9h-1.26A8 8 0 103 16.3" /></svg>
                  <p className="text-xs font-bold text-[#f8fafc]">Select Resume</p>
                  <input ref={resumeInputRef} type="file" accept=".pdf,.docx" required className="absolute inset-0 opacity-0 cursor-pointer" />
                </label>
              </div>

              <div className="bg-[#0f172a]/80 border border-[#1e293b] rounded-2xl p-6 backdrop-blur-sm focus-within:border-[#3b82f6]/50 transition-all">
                <div className="flex items-center justify-between mb-4 font-bold text-[14px]">
                  <span className="flex items-center gap-2 text-[#f8fafc]">
                    <svg className="w-4 h-4 text-[#3b82f6]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" /></svg>
                    Self Description
                  </span>
                  <span className="text-[10px] bg-[#3b82f6]/10 text-[#60a5fa] px-2.5 py-1 rounded-lg">Optional</span>
                </div>
                <textarea
                  name='selfDescription'
                  value={form.selfDescription}
                  onChange={handleChange}
                  rows={3}
                  placeholder="Share achievements, goals..."
                  className="w-full bg-transparent border-none outline-none text-[#e2e8f0] text-sm placeholder:text-[#475569] resize-none"
                />
              </div>
            </div>
          </div>

          <button
            type="button"
            className="w-full py-4 rounded-2xl bg-[#2563eb] text-white font-extrabold text-[15px] flex items-center justify-center gap-2.5 hover:bg-[#1d4ed8] active:scale-[0.98] transition-all shadow-[0_4px_20px_rgba(37,99,235,0.4)]"
            onClick={handelGenerateReport}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" /></svg>
            Generate My Strategy
          </button>
        </div>
      </main>

      <style dangerouslySetInnerHTML={{ __html: `
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #1e293b; border-radius: 10px; }
      `}} />
    </div>
  )
}

export default Home