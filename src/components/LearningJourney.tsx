import React from 'react';
import { Route } from 'lucide-react';
import { LEARNING_STEPS } from '../data/content';

export const LearningJourney: React.FC = () => {
  return (
    <section className="py-16 sm:py-20 bg-[#faf7fd] border-y border-purple-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-pink-50 border border-pink-200 text-xs font-bold text-pink-800 mb-3 shadow-xs">
            <Route className="w-3.5 h-3.5 text-pink-600" />
            <span>Structured Methodology</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Our 4-Step Learning Journey
          </h2>
          <p className="mt-3 text-base text-slate-600 font-medium">
            A systematic pathway from fundamentals to academic mastery
          </p>
        </div>

        {/* 4 Steps Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {LEARNING_STEPS.map((step) => (
            <div
              key={step.step}
              className="bg-white rounded-2xl p-6 sm:p-7 border border-purple-100 hover:border-pink-300 shadow-xs hover:shadow-md hover:shadow-purple-500/5 relative overflow-hidden flex flex-col justify-between group transition-all duration-300"
            >
              <div>
                {/* Step Number in distinct styling */}
                <div className="text-4xl sm:text-5xl font-black text-purple-200 group-hover:text-pink-500 transition-colors mb-4 font-mono leading-none">
                  {step.step}
                </div>

                <span className="text-[11px] font-black tracking-widest uppercase text-pink-600 block mb-1">
                  PHASE {step.step}
                </span>

                <h3 className="text-xl font-bold text-slate-900 mb-3">
                  {step.title}
                </h3>

                <p className="text-sm text-slate-600 leading-relaxed font-normal">
                  {step.description}
                </p>
              </div>

              {/* Bottom decorative bar */}
              <div className="mt-6 w-full h-1.5 rounded-full bg-purple-100/70 group-hover:bg-gradient-to-r group-hover:from-purple-500 group-hover:to-pink-500 transition-all" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
