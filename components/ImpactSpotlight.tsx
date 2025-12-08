
import React from 'react';
import { Factory, Users, Landmark, ArrowRight } from 'lucide-react';
import { SpotlightCard } from './SpotlightCard';

interface ImpactCardProps {
  sdg: string;
  title: string;
  faculty: string;
  abstract: string;
  icon: React.ReactNode;
  gradient: string;
  isDarkMode: boolean;
}

const ImpactCard: React.FC<ImpactCardProps> = ({ sdg, title, faculty, abstract, icon, gradient, isDarkMode }) => {
  // Dynamic spotlight color based on theme
  const spotlightColor = isDarkMode 
    ? "rgba(255, 255, 255, 0.15)" 
    : "rgba(15, 23, 42, 0.1)";

  return (
    <SpotlightCard 
      className="bg-white dark:bg-slate-900 rounded-2xl p-8 border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col h-full min-h-[360px] relative overflow-hidden group"
      spotlightColor={spotlightColor}
    >
      {/* Subtle Gradient Background on Hover (Secondary Effect) */}
      <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-5 dark:group-hover:opacity-10 transition-opacity duration-300`}></div>
      
      <div className="relative z-10 flex flex-col h-full">
        {/* Header: Icon + Badge */}
        <div className="flex justify-between items-start mb-6">
          <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-xl text-slate-600 dark:text-slate-300 group-hover:bg-white dark:group-hover:bg-slate-700 group-hover:text-slate-900 dark:group-hover:text-white group-hover:shadow-sm transition-all flex-shrink-0">
            {React.cloneElement(icon as React.ReactElement<any>, { size: 24 })}
          </div>
          <div className="ml-4 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-900/20 text-[10px] font-bold text-emerald-700 dark:text-emerald-400 uppercase tracking-wider border border-emerald-100 dark:border-emerald-800/30 text-right whitespace-normal max-w-[140px] leading-tight">
            {sdg}
          </div>
        </div>

        {/* Content */}
        <div className="mb-4">
          <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-2 leading-tight group-hover:text-emerald-700 dark:group-hover:text-emerald-400 transition-colors">
            {title}
          </h3>
          <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">
            {faculty}
          </p>
        </div>

        <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed mb-8 flex-grow">
          {abstract}
        </p>

        {/* Footer Link */}
        <div className="mt-auto flex items-center text-emerald-600 dark:text-emerald-400 font-semibold text-sm group/link cursor-pointer">
          <span className="group-hover/link:underline decoration-2 underline-offset-4 decoration-emerald-200 dark:decoration-emerald-800">View Case Study</span> 
          <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover/link:translate-x-1" />
        </div>
      </div>
    </SpotlightCard>
  );
};

export const ImpactSpotlight: React.FC<{ isDarkMode: boolean }> = ({ isDarkMode }) => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-2">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Real-World Impact</h2>
          <p className="text-slate-500 dark:text-slate-400 mt-1">Research highlights driven by Gies faculty.</p>
        </div>
        <button className="text-sm font-semibold text-emerald-700 dark:text-emerald-400 hover:text-emerald-800 dark:hover:text-emerald-300 flex items-center gap-1 transition-colors">
          View All Outcomes <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Card 1: Environmental Impact */}
        <ImpactCard 
          sdg="SDG 12: Responsible Consumption"
          title="The Pollution Shell Game"
          faculty="Qiping Xu • Finance"
          abstract="Divesting polluting assets does not reduce emissions; it transfers them. This research tracks 888 plant divestitures to reveal how ownership changes mask environmental impact."
          icon={<Factory />}
          gradient="from-amber-400 to-orange-500"
          isDarkMode={isDarkMode}
        />

        {/* Card 2: Societal Impact */}
        <ImpactCard 
          sdg="SDG 1: No Poverty"
          title="Subsistence Marketplaces"
          faculty="Madhu Viswanathan • Business Admin"
          abstract="A bottom-up approach to poverty alleviation. This research framework empowers low-income entrepreneurs by analyzing marketplace literacy and social networks in subsistence economies."
          icon={<Users />}
          gradient="from-blue-400 to-indigo-500"
          isDarkMode={isDarkMode}
        />

        {/* Card 3: Economic Policy */}
        <ImpactCard 
          sdg="SDG 13: Climate Action"
          title="The Marginal Product of Climate Change"
          faculty="Tatyana Deryugina • Finance"
          abstract="Quantifying the economic cost of temperature rise. Analysis reveals that a single day of extreme heat (29°C+) lowers county-level annual productivity by 0.065%."
          icon={<Landmark />}
          gradient="from-emerald-400 to-teal-500"
          isDarkMode={isDarkMode}
        />
      </div>
    </div>
  );
};
