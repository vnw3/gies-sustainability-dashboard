import React from 'react';
import { BookOpen, Users, Globe, CalendarRange, ArrowUpRight } from 'lucide-react';

interface KPICardProps {
  title: string;
  value: string;
  subtext: string;
  icon: React.ReactNode;
  accentColor: string;
}

const KPICard: React.FC<KPICardProps> = ({ title, value, subtext, icon, accentColor }) => (
  <div className="bg-white rounded-xl p-6 border border-slate-100 shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col justify-between h-full group">
    <div className="flex justify-between items-start mb-4">
      <div className={`p-2 rounded-lg ${accentColor} bg-opacity-10 text-opacity-100`}>
        {React.cloneElement(icon as React.ReactElement<any>, { className: `w-5 h-5 ${accentColor.replace('bg-', 'text-')}` })}
      </div>
      <ArrowUpRight className="w-4 h-4 text-slate-300 group-hover:text-slate-500 transition-colors" />
    </div>
    <div>
      <h3 className="text-slate-500 text-sm font-medium uppercase tracking-wide mb-1">{title}</h3>
      <p className="text-3xl font-bold text-slate-900 mb-1 tracking-tight">{value}</p>
      <p className="text-xs text-slate-400 font-medium">{subtext}</p>
    </div>
  </div>
);

export const MissionGrid: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
      
      {/* Card A: The Mission (Spans full width on desktop) */}
      <div className="col-span-1 md:col-span-2 lg:col-span-4 bg-slate-900 rounded-xl p-8 shadow-md text-white flex flex-col justify-center relative overflow-hidden group min-h-[300px]">
        {/* Abstract Background Decoration */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500 rounded-full mix-blend-overlay filter blur-3xl opacity-10 group-hover:opacity-20 transition-opacity duration-500"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-blue-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 group-hover:opacity-30 transition-opacity duration-500"></div>

        <div className="relative z-10">
          <div className="inline-flex items-center px-3 py-1 rounded-full bg-slate-800 border border-slate-700 text-xs font-bold text-emerald-400 mb-4 shadow-sm">
            Mission Control
          </div>
          <h2 className="text-2xl md:text-3xl font-bold mb-3 leading-tight">
            Tracking the Real-World Impact of <span className="text-emerald-400">Gies Business Research</span>
          </h2>
          <p className="text-slate-300 text-base md:text-lg mb-6 max-w-2xl leading-relaxed">
            Discover how academic research translates into tangible societal benefits.
          </p>
          <div className="flex items-center gap-2 text-sm text-slate-400 font-medium">
            <span>For Researchers</span>
            <span className="w-1 h-1 bg-slate-600 rounded-full"></span>
            <span>Administrators</span>
            <span className="w-1 h-1 bg-slate-600 rounded-full"></span>
            <span>Policymakers</span>
          </div>
        </div>
      </div>

      {/* Card B: Years */}
      <KPICard 
        title="Timeline"
        value="1966 - 2025"
        subtext="Nearly 60 years of impact"
        icon={<CalendarRange />}
        accentColor="bg-blue-500"
      />

      {/* Card C: Research Output */}
      <KPICard 
        title="Research Output"
        value="1,689"
        subtext="Articles (Top 5% Nationally)"
        icon={<BookOpen />}
        accentColor="bg-emerald-500"
      />

      {/* Card D: Faculty */}
      <KPICard 
        title="Faculty"
        value="135"
        subtext="Across 5 Departments"
        icon={<Users />}
        accentColor="bg-purple-500"
      />

      {/* Card E: SDG Alignment */}
      <KPICard 
        title="SDG Alignment"
        value="266"
        subtext="16% align with UN Goals"
        icon={<Globe />}
        accentColor="bg-amber-500"
      />
    </div>
  );
};