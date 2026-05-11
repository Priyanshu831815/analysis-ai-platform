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
          <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          <h1 className="text-lg font-semibold text-gray-400">Analyzing Report...</h1>
        </div>
      </main>
    );
  }

  // ✅ Configuration for buttons used in both Sidebar and Mobile Bottom Bar
  const tabConfig = [
    {
      key: 'technical',
      label: 'Technical',
      fullLabel: 'Technical Questions',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
        </svg>
      ),
      activeClass: 'bg-[#3b82f6]/10 text-[#60a5fa] border-[#3b82f6]/30 shadow-[0_0_15px_rgba(59,130,246,0.1)]',
    },
    {
      key: 'behavioral',
      label: 'Behavioral',
      fullLabel: 'Behavioral Questions',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
      activeClass: 'bg-[#8b5cf6]/10 text-[#a78bfa] border-[#8b5cf6]/30 shadow-[0_0_15px_rgba(139,92,246,0.1)]',
    },
    {
      key: 'roadmap',
      label: 'Roadmap',
      fullLabel: 'Prep Roadmap',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
        </svg>
      ),
      activeClass: 'bg-[#10b981]/10 text-[#34d399] border-[#10b981]/30 shadow-[0_0_15px_rgba(16,185,129,0.1)]',
    },
  ];

  const handleTabSwitch = (key) => {
    setActiveTab(key);
    setIsSidebarOpen(false); // Auto-close drawer on mobile after selection
  };

  return (
    <main className="min-h-screen bg-[#0b1121] text-[#f8fafc] font-sans flex flex-col relative overflow-hidden">
      
      {/* Background Decorative Glow */}
      <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-full max-w-[600px] h-[600px] bg-blue-500/10 blur-[120px] rounded-full pointer-events-none z-0" />

      {/* Navbar */}
      <nav className="sticky top-0 z-[60] bg-[#0b1121]/80 backdrop-blur-xl border-b border-[#1e293b] px-4 lg:px-8 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          {/* Hamburger Menu (Mobile/Tablet Only) */}
          <button 
            onClick={() => setIsSidebarOpen(true)}
            className="lg:hidden p-2 text-gray-400 hover:text-white transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" /></svg>
          </button>
          <div className="text-lg font-black tracking-tighter flex items-center gap-2">
             <div className="w-3 h-3 bg-blue-500 rounded-full shadow-[0_0_10px_rgba(59,130,246,0.5)] animate-pulse" />
             ANALYSIS.AI
          </div>
        </div>
        
        {/* Universal Download Button (Always Visible) */}
        <button 
          onClick={() => getResumePdf(interviewId)}
          className="flex items-center gap-2 px-3 py-2 sm:px-5 sm:py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs sm:text-sm font-bold transition-all shadow-[0_0_15px_rgba(37,99,235,0.3)] active:scale-95"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
          <span className="hidden xs:inline">PDF</span>
          <span className="hidden sm:inline">Report</span>
        </button>
      </nav>

      <div className="flex-1 flex flex-col lg:flex-row max-w-[1600px] w-full mx-auto relative z-10">
        
        {/* Sidebar Overlay (Mobile Only) */}
        {isSidebarOpen && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[70] lg:hidden" onClick={() => setIsSidebarOpen(false)} />
        )}

        {/* ── RESPONSIVE ASIDE BAR ── */}
        <aside className={`
          fixed lg:static inset-y-0 left-0 z-[80] lg:z-auto
          w-72 lg:w-80 bg-[#0b1121] lg:bg-transparent border-r border-[#1e293b] lg:border-none
          transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0
          transition-transform duration-300 ease-in-out flex flex-col
        `}>
          <div className="p-6 flex flex-col h-full">
            <div className="lg:hidden flex items-center justify-between mb-8">
              <span className="font-bold text-blue-500 uppercase tracking-widest text-xs">Menu</span>
              <button onClick={() => setIsSidebarOpen(false)} className="text-gray-400">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>

            <nav className="space-y-2">
              {tabConfig.map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => handleTabSwitch(tab.key)}
                  className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-xl border transition-all ${
                    activeTab === tab.key 
                    ? `${tab.activeClass} border` 
                    : 'border-transparent text-gray-500 hover:text-gray-300 hover:bg-gray-800/40'
                  }`}
                >
                  {tab.icon}
                  <span className="font-semibold text-sm">{tab.fullLabel}</span>
                </button>
              ))}
            </nav>
          </div>
        </aside>

        {/* ── MAIN CONTENT AREA ── */}
        <section className="flex-1 p-4 lg:p-8 overflow-y-auto no-scrollbar pb-24 lg:pb-8">
            <div className="max-w-3xl mx-auto">
                <header className="mb-8">
                    <h1 className="text-3xl font-black text-white italic">Report Intelligence</h1>
                    <p className="text-gray-500 mt-2 capitalize">{activeTab} analysis for your profile.</p>
                </header>

                <div className="space-y-6">
                    {/* Render logic based on activeTab */}
                    {activeTab === 'technical' && report.technicalQuestion.map((q, i) => (
                         <div key={i} className="p-6 rounded-2xl bg-[#0f172a]/50 border border-[#1e293b] hover:border-blue-500/30 transition-all">
                            <h3 className="font-bold text-gray-100">{q.question}</h3>
                         </div>
                    ))}
                    {/* Add other tab content here */}
                </div>
            </div>
        </section>

        {/* ── RIGHT PANEL (Match Score) ── */}
        <aside className="w-full lg:w-80 p-4 lg:p-8 border-t lg:border-t-0 lg:border-l border-[#1e293b]">
             <div className="sticky top-24 space-y-6">
                <div className="p-6 rounded-3xl bg-gradient-to-br from-blue-600/20 to-purple-600/20 border border-white/5 text-center shadow-xl">
                    <p className="text-gray-500 text-[10px] font-bold uppercase mb-2">Match Score</p>
                    <div className="text-5xl font-black text-white">{report.matchScore}%</div>
                </div>
             </div>
        </aside>
      </div>

      {/* ── MOBILE BOTTOM TAB BAR (Always Works) ── */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-[#0b1121]/95 backdrop-blur-lg border-t border-[#1e293b] z-[100] px-6 py-3 flex justify-between items-center">
         {tabConfig.map((tab) => (
             <button 
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`flex flex-col items-center gap-1 transition-all ${activeTab === tab.key ? 'text-blue-500 scale-110' : 'text-gray-500 hover:text-gray-400'}`}
             >
                {tab.icon}
                <span className="text-[10px] font-bold uppercase tracking-tighter">{tab.label}</span>
                {activeTab === tab.key && (
                  <div className="w-1 h-1 bg-blue-500 rounded-full mt-0.5 shadow-[0_0_5px_#3b82f6]" />
                )}
             </button>
         ))}
      </div>

      <style dangerouslySetInnerHTML={{
        __html: `
          .no-scrollbar::-webkit-scrollbar { display: none; }
          .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
          @media (max-width: 400px) { .xs\\:inline { display: inline; } }
        `
      }} />
    </main>
  );
};

export default Interview;