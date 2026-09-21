import React from 'react';
import { GraduationCap, MapPin, Lightbulb, Users, Target } from 'lucide-react';
import { ABOUT_PILLARS, CONTACT_INFO } from '../data/content';

export const AboutSection: React.FC = () => {
  const getIcon = (id: string) => {
    switch (id) {
      case 'concept-clarity':
        return <Lightbulb className="w-5 h-5 text-amber-600" />;
      case 'personal-attention':
        return <Users className="w-5 h-5 text-purple-600" />;
      case 'focused-learning':
        return <Target className="w-5 h-5 text-pink-600" />;
      default:
        return <Lightbulb className="w-5 h-5 text-amber-600" />;
    }
  };

  const getIconBg = (id: string) => {
    switch (id) {
      case 'concept-clarity':
        return 'bg-amber-50 border-amber-200 text-amber-700';
      case 'personal-attention':
        return 'bg-purple-50 border-purple-200 text-purple-700';
      case 'focused-learning':
        return 'bg-pink-50 border-pink-200 text-pink-700';
      default:
        return 'bg-amber-50 border-amber-200 text-amber-700';
    }
  };

  return (
    <section id="about" className="py-16 sm:py-20 bg-white border-y border-purple-100/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Mission & Location */}
          <div className="lg:col-span-6 space-y-6">
            {/* Category Eyebrow */}
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-pink-50 border border-pink-200 text-xs font-bold text-pink-800 shadow-xs">
              <GraduationCap className="w-3.5 h-3.5 text-pink-600" />
              <span>Academic Philosophy</span>
            </div>

            {/* Heading */}
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
              About Shree Narayan Coaching Classes
            </h2>

            {/* Core Description */}
            <p className="text-base text-slate-600 leading-relaxed font-normal">
              We believe that every child learns differently. Our approach focuses on strong fundamentals, concept clarity, regular practice and individual attention. From early childhood learning to secondary-level academics and competitive exam preparation, we aim to create a supportive environment where students can learn with confidence.
            </p>

            {/* Convenient Location Box */}
            <div className="bg-purple-50/40 rounded-2xl p-4 sm:p-5 border border-purple-100 flex items-start gap-4 shadow-xs">
              <div className="w-10 h-10 rounded-full bg-purple-100 text-purple-700 flex items-center justify-center shrink-0 mt-0.5">
                <MapPin className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-900">
                  Convenient Location in Bahraich
                </h4>
                <p className="text-xs sm:text-sm text-slate-600 mt-0.5">
                  Lohia Chauraha — Safe, accessible, and easily commutable for local students.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: 3 Strategic Pillars */}
          <div className="lg:col-span-6 space-y-4">
            {ABOUT_PILLARS.map((pillar) => (
              <div
                key={pillar.id}
                className="bg-purple-50/20 hover:bg-white rounded-2xl p-6 border border-purple-100/90 shadow-xs hover:shadow-md hover:border-pink-300 transition-all duration-200 flex items-start gap-4 group"
              >
                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center border shrink-0 ${getIconBg(
                    pillar.id
                  )}`}
                >
                  {getIcon(pillar.id)}
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900 group-hover:text-purple-700 transition-colors mb-1.5">
                    {pillar.title}
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    {pillar.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
