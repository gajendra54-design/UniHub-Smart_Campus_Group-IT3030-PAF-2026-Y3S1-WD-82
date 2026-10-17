import React from "react";

const History = () => {
  const historyLog = [
    { id: "TCK-2280", subject: "Replace faulty HDMI cable", date: "2026-03-01", time: "2.5h" },
    { id: "TCK-2265", subject: "Server Room B access issue", date: "2026-02-28", time: "1.0h" },
    { id: "TCK-2250", subject: "Install new software Lab 2", date: "2026-02-25", time: "4.0h" },
    { id: "TCK-2242", subject: "Fix staff room microwave plug", date: "2026-02-24", time: "0.5h" },
  ];

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-slate-800">My Work History</h1>
        <div className="bg-indigo-50 text-indigo-700 px-4 py-2 rounded-xl text-sm font-bold border border-indigo-100">
          8.0h Logged this week
        </div>
      </div>
      
      <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="p-6 border-b border-slate-50 flex items-center gap-4">
           <p className="text-sm font-semibold text-slate-500 uppercase tracking-wider">Show:</p>
           <select className="bg-slate-50 border border-slate-200 text-slate-700 text-sm rounded-lg px-3 py-1.5 font-medium outline-none">
             <option>Last 30 Days</option>
             <option>Last 3 Months</option>
             <option>This Year</option>
           </select>
        </div>
        
        <div className="p-0">
          {historyLog.map((log, index) => (
            <div key={log.id} className={`flex items-start gap-6 p-6 transition-colors hover:bg-slate-50/50 ${index !== historyLog.length - 1 ? 'border-b border-slate-50' : ''}`}>
              <div className="flex flex-col items-center gap-2 w-16 shrink-0 mt-1">
                 <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600">
                   <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                 </div>
                 <span className="text-xs font-bold text-slate-400">{log.date.split('-').slice(1).join('/')}</span>
              </div>
              
              <div className="flex-1">
                <div className="flex justify-between items-start mb-1">
                  <h3 className="text-lg font-bold text-slate-800">{log.subject}</h3>
                  <span className="bg-slate-100 text-slate-600 px-2.5 py-1 rounded-md text-xs font-bold font-mono">
                    {log.time}
                  </span>
                </div>
                <p className="text-sm text-slate-500 font-medium font-mono mb-2">Ref: {log.id}</p>
                <p className="text-sm text-slate-600 bg-white border border-slate-100 p-3 rounded-xl mt-2 italic shadow-sm">
                  "Resolved issue successfully after diagnostics. Tested configuration."
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default History;
