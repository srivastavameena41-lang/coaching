import React from 'react';
import { ShieldCheck, CheckCircle2, MessageCircleHeart } from 'lucide-react';
import { TRUST_POINTS } from '../data/content';

export const TrustSection: React.FC = () => {
  return (
    <section className="py-16 sm:py-20 bg-white border-y border-purple-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column */}
          <div className="lg:col-span-5 space-y-6">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-pink-50 border border-pink-200 text-xs font-bold text-pink-800 shadow-xs">
              <ShieldCheck className="w-3.5 h-3.5 text-pink-600" />
              <span>The Shree Narayan Difference</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
              Why Parents & Students Trust Us
            </h2>

            <p className="text-base text-slate-600 leading-relaxed font-normal">
              Our educational approach combines authentic care with disciplined academic routines. Every program at our Lohia Chauraha campus is designed to unlock natural potential.
            </p>

            {/* Parent Accessibility Feature Card */}
            <div className="bg-[#faf7fd] rounded-2xl p-5 border border-purple-100 flex items-start gap-4 shadow-xs">
              <div className="w-10 h-10 rounded-xl bg-pink-100 text-pink-700 flex items-center justify-center shrink-0 shadow-xs">
                <MessageCircleHeart className="w-5 h-5 text-pink-600" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-900">
                  Always Accessible for Parents
                </h4>
                <p className="text-xs sm:text-sm text-slate-600 mt-0.5 font-medium">
                  Regular progress updates and clear communication directly with educators.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: 8 Checkmark Cards in 2 Columns */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {TRUST_POINTS.map((point, idx) => (
              <div
                key={idx}
                className="bg-[#faf7fd] hover:bg-white rounded-2xl p-4 sm:p-5 border border-purple-100/90 shadow-xs flex items-start gap-3.5 hover:border-pink-300 transition-all"
              >
                <div className="w-7 h-7 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900 leading-snug">
                    {point.title}
                  </h4>
                  <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                    {point.description}
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
