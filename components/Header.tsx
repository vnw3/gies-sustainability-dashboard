import React, { useState } from 'react';
import { Menu, X, Search } from 'lucide-react';

export const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { name: 'Overview', href: '#overview' },
    { name: 'Sustainability Goals', href: '#goals' },
    { name: 'Journal Trends', href: '#trends' },
    { name: 'Departments', href: '#departments' },
    { name: 'Faculty', href: '#faculty' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          
          {/* Logo & Title */}
          <div className="flex items-center gap-4">
            <img 
              src="https://brand.illinois.edu/wp-content/uploads/2024/02/Block-I-orange-blue-background.png" 
              alt="University of Illinois Block I Logo" 
              className="h-10 w-auto object-contain"
            />
            <div className="flex flex-col">
              <span className="text-xl font-bold text-slate-900 leading-tight tracking-tight">
                Gies Sustainability Dashboard
              </span>
              <span className="text-xs text-slate-500 font-medium tracking-wide uppercase">
                College of Business
              </span>
            </div>
          </div>

          {/* Desktop Navigation & Search */}
          <div className="hidden md:flex items-center gap-6">
            <nav className="flex space-x-6">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-sm font-medium text-slate-600 hover:text-emerald-700 transition-colors duration-200"
                >
                  {link.name}
                </a>
              ))}
            </nav>

            {/* Search Bar */}
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-4 w-4 text-slate-400 group-focus-within:text-emerald-500 transition-colors" />
              </div>
              <input
                type="text"
                className="block w-48 lg:w-64 pl-10 pr-4 py-2 bg-slate-100 border border-transparent rounded-full text-sm text-slate-700 placeholder-slate-400 focus:outline-none focus:bg-white focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                placeholder="Search research, faculty..."
              />
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-slate-600 hover:text-slate-900 focus:outline-none"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Dropdown */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-slate-100">
          <div className="px-4 pt-4 pb-4 space-y-4">
            {/* Mobile Search */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-4 w-4 text-slate-400" />
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-4 py-2 bg-slate-100 border border-transparent rounded-full text-sm text-slate-700 placeholder-slate-400 focus:outline-none focus:bg-white focus:ring-2 focus:ring-emerald-500"
                placeholder="Search research..."
              />
            </div>

            <nav className="flex flex-col space-y-1">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="block px-3 py-2 rounded-md text-base font-medium text-slate-700 hover:text-emerald-700 hover:bg-slate-50"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.name}
                </a>
              ))}
            </nav>
          </div>
        </div>
      )}
    </header>
  );
};