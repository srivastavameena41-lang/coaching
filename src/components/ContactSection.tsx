import React, { useState } from 'react';
import { Phone, MessageSquare, MapPin, Send, CheckCircle2, MessageCircle } from 'lucide-react';
import { CONTACT_INFO, PROGRAMS_LIST } from '../data/content';
import { EnquiryFormData } from '../types';

export const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState<EnquiryFormData>({
    studentName: '',
    parentName: '',
    program: '',
    phone: '',
    requirements: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
    }, 600);
  };

  const handleWhatsAppSend = () => {
    const text = `*New Admission Enquiry - Shree Narayan Coaching Classes*\n` +
      `*Student Name:* ${formData.studentName || 'Not specified'}\n` +
      `*Parent Name:* ${formData.parentName || 'Not specified'}\n` +
      `*Target Program:* ${formData.program || 'Not specified'}\n` +
      `*Phone Number:* ${formData.phone || 'Not specified'}\n` +
      `*Notes:* ${formData.requirements || 'None'}`;

    window.open(
      `https://wa.me/${CONTACT_INFO.whatsappRaw}?text=${encodeURIComponent(text)}`,
      '_blank'
    );
  };

  return (
    <section id="contact" className="py-16 sm:py-20 bg-white border-t border-purple-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Column: Contact details */}
          <div className="lg:col-span-5 space-y-6">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-pink-50 border border-pink-200 text-xs font-bold text-pink-800 shadow-xs">
              <MessageSquare className="w-3.5 h-3.5 text-pink-600" />
              <span>Connect With Us</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
              Have Questions? Let's Talk.
            </h2>

            <p className="text-base text-slate-600 leading-relaxed font-medium">
              Visit us in person or reach out directly to schedule a counseling discussion regarding your child's academic development.
            </p>

            {/* Direct Contact Cards */}
            <div className="space-y-3 pt-2">
              {/* Call Admissions */}
              <a
                href={`tel:${CONTACT_INFO.phoneRaw}`}
                className="bg-[#faf7fd] rounded-2xl p-4 sm:p-5 border border-purple-100 shadow-xs hover:border-pink-400 transition-all flex items-center gap-4 group"
              >
                <div className="w-11 h-11 rounded-xl bg-pink-50 text-pink-600 flex items-center justify-center shrink-0 border border-pink-200 group-hover:bg-pink-600 group-hover:text-white transition-colors">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[11px] font-bold tracking-wider uppercase text-pink-600 block">
                    CALL ADMISSIONS
                  </span>
                  <span className="text-base sm:text-lg font-extrabold text-slate-900 group-hover:text-pink-600 transition-colors">
                    {CONTACT_INFO.phoneDisplay}
                  </span>
                </div>
              </a>

              {/* WhatsApp Direct */}
              <a
                href={`https://wa.me/${CONTACT_INFO.whatsappRaw}?text=${encodeURIComponent(
                  'Hello Shree Narayan Coaching Classes, I would like to inquire about admission counseling.'
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#faf7fd] rounded-2xl p-4 sm:p-5 border border-purple-100 shadow-xs hover:border-emerald-400 transition-all flex items-center gap-4 group"
              >
                <div className="w-11 h-11 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 border border-emerald-200 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                  <MessageCircle className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[11px] font-bold tracking-wider uppercase text-emerald-700 block">
                    WHATSAPP DIRECT
                  </span>
                  <span className="text-base sm:text-lg font-extrabold text-slate-900 group-hover:text-emerald-600 transition-colors">
                    {CONTACT_INFO.whatsappDisplay}
                  </span>
                </div>
              </a>

              {/* Visit Campus */}
              <div className="bg-[#faf7fd] rounded-2xl p-4 sm:p-5 border border-purple-100 shadow-xs flex items-center gap-4">
                <div className="w-11 h-11 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center shrink-0 border border-purple-200">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[11px] font-bold tracking-wider uppercase text-purple-700 block">
                    VISIT CAMPUS
                  </span>
                  <span className="text-sm sm:text-base font-extrabold text-slate-900 block">
                    Lohia Chauraha, Bahraich
                  </span>
                  <span className="text-xs text-slate-500 font-medium">Uttar Pradesh, India</span>
                </div>
              </div>
            </div>

            {/* Campus badge pin */}
            <div className="pt-2 flex items-center gap-2 text-xs font-bold text-slate-700">
              <MapPin className="w-4 h-4 text-pink-600" />
              <span>Lohia Chauraha, Bahraich (Near Major Landmark)</span>
            </div>
          </div>

          {/* Right Column: Admission Enquiry Form */}
          <div className="lg:col-span-7">
            <div className="bg-[#faf7fd] rounded-3xl p-6 sm:p-8 lg:p-10 border border-purple-100 shadow-xl shadow-purple-950/5">
              <div className="mb-6">
                <span className="text-[11px] font-bold tracking-wider uppercase text-pink-600 block mb-1">
                  ADMISSIONS INQUIRY
                </span>
                <h3 className="text-2xl font-extrabold text-slate-900">
                  Send an Admission Enquiry
                </h3>
                <p className="text-sm text-slate-600 mt-1">
                  Fill out the quick form below and our counseling coordinator will reach back to you shortly.
                </p>
              </div>

              {submitted ? (
                <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-8 text-center space-y-4 animate-in fade-in">
                  <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h4 className="text-xl font-bold text-emerald-800">
                    Enquiry Received Successfully!
                  </h4>
                  <p className="text-sm text-emerald-800/90 max-w-md mx-auto">
                    Thank you, <span className="font-semibold">{formData.parentName || formData.studentName}</span>.
                    Our academic counselor will contact you at <span className="font-semibold">{formData.phone}</span> within 24 hours.
                  </p>
                  <div className="pt-2 flex flex-wrap justify-center gap-3">
                    <button
                      onClick={handleWhatsAppSend}
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white bg-emerald-600 hover:bg-emerald-700 shadow-sm transition-all"
                    >
                      <MessageCircle className="w-4 h-4" />
                      <span>Send via WhatsApp Now</span>
                    </button>
                    <button
                      onClick={() => {
                        setSubmitted(false);
                        setFormData({
                          studentName: '',
                          parentName: '',
                          program: '',
                          phone: '',
                          requirements: '',
                        });
                      }}
                      className="px-5 py-2.5 rounded-xl text-sm font-semibold text-slate-700 bg-white border border-slate-200 hover:bg-slate-50"
                    >
                      Submit Another Enquiry
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                    {/* Student Name */}
                    <div>
                      <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-1.5">
                        Student Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.studentName}
                        onChange={(e) => setFormData({ ...formData, studentName: e.target.value })}
                        placeholder="e.g. Aarav Sharma"
                        className="w-full px-4 py-3 rounded-xl border border-purple-200/90 bg-white text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-pink-500 focus:ring-3 focus:ring-pink-500/15 transition-all"
                      />
                    </div>

                    {/* Parent Name */}
                    <div>
                      <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-1.5">
                        Parent / Guardian Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.parentName}
                        onChange={(e) => setFormData({ ...formData, parentName: e.target.value })}
                        placeholder="e.g. Rajesh Sharma"
                        className="w-full px-4 py-3 rounded-xl border border-purple-200/90 bg-white text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-pink-500 focus:ring-3 focus:ring-pink-500/15 transition-all"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                    {/* Target Class / Program */}
                    <div>
                      <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-1.5">
                        Target Class / Program *
                      </label>
                      <select
                        required
                        value={formData.program}
                        onChange={(e) => setFormData({ ...formData, program: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-purple-200/90 text-sm text-slate-900 bg-white focus:outline-none focus:border-pink-500 focus:ring-3 focus:ring-pink-500/15 transition-all"
                      >
                        <option value="">Select Current / Target Grade</option>
                        <option value="Play Group to UKG">Play Group to UKG (Early Foundation)</option>
                        <option value="Classes 1st to 5th">Classes 1st to 5th (Primary Foundation)</option>
                        <option value="Classes 6th to 8th">Classes 6th to 8th (Middle School)</option>
                        <option value="Class 9th Board Batch">Class 9th Board Batch (Maths & Science)</option>
                        <option value="Class 10th Board Batch">Class 10th Board Batch (Target 95%+)</option>
                        <option value="Navodaya Vidyalaya Prep">Navodaya Vidyalaya Entrance</option>
                        <option value="Kendriya Vidyalaya (KVS)">Kendriya Vidyalaya (KVS)</option>
                        <option value="Polytechnic Entrance Exam">Polytechnic Entrance Exam</option>
                      </select>
                    </div>

                    {/* Phone Number */}
                    <div>
                      <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-1.5">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="e.g. +91 98765 43210"
                        className="w-full px-4 py-3 rounded-xl border border-purple-200/90 bg-white text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-pink-500 focus:ring-3 focus:ring-pink-500/15 transition-all"
                      />
                    </div>
                  </div>

                  {/* Requirements / Doubts */}
                  <div>
                    <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-1.5">
                      Specific Requirements or Doubts (Optional)
                    </label>
                    <textarea
                      rows={3}
                      value={formData.requirements}
                      onChange={(e) => setFormData({ ...formData, requirements: e.target.value })}
                      placeholder="Tell us about previous performance, subjects needing focus, or timings preferred..."
                      className="w-full px-4 py-3 rounded-xl border border-purple-200/90 bg-white text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-pink-500 focus:ring-3 focus:ring-pink-500/15 transition-all resize-none"
                    />
                  </div>

                  {/* Submit buttons */}
                  <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full sm:flex-1 py-3.5 px-6 rounded-xl font-bold text-white bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 shadow-md shadow-purple-500/20 transition-all flex items-center justify-center gap-2"
                    >
                      {isSubmitting ? (
                        <span>Processing...</span>
                      ) : (
                        <>
                          <span>Submit Enquiry</span>
                          <Send className="w-4 h-4 text-pink-100" />
                        </>
                      )}
                    </button>

                    <button
                      type="button"
                      onClick={handleWhatsAppSend}
                      className="w-full sm:w-auto py-3.5 px-6 rounded-xl font-bold text-slate-800 bg-white border border-purple-200 hover:bg-emerald-50 hover:border-emerald-500 hover:text-emerald-700 transition-all flex items-center justify-center gap-2 shadow-xs"
                    >
                      <MessageCircle className="w-4 h-4 text-emerald-600" />
                      <span>Chat on WhatsApp</span>
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
