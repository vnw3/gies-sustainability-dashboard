import React, { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';
import { Header } from './components/Header';
import { MissionGrid } from './components/MissionGrid';
import { DataTicker } from './components/DataTicker';
import { ImpactSpotlight } from './components/ImpactSpotlight';

const App: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    // Check localStorage
    const savedTheme = localStorage.getItem('theme');
    // Default to false (Light Mode) if no preference is saved, or if it is 'light'
    return savedTheme === 'dark';
  });

  // Back to Top State
  const [showBackToTop, setShowBackToTop] = useState(false);

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

  // Scroll Listener for Back to Top
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowBackToTop(true);
      } else {
        setShowBackToTop(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleTheme = () => {
    setIsDarkMode((prev) => !prev);
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
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

      {/* Back to Top Button */}
      <button
        onClick={scrollToTop}
        className={`fixed bottom-8 right-8 p-3 rounded-full bg-blue-600 text-white shadow-lg z-50 transition-all duration-300 transform hover:bg-blue-700 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:focus:ring-offset-slate-900 ${
          showBackToTop ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
        }`}
        aria-label="Back to Top"
      >
        <ArrowUp size={24} />
      </button>
    </div>
  );
};

export default App;