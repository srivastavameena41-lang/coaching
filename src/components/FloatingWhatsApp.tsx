import React, { useState } from 'react';
import { MessageCircle, X } from 'lucide-react';
import { CONTACT_INFO } from '../data/content';

export const FloatingWhatsApp: React.FC = () => {
  const [showTooltip, setShowTooltip] = useState(true);

  const whatsappUrl = `https://wa.me/${CONTACT_INFO.whatsappRaw}?text=${encodeURIComponent(
    'Hello Shree Narayan Coaching Classes, I would like to inquire about admissions at your Lohia Chauraha, Bahraich campus.'
  )}`;

  return (
    <div className="fixed bottom-5 right-5 z-40 flex items-end flex-col gap-2">
      {/* Tooltip prompt */}
      {showTooltip && (
        <div className="bg-white px-3.5 py-2 rounded-2xl shadow-lg border border-purple-100 text-xs font-semibold text-slate-800 flex items-center gap-2 animate-bounce">
          <span>Need help? Chat with us!</span>
          <button
            onClick={() => setShowTooltip(false)}
            className="text-slate-400 hover:text-slate-700"
            aria-label="Dismiss tooltip"
          >
            <X className="w-3 h-3" />
          </button>
        </div>
      )}

      {/* Floating Action Button */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        id="floating-whatsapp-btn"
        className="w-14 h-14 rounded-full bg-[#25D366] hover:bg-[#20ba59] text-white flex items-center justify-center shadow-xl shadow-[#25D366]/35 hover:scale-110 active:scale-95 transition-all duration-200 group"
        aria-label="Chat on WhatsApp"
        title="Chat on WhatsApp"
      >
        <MessageCircle className="w-7 h-7" />
        <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#16a34a] border-2 border-white" />
      </a>
    </div>
  );
};
