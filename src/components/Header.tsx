import React, { useState } from 'react';
import { Phone, Menu, X, GraduationCap, ChevronRight } from 'lucide-react';
import { CONTACT_INFO } from '../data/content';

interface HeaderProps {
  onOpenEnquiry: (program?: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenEnquiry }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'Programs', href: '#programs' },
    { name: 'Facilities', href: '#facilities' },
    { name: 'Faculty', href: '#faculty' },
    { name: 'Competitive Exams', href: '#competitive-exams' },
    { name: 'Gallery', href: '#gallery' },
    { name: 'Contact', href: '#contact' },
  ];

  const handleNavClick = (href: string) => {
    setMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-white shadow-xs border-b border-purple-100/80 transition-all">
      {/* Top Scholastic Notification Bar */}
      <div className="bg-gradient-to-r from-purple-800 via-violet-800 to-pink-700 text-white py-1.5 px-4 sm:px-6 lg:px-8 text-[11px] sm:text-xs font-medium">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-1 sm:gap-4">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-pink-400 text-purple-950 font-bold text-[10px] uppercase tracking-wider">
              ⭐ Admissions Open
            </span>
            <span className="text-purple-100">
              Academic Session 2026–27 • Play Group to Class 10
            </span>
          </div>

          <div className="hidden sm:flex items-center gap-4 text-purple-200 shrink-0">
            <span className="flex items-center gap-1.5 whitespace-nowrap">
              <span className="w-1.5 h-1.5 rounded-full bg-pink-400 shrink-0" />
              Lohia Chauraha, Bahraich
            </span>
            <span>•</span>
            <a
              href={`tel:${CONTACT_INFO.phoneRaw}`}
              className="hover:text-pink-300 font-bold transition-colors whitespace-nowrap"
            >
              📞 {CONTACT_INFO.phoneDisplay}
            </a>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18 sm:h-20">
          {/* Logo Brand */}
          <a
            href="#"
            className="flex items-center gap-2.5 sm:gap-3 group text-left focus:outline-none"
            id="brand-logo"
          >
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-gradient-to-br from-purple-600 via-violet-600 to-pink-500 border border-purple-300/40 flex items-center justify-center text-white shadow-sm group-hover:from-purple-700 group-hover:to-pink-600 transition-all shrink-0">
              <span className="font-black text-xs sm:text-sm tracking-tight uppercase leading-none text-white">
                SNC
              </span>
            </div>
            <div>
              <span className="block font-bold text-xs sm:text-sm lg:text-[15px] tracking-tight text-slate-900 group-hover:text-purple-700 transition-colors leading-tight">
                {CONTACT_INFO.institutionName}
              </span>
              <span className="text-[10px] sm:text-xs text-slate-500 font-semibold block flex items-center gap-1.5 mt-0.5">
                <span className="w-1.5 h-1.5 rounded-full bg-pink-500" />
                {CONTACT_INFO.locationName}
              </span>
            </div>
          </a>

          {/* Desktop Nav Links */}
          <nav className="hidden xl:flex items-center space-x-1 lg:space-x-4">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(link.href);
                }}
                className="text-xs sm:text-sm font-semibold text-slate-700 hover:text-purple-700 transition-colors py-2 px-2.5 hover:bg-purple-50/70 rounded-lg"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Action CTA & Phone Link */}
          <div className="hidden sm:flex items-center gap-3">
            <a
              href={`tel:${CONTACT_INFO.phoneRaw}`}
              id="header-phone-btn"
              className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-slate-700 bg-purple-50/50 hover:bg-purple-50 border border-purple-200/80 px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-full transition-all shadow-xs hover:border-pink-300 whitespace-nowrap shrink-0"
              title="Call Admissions"
            >
              <Phone className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-purple-600 shrink-0" />
              <span className="hidden md:inline whitespace-nowrap">{CONTACT_INFO.phoneDisplay}</span>
            </a>

            <button
              onClick={() => onOpenEnquiry()}
              id="header-enquire-btn"
              className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-white bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 px-5 py-2.5 rounded-full shadow-sm shadow-purple-500/20 transition-all hover:-translate-y-0.5"
            >
              <span>Enquire Now</span>
              <ChevronRight className="w-4 h-4 text-pink-200" />
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="flex xl:hidden items-center gap-2">
            <a
              href={`tel:${CONTACT_INFO.phoneRaw}`}
              className="p-2 rounded-lg bg-purple-50 text-purple-600 sm:hidden"
              aria-label="Call admissions"
            >
              <Phone className="w-4 h-4" />
            </a>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-800 hover:bg-purple-50 focus:outline-none"
              aria-label="Toggle navigation menu"
              id="mobile-menu-toggle"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-white border-b border-purple-100 px-4 pt-3 pb-6 space-y-2 shadow-lg animate-in slide-in-from-top duration-200">
          <div className="grid grid-cols-1 gap-1">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(link.href);
                }}
                className="px-4 py-2.5 rounded-xl text-sm font-medium text-slate-800 hover:bg-purple-50 hover:text-purple-700 transition-colors flex items-center justify-between"
              >
                <span>{link.name}</span>
                <ChevronRight className="w-4 h-4 text-purple-400" />
              </a>
            ))}
          </div>

          <div className="pt-4 border-t border-purple-100 flex flex-col gap-2.5">
            <a
              href={`tel:${CONTACT_INFO.phoneRaw}`}
              className="w-full flex items-center justify-center gap-2 text-sm font-semibold text-slate-800 bg-purple-50/60 py-3 rounded-xl"
            >
              <Phone className="w-4 h-4 text-purple-600" />
              <span>Call: {CONTACT_INFO.phoneDisplay}</span>
            </a>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenEnquiry();
              }}
              className="w-full py-3 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 shadow-sm text-center"
            >
              Enquire for Admission
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
