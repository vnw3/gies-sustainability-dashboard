
import React, { useState, useRef, useEffect } from 'react';
import { Menu, X, Search, Moon, Sun, Filter } from 'lucide-react';

interface HeaderProps {
  isDarkMode: boolean;
  toggleTheme: () => void;
}

// Navigation Data Structure
const navStructure = [
  { name: 'Overview', href: '#overview', type: 'link' },
  {
    name: 'Sustainability Goals',
    type: 'dropdown',
    items: [
      { name: 'SDG Overview', href: '#goals-overview' },
      { name: 'Detailed Breakdown', href: '#goals-breakdown' },
      { name: 'Data Cards', href: '#goals-grid' },
    ]
  },
  {
    name: 'Journal Trends',
    type: 'dropdown',
    items: [
      { name: 'Annual Trends', href: '#trends-annual' },
      { name: 'Journal Tiers', href: '#trends-tiers' },
      { name: 'Growth: Total Articles', href: '#growth-total' },
      { name: 'Growth: Top Journals', href: '#growth-top' },
      { name: 'Growth: SDG Impact', href: '#growth-sdg' },
    ]
  },
  {
    name: 'Departments',
    type: 'dropdown',
    items: [
      { name: 'Accountancy', href: '#dept-accountancy' },
      { name: 'Business Admin', href: '#dept-business' },
      { name: 'Finance', href: '#dept-finance' },
    ]
  },
  {
    name: 'Faculty',
    type: 'dropdown',
    items: [
      { name: 'Business Articles', href: '#fac-articles' },
      { name: 'Top Journal Articles', href: '#fac-top' },
      { name: 'SDG Articles', href: '#fac-sdg' },
      { name: 'Contributors', href: '#fac-contributors' },
    ]
  },
];

// Toggle Switch Component Helper
const ToggleSwitch = ({ label, checked, onChange }: { label: string, checked?: boolean, onChange?: () => void }) => {
  const [isOn, setIsOn] = useState(checked || false);
  const handleToggle = () => {
    setIsOn(!isOn);
    if (onChange) onChange();
  };

  return (
    <div className="flex items-center justify-between cursor-pointer group py-1" onClick={handleToggle}>
      <span className="text-sm text-slate-700 dark:text-slate-300 group-hover:text-emerald-700 dark:group-hover:text-emerald-400 transition-colors">{label}</span>
      <div className="relative inline-flex items-center cursor-pointer">
        <div className={`w-9 h-5 rounded-full transition-colors duration-200 ease-in-out ${isOn ? 'bg-emerald-500' : 'bg-slate-200 dark:bg-slate-700'}`}></div>
        <div className={`absolute left-1 top-1 bg-white w-3 h-3 rounded-full shadow-sm transition-transform duration-200 ease-in-out ${isOn ? 'translate-x-4' : 'translate-x-0'}`}></div>
      </div>
    </div>
  );
};

export const Header: React.FC<HeaderProps> = ({ isDarkMode, toggleTheme }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  
  // Navigation Hover State
  const [hoveredNav, setHoveredNav] = useState<string | null>(null);
  
  // Filter States
  const [yearView, setYearView] = useState<'range' | 'single'>('range');
  const [yearRange, setYearRange] = useState<[number, number]>([1966, 2025]);
  const [singleYear, setSingleYear] = useState<number>(2024);

  // Refs for click outside
  const filterRef = useRef<HTMLDivElement>(null);
  const filterBtnRef = useRef<HTMLButtonElement>(null);

  // Click Outside Handler
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        isFilterOpen &&
        filterRef.current &&
        !filterRef.current.contains(event.target as Node) &&
        filterBtnRef.current &&
        !filterBtnRef.current.contains(event.target as Node)
      ) {
        setIsFilterOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isFilterOpen]);

  // Dual Slider Handlers
  const handleMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = Math.min(parseInt(e.target.value), yearRange[1] - 1);
    setYearRange([val, yearRange[1]]);
  };

  const handleMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = Math.max(parseInt(e.target.value), yearRange[0] + 1);
    setYearRange([yearRange[0], val]);
  };

  const minYear = 1966;
  const maxYear = 2025;

  // Calculate percentage for progress bar in dual slider
  const getPercent = (value: number) => Math.round(((value - minYear) / (maxYear - minYear)) * 100);

  return (
    <header className="sticky top-0 z-50 w-full bg-white/80 dark:bg-slate-950/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-20">

          {/* LEFT GROUP: Logo + Desktop Navigation */}
          {/* REMOVED overflow-hidden to allow dropdowns to show */}
          <div className="flex items-center gap-5 lg:gap-8">
            {/* Logo & Title */}
            <div className="flex items-center gap-3 flex-shrink-0">
              <img 
                src="https://brand.illinois.edu/wp-content/uploads/2024/02/Block-I-orange-blue-background.png" 
                alt="University of Illinois Block I Logo" 
                className="h-9 w-auto object-contain"
              />
              <div className="flex flex-col">
                <span className="text-lg lg:text-xl font-bold text-slate-900 dark:text-white leading-tight tracking-tight whitespace-nowrap">
                  Gies Sustainability Dashboard
                </span>
                <span className="text-[10px] lg:text-xs text-slate-500 dark:text-slate-400 font-medium tracking-wide uppercase whitespace-nowrap">
                  College of Business
                </span>
              </div>
            </div>

            {/* Desktop Navigation Row (Next to Logo) */}
            <nav className="hidden lg:flex items-center gap-5">
              {navStructure.map((navItem) => (
                <div 
                  key={navItem.name} 
                  className="relative h-full flex items-center"
                  onMouseEnter={() => setHoveredNav(navItem.name)}
                  onMouseLeave={() => setHoveredNav(null)}
                >
                  {navItem.type === 'link' ? (
                    <a
                      href={navItem.href}
                      className={`text-sm font-medium transition-colors duration-200 py-2 whitespace-nowrap relative ${
                        hoveredNav === navItem.name 
                          ? 'text-emerald-700 dark:text-emerald-400' 
                          : 'text-slate-600 dark:text-slate-400'
                      }`}
                    >
                      {navItem.name}
                      <span className={`absolute bottom-0 left-0 h-0.5 bg-emerald-600 dark:bg-emerald-400 transition-all duration-300 ease-in-out ${hoveredNav === navItem.name ? 'w-full' : 'w-0'}`}></span>
                    </a>
                  ) : (
                    <>
                      <button 
                        className={`text-sm font-medium transition-colors duration-200 py-2 focus:outline-none whitespace-nowrap cursor-default relative ${
                          hoveredNav === navItem.name 
                            ? 'text-emerald-700 dark:text-emerald-400' 
                            : 'text-slate-600 dark:text-slate-400'
                        }`}
                      >
                        {navItem.name}
                        <span className={`absolute bottom-0 left-0 h-0.5 bg-emerald-600 dark:bg-emerald-400 transition-all duration-300 ease-in-out ${hoveredNav === navItem.name ? 'w-full' : 'w-0'}`}></span>
                      </button>

                      {/* Bridge to prevent mouse leaving gap */}
                      <div className="absolute top-full left-0 w-full h-4 bg-transparent"></div>

                      {/* Dropdown Menu */}
                      {hoveredNav === navItem.name && (
                        <div className="absolute left-0 top-full mt-2 w-56 bg-white dark:bg-slate-900 rounded-lg shadow-xl border border-slate-200 dark:border-slate-800 overflow-hidden ring-1 ring-black ring-opacity-5 z-50 animate-in fade-in zoom-in-95 duration-100">
                          <div className="py-1">
                            {navItem.items?.map((item) => (
                              <a
                                key={item.name}
                                href={item.href}
                                className="block px-4 py-2.5 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-emerald-700 dark:hover:text-emerald-400 transition-colors whitespace-nowrap"
                              >
                                {item.name}
                              </a>
                            ))}
                          </div>
                        </div>
                      )}
                    </>
                  )}
                </div>
              ))}
            </nav>
          </div>

          {/* RIGHT GROUP: Search + Filter + Theme Toggle + Mobile Menu */}
          <div className="flex items-center gap-3 flex-shrink-0 relative">
            
            {/* Search Bar (Desktop) */}
            <div className="hidden xl:block relative group">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-4 w-4 text-slate-400 group-focus-within:text-emerald-500 transition-colors" />
              </div>
              <input
                type="text"
                className="block w-48 pl-10 pr-4 py-2 bg-slate-100 dark:bg-slate-800 border border-transparent rounded-full text-sm text-slate-700 dark:text-slate-200 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:bg-white dark:focus:bg-slate-900 focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                placeholder="Search..."
              />
            </div>

            {/* Filter Toggle Button */}
            <div className="relative">
              <button
                ref={filterBtnRef}
                onClick={() => setIsFilterOpen(!isFilterOpen)}
                className={`p-2 rounded-full transition-colors focus:outline-none ${isFilterOpen ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400' : 'text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800'}`}
                aria-label="Filter"
              >
                <Filter size={20} />
              </button>

              {/* Filter Mega Menu Dropdown */}
              {isFilterOpen && (
                <div 
                  ref={filterRef}
                  className="absolute top-full right-0 mt-3 w-80 sm:w-96 bg-white dark:bg-slate-900 rounded-xl shadow-2xl border border-slate-200 dark:border-slate-800 ring-1 ring-black ring-opacity-5 z-50 flex flex-col max-h-[85vh] animate-in fade-in slide-in-from-top-2 duration-200"
                >
                    
                  {/* Header */}
                  <div className="flex items-center justify-between p-4 border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50">
                    <h3 className="font-semibold text-slate-900 dark:text-white">Filters</h3>
                    <button className="text-xs text-emerald-600 dark:text-emerald-400 font-medium hover:text-emerald-800 dark:hover:text-emerald-300 hover:underline">
                      Clear All
                    </button>
                  </div>

                  {/* Scrollable Body */}
                  <div className="overflow-y-auto flex-1 p-5 space-y-6 scrollbar-thin scrollbar-thumb-slate-200 dark:scrollbar-thumb-slate-700 scrollbar-track-transparent">
                    
                    {/* Search Filters */}
                    <div>
                      <input type="text" placeholder="Search filters..." className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm text-slate-700 dark:text-slate-200 placeholder-slate-400 focus:ring-2 focus:ring-emerald-500 focus:outline-none transition-shadow" />
                    </div>

                    {/* Section A: Journal Categories */}
                    <div className="space-y-3">
                      <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Journal Categories</h4>
                      <div className="space-y-1">
                        <ToggleSwitch label="Business Journals Only" />
                        <ToggleSwitch label="Top Journals Only (UTD/FT)" />
                      </div>
                    </div>

                    <div className="h-px bg-slate-100 dark:bg-slate-800"></div>

                    {/* Section B: Sustainability Status */}
                    <div className="space-y-3">
                      <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Sustainability Status</h4>
                      <div className="space-y-2">
                        {['Sustainable', 'Not Sustainable', 'All'].map(opt => (
                          <label key={opt} className="flex items-center gap-2.5 cursor-pointer group">
                            <input type="checkbox" className="w-4 h-4 rounded border-slate-300 text-emerald-600 focus:ring-emerald-500 dark:bg-slate-800 dark:border-slate-600 dark:checked:bg-emerald-500 cursor-pointer" />
                            <span className="text-sm text-slate-600 dark:text-slate-300 group-hover:text-slate-900 dark:group-hover:text-white transition-colors">{opt}</span>
                          </label>
                        ))}
                      </div>
                    </div>

                    <div className="h-px bg-slate-100 dark:bg-slate-800"></div>

                    {/* Section C: Publication Year */}
                    <div className="space-y-3">
                      <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Publication Year</h4>
                      
                      {/* Tabs */}
                      <div className="flex bg-slate-100 dark:bg-slate-800 rounded-lg p-1 mb-4">
                        <button 
                          className={`flex-1 py-1 text-xs font-medium rounded-md transition-all ${yearView === 'range' ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm' : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'}`}
                          onClick={() => setYearView('range')}
                        >
                          Range
                        </button>
                        <button 
                          className={`flex-1 py-1 text-xs font-medium rounded-md transition-all ${yearView === 'single' ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm' : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'}`}
                          onClick={() => setYearView('single')}
                        >
                          Single
                        </button>
                      </div>

                      {/* Inputs */}
                      <div className="px-1 relative">
                        {yearView === 'range' ? (
                          <div className="relative w-full h-8 pt-2">
                             {/* CSS for custom thumb pointer-events */}
                            <style>
                              {`
                                .range-slider-thumb::-webkit-slider-thumb { pointer-events: auto; }
                                .range-slider-thumb::-moz-range-thumb { pointer-events: auto; }
                              `}
                            </style>
                            
                            {/* Track Background */}
                            <div className="absolute top-1/2 left-0 w-full h-1.5 bg-slate-200 dark:bg-slate-700 rounded-lg -translate-y-1/2 pointer-events-none"></div>
                            
                            {/* Active Range Highlight */}
                            <div 
                              className="absolute top-1/2 h-1.5 bg-emerald-500 rounded-lg -translate-y-1/2 pointer-events-none z-10"
                              style={{ 
                                left: `${getPercent(yearRange[0])}%`, 
                                right: `${100 - getPercent(yearRange[1])}%` 
                              }}
                            ></div>

                            {/* Range Inputs (Overlapping) */}
                            <input 
                              type="range" 
                              min={minYear} 
                              max={maxYear} 
                              value={yearRange[0]} 
                              onChange={handleMinChange}
                              className="range-slider-thumb absolute top-1/2 left-0 w-full -translate-y-1/2 h-1.5 appearance-none bg-transparent pointer-events-none z-20 focus:outline-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:border [&::-webkit-slider-thumb]:border-slate-300 [&::-webkit-slider-thumb]:shadow-sm [&::-webkit-slider-thumb]:cursor-pointer [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-white [&::-moz-range-thumb]:border [&::-moz-range-thumb]:border-slate-300 [&::-moz-range-thumb]:shadow-sm [&::-moz-range-thumb]:cursor-pointer"
                            />
                            <input 
                              type="range" 
                              min={minYear} 
                              max={maxYear} 
                              value={yearRange[1]} 
                              onChange={handleMaxChange}
                              className="range-slider-thumb absolute top-1/2 left-0 w-full -translate-y-1/2 h-1.5 appearance-none bg-transparent pointer-events-none z-20 focus:outline-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:border [&::-webkit-slider-thumb]:border-slate-300 [&::-webkit-slider-thumb]:shadow-sm [&::-webkit-slider-thumb]:cursor-pointer [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-white [&::-moz-range-thumb]:border [&::-moz-range-thumb]:border-slate-300 [&::-moz-range-thumb]:shadow-sm [&::-moz-range-thumb]:cursor-pointer"
                            />

                            <div className="flex justify-between text-xs text-slate-500 dark:text-slate-400 mt-4 font-mono">
                              <span>{yearRange[0]}</span>
                              <span>{yearRange[1]}</span>
                            </div>
                          </div>
                        ) : (
                          <div>
                            <input 
                              type="range" 
                              min={minYear} 
                              max={maxYear} 
                              value={singleYear} 
                              onChange={(e) => setSingleYear(parseInt(e.target.value))}
                              className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer dark:bg-slate-700 accent-emerald-500" 
                            />
                            <div className="flex justify-between items-center mt-2">
                               <span className="text-xs text-slate-400 font-mono">{minYear}</span>
                               <span className="text-sm font-bold text-emerald-600 dark:text-emerald-400 font-mono">{singleYear}</span>
                               <span className="text-xs text-slate-400 font-mono">{maxYear}</span>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="h-px bg-slate-100 dark:bg-slate-800"></div>

                    {/* Section D: Departments */}
                    <div className="space-y-3">
                      <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Department</h4>
                      <select className="w-full text-sm border border-slate-200 dark:border-slate-700 rounded-lg p-2.5 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-shadow">
                        <option>All Departments</option>
                        <option>Accountancy</option>
                        <option>Business Administration</option>
                        <option>Finance</option>
                      </select>
                    </div>

                    <div className="h-px bg-slate-100 dark:bg-slate-800"></div>

                    {/* Section E: UN Sustainability Goals */}
                    <div className="space-y-3">
                      <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">UN Sustainability Goals</h4>
                      <div className="grid grid-cols-6 gap-2">
                        {Array.from({length: 17}, (_, i) => i + 1).map(num => (
                          <button key={num} className="aspect-square flex items-center justify-center text-xs font-bold rounded-md bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700 focus:bg-emerald-500 focus:text-white dark:focus:bg-emerald-600 dark:focus:text-white transition-all">
                            {num}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Footer */}
                  <div className="p-4 border-t border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 rounded-b-xl">
                    <button 
                      className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-semibold text-sm transition-colors shadow-sm focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 dark:focus:ring-offset-slate-900"
                      onClick={() => setIsFilterOpen(false)}
                    >
                      Apply Filters
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors focus:outline-none"
              aria-label="Toggle Dark Mode"
            >
              {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>

            {/* Mobile Menu Button */}
            <div className="lg:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-2 rounded-md text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white focus:outline-none"
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Dropdown */}
      {isMenuOpen && (
        <div className="lg:hidden bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800 max-h-[80vh] overflow-y-auto shadow-xl">
          <div className="px-4 pt-4 pb-4 space-y-4">
            {/* Mobile Search */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-4 w-4 text-slate-400" />
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-4 py-2 bg-slate-100 dark:bg-slate-800 border border-transparent rounded-full text-sm text-slate-700 dark:text-slate-200 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:bg-white dark:focus:bg-slate-950 focus:ring-2 focus:ring-emerald-500"
                placeholder="Search research..."
              />
            </div>

            <nav className="flex flex-col space-y-2">
              {navStructure.map((navItem) => (
                <div key={navItem.name} className="flex flex-col">
                  {navItem.type === 'link' ? (
                     <a
                      href={navItem.href}
                      className="block px-3 py-2 rounded-md text-base font-semibold text-slate-800 dark:text-slate-100 hover:text-emerald-700 dark:hover:text-emerald-400 hover:bg-slate-50 dark:hover:bg-slate-800"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {navItem.name}
                    </a>
                  ) : (
                    <div className="space-y-1">
                      <div className="px-3 py-2 text-sm font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
                         {navItem.name}
                      </div>
                      <div className="pl-4 border-l-2 border-slate-100 dark:border-slate-800 ml-3 space-y-1">
                        {navItem.items?.map(subItem => (
                           <a
                            key={subItem.name}
                            href={subItem.href}
                            className="block px-3 py-2 rounded-md text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-emerald-700 dark:hover:text-emerald-400 hover:bg-slate-50 dark:hover:bg-slate-800"
                            onClick={() => setIsMenuOpen(false)}
                          >
                            {subItem.name}
                          </a>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </nav>
          </div>
        </div>
      )}
    </header>
  );
};
