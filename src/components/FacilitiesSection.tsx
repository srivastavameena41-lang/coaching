import React from 'react';
import {
  Sparkles,
  UserCheck,
  BrainCircuit,
  ClipboardCheck,
  HelpCircle,
  BookOpenCheck,
  Volume2,
  Puzzle,
  Binary,
  Award
} from 'lucide-react';
import { FACILITIES_LIST } from '../data/content';

export const FacilitiesSection: React.FC = () => {
  const renderIcon = (name: string, colorScheme: string) => {
    const iconClass =
      colorScheme === 'purple'
        ? 'text-purple-700'
        : colorScheme === 'blue'
        ? 'text-pink-600'
        : 'text-fuchsia-700';

    switch (name) {
      case 'UserCheck':
        return <UserCheck className={`w-5 h-5 ${iconClass}`} />;
      case 'BrainCircuit':
        return <BrainCircuit className={`w-5 h-5 ${iconClass}`} />;
      case 'ClipboardCheck':
        return <ClipboardCheck className={`w-5 h-5 ${iconClass}`} />;
      case 'HelpCircle':
        return <HelpCircle className={`w-5 h-5 ${iconClass}`} />;
      case 'BookOpenCheck':
        return <BookOpenCheck className={`w-5 h-5 ${iconClass}`} />;
      case 'Volume2':
        return <Volume2 className={`w-5 h-5 ${iconClass}`} />;
      case 'Puzzle':
        return <Puzzle className={`w-5 h-5 ${iconClass}`} />;
      case 'Binary':
        return <Binary className={`w-5 h-5 ${iconClass}`} />;
      case 'Award':
        return <Award className={`w-5 h-5 ${iconClass}`} />;
      default:
        return <Sparkles className={`w-5 h-5 ${iconClass}`} />;
    }
  };

  const getCardIconBg = (colorScheme: string) => {
    switch (colorScheme) {
      case 'purple':
        return 'bg-purple-50 border-purple-200';
      case 'blue':
        return 'bg-pink-50 border-pink-200';
      case 'amber':
        return 'bg-fuchsia-50 border-fuchsia-200';
      default:
        return 'bg-purple-50 border-purple-200';
    }
  };

  return (
    <section id="facilities" className="py-16 sm:py-20 bg-white border-b border-purple-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-pink-50 border border-pink-200 text-xs font-bold text-pink-800 mb-3 shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-pink-600" />
            <span>Campus Advantages</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Academic Facilities & Methodology
          </h2>
          <p className="mt-3 text-base text-slate-600 font-medium">
            Equipped with resources and practices that elevate every student's performance
          </p>
        </div>

        {/* 9 Grid Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {FACILITIES_LIST.map((facility) => (
            <div
              key={facility.id}
              className="bg-purple-50/20 hover:bg-white rounded-2xl p-6 border border-purple-100/90 hover:border-pink-300 shadow-xs hover:shadow-md transition-all duration-200 flex flex-col justify-start group"
            >
              <div
                className={`w-11 h-11 rounded-xl flex items-center justify-center border mb-4 ${getCardIconBg(
                  facility.colorScheme
                )}`}
              >
                {renderIcon(facility.iconName, facility.colorScheme)}
              </div>

              <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-purple-700 transition-colors">
                {facility.title}
              </h3>

              <p className="text-sm text-slate-600 leading-relaxed font-normal">
                {facility.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
