import React, { useState, useEffect, useRef } from 'react';
import { Users, Camera, ShieldCheck, Check, Sparkles, GraduationCap, Briefcase, Award } from 'lucide-react';
import { FACULTY_MEMBERS } from '../data/content';
import initialPermanentPhotos from '../data/permanent_photos.json';

export const FacultySection: React.FC = () => {
  const [photos, setPhotos] = useState<Record<string, string>>(() => {
    const init: Record<string, string> = {};
    const facultyData = (initialPermanentPhotos as any)?.faculty || {};
    if (facultyData['geeta-srivastava']) {
      init['geeta-srivastava'] = facultyData['geeta-srivastava'];
    }
    const anushkaSrc = facultyData['anushka-srivastava'] || facultyData['anupama-srivastava'];
    if (anushkaSrc) {
      init['anushka-srivastava'] = anushkaSrc;
      init['anupama-srivastava'] = anushkaSrc;
    }
    return init;
  });

  const [savingId, setSavingId] = useState<string | null>(null);
  const [savedSuccessId, setSavedSuccessId] = useState<string | null>(null);
  const [dragOverId, setDragOverId] = useState<string | null>(null);
  const fileInputRefs = useRef<Record<string, HTMLInputElement | null>>({});

  useEffect(() => {
    // 1. Fetch latest permanent_photos.json from server files with cache-busting
    fetch(`/permanent_photos.json?t=${Date.now()}`)
      .then((res) => (res.ok ? res.json() : null))
      .then((json) => {
        if (json?.faculty) {
          setPhotos((prev) => {
            const next = { ...prev };
            if (json.faculty['geeta-srivastava']) {
              next['geeta-srivastava'] = json.faculty['geeta-srivastava'];
            }
            const anushka = json.faculty['anushka-srivastava'] || json.faculty['anupama-srivastava'];
            if (anushka) {
              next['anushka-srivastava'] = anushka;
              next['anupama-srivastava'] = anushka;
            }
            return next;
          });
        }
      })
      .catch(() => {});

    // 2. Read from localStorage (including any photo previously uploaded in the user's browser)
    try {
      const savedGeeta = localStorage.getItem('snc_faculty_photo_geeta-srivastava');
      const savedAnushka =
        localStorage.getItem('snc_faculty_photo_anushka-srivastava') ||
        localStorage.getItem('snc_faculty_photo_anupama-srivastava');

      if (savedGeeta || savedAnushka) {
        setPhotos((prev) => ({
          ...prev,
          ...(savedGeeta ? { 'geeta-srivastava': savedGeeta } : {}),
          ...(savedAnushka ? { 'anushka-srivastava': savedAnushka, 'anupama-srivastava': savedAnushka } : {}),
        }));

        // Immediately sync to permanent disk on the server
        fetch('/api/save-permanent-photos', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            faculty: {
              ...(savedGeeta ? { 'geeta-srivastava': savedGeeta } : {}),
              ...(savedAnushka
                ? { 'anushka-srivastava': savedAnushka, 'anupama-srivastava': savedAnushka }
                : {}),
            },
          }),
        })
          .then((res) => res.json())
          .then((resJson) => {
            if (resJson?.permanentData?.faculty) {
              setPhotos((prev) => ({ ...prev, ...resJson.permanentData.faculty }));
            }
          })
          .catch(() => {});
      }
    } catch {
      // Ignore localStorage errors
    }
  }, []);

  const processFile = (memberId: string, file: File) => {
    setSavingId(memberId);
    const reader = new FileReader();

    reader.onload = async (event) => {
      const base64Url = event.target?.result as string;
      if (!base64Url) {
        setSavingId(null);
        return;
      }

      // 1. Immediately update visual state
      setPhotos((prev) => ({
        ...prev,
        [memberId]: base64Url,
        ...(memberId === 'anushka-srivastava' ? { 'anupama-srivastava': base64Url } : {}),
        ...(memberId === 'anupama-srivastava' ? { 'anushka-srivastava': base64Url } : {}),
      }));

      // 2. Save in localStorage
      try {
        localStorage.setItem(`snc_faculty_photo_${memberId}`, base64Url);
        if (memberId === 'anushka-srivastava') {
          localStorage.setItem('snc_faculty_photo_anupama-srivastava', base64Url);
        }
      } catch {
        // ignore
      }

      // 3. Persist permanently to server files (public/photos/ & dist/)
      try {
        const payload: Record<string, string> = { [memberId]: base64Url };
        if (memberId === 'anushka-srivastava') {
          payload['anupama-srivastava'] = base64Url;
        }

        const res = await fetch('/api/save-permanent-photos', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ faculty: payload }),
        });

        if (res.ok) {
          const resJson = await res.json();
          if (resJson?.permanentData?.faculty) {
            setPhotos((prev) => ({ ...prev, ...resJson.permanentData.faculty }));
          }
          setSavedSuccessId(memberId);
          setTimeout(() => setSavedSuccessId(null), 6000);
        }
      } catch (err) {
        console.error('Failed to save permanent faculty photo:', err);
      } finally {
        setSavingId(null);
      }
    };

    reader.readAsDataURL(file);
  };

  const handleCardPhotoUpload = (memberId: string, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    processFile(memberId, file);
  };

  const handleDrop = (memberId: string, e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragOverId(null);
    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith('image/')) {
      processFile(memberId, file);
    }
  };

  return (
    <section id="faculty" className="py-16 sm:py-20 bg-[#faf7fd] border-y border-purple-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-50 border border-purple-200 text-xs font-bold text-purple-800 mb-3 shadow-xs">
            <Users className="w-3.5 h-3.5 text-purple-600" />
            <span>Institutional Leadership & Faculty</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Meet Our Leadership & Faculty
          </h2>
          <p className="mt-3 text-base text-slate-600 font-medium">
            Dedicated educators fostering academic excellence and personal growth at Shree Narayan Coaching Classes
          </p>
        </div>

        {/* 2 Faculty Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {FACULTY_MEMBERS.map((member) => {
            const isAnushka = member.id === 'anushka-srivastava' || member.id === 'anupama-srivastava';
            const isGeeta = member.id === 'geeta-srivastava';

            const photoSrc =
              photos[member.id] ||
              (isAnushka ? photos['anushka-srivastava'] || photos['anupama-srivastava'] : null) ||
              member.image;

            const isSaved = savedSuccessId === member.id;
            const isSaving = savingId === member.id;

            return (
              <div
                key={member.id}
                id={`faculty-card-${member.id}`}
                className="bg-white rounded-3xl p-6 sm:p-7 border border-purple-100/90 hover:border-pink-300 shadow-xs hover:shadow-md transition-all duration-300 flex flex-col sm:flex-row items-center sm:items-start gap-6 group relative"
              >
                {/* Hidden File Input for this specific faculty member */}
                <input
                  type="file"
                  accept="image/*"
                  ref={(el) => {
                    fileInputRefs.current[member.id] = el;
                  }}
                  className="hidden"
                  onChange={(e) => handleCardPhotoUpload(member.id, e)}
                />

                {/* Faculty Photo Container with Drag-and-Drop */}
                <div
                  onDragOver={(e) => {
                    e.preventDefault();
                    setDragOverId(member.id);
                  }}
                  onDragLeave={() => setDragOverId(null)}
                  onDrop={(e) => handleDrop(member.id, e)}
                  className={`relative w-48 h-60 sm:w-52 sm:h-64 rounded-2xl overflow-hidden shrink-0 border transition-all duration-200 shadow-sm bg-purple-50/70 flex items-center justify-center group/photo ${
                    dragOverId === member.id
                      ? 'border-pink-500 ring-4 ring-pink-200 scale-[1.02]'
                      : 'border-purple-200 hover:border-purple-400'
                  }`}
                >
                  {photoSrc ? (
                    <img
                      src={photoSrc}
                      alt={member.name}
                      referrerPolicy="no-referrer"
                      onError={(e) => {
                        // Prevent fallback to random stock computerized images
                        const img = e.currentTarget;
                        img.style.display = 'none';
                      }}
                      className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-300"
                      loading="lazy"
                    />
                  ) : null}

                  {/* Dignified Institutional Avatar fallback if no custom photo yet */}
                  {!photoSrc && (
                    <div className="flex flex-col items-center justify-center p-4 text-center">
                      <div className="w-16 h-16 rounded-full bg-purple-200/80 text-purple-900 flex items-center justify-center text-xl font-black mb-2 shadow-xs border border-purple-300">
                        {isGeeta ? 'GS' : 'AS'}
                      </div>
                      <span className="text-xs font-bold text-purple-900">{member.name}</span>
                      <span className="text-[11px] text-purple-600 font-medium">{member.role}</span>
                    </div>
                  )}

                  {/* Drag-over overlay */}
                  {dragOverId === member.id && (
                    <div className="absolute inset-0 bg-pink-600/90 text-white flex flex-col items-center justify-center p-3 text-center z-20 backdrop-blur-xs animate-fade-in">
                      <Camera className="w-8 h-8 mb-2 animate-bounce" />
                      <span className="text-xs font-bold">Drop photo here to lock permanently!</span>
                    </div>
                  )}

                  {/* Dark subtle gradient bottom */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/50 via-transparent to-transparent pointer-events-none" />

                  {/* Direct 1-Click Upload Button Overlay on the Photo */}
                  <button
                    type="button"
                    onClick={() => fileInputRefs.current[member.id]?.click()}
                    disabled={isSaving}
                    className="absolute bottom-2.5 inset-x-2.5 py-2 px-3 rounded-xl bg-slate-900/90 hover:bg-slate-900 text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-md backdrop-blur-xs transition-all hover:scale-[1.02] active:scale-95 border border-white/25 cursor-pointer z-10"
                    title={`Upload or update photo for ${member.name}`}
                  >
                    <Camera className="w-3.5 h-3.5 text-pink-400" />
                    <span>{isSaving ? 'Saving & Locking...' : photoSrc ? 'Change / Upload Real Photo' : 'Upload Real Photo'}</span>
                  </button>

                  {/* Success indicator badge if just saved */}
                  {isSaved && (
                    <div className="absolute top-2 inset-x-2 bg-emerald-600 text-white text-[10px] font-bold px-2.5 py-1.5 rounded-lg flex items-center justify-center gap-1.5 shadow-lg animate-fade-in z-20">
                      <Check className="w-3.5 h-3.5" />
                      <span>Locked for All Clients!</span>
                    </div>
                  )}
                </div>

                {/* Faculty Details */}
                <div className="flex-1 text-center sm:text-left flex flex-col justify-between h-full">
                  <div>
                    {/* Category tag */}
                    <div className="flex items-center justify-center sm:justify-between gap-2 mb-1">
                      <span className="text-[11px] font-bold tracking-wider uppercase text-pink-600">
                        {member.category}
                      </span>
                    </div>

                    {/* Name */}
                    <h3 className="text-2xl font-bold text-slate-900 leading-tight">
                      {member.name}
                    </h3>

                    {/* Role */}
                    <p className="text-sm font-semibold text-purple-700 mb-2.5">
                      {member.role}
                    </p>

                    {/* Bio */}
                    <p className="text-sm text-slate-600 leading-relaxed mb-3.5 font-normal">
                      {member.bio}
                    </p>

                    {/* Qualifications & Experience Highlight */}
                    {(member.qualifications || member.experience) && (
                      <div className="mb-4 p-3 rounded-2xl bg-gradient-to-r from-purple-50/90 to-pink-50/70 border border-purple-200/80 space-y-2 text-left shadow-2xs">
                        {member.qualifications && member.qualifications.length > 0 && (
                          <div className="flex items-start gap-2 text-xs">
                            <GraduationCap className="w-4 h-4 text-purple-700 shrink-0 mt-0.5" />
                            <div className="min-w-0">
                              <span className="font-bold text-purple-900 block text-[10px] uppercase tracking-wider">
                                Qualifications
                              </span>
                              <div className="flex flex-wrap gap-1 mt-0.5">
                                {member.qualifications.map((q, qIdx) => (
                                  <span
                                    key={qIdx}
                                    className="inline-flex items-center gap-1 font-semibold text-slate-800 bg-white px-2 py-0.5 rounded-md border border-purple-100 shadow-2xs text-[11px]"
                                  >
                                    <Award className="w-3 h-3 text-pink-500" />
                                    {q}
                                  </span>
                                ))}
                              </div>
                            </div>
                          </div>
                        )}

                        {member.experience && (
                          <div className="flex items-center gap-2 text-xs pt-1 border-t border-purple-100/80">
                            <Briefcase className="w-4 h-4 text-pink-600 shrink-0" />
                            <div>
                              <span className="font-bold text-pink-700 text-[10px] uppercase tracking-wider mr-1.5">
                                Teaching Experience:
                              </span>
                              <span className="text-slate-900 font-bold bg-white px-2 py-0.5 rounded-md border border-pink-100 shadow-2xs text-[11px]">
                                {member.experience}
                              </span>
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>

                  <div>
                    {/* Tags */}
                    <div className="flex flex-wrap gap-1.5 justify-center sm:justify-start">
                      {member.tags.map((tag, idx) => (
                        <span
                          key={idx}
                          className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-purple-50 text-purple-800 border border-purple-200/80"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
