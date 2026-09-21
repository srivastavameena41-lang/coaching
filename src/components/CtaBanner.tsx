import React from 'react';
import { Phone, MessageCircle, ArrowRight } from 'lucide-react';
import { CONTACT_INFO } from '../data/content';

interface CtaBannerProps {
  onOpenEnquiry: () => void;
}

export const CtaBanner: React.FC<CtaBannerProps> = ({ onOpenEnquiry }) => {
  return (
    <section className="py-12 bg-[#faf7fd] border-t border-purple-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-purple-800 via-purple-700 to-pink-700 p-8 sm:p-12 lg:p-14 shadow-xl shadow-purple-950/15 text-white">
          {/* Subtle background circles */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-white/10 rounded-full blur-2xl pointer-events-none" />
          <div className="absolute -bottom-10 -left-10 w-64 h-64 bg-pink-400/20 rounded-full blur-xl pointer-events-none" />

          <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
            <div className="max-w-2xl space-y-3">
              <span className="text-xs font-bold tracking-widest uppercase text-pink-200 block">
                EMPOWERING BAHRAICH'S NEXT GENERATION
              </span>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
                Ready to Take the Next Step?
              </h2>
              <p className="text-sm sm:text-base text-purple-100/90 leading-relaxed font-normal">
                Give your child a strong foundation for learning and future growth. Visit our campus at Lohia Chauraha today or contact our faculty advisors.
              </p>
            </div>

            {/* 3 Action Buttons */}
            <div className="flex flex-wrap items-center gap-3.5 w-full lg:w-auto">
              <button
                onClick={onOpenEnquiry}
                className="w-full sm:w-auto px-6 py-3.5 rounded-xl font-bold text-slate-950 bg-amber-300 hover:bg-amber-200 shadow-md shadow-amber-500/20 transition-all flex items-center justify-center gap-2 hover:-translate-y-0.5"
              >
                <span>Enquire Now</span>
                <ArrowRight className="w-4 h-4 text-slate-950 stroke-[2.5]" />
              </button>

              <a
                href={`https://wa.me/${CONTACT_INFO.whatsappRaw}?text=${encodeURIComponent(
                  'Hello, I am interested in enrolling my child at Shree Narayan Coaching Classes, Lohia Chauraha, Bahraich.'
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-5 py-3.5 rounded-xl font-bold text-slate-900 bg-white hover:bg-purple-50 shadow-sm transition-all flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-4 h-4 text-emerald-600" />
                <span>WhatsApp Us</span>
              </a>

              <a
                href={`tel:${CONTACT_INFO.phoneRaw}`}
                className="w-full sm:w-auto px-5 py-3.5 rounded-xl font-bold text-white bg-white/15 hover:bg-white/25 border border-white/20 shadow-sm transition-all flex items-center justify-center gap-2"
              >
                <Phone className="w-4 h-4 text-pink-200" />
                <span>Call Now</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
