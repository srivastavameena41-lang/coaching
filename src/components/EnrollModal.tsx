import React, { useState, useEffect } from 'react';
import { X, CheckCircle2, Send, MessageCircle } from 'lucide-react';
import { CONTACT_INFO, PROGRAMS_LIST } from '../data/content';

interface EnrollModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultProgram?: string;
}

export const EnrollModal: React.FC<EnrollModalProps> = ({
  isOpen,
  onClose,
  defaultProgram = '',
}) => {
  const [studentName, setStudentName] = useState('');
  const [parentName, setParentName] = useState('');
  const [program, setProgram] = useState(defaultProgram);
  const [phone, setPhone] = useState('');
  const [note, setNote] = useState('');
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (defaultProgram) {
      setProgram(defaultProgram);
    }
  }, [defaultProgram]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const handleWhatsApp = () => {
    const text = `*New Admission Inquiry via Website*\n` +
      `*Student:* ${studentName || 'N/A'}\n` +
      `*Parent:* ${parentName || 'N/A'}\n` +
      `*Program:* ${program || 'General Admissions'}\n` +
      `*Contact Phone:* ${phone || 'N/A'}\n` +
      `*Notes:* ${note || 'None'}`;

    window.open(
      `https://wa.me/${CONTACT_INFO.whatsappRaw}?text=${encodeURIComponent(text)}`,
      '_blank'
    );
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-150">
      <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden">
        {/* Header */}
        <div className="bg-pink-50/80 px-6 py-5 border-b border-purple-100 flex items-center justify-between">
          <div>
            <span className="text-[11px] font-bold tracking-wider uppercase text-pink-600 block">
              ADMISSIONS & ENROLLMENT
            </span>
            <h3 className="text-xl font-extrabold text-slate-900">
              Start Your Learning Journey
            </h3>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white text-slate-500 hover:text-slate-800 flex items-center justify-center border border-purple-100 transition-colors"
            aria-label="Close dialog"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {submitted ? (
            <div className="text-center py-6 space-y-4">
              <div className="w-14 h-14 rounded-full bg-[#dcfce7] text-[#16a34a] flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h4 className="text-xl font-bold text-[#166534]">
                Application Submitted!
              </h4>
              <p className="text-sm text-slate-600">
                Thank you! Our counselor for <span className="font-semibold text-slate-900">{program}</span> will call you shortly at <span className="font-semibold text-slate-900">{phone}</span>.
              </p>
              <div className="pt-3 flex flex-col gap-2.5">
                <button
                  onClick={handleWhatsApp}
                  className="w-full py-3 rounded-xl text-sm font-semibold text-white bg-emerald-600 hover:bg-emerald-700 flex items-center justify-center gap-2"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Send Details on WhatsApp</span>
                </button>
                <button
                  onClick={onClose}
                  className="w-full py-3 rounded-xl text-sm font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200"
                >
                  Done
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-800 uppercase mb-1">
                  Student Name *
                </label>
                <input
                  type="text"
                  required
                  value={studentName}
                  onChange={(e) => setStudentName(e.target.value)}
                  placeholder="Enter student's full name"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm text-slate-900 focus:outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-500/20"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-800 uppercase mb-1">
                  Parent / Guardian Name *
                </label>
                <input
                  type="text"
                  required
                  value={parentName}
                  onChange={(e) => setParentName(e.target.value)}
                  placeholder="Enter parent's name"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm text-slate-900 focus:outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-500/20"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-800 uppercase mb-1">
                  Target Program / Class *
                </label>
                <select
                  required
                  value={program}
                  onChange={(e) => setProgram(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm text-slate-900 bg-white focus:outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-500/20"
                >
                  <option value="">Choose a Program</option>
                  <option value="Play Group to UKG">Play Group to UKG (Early Foundation)</option>
                  <option value="Classes 1st to 8th">Classes 1st to 8th (Primary & Middle)</option>
                  <option value="Classes 9th to 10th">Classes 9th to 10th (High School Board)</option>
                  <option value="Competitive Exam Preparation">Competitive Exam Preparation (Navodaya, KVS, Polytechnic)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-800 uppercase mb-1">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+91 98765 43210"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm text-slate-900 focus:outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-500/20"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-800 uppercase mb-1">
                  Any Questions or Requirements (Optional)
                </label>
                <textarea
                  rows={2}
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  placeholder="E.g. Batch timings, specific subject focus..."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm text-slate-900 focus:outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-500/20 resize-none"
                />
              </div>

              <div className="pt-2 flex items-center gap-3">
                <button
                  type="submit"
                  className="flex-1 py-3 px-4 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 shadow-sm shadow-purple-500/20 transition-all flex items-center justify-center gap-2"
                >
                  <span>Submit Enrollment</span>
                  <Send className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  className="py-3 px-4 rounded-xl text-sm font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200 border border-slate-200"
                >
                  Cancel
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
