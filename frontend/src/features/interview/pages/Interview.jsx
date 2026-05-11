import React, { useState, useEffect } from 'react';
import { useInterviewAuth } from '../hooks/useInterviewAuth';
import { useParams } from 'react-router';

const Interview = () => {
  const [activeTab, setActiveTab] = useState('technical');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { report, getReportById, loading, getResumePdf } = useInterviewAuth();
  const { interviewId } = useParams();

  useEffect(() => {
    if (interviewId) {
      getReportById(interviewId);
    }
  }, [interviewId]);

  if (loading || !report) {
    return (
      <main className="min-h-screen w-full flex justify-center items-center bg-[#0b1121]">
        <div className="flex flex-col items-center gap-3">
          <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          <h1 className="text-lg font-bold text-gray-400 tracking-tight">Syncing Intelligence...</h1>
        </div>
      </main>
    );
  }

  const tabConfig = [
    {
      key: 'technical',
      label: 'Technical',
      fullLabel: 'Technical Analysis',
      icon: (
        <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
        </svg>
      ),
      activeClass: 'bg-[#3b82f6]/10 text-[#60a5fa] border-[#3b82f6]/30',
    },
    {
      key: 'behavioral',
      label: 'Behavioral',
      fullLabel: 'Behavioral Prep',
      icon: (
        <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
      activeClass: 'bg-[#8b5cf6]/10 text-[#a78bfa] border-[#8b5cf6]/30',
    },
    {
      key: 'roadmap',
      label: 'Roadmap',
      fullLabel: 'Success Roadmap',
      icon: (
        <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
        </svg>
      ),
      activeClass: 'bg-[#10b981]/10 text-[#34d399] border-[#10b981]/30',
    },
  ];

  const handleTabSwitch = (key) => {
    setActiveTab(key);
    setIsSidebarOpen(false);
  };

  return (
    <main className="min-h-screen bg-[#0b1121] text-[#f8fafc] font-sans flex flex-col relative overflow-hidden">
      
      {/* Background Glow */}
      <div className="absolute top-[-15%] left-1/2 -translate-x-1/2 w-full max-w-[800px] h-[600px] bg-blue-600/5 blur-[120px] rounded-full pointer-events-none z-0" />

      {/* Navbar */}
      <nav className="sticky top-0 z-[100] bg-[#0b1121]/90 backdrop-blur-xl border-b border-[#1e293b] px-4 lg:px-10 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3 md:gap-4">
          <button onClick={() => setIsSidebarOpen(true)} className="lg:hidden p-1 text-gray-400 hover:text-white transition-colors">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" /></svg>
          </button>
          <div className="text-lg md:text-xl font-black tracking-tighter flex items-center gap-2.5">
             <div className="w-2.5 h-2.5 md:w-3.5 md:h-3.5 bg-blue-500 rounded-full shadow-[0_0_15px_#3b82f6] animate-pulse shrink-0" />
             ANALYSIS.AI
          </div>
        </div>
        
        {/* RESPONSIVE BUTTON */}
        <button 
          onClick={() => getResumePdf(interviewId)} 
          className="flex items-center gap-1.5 md:gap-2 px-3 py-2 md:px-6 md:py-2.5 bg-blue-600 hover:bg-blue-500 rounded-lg md:rounded-xl text-xs md:text-sm font-bold transition-all shadow-[0_0_20px_rgba(37,99,235,0.2)] active:scale-95 whitespace-nowrap"
        >
           <svg className="w-3.5 h-3.5 md:w-4 md:h-4 shrink-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M10.6144 17.7956C10.277 18.5682 9.20776 18.5682 8.8704 17.7956L7.99275 15.7854C7.21171 13.9966 5.80589 12.5726 4.0523 11.7942L1.63658 10.7219C.868536 10.381.868537 9.26368 1.63658 8.92276L3.97685 7.88394C5.77553 7.08552 7.20657 5.60881 7.97427 3.75892L8.8633 1.61673C9.19319.821767 10.2916.821765 10.6215 1.61673L11.5105 3.75894C12.2782 5.60881 13.7092 7.08552 15.5079 7.88394L17.8482 8.92276C18.6162 9.26368 18.6162 10.381 17.8482 10.7219L15.4325 11.7942C13.6789 12.5726 12.2731 13.9966 11.492 15.7854L10.6144 17.7956ZM4.53956 9.82234C6.8254 10.837 8.68402 12.5048 9.74238 14.7996 10.8008 12.5048 12.6594 10.837 14.9452 9.82234 12.6321 8.79557 10.7676 7.04647 9.74239 4.71088 8.71719 7.04648 6.85267 8.79557 4.53956 9.82234ZM19.4014 22.6899 19.6482 22.1242C20.0882 21.1156 20.8807 20.3125 21.8695 19.8732L22.6299 19.5353C23.0412 19.3526 23.0412 18.7549 22.6299 18.5722L21.9121 18.2532C20.8978 17.8026 20.0911 16.9698 19.6586 15.9269L19.4052 15.3156C19.2285 14.8896 18.6395 14.8896 18.4628 15.3156L18.2094 15.9269C17.777 16.9698 16.9703 17.8026 15.956 18.2532L15.2381 18.5722C14.8269 18.7549 14.8269 19.3526 15.2381 19.5353L15.9985 19.8732C16.9874 20.3125 17.7798 21.1156 18.2198 22.1242L18.4667 22.6899C18.6473 23.104 19.2207 23.104 19.4014 22.6899ZM18.3745 19.0469 18.937 18.4883 19.4878 19.0469 18.937 19.5898 18.3745 19.0469Z"></path></svg>
           <span className="hidden sm:inline">Download Resume</span>
           <span className="sm:hidden">Resume</span>
        </button>
      </nav>

      <div className="flex-1 flex flex-col lg:flex-row max-w-[1600px] w-full mx-auto relative z-10">
        
        {/* Mobile Background Overlay */}
        {isSidebarOpen && (
          <div 
            className="fixed inset-0 bg-[#0b1121]/60 backdrop-blur-sm z-[80] lg:hidden"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}

        {/* Sidebar Navigation */}
        <aside className={`fixed lg:static inset-y-0 left-0 z-[90] w-72 lg:w-80 bg-[#0b1121] lg:bg-transparent border-r border-[#1e293b] lg:border-none transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 transition-transform duration-300 p-5 pt-24 lg:p-6 lg:pt-6 flex flex-col`}>
          <nav className="space-y-2">
            {tabConfig.map((tab) => (
              <button
                key={tab.key}
                onClick={() => handleTabSwitch(tab.key)}
                className={`w-full flex items-center gap-3 px-5 py-4 rounded-2xl border transition-all ${activeTab === tab.key ? `${tab.activeClass} border` : 'border-transparent text-gray-500 hover:text-gray-300 hover:bg-gray-800/30'}`}
              >
                {tab.icon}
                <span className="font-bold text-sm tracking-tight">{tab.fullLabel}</span>
              </button>
            ))}
          </nav>
        </aside>

        {/* ── MAIN CONTENT (Questions + Intention) ── */}
        {/* ADJUSTED pb-32 to pb-12 so there is no massive blank space at the bottom on mobile */}
        <section className="flex-1 p-5 lg:p-12 overflow-y-auto no-scrollbar pb-12">
            <div className="max-w-2xl mx-auto">
                <header className="mb-12">
                    <h1 className="text-3xl md:text-4xl font-black text-white tracking-tight italic">Intelligence Report</h1>
                    <p className="text-gray-500 mt-2 md:mt-3 text-base md:text-lg capitalize">{activeTab} Preparation Guide</p>
                </header>

                <div className="space-y-8 md:space-y-10">
                    {/* 1. TECHNICAL QUESTIONS */}
                    {activeTab === 'technical' && report.technicalQuestion?.map((item, idx) => (
                        <div key={idx} className="relative group p-6 md:p-8 rounded-[2rem] bg-[#0f172a]/40 border border-[#1e293b] hover:border-blue-500/40 transition-all duration-500">
                            {/* INTENTION LABEL */}
                            <div className="flex items-center gap-2 md:gap-3 text-blue-400 text-[9px] md:text-[10px] font-black uppercase tracking-[0.2em] md:tracking-[0.3em] mb-4 md:mb-5">
                                <span className="px-2 py-1 bg-blue-500/10 rounded border border-blue-500/20 text-blue-300">Q{idx + 1}</span>
                                <span className="w-1 h-1 bg-blue-500 rounded-full animate-pulse shrink-0" />
                                Intention: {item.intention}
                            </div>
                            
                            <h3 className="text-lg md:text-xl font-bold text-gray-100 leading-relaxed mb-5 md:mb-6">{item.question}</h3>
                            
                            {/* ANSWER STRATEGY */}
                            <div className="p-4 md:p-5 rounded-2xl bg-blue-500/5 border border-blue-500/10">
                                <p className="text-[10px] md:text-[11px] text-blue-300 font-black uppercase tracking-widest mb-2">Winning Strategy</p>
                                <p className="text-sm md:text-[15px] text-gray-400 leading-relaxed font-medium">{item.answer}</p>
                            </div>
                        </div>
                    ))}

                    {/* 2. BEHAVIORAL QUESTIONS */}
                    {activeTab === 'behavioral' && report.behaviouralQuestion?.map((item, idx) => (
                        <div key={idx} className="relative group p-6 md:p-8 rounded-[2rem] bg-[#0f172a]/40 border border-[#1e293b] hover:border-purple-500/40 transition-all duration-500">
                            {/* INTENTION LABEL */}
                            <div className="flex items-center gap-2 md:gap-3 text-purple-400 text-[9px] md:text-[10px] font-black uppercase tracking-[0.2em] md:tracking-[0.3em] mb-4 md:mb-5">
                                <span className="px-2 py-1 bg-purple-500/10 rounded border border-purple-500/20 text-purple-300">Q{idx + 1}</span>
                                <span className="w-1 h-1 bg-purple-500 rounded-full animate-pulse shrink-0" />
                                Intention: {item.intention}
                            </div>

                            <h3 className="text-lg md:text-xl font-bold text-gray-100 leading-relaxed mb-5 md:mb-6">{item.question}</h3>

                            <div className="p-4 md:p-5 rounded-2xl bg-purple-500/5 border border-purple-500/10">
                                <p className="text-[10px] md:text-[11px] text-purple-300 font-black uppercase tracking-widest mb-2">Winning Strategy</p>
                                <p className="text-sm md:text-[15px] text-gray-400 leading-relaxed font-medium">{item.answer}</p>
                            </div>
                        </div>
                    ))}

                    {/* 3. PREP ROADMAP */}
                    {activeTab === 'roadmap' && (
                        <div className="space-y-8 relative before:absolute before:inset-0 before:left-[19px] before:w-[2px] before:bg-gradient-to-b before:from-emerald-500/40 before:to-transparent">
                            {report.preparationPlan?.map((plan, idx) => (
                                <div key={idx} className="relative pl-14">
                                    <div className="absolute left-0 top-0 w-10 h-10 rounded-full bg-[#0b1121] border-2 border-emerald-500 flex items-center justify-center text-[10px] font-black text-emerald-400 z-10 shrink-0">
                                        DAY {plan.day}
                                    </div>
                                    <div className="p-5 md:p-7 rounded-[2rem] bg-[#0f172a]/40 border border-[#1e293b]">
                                        <h3 className="text-lg md:text-xl font-bold text-white mb-4 md:mb-5">{plan.focus}</h3>
                                        <ul className="space-y-3 md:space-y-4">
                                            {plan.tasks?.map((task, tIdx) => (
                                                <li key={tIdx} className="flex items-start gap-3 md:gap-4 text-sm text-gray-400">
                                                    <div className="mt-1.5 w-1.5 h-1.5 bg-emerald-500 rounded-full shrink-0" />
                                                    {task}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </section>

        {/* RIGHT PANEL (Match Score & Skill Gaps) */}
        <aside className="w-full lg:w-80 p-5 lg:p-10 border-t lg:border-t-0 lg:border-l border-[#1e293b]">
             <div className="sticky top-28 space-y-6 md:space-y-8">
                <div className="p-6 md:p-8 rounded-[3rem] bg-gradient-to-br from-blue-600/20 via-blue-500/5 to-purple-600/20 border border-white/5 text-center shadow-2xl">
                    <p className="text-gray-500 text-[9px] md:text-[10px] font-black uppercase tracking-widest mb-2 md:mb-3">Overall Match</p>
                    <div className="text-6xl md:text-7xl font-black text-white italic tracking-tighter">{report.matchScore}%</div>
                </div>

                <div className="p-5 md:p-6 rounded-[2rem] bg-[#0f172a]/30 border border-[#1e293b]">
                    <h4 className="text-[9px] md:text-[10px] font-black text-gray-500 uppercase tracking-widest mb-4 md:mb-5">Skill Gaps</h4>
                    <div className="space-y-3 md:space-y-4">
                        {report.skillGaps?.map((gap, i) => (
                            <div key={i} className="flex justify-between items-center p-3 rounded-xl bg-white/5 border border-white/5">
                                <span className="text-xs font-bold text-gray-300 truncate mr-2">{gap.skill}</span>
                                <span className={`text-[8px] font-black uppercase px-2 py-1 rounded-md shrink-0 ${gap.severity === 'high' ? 'bg-red-500/10 text-red-400' : 'bg-amber-500/10 text-amber-400'}`}>
                                    {gap.severity}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
             </div>
        </aside>
      </div>

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