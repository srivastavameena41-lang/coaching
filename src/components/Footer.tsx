import React from 'react';
import { Phone, MessageCircle, Clock, MapPin, Lock } from 'lucide-react';
import { CONTACT_INFO } from '../data/content';

interface FooterProps {
  onOpenPhotoManager?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenPhotoManager }) => {
  const scrollTo = (id: string) => {
    const el = document.querySelector(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#f8f5fc] text-slate-700 border-t border-purple-100 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-12 border-b border-purple-200/60">
          {/* Column 1: Brand details (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-purple-600 to-pink-500 text-white font-black text-xs flex items-center justify-center shadow-xs shrink-0">
                SNC
              </div>
              <span className="font-extrabold text-base sm:text-lg tracking-tight text-slate-900">
                {CONTACT_INFO.institutionName}
              </span>
            </div>

            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-sm">
              Premier educational coaching center dedicated to scholastic excellence, board examinations, and competitive test preparation.
            </p>

            <div className="pt-1 text-xs font-semibold text-purple-700 flex items-start gap-2">
              <MapPin className="w-4 h-4 text-pink-600 shrink-0 mt-0.5" />
              <span className="text-slate-700">{CONTACT_INFO.fullAddress}</span>
            </div>
          </div>

          {/* Column 2: Quick Links (2.5 cols) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-purple-800">
              Quick Links
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm text-slate-600">
              <li>
                <button
                  onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                  className="hover:text-pink-600 transition-colors"
                >
                  Home Overview
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollTo('#about')}
                  className="hover:text-pink-600 transition-colors"
                >
                  About Our Institution
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollTo('#facilities')}
                  className="hover:text-pink-600 transition-colors"
                >
                  Classroom & Lab Facilities
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollTo('#faculty')}
                  className="hover:text-pink-600 transition-colors"
                >
                  Faculty Members
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollTo('#gallery')}
                  className="hover:text-pink-600 transition-colors"
                >
                  Campus Gallery
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Program Categories (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-purple-800">
              Program Categories
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm text-slate-600">
              <li>
                <button
                  onClick={() => scrollTo('#programs')}
                  className="hover:text-pink-600 transition-colors text-left"
                >
                  Foundation Courses (Class 6-8)
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollTo('#programs')}
                  className="hover:text-pink-600 transition-colors text-left"
                >
                  High School Board Preparation (9-10)
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollTo('#programs')}
                  className="hover:text-pink-600 transition-colors text-left"
                >
                  Intermediate Science & Commerce (11-12)
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollTo('#programs')}
                  className="hover:text-pink-600 transition-colors text-left"
                >
                  IIT-JEE & NEET Mentorship
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollTo('#programs')}
                  className="hover:text-pink-600 transition-colors text-left"
                >
                  Scholarship & Talent Search
                </button>
              </li>
            </ul>
          </div>

          {/* Column 4: Direct Contact (2.5 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-purple-800">
              Direct Contact
            </h4>
            <p className="text-xs text-slate-600">
              Reach out directly to our admissions counseling desk:
            </p>
            <div className="space-y-2.5 pt-1 text-xs sm:text-sm">
              <a
                href={`tel:${CONTACT_INFO.phoneRaw}`}
                className="flex items-center gap-2 font-bold text-slate-900 hover:text-pink-600 transition-colors"
              >
                <Phone className="w-4 h-4 text-pink-600" />
                <span>{CONTACT_INFO.phoneDisplay}</span>
              </a>

              <a
                href={`https://wa.me/${CONTACT_INFO.whatsappRaw}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 font-bold text-slate-900 hover:text-emerald-600 transition-colors"
              >
                <MessageCircle className="w-4 h-4 text-emerald-600" />
                <span>WhatsApp: {CONTACT_INFO.whatsappDisplay}</span>
              </a>

              <div className="flex items-center gap-2 text-slate-500">
                <Clock className="w-4 h-4 text-slate-400" />
                <span>{CONTACT_INFO.timings}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Subfooter */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} Shree Narayan Coaching Classes. All Rights Reserved.</p>
          <div className="flex items-center gap-4">
            <p className="font-semibold text-slate-600">
              Designed for Lohia Chauraha, Bahraich.
            </p>
            {onOpenPhotoManager && (
              <button
                type="button"
                onClick={onOpenPhotoManager}
                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-purple-100/70 hover:bg-purple-200 text-purple-800 text-[11px] font-bold transition-colors shadow-2xs"
                title="Manage & Lock Website Photos Permanently"
              >
                <Lock className="w-3 h-3 text-purple-600" />
                <span>Lock Website Photos</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </footer>
  );
};
