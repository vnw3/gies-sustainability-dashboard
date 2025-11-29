import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { MissionGrid } from './components/MissionGrid';
import { DataTicker } from './components/DataTicker';
import { ImpactSpotlight } from './components/ImpactSpotlight';

const App: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    // Check localStorage first
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      return savedTheme === 'dark';
    }
    // Fallback to system preference
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  useEffect(() => {
    const root = window.document.documentElement;
    if (isDarkMode) {
      root.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDarkMode]);

  const toggleTheme = () => {
    setIsDarkMode((prev) => !prev);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 selection:bg-emerald-100 selection:text-emerald-900 dark:selection:bg-emerald-900 dark:selection:text-emerald-100 transition-colors duration-300">
      <Header isDarkMode={isDarkMode} toggleTheme={toggleTheme} />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
        {/* Section 2: Mission & Reality Grid */}
        <section id="overview">
          <MissionGrid />
        </section>

        {/* Section 3: Seamless Data Ticker */}
        <section className="relative w-full overflow-hidden py-4">
          <DataTicker />
        </section>

        {/* Section 4: Impact Spotlight */}
        <section id="impact">
          <ImpactSpotlight />
        </section>
      </main>

      <footer className="max-w-7xl mx-auto px-4 py-8 text-center text-slate-400 dark:text-slate-500 text-sm">
        <p>&copy; {new Date().getFullYear()} Gies College of Business. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default App;