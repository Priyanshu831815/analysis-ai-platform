import React, { useState, useEffect } from 'react';
import { useInterviewAuth } from '../hooks/useInterviewAuth';
import { useNavigate, useParams } from 'react-router';

const Interview = () => {
  const [activeTab, setActiveTab] = useState('technical');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // ✅ your exact logic
  const { report, getReportById, loading, getResumePdf } = useInterviewAuth();
  const { interviewId } = useParams();

  // ✅ your exact useEffect
  useEffect(() => {
    if (interviewId) {
      getReportById(interviewId);
    }
  }, [interviewId]);

  // ✅ your exact loading check
  if (loading || !report) {
    return (
      <main className="min-h-screen w-full flex justify-center items-center bg-gray-50">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          <h1 className="text-lg font-semibold text-gray-600">Loading...</h1>
        </div>
      </main>
    );
  }

  // ✅ your exact CircularMatchScore component
  const CircularMatchScore = ({ score }) => {
    const radius = 24;
    const circumference = 2 * Math.PI * radius;
    const strokeDashoffset = circumference - (score / 100) * circumference;
    return (
      <div className="flex items-center justify-between px-5 py-4 rounded-2xl bg-[#0f172a]/80 border border-[#1e293b] shadow-inner mb-8">
        <div className="flex flex-col text-left">
          <span className="text-[13px] text-[#94a3b8] font-bold tracking-wider uppercase">Match Score</span>
          <span className="text-[11px] text-[#475569] mt-0.5">Based on JD Analysis</span>
        </div>
        <div className="relative flex items-center justify-center w-14 h-14">
          <svg className="w-full h-full transform -rotate-90">
            <circle className="text-[#1e293b]" strokeWidth="4" stroke="currentColor" fill="transparent" r={radius} cx="28" cy="28" />
            <circle
              className="text-[#3b82f6] drop-shadow-[0_0_8px_rgba(59,130,246,0.6)] transition-all duration-1000 ease-out"
              strokeWidth="4"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              stroke="currentColor"
              fill="transparent"
              r={radius}
              cx="28"
              cy="28"
            />
          </svg>
          <div className="absolute flex items-center justify-center">
            <span className="text-[14px] font-extrabold text-[#f8fafc] drop-shadow-[0_0_5px_rgba(59,130,246,0.5)]">
              {score}%
            </span>
          </div>
        </div>
      </div>
    );
  };

  // ✅ your exact tabConfig + icons added for bottom bar
  const tabConfig = [
    {
      key: 'technical',
      label: 'Technical Questions',
      shortLabel: 'Technical',
      activeClass: 'bg-[#3b82f6]/10 text-[#60a5fa] border border-[#3b82f6]/30 shadow-[0_0_20px_rgba(59,130,246,0.1)] translate-x-1',
      activeColor: 'text-[#60a5fa]',
      dotColor: 'bg-[#3b82f6]',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"/>
        </svg>
      ),
    },
    {
      key: 'behavioral',
      label: 'Behavioral Questions',
      shortLabel: 'Behavioral',
      activeClass: 'bg-[#8b5cf6]/10 text-[#a78bfa] border border-[#8b5cf6]/30 shadow-[0_0_20px_rgba(139,92,246,0.1)] translate-x-1',
      activeColor: 'text-[#a78bfa]',
      dotColor: 'bg-[#8b5cf6]',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"/>
        </svg>
      ),
    },
    {
      key: 'roadmap',
      label: 'Roadmap',
      shortLabel: 'Roadmap',
      activeClass: 'bg-[#10b981]/10 text-[#34d399] border border-[#10b981]/30 shadow-[0_0_20px_rgba(16,185,129,0.1)] translate-x-1',
      activeColor: 'text-[#34d399]',
      dotColor: 'bg-[#10b981]',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"/>
        </svg>
      ),
    },
  ];

  // ✅ fixed handlers — close sidebar on mobile
  const handleTabChange = (key) => {
    setActiveTab(key)
    setIsSidebarOpen(false)  // ← fixes mobile redirection!
  }

  const handleDownload = () => {
    getResumePdf(interviewId)  // ← your exact logic
    setIsSidebarOpen(false)    // ← fixes mobile
  }

  return (
    <main className="min-h-screen bg-[#0b1121] text-[#f8fafc] font-sans relative overflow-hidden flex flex-col">

      {/* ✅ your exact background glow */}
      <div className="absolute top-[-200px] left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-[radial-gradient(circle,rgba(59,130,246,0.12)_0%,transparent_70%)] pointer-events-none" />
      <div className="absolute bottom-[100px] right-[-100px] w-[400px] h-[400px] rounded-full bg-[radial-gradient(circle,rgba(139,92,246,0.08)_0%,transparent_70%)] pointer-events-none" />

      {/* ✅ your exact navbar */}
      <nav className="flex items-center justify-between px-7 py-5 border-b border-[#1e293b] relative z-20 bg-[#0b1121]/80 backdrop-blur-md sticky top-0">
        <div className="flex items-center gap-4">
          <button
            onClick={() => setIsSidebarOpen(true)}
            className="p-1 text-[#64748b] hover:text-[#f8fafc] lg:hidden"
            aria-label="Open navigation"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <div className="flex items-center gap-2.5 font-extrabold text-[17px] tracking-widest text-[#f8fafc]">
            <div className="w-2.5 h-2.5 rounded-full bg-[#3b82f6] shadow-[0_0_12px_rgba(59,130,246,0.8)] animate-pulse" />
            ANALYSIS.AI
          </div>
        </div>
        <span className="lg:hidden text-[11px] text-[#60a5fa] bg-[#3b82f6]/10 border border-[#3b82f6]/20 px-3 py-1 rounded-full font-medium capitalize">
          {activeTab}
        </span>
      </nav>

      {/* ✅ your exact overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* ✅ your exact 3 column layout */}
      <div className="flex-1 max-w-[1600px] w-full mx-auto grid grid-cols-1 lg:grid-cols-12 relative z-10">

        {/* ✅ your exact left sidebar — only onClick fixed */}
        <aside className={`
          fixed inset-y-0 left-0 z-50 w-72 bg-[#0b1121] border-r border-[#1e293b]
          transform transition-transform duration-300 ease-in-out
          lg:relative lg:inset-auto lg:z-auto lg:w-auto lg:col-span-3
          lg:translate-x-0 lg:border-r lg:p-8
          ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        `}>
          <div className="flex flex-col h-full justify-between p-6 lg:p-0">

            <div>
              {/* ✅ your exact mobile sidebar header */}
              <div className="flex items-center justify-between mb-8 lg:hidden">
                <div className="flex items-center gap-2.5 font-extrabold text-[15px] tracking-widest text-[#f8fafc]">
                  <div className="w-2 h-2 rounded-full bg-[#3b82f6] shadow-[0_0_10px_rgba(59,130,246,0.8)]" />
                  ANALYSIS.AI
                </div>
                <button
                  onClick={() => setIsSidebarOpen(false)}
                  className="p-2 text-[#64748b] hover:text-[#f8fafc]"
                  aria-label="Close navigation"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* ✅ tab buttons — fixed with handleTabChange */}
              <nav className="flex flex-col gap-2.5 lg:sticky lg:top-8">
                {tabConfig.map(({ key, label, activeClass }) => (
                  <button
                    key={key}
                    onClick={() => handleTabChange(key)}  // ✅ fixed!
                    className={`text-left px-5 py-3.5 rounded-xl font-medium transition-all duration-300 ${
                      activeTab === key
                        ? activeClass
                        : 'text-[#94a3b8] hover:text-[#e2e8f0] hover:bg-[#0f172a] border border-transparent'
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </nav>
            </div>

            {/* ✅ download button — fixed with handleDownload */}
            <div className="pt-6 lg:sticky lg:bottom-8">
              <button
                onClick={handleDownload}  // ✅ fixed!
                className="w-full flex items-center justify-center gap-2.5 px-5 py-3.5 rounded-xl font-bold text-[14px] text-white
                  bg-[#2563eb] hover:bg-[#1d4ed8] active:scale-[0.98]
                  shadow-[0_0_20px_rgba(37,99,235,0.4)] hover:shadow-[0_0_28px_rgba(37,99,235,0.6)]
                  transition-all duration-300"
              >
                <svg className="w-4 h-4 shrink-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M10.6144 17.7956C10.277 18.5682 9.20776 18.5682 8.8704 17.7956L7.99275 15.7854C7.21171 13.9966 5.80589 12.5726 4.0523 11.7942L1.63658 10.7219C.868536 10.381.868537 9.26368 1.63658 8.92276L3.97685 7.88394C5.77553 7.08552 7.20657 5.60881 7.97427 3.75892L8.8633 1.61673C9.19319.821767 10.2916.821765 10.6215 1.61673L11.5105 3.75894C12.2782 5.60881 13.7092 7.08552 15.5079 7.88394L17.8482 8.92276C18.6162 9.26368 18.6162 10.381 17.8482 10.7219L15.4325 11.7942C13.6789 12.5726 12.2731 13.9966 11.492 15.7854L10.6144 17.7956ZM4.53956 9.82234C6.8254 10.837 8.68402 12.5048 9.74238 14.7996 10.8008 12.5048 12.6594 10.837 14.9452 9.82234 12.6321 8.79557 10.7676 7.04647 9.74239 4.71088 8.71719 7.04648 6.85267 8.79557 4.53956 9.82234ZM19.4014 22.6899 19.6482 22.1242C20.0882 21.1156 20.8807 20.3125 21.8695 19.8732L22.6299 19.5353C23.0412 19.3526 23.0412 18.7549 22.6299 18.5722L21.9121 18.2532C20.8978 17.8026 20.0911 16.9698 19.6586 15.9269L19.4052 15.3156C19.2285 14.8896 18.6395 14.8896 18.4628 15.3156L18.2094 15.9269C17.777 16.9698 16.9703 17.8026 15.956 18.2532L15.2381 18.5722C14.8269 18.7549 14.8269 19.3526 15.2381 19.5353L15.9985 19.8732C16.9874 20.3125 17.7798 21.1156 18.2198 22.1242L18.4667 22.6899C18.6473 23.104 19.2207 23.104 19.4014 22.6899ZM18.3745 19.0469 18.937 18.4883 19.4878 19.0469 18.937 19.5898 18.3745 19.0469Z"/>
                </svg>
                Download Resume
              </button>
            </div>

          </div>
        </aside>

        {/* ✅ your exact middle column — pb-24 added for bottom bar */}
        <section className="lg:col-span-6 p-6 lg:p-10 h-[calc(100vh-85px)] overflow-y-auto no-scrollbar scroll-smooth">
          <div className="max-w-2xl mx-auto flex flex-col gap-6 pb-24 lg:pb-20">

            {/* ✅ your exact technical questions */}
            {activeTab === 'technical' && (
              <>
                <div className="mb-4">
                  <h2 className="text-2xl font-extrabold text-white">Technical Interview Prep</h2>
                  <p className="text-sm text-[#64748b] mt-1">Questions tailored to your resume and the MERN stack requirements.</p>
                </div>
                {report.technicalQuestion.map((item, idx) => (
                  <div key={idx} className="bg-[#0f172a]/80 border border-[#1e293b] rounded-2xl p-6 backdrop-blur-sm shadow-sm hover:border-[#3b82f6]/40 transition-colors">
                    <h3 className="text-[16px] font-bold text-[#f8fafc] leading-relaxed mb-4 flex items-start gap-3">
                      <span className="text-[#3b82f6] shrink-0 mt-0.5">Q{idx + 1}.</span>
                      {item.question}
                    </h3>
                    <div className="inline-flex items-center gap-1.5 bg-[#3b82f6]/10 border border-[#3b82f6]/20 text-[#60a5fa] text-[11px] px-3 py-1.5 rounded-lg mb-5 font-semibold tracking-wide">
                      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      Intention: {item.intention}
                    </div>
                    <div className="bg-[#1e293b]/40 rounded-xl p-4 border border-[#334155]/50">
                      <p className="text-[14px] text-[#cbd5e1] leading-relaxed">
                        <span className="text-white font-bold block mb-1">Winning Answer Strategy:</span>
                        {item.answer}
                      </p>
                    </div>
                  </div>
                ))}
              </>
            )}

            {/* ✅ your exact behavioral questions */}
            {activeTab === 'behavioral' && (
              <>
                <div className="mb-4">
                  <h2 className="text-2xl font-extrabold text-white">Behavioral Interview Prep</h2>
                  <p className="text-sm text-[#64748b] mt-1">Questions based on your past experiences and leadership roles.</p>
                </div>
                {report.behaviouralQuestion.map((item, idx) => (
                  <div key={idx} className="bg-[#0f172a]/80 border border-[#1e293b] rounded-2xl p-6 backdrop-blur-sm shadow-sm hover:border-[#8b5cf6]/40 transition-colors">
                    <h3 className="text-[16px] font-bold text-[#f8fafc] leading-relaxed mb-4 flex items-start gap-3">
                      <span className="text-[#a78bfa] shrink-0 mt-0.5">Q{idx + 1}.</span>
                      {item.question}
                    </h3>
                    <div className="inline-flex items-center gap-1.5 bg-[#8b5cf6]/10 border border-[#8b5cf6]/20 text-[#a78bfa] text-[11px] px-3 py-1.5 rounded-lg mb-5 font-semibold tracking-wide">
                      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                      </svg>
                      Intention: {item.intention}
                    </div>
                    <div className="bg-[#1e293b]/40 rounded-xl p-4 border border-[#334155]/50">
                      <p className="text-[14px] text-[#cbd5e1] leading-relaxed">
                        <span className="text-white font-bold block mb-1">Winning Answer Strategy:</span>
                        {item.answer}
                      </p>
                    </div>
                  </div>
                ))}
              </>
            )}

            {/* ✅ your exact roadmap */}
            {activeTab === 'roadmap' && (
              <>
                <div className="mb-4">
                  <h2 className="text-2xl font-extrabold text-white">4-Day Preparation Roadmap</h2>
                  <p className="text-sm text-[#64748b] mt-1">A step-by-step plan to close your skill gaps before the interview.</p>
                </div>
                <div className="flex flex-col gap-6 relative before:absolute before:inset-0 before:ml-[23px] before:w-[2px] before:bg-gradient-to-b before:from-[#3b82f6] before:to-[#1e293b]">
                  {report.preparationPlan.map((plan, idx) => (
                    <div key={plan._id || idx} className="relative pl-14 group">
                      <div className="absolute left-0 top-1 w-12 h-12 rounded-full bg-[#0b1121] border-2 border-[#3b82f6] flex items-center justify-center shadow-[0_0_15px_rgba(59,130,246,0.3)] z-10 transition-transform group-hover:scale-110">
                        <span className="text-[#60a5fa] font-extrabold text-sm">D{plan.day}</span>
                      </div>
                      <div className="bg-[#0f172a]/80 border border-[#1e293b] rounded-2xl p-6 backdrop-blur-sm group-hover:border-[#3b82f6]/40 transition-colors">
                        <h3 className="text-lg font-bold text-white mb-4">{plan.focus}</h3>
                        <ul className="flex flex-col gap-3.5">
                          {plan.tasks.map((task, tIdx) => (
                            <li key={tIdx} className="text-[14.5px] text-[#94a3b8] flex items-start gap-3 leading-relaxed">
                              <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#3b82f6] shrink-0" />
                              {task}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}

          </div>
        </section>

        {/* ✅ your exact right sidebar */}
        <aside className="lg:col-span-3 p-6 lg:p-8 border-t lg:border-t-0 lg:border-l border-[#1e293b] bg-[#0b1121]/40">
          <div className="sticky top-8">
            <CircularMatchScore score={Number(report.matchScore)} />
            <h3 className="text-[14px] uppercase tracking-wider font-bold text-[#e2e8f0] mb-5 flex items-center gap-2.5">
              <svg className="w-4 h-4 text-[#ef4444]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
                <line x1="12" y1="9" x2="12" y2="13" />
                <line x1="12" y1="17" x2="12.01" y2="17" />
              </svg>
              Skill Gaps
            </h3>
            <div className="flex flex-col gap-3">
              {report.skillGaps.map((gap, idx) => {
                const severityStyles = {
                  high: 'bg-red-500/10 border-red-500/20 text-red-400',
                  medium: 'bg-amber-500/10 border-amber-500/20 text-amber-400',
                  low: 'bg-blue-500/10 border-blue-500/20 text-blue-400',
                };
                return (
                  <div
                    key={idx}
                    className={`px-4 py-3 rounded-xl border flex items-center justify-between transition-colors ${severityStyles[gap.severity] || 'border-[#334155] text-[#e2e8f0]'}`}
                  >
                    <span className="text-[13px] font-semibold leading-tight pr-2">{gap.skill}</span>
                    <span className="text-[10px] uppercase tracking-widest opacity-80 shrink-0 font-bold">{gap.severity}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </aside>

      </div>

      {/* ✅ NEW — mobile bottom tab bar */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-30 bg-[#0b1121]/95 backdrop-blur-md border-t border-[#1e293b] px-4 py-2">
        <div className="flex items-center justify-around max-w-md mx-auto">
          {tabConfig.map(({ key, icon, shortLabel, activeColor, dotColor }) => (
            <button
              key={key}
              onClick={() => handleTabChange(key)}
              className={`flex flex-col items-center gap-1 px-4 py-1.5 rounded-xl transition-all duration-200 ${
                activeTab === key ? activeColor : 'text-[#475569]'
              }`}
            >
              {icon}
              <span className="text-[10px] font-medium">{shortLabel}</span>
              {activeTab === key && (
                <div className={`w-1 h-1 rounded-full ${dotColor}`} />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* ✅ your exact style */}
      <style dangerouslySetInnerHTML={{
        __html: `
          .no-scrollbar::-webkit-scrollbar { display: none; }
          .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        `
      }} />

    </main>
  );
};

export default Interview;