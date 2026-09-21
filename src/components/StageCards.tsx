import React from 'react';
import { ArrowRight, Baby, BookOpen, GraduationCap, Trophy } from 'lucide-react';
import { STAGE_CARDS } from '../data/content';

interface StageCardsProps {
  onSelectStage: (stageTitle: string) => void;
}

export const StageCards: React.FC<StageCardsProps> = ({ onSelectStage }) => {
  const getIcon = (id: string) => {
    switch (id) {
      case 'early-education':
        return <Baby className="w-5 h-5 text-pink-600" />;
      case 'primary-middle':
        return <BookOpen className="w-5 h-5 text-purple-600" />;
      case 'secondary-stage':
        return <GraduationCap className="w-5 h-5 text-violet-600" />;
      case 'aspirations':
        return <Trophy className="w-5 h-5 text-fuchsia-600" />;
      default:
        return <BookOpen className="w-5 h-5 text-purple-600" />;
    }
  };

  const getIconBg = (id: string) => {
    switch (id) {
      case 'early-education':
        return 'bg-pink-50 text-pink-700 border-pink-200';
      case 'primary-middle':
        return 'bg-purple-50 text-purple-700 border-purple-200';
      case 'secondary-stage':
        return 'bg-violet-50 text-violet-700 border-violet-200';
      case 'aspirations':
        return 'bg-fuchsia-50 text-fuchsia-700 border-fuchsia-200';
      default:
        return 'bg-purple-50 text-purple-700 border-purple-200';
    }
  };

  const getTopBorder = (id: string) => {
    switch (id) {
      case 'early-education':
        return 'border-t-4 border-t-pink-500';
      case 'primary-middle':
        return 'border-t-4 border-t-purple-500';
      case 'secondary-stage':
        return 'border-t-4 border-t-violet-500';
      case 'aspirations':
        return 'border-t-4 border-t-fuchsia-500';
      default:
        return 'border-t-4 border-t-purple-500';
    }
  };

  const getTagStyle = (id: string) => {
    switch (id) {
      case 'early-education':
        return 'text-pink-700 bg-pink-50 border-pink-200';
      case 'primary-middle':
        return 'text-purple-700 bg-purple-50 border-purple-200';
      case 'secondary-stage':
        return 'text-violet-700 bg-violet-50 border-violet-200';
      case 'aspirations':
        return 'text-fuchsia-700 bg-fuchsia-50 border-fuchsia-200';
      default:
        return 'text-purple-700 bg-purple-50 border-purple-200';
    }
  };

  return (
    <section className="py-10 bg-purple-50/30 border-b border-purple-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {STAGE_CARDS.map((card) => (
            <div
              key={card.id}
              className={`bg-white rounded-2xl p-6 border border-purple-100/90 shadow-xs hover:shadow-md hover:border-pink-300 transition-all duration-200 flex flex-col justify-between group ${getTopBorder(
                card.id
              )}`}
            >
              <div>
                {/* Icon Container & Badge */}
                <div className="flex items-center justify-between mb-4">
                  <div
                    className={`w-11 h-11 rounded-xl flex items-center justify-center border ${getIconBg(
                      card.id
                    )}`}
                  >
                    {getIcon(card.id)}
                  </div>

                  {/* Category Pill Tag */}
                  <span
                    className={`text-[10px] font-bold tracking-wider uppercase px-2.5 py-1 rounded-md border ${getTagStyle(
                      card.id
                    )}`}
                  >
                    {card.category}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold text-slate-900 mb-2.5 group-hover:text-purple-700 transition-colors">
                  {card.title}
                </h3>

                {/* Description */}
                <p className="text-sm text-slate-600 leading-relaxed mb-6 font-normal">
                  {card.description}
                </p>
              </div>

              {/* Action link */}
              <button
                onClick={() => onSelectStage(card.title)}
                className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-slate-800 group-hover:text-pink-600 transition-colors pt-3 border-t border-purple-100/80 text-left"
              >
                <span>{card.cta}</span>
                <ArrowRight className="w-4 h-4 text-pink-500 transition-transform group-hover:translate-x-1" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
