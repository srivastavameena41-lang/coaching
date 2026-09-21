import React from 'react';
import { BookOpen, Sparkles, GraduationCap, Trophy, Baby, Star, ArrowRight } from 'lucide-react';
import { PROGRAMS_LIST } from '../data/content';

interface ProgramsSectionProps {
  onEnroll: (programTitle: string) => void;
}

export const ProgramsSection: React.FC<ProgramsSectionProps> = ({ onEnroll }) => {
  const getHeaderIcon = (id: string) => {
    switch (id) {
      case 'play-group-ukg':
        return <Baby className="w-5 h-5 text-pink-600" />;
      case 'classes-1-to-8':
        return <BookOpen className="w-5 h-5 text-purple-600" />;
      case 'classes-9-to-10':
        return <GraduationCap className="w-5 h-5 text-violet-600" />;
      case 'competitive-preparation':
        return <Trophy className="w-5 h-5 text-fuchsia-600" />;
      default:
        return <BookOpen className="w-5 h-5 text-purple-600" />;
    }
  };

  const getBadgeStyle = (badgeColor: string) => {
    switch (badgeColor) {
      case 'purple':
        return 'text-purple-800 bg-purple-50 border-purple-200';
      case 'blue':
        return 'text-pink-800 bg-pink-50 border-pink-200';
      case 'amber':
        return 'text-fuchsia-900 bg-fuchsia-50 border-fuchsia-200';
      default:
        return 'text-purple-800 bg-purple-50 border-purple-200';
    }
  };

  return (
    <section id="programs" className="py-16 sm:py-20 bg-white border-y border-purple-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-pink-50 border border-pink-200 text-xs font-bold text-pink-800 mb-3 shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-pink-600" />
            <span>Curriculum Pathways</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Our Comprehensive Programs
          </h2>
          <p className="mt-3 text-base text-slate-600 font-medium">
            Tailored instruction suited for each milestone of cognitive and academic growth
          </p>
        </div>

        {/* 4 Cards in 2x2 Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {PROGRAMS_LIST.map((program) => (
            <div
              key={program.id}
              className="bg-white rounded-3xl p-6 sm:p-8 border border-purple-100/90 hover:border-pink-300 shadow-xs hover:shadow-md transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Header Row */}
                <div className="flex items-center justify-between mb-4">
                  <span
                    className={`text-[11px] font-bold tracking-wider uppercase px-3.5 py-1 rounded-full border ${getBadgeStyle(
                      program.badgeColor
                    )}`}
                  >
                    {program.badge}
                  </span>
                  <div className="p-2.5 rounded-xl bg-purple-50/60 border border-purple-100 shadow-2xs">
                    {getHeaderIcon(program.id)}
                  </div>
                </div>

                {/* Title & Subtitle */}
                <h3 className="text-2xl font-bold text-slate-900 mb-1">
                  {program.title}
                </h3>
                <p className="text-sm font-semibold text-slate-600 mb-5">
                  {program.subtitle}
                </p>

                {/* Special Highlight banner if present (Class 9-10) */}
                {program.specialNotice && (
                  <div className="mb-5 p-3.5 rounded-xl bg-pink-50/80 border border-pink-200 text-xs sm:text-sm font-bold text-pink-900 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-pink-500 shrink-0" />
                    <span>{program.specialNotice}</span>
                  </div>
                )}

                {/* Target Exam Boxes (Competitive Prep) */}
                {program.targetExams && (
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
                    {program.targetExams.map((exam, idx) => (
                      <div
                        key={idx}
                        className="bg-purple-50/30 rounded-xl p-3 border border-purple-100 shadow-2xs text-center"
                      >
                        <span className="text-[10px] font-bold text-purple-700/70 uppercase block mb-1">
                          {exam.type}
                        </span>
                        <span className="text-xs font-bold text-slate-900 block">
                          {exam.name}
                        </span>
                      </div>
                    ))}
                  </div>
                )}

                {/* Subject & Activity Pills */}
                {program.tags && (
                  <div className="flex flex-wrap gap-2 mb-8">
                    {program.tags.map((tag, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1.5 rounded-xl text-xs font-semibold bg-purple-50/50 text-purple-900 border border-purple-100 shadow-2xs"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Card Footer Row */}
              <div className="pt-4 border-t border-purple-100 flex flex-col sm:flex-row items-center justify-between gap-3">
                <span className="text-xs font-medium text-slate-500 italic text-center sm:text-left">
                  {program.footerNote}
                </span>

                <button
                  onClick={() => onEnroll(program.title)}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold text-white bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 transition-all shadow-sm shadow-purple-500/20"
                >
                  <span>Enroll Today</span>
                  <ArrowRight className="w-3.5 h-3.5 text-pink-100" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
