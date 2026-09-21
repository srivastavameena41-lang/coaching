import React from 'react';
import { ChevronRight, MessageSquare, CheckCircle, MapPin, Users, Award, Sparkles, BookOpen } from 'lucide-react';
import { CONTACT_INFO, QUICK_METRICS } from '../data/content';

interface HeroProps {
  onOpenEnquiry: (program?: string) => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenEnquiry }) => {
  const scrollToPrograms = () => {
    const el = document.getElementById('programs');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const whatsappUrl = `https://wa.me/${CONTACT_INFO.whatsappRaw}?text=${encodeURIComponent(
    'Hello Shree Narayan Coaching Classes, I would like to know more about admissions and batches.'
  )}`;

  return (
    <section className="relative overflow-hidden pt-10 pb-16 lg:pt-16 lg:pb-20 bg-gradient-to-br from-purple-50/70 via-pink-50/40 to-white text-slate-900 border-b border-purple-100">
      {/* Soft educational background ambient glow */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-purple-200/30 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-pink-200/25 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left Column: Typography & CTAs */}
          <div className="lg:col-span-7 space-y-6">
            {/* Eyebrow Pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-pink-50 border border-pink-200 text-xs sm:text-sm font-bold text-pink-800 shadow-xs">
              <span className="w-2 h-2 rounded-full bg-pink-500 animate-pulse" />
              <span>{CONTACT_INFO.heroEyebrow}</span>
            </div>

            {/* Main Headline */}
            <div>
              <h1 className="text-4xl sm:text-6xl lg:text-[62px] font-black tracking-tight text-slate-900 leading-[1.1] mb-4">
                <span className="bg-gradient-to-r from-purple-800 via-purple-700 to-pink-600 bg-clip-text text-transparent">
                  Shree Narayan
                </span>{' '}
                <span className="text-slate-900 block sm:inline">Coaching Classes</span>
              </h1>

              <p className="text-lg sm:text-2xl font-bold text-slate-700 tracking-tight leading-snug">
                Building a Strong Academic Foundation.{' '}
                <span className="text-purple-700 font-extrabold">Creating a Bright Future.</span>
              </p>
            </div>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-slate-600 max-w-2xl leading-relaxed font-normal">
              Quality education, personal attention and focused learning for every stage of a student's journey in Bahraich. Nurturing curiosity into scholastic achievement.
            </p>

            {/* Action Button Row */}
            <div className="flex flex-wrap items-center gap-3.5 pt-2">
              <button
                onClick={scrollToPrograms}
                id="hero-explore-programs-btn"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl font-bold text-white bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 shadow-md shadow-purple-500/20 transition-all hover:-translate-y-0.5"
              >
                <span>Explore Programs</span>
                <ChevronRight className="w-4 h-4 text-pink-100 stroke-[2.5]" />
              </button>

              <button
                onClick={() => onOpenEnquiry()}
                id="hero-enquire-now-btn"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl font-bold text-slate-800 bg-white hover:bg-purple-50/50 border border-purple-200 shadow-xs transition-all hover:border-pink-400"
              >
                <span>Enquire Now</span>
              </button>

              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                id="hero-whatsapp-btn"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl font-bold text-white bg-emerald-600 hover:bg-emerald-700 shadow-xs transition-all"
              >
                <span className="w-4 h-4 rounded-full bg-white/20 flex items-center justify-center text-white text-[10px] font-bold">
                  ✓
                </span>
                <span>Chat on WhatsApp</span>
              </a>
            </div>

            {/* Quick Metrics Bar */}
            <div className="pt-6 border-t border-purple-100 grid grid-cols-1 sm:grid-cols-3 gap-3.5">
              <div className="bg-white rounded-xl p-4 border border-purple-100/90 shadow-xs hover:border-purple-200 transition-colors">
                <span className="block font-bold text-slate-900 text-base">Lohia Chauraha</span>
                <span className="text-xs text-purple-700/80 font-medium">Central Bahraich Campus</span>
              </div>

              <div className="bg-white rounded-xl p-4 border border-purple-100/90 shadow-xs hover:border-purple-200 transition-colors">
                <span className="block font-bold text-slate-900 text-base">Small Batches</span>
                <span className="text-xs text-pink-700/80 font-medium">Individual Focus & Care</span>
              </div>

              <div className="bg-white rounded-xl p-4 border border-purple-100/90 shadow-xs hover:border-purple-200 transition-colors">
                <span className="block font-bold text-slate-900 text-base">Daily Doubts</span>
                <span className="text-xs text-purple-700/80 font-medium">Continuous Assessment</span>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Graphic Card */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-md bg-white p-6 sm:p-8 rounded-3xl border border-purple-100 shadow-xl shadow-purple-500/5">
              {/* Decorative top badges */}
              <div className="flex items-center justify-between mb-6">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-pink-50 text-xs font-bold text-pink-800 border border-pink-200 shadow-xs">
                  <Sparkles className="w-3.5 h-3.5 text-pink-600" />
                  <span>Excellence in Bahraich</span>
                </div>
                <div className="text-xs text-slate-500 font-semibold">Est. 2018</div>
              </div>

              {/* Central Academic Illustration Artwork */}
              <div className="relative my-4 py-6 flex items-center justify-center">
                {/* Visual graduation icon art with glowing ring */}
                <div className="relative w-48 h-48 sm:w-56 sm:h-56 rounded-full bg-gradient-to-br from-purple-50 to-pink-50 border border-purple-100 flex items-center justify-center">
                  <div className="absolute inset-2 rounded-full border border-dashed border-purple-300 animate-spin-slow" />
                  
                  {/* Graduation Cap & Books Artwork */}
                  <div className="relative z-10 text-center">
                    <div className="w-22 h-22 sm:w-24 sm:h-24 mx-auto rounded-2xl bg-gradient-to-br from-purple-600 to-pink-600 shadow-lg shadow-purple-500/25 flex items-center justify-center text-white transform hover:rotate-3 transition-transform">
                      <svg className="w-12 h-12 sm:w-14 sm:h-14 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M22 10v6M2 10l10-5 10 5-10 5z"/>
                        <path d="M6 12v5c3 3 9 3 12 0v-5"/>
                      </svg>
                    </div>

                    <div className="mt-3 flex items-center justify-center gap-2 text-xs font-black text-purple-700 uppercase tracking-wider">
                      <span>Concept</span>
                      <span>•</span>
                      <span>Discipline</span>
                      <span>•</span>
                      <span>Success</span>
                    </div>
                  </div>

                  {/* Floating badge top left */}
                  <div className="absolute -top-1 left-0 bg-white px-3 py-1.5 rounded-xl border border-purple-200 shadow-sm text-[11px] font-bold text-purple-800 flex items-center gap-1.5">
                    <BookOpen className="w-3.5 h-3.5 text-purple-600" />
                    <span>Structured Syllabus</span>
                  </div>

                  {/* Floating badge bottom right */}
                  <div className="absolute -bottom-1 right-0 bg-white px-3 py-1.5 rounded-xl border border-pink-200 shadow-sm text-[11px] font-bold text-pink-800 flex items-center gap-1.5">
                    <Award className="w-3.5 h-3.5 text-pink-600" />
                    <span>Top Board Results</span>
                  </div>
                </div>
              </div>

              {/* Bottom Verification Card */}
              <div className="bg-purple-50/50 rounded-2xl p-4 sm:p-5 border border-purple-100 shadow-xs flex items-center gap-3.5 mt-4">
                <div className="w-10 h-10 rounded-full bg-pink-100 text-pink-700 flex items-center justify-center shrink-0">
                  <CheckCircle className="w-5 h-5 text-pink-600" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900 leading-snug">
                    Quality education in a caring environment
                  </h4>
                  <p className="text-xs text-purple-700/80 font-medium">
                    Lohia Chauraha, Bahraich Center of Excellence
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
