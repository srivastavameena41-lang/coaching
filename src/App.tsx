import React, { useState } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { StageCards } from './components/StageCards';
import { AboutSection } from './components/AboutSection';
import { FacultySection } from './components/FacultySection';
import { ProgramsSection } from './components/ProgramsSection';
import { FacilitiesSection } from './components/FacilitiesSection';
import { TrustSection } from './components/TrustSection';
import { LearningJourney } from './components/LearningJourney';
import { GallerySection } from './components/GallerySection';
import { ContactSection } from './components/ContactSection';
import { CtaBanner } from './components/CtaBanner';
import { Footer } from './components/Footer';
import { EnrollModal } from './components/EnrollModal';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { PermanentPhotoManagerModal } from './components/PermanentPhotoManagerModal';
import { usePhotoSync } from './utils/photoSync';
import { ShieldCheck, Sparkles, X } from 'lucide-react';

export default function App() {
  const [enrollModalOpen, setEnrollModalOpen] = useState(false);
  const [photoManagerOpen, setPhotoManagerOpen] = useState(false);
  const [selectedProgram, setSelectedProgram] = useState<string>('');
  const [bannerDismissed, setBannerDismissed] = useState(false);

  const { isSynced, syncMessage, isSyncing, saveToPermanentDisk } = usePhotoSync();

  const handleOpenEnquiry = (programTitle?: string) => {
    setSelectedProgram(programTitle || '');
    setEnrollModalOpen(true);
  };

  const handleCloseEnquiry = () => {
    setEnrollModalOpen(false);
    setSelectedProgram('');
  };

  const handleSelectStage = (stageTitle: string) => {
    const programsEl = document.getElementById('programs');
    if (programsEl) {
      programsEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Check if browser has custom photos stored locally
  const hasLocalFaculty =
    typeof window !== 'undefined' &&
    (Boolean(localStorage.getItem('snc_faculty_photo_geeta-srivastava')) ||
      Boolean(localStorage.getItem('snc_faculty_photo_anupama-srivastava')) ||
      Boolean(localStorage.getItem('snc_faculty_photo_anushka-srivastava')) ||
      Boolean(localStorage.getItem('snc_custom_classroom_photos')));

  return (
    <div className="min-h-screen flex flex-col bg-[#faf7fd] text-slate-800">
      {/* Permanent Photos Sync Notification if photos were detected in browser */}
      {hasLocalFaculty && !bannerDismissed && (
        <div className="bg-gradient-to-r from-purple-900 via-indigo-900 to-purple-950 text-white px-4 py-2.5 text-xs font-semibold flex items-center justify-between gap-3 shadow-md z-40 border-b border-pink-400/30">
          <div className="flex items-center gap-2 max-w-4xl mx-auto text-center sm:text-left flex-wrap justify-center sm:justify-start">
            <span className="flex items-center gap-1.5 text-pink-300 font-bold">
              <Sparkles className="w-3.5 h-3.5 shrink-0" />
              <span>Custom Photos Detected:</span>
            </span>
            <span className="text-purple-100">
              {isSynced
                ? 'Your uploaded photos are saved to the website files!'
                : 'Save your photos permanently so they appear for everyone on shared links.'}
            </span>
            {!isSynced && (
              <button
                type="button"
                onClick={() => setPhotoManagerOpen(true)}
                className="ml-2 inline-flex items-center gap-1 px-3 py-1 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 text-white font-bold hover:brightness-110 shadow-xs transition-transform hover:scale-105"
              >
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Lock Photos Permanently</span>
              </button>
            )}
          </div>
          <button
            type="button"
            onClick={() => setBannerDismissed(true)}
            className="text-purple-300 hover:text-white p-1 shrink-0"
            aria-label="Dismiss banner"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Navigation Header */}
      <Header onOpenEnquiry={handleOpenEnquiry} />

      {/* Main Content Sections */}
      <main className="flex-1">
        {/* Hero Section */}
        <Hero onOpenEnquiry={handleOpenEnquiry} />

        {/* 4 Stage Highlights */}
        <StageCards onSelectStage={handleSelectStage} />

        {/* About Institution */}
        <AboutSection />

        {/* Leadership & Faculty */}
        <FacultySection />

        {/* Comprehensive Programs */}
        <ProgramsSection onEnroll={handleOpenEnquiry} />

        {/* Academic Facilities & Methodology */}
        <FacilitiesSection />

        {/* Why Parents & Students Trust Us */}
        <TrustSection />

        {/* 4-Step Learning Journey */}
        <LearningJourney />

        {/* Moments of Learning (Campus Gallery) */}
        <GallerySection />

        {/* Contact & Admission Enquiry */}
        <ContactSection />

        {/* Final CTA Banner */}
        <CtaBanner onOpenEnquiry={() => handleOpenEnquiry()} />
      </main>

      {/* Footer */}
      <Footer onOpenPhotoManager={() => setPhotoManagerOpen(true)} />

      {/* Interactive Modals & Widgets */}
      <EnrollModal
        isOpen={enrollModalOpen}
        onClose={handleCloseEnquiry}
        defaultProgram={selectedProgram}
      />

      {/* Permanent Photo Lock & Manager Modal */}
      <PermanentPhotoManagerModal
        isOpen={photoManagerOpen}
        onClose={() => setPhotoManagerOpen(false)}
      />

      <FloatingWhatsApp />
    </div>
  );
}
