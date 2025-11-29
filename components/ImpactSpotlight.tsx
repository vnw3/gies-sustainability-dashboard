import React from 'react';
import { Zap, Truck, Landmark, ArrowRight } from 'lucide-react';
import { SpotlightCard } from './SpotlightCard';

interface ImpactCardProps {
  category: string;
  outcome: string;
  context: string;
  icon: React.ReactNode;
  gradient: string;
  isDarkMode: boolean;
}

const ImpactCard: React.FC<ImpactCardProps> = ({ category, outcome, context, icon, gradient, isDarkMode }) => {
  // Dynamic spotlight color based on theme
  const spotlightColor = isDarkMode 
    ? "rgba(255, 255, 255, 0.15)" 
    : "rgba(15, 23, 42, 0.1)";

  return (
    <SpotlightCard 
      className="bg-white dark:bg-slate-900 rounded-2xl p-8 pb-10 border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between h-full min-h-[320px] relative overflow-hidden group"
      spotlightColor={spotlightColor}
    >
      {/* Subtle Gradient Background on Hover (Secondary Effect) */}
      <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-5 dark:group-hover:opacity-10 transition-opacity duration-300`}></div>
      
      <div className="relative z-10">
        <div className="flex justify-between items-start">
          <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-xl text-slate-600 dark:text-slate-300 group-hover:bg-white dark:group-hover:bg-slate-700 group-hover:text-slate-900 dark:group-hover:text-white group-hover:shadow-sm transition-all">
            {React.cloneElement(icon as React.ReactElement<any>, { size: 28 })}
          </div>
          <div className="px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
            {category}
          </div>
        </div>

        <div className="mt-8">
          <h3 className="text-3xl font-extrabold text-slate-900 dark:text-slate-100 mb-2 leading-tight">
            {outcome}
          </h3>
          <p className="text-slate-500 dark:text-slate-400 font-medium flex items-center gap-2">
            {context}
          </p>
        </div>
      </div>
      
      <div className="relative z-10 mt-auto pt-6 flex items-center text-emerald-600 dark:text-emerald-400 font-semibold text-sm opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
        View Case Study <ArrowRight className="ml-2 w-4 h-4" />
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
          <p className="text-slate-500 dark:text-slate-400 mt-1">Tangible outcomes driven by academic research.</p>
        </div>
        <button className="text-sm font-semibold text-emerald-700 dark:text-emerald-400 hover:text-emerald-800 dark:hover:text-emerald-300 flex items-center gap-1 transition-colors">
          View All Outcomes <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <ImpactCard 
          category="Energy"
          outcome="1,200+ Homes Powered"
          context="Solar Grid Efficiency Study"
          icon={<Zap />}
          gradient="from-amber-400 to-orange-500"
          isDarkMode={isDarkMode}
        />

        <ImpactCard 
          category="Supply Chain"
          outcome="500+ Jobs Created"
          context="Lean Logistics Implementation"
          icon={<Truck />}
          gradient="from-blue-400 to-indigo-500"
          isDarkMode={isDarkMode}
        />

        <ImpactCard 
          category="FinTech Policy"
          outcome="$12M Funding Secured"
          context="Sustainable Startup Frameworks"
          icon={<Landmark />}
          gradient="from-emerald-400 to-teal-500"
          isDarkMode={isDarkMode}
        />
      </div>
    </div>
  );
};