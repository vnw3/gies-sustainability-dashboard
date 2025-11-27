import React from 'react';

export const DataTicker: React.FC = () => {
  const dataPoints = [
    { label: "Top Journal Articles", value: "853 (51%)" },
    { label: "SDG Articles in Top Journals", value: "113" },
    { label: "Departments", value: "5" },
    { label: "Avg Articles/Faculty", value: "12.5" },
    { label: "Avg Top Articles/Faculty", value: "6.3" },
    { label: "Avg SDG Articles/Faculty", value: "2.0" },
  ];

  // Tripling the data to ensure smooth infinite scroll without gaps
  const displayData = [...dataPoints, ...dataPoints, ...dataPoints];

  return (
    <div className="w-full relative">
      {/* Gradient masks for smooth fade edges */}
      <div className="absolute top-0 left-0 w-32 h-full bg-gradient-to-r from-slate-50 to-transparent z-10 pointer-events-none"></div>
      <div className="absolute top-0 right-0 w-32 h-full bg-gradient-to-l from-slate-50 to-transparent z-10 pointer-events-none"></div>

      <div className="overflow-hidden whitespace-nowrap py-2">
        <div className="inline-block animate-scroll">
          {displayData.map((item, index) => (
            <div key={index} className="inline-flex items-center mx-8">
              <span className="text-sm font-semibold text-slate-400 uppercase tracking-wider mr-3">
                {item.label}:
              </span>
              <span className="text-lg font-bold text-slate-700 font-mono">
                {item.value}
              </span>
              {/* Separator Dot */}
              <span className="ml-8 w-1.5 h-1.5 rounded-full bg-slate-300"></span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};