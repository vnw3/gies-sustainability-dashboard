import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';

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

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
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
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
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
          </div>
        </div>
      )}
    </header>
  );
};