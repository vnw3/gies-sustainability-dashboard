import React from 'react';
import { Header } from './components/Header';
import { MissionGrid } from './components/MissionGrid';
import { DataTicker } from './components/DataTicker';
import { ImpactSpotlight } from './components/ImpactSpotlight';

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 selection:bg-emerald-100 selection:text-emerald-900">
      <Header />
      
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

      <footer className="max-w-7xl mx-auto px-4 py-8 text-center text-slate-400 text-sm">
        <p>&copy; {new Date().getFullYear()} Gies College of Business. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default App;