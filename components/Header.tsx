import React, { useState } from 'react';
import { Menu, X, Search, Moon, Sun, ChevronDown } from 'lucide-react';

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
      { name: 'Metric Grid', href: '#goals-grid' },
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

const NavDropdown = ({ label, items }: { label: string, items: { name: string, href: string }[] }) => {
  return (
    <div className="relative group h-full flex items-center">
      <button className="flex items-center gap-1 text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-emerald-700 dark:hover:text-emerald-400 transition-colors duration-200 py-2 focus:outline-none">
        {label}
        <ChevronDown className="w-4 h-4 transition-transform duration-200 group-hover:rotate-180" />
      </button>

      {/* Dropdown Menu */}
      <div className="absolute left-0 top-full mt-1 w-56 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform origin-top-left z-50">
        <div className="bg-white dark:bg-slate-900 rounded-lg shadow-xl border border-slate-200 dark:border-slate-800 overflow-hidden ring-1 ring-black ring-opacity-5">
          <div className="py-1">
            {items.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="block px-4 py-2.5 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-emerald-700 dark:hover:text-emerald-400 transition-colors"
              >
                {item.name}
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export const Header: React.FC<HeaderProps> = ({ isDarkMode, toggleTheme }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full bg-white/80 dark:bg-slate-950/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">

          {/* LEFT GROUP: Logo + Desktop Navigation */}
          <div className="flex items-center gap-8">
            {/* Logo & Title */}
            <div className="flex items-center gap-4 flex-shrink-0">
              <img 
                src="https://brand.illinois.edu/wp-content/uploads/2024/02/Block-I-orange-blue-background.png" 
                alt="University of Illinois Block I Logo" 
                className="h-10 w-auto object-contain"
              />
              <div className="flex flex-col">
                <span className="text-xl font-bold text-slate-900 dark:text-white leading-tight tracking-tight">
                  Gies Sustainability Dashboard
                </span>
                <span className="text-xs text-slate-500 dark:text-slate-400 font-medium tracking-wide uppercase">
                  College of Business
                </span>
              </div>
            </div>

            {/* Desktop Navigation Row (Next to Logo) */}
            <nav className="hidden lg:flex items-center space-x-6">
              {navStructure.map((navItem) => (
                navItem.type === 'link' ? (
                  <a
                    key={navItem.name}
                    href={navItem.href}
                    className="text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-emerald-700 dark:hover:text-emerald-400 transition-colors duration-200 py-2"
                  >
                    {navItem.name}
                  </a>
                ) : (
                  <div key={navItem.name}>
                    <NavDropdown label={navItem.name} items={navItem.items || []} />
                  </div>
                )
              ))}
            </nav>
          </div>

          {/* RIGHT GROUP: Search + Theme Toggle + Mobile Menu */}
          <div className="flex items-center gap-4">
            
            {/* Search Bar (Desktop) */}
            <div className="hidden lg:block relative group">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-4 w-4 text-slate-400 group-focus-within:text-emerald-500 transition-colors" />
              </div>
              <input
                type="text"
                className="block w-48 xl:w-64 pl-10 pr-4 py-2 bg-slate-100 dark:bg-slate-800 border border-transparent rounded-full text-sm text-slate-700 dark:text-slate-200 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:bg-white dark:focus:bg-slate-900 focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                placeholder="Search research, faculty..."
              />
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
