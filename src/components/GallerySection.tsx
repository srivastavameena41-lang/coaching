import React, { useState, useEffect } from 'react';
import {
  Camera,
  X,
  ChevronLeft,
  ChevronRight,
  ZoomIn,
  Layers
} from 'lucide-react';
import { GALLERY_ITEMS } from '../data/content';
import { GalleryItem } from '../types';
import initialPermanentPhotos from '../data/permanent_photos.json';

// Fallback SVG data-URL to guarantee cards never look broken if an external image fails to load
const FALLBACK_IMAGE = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="800" height="600" viewBox="0 0 800 600" fill="%23f0f4ff"><rect width="800" height="600" fill="%23f0f4ff"/><circle cx="400" cy="250" r="100" fill="%23dce9ff"/><path d="M250 480 C 250 380, 550 380, 550 480 Z" fill="%232563eb" opacity="0.8"/><text x="400" y="540" font-family="sans-serif" font-size="28" font-weight="bold" fill="%230b1c30" text-anchor="middle">Shree Narayan Coaching Classes</text></svg>`;

export const GallerySection: React.FC = () => {
  // Active photo items - initialized with permanent data if present, or defaults
  const [items, setItems] = useState<GalleryItem[]>(() => {
    if (Array.isArray(initialPermanentPhotos.gallery) && initialPermanentPhotos.gallery.length > 0) {
      return initialPermanentPhotos.gallery as GalleryItem[];
    }
    return GALLERY_ITEMS;
  });
  // Category filter
  const [activeCategory, setActiveCategory] = useState<string>('All');
  // Lightbox selection
  const [selectedPhoto, setSelectedPhoto] = useState<GalleryItem | null>(null);

  // Dynamically compute category filters based on current items
  const categories = React.useMemo(() => {
    const tags = Array.from(new Set(items.map((item) => item.tag).filter(Boolean)));
    return ['All', ...tags];
  }, [items]);

  // Load custom photos from server files or localStorage on mount so all uploaded photos are retained
  useEffect(() => {
    // 1. Fetch latest permanent gallery from server files
    fetch('/permanent_photos.json')
      .then((res) => (res.ok ? res.json() : null))
      .then((json) => {
        if (Array.isArray(json?.gallery) && json.gallery.length > 0) {
          setItems(json.gallery);
          return;
        }
      })
      .catch(() => {});

    // 2. Fallback to localStorage if server file hasn't synced yet
    try {
      const savedPhotos = localStorage.getItem('snc_custom_classroom_photos');
      if (savedPhotos) {
        const parsed = JSON.parse(savedPhotos);
        if (Array.isArray(parsed) && parsed.length > 0) {
          // If items contain valid photos, set items
          setItems(parsed);
        }
      }
    } catch {
      // If error occurs, defaults will be used
    }
  }, []);

  // Keyboard navigation for Lightbox
  useEffect(() => {
    if (!selectedPhoto) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSelectedPhoto(null);
      } else if (e.key === 'ArrowRight') {
        handleNext();
      } else if (e.key === 'ArrowLeft') {
        handlePrev();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedPhoto, items, activeCategory]);

  // Filter items based on active category
  const filteredItems = items.filter((item) =>
    activeCategory === 'All'
      ? true
      : item.tag.toLowerCase() === activeCategory.toLowerCase()
  );

  const handleNext = () => {
    if (!selectedPhoto || filteredItems.length === 0) return;
    const currentIndex = filteredItems.findIndex((item) => item.id === selectedPhoto.id);
    const nextIndex = (currentIndex + 1) % filteredItems.length;
    setSelectedPhoto(filteredItems[nextIndex]);
  };

  const handlePrev = () => {
    if (!selectedPhoto || filteredItems.length === 0) return;
    const currentIndex = filteredItems.findIndex((item) => item.id === selectedPhoto.id);
    const prevIndex = (currentIndex - 1 + filteredItems.length) % filteredItems.length;
    setSelectedPhoto(filteredItems[prevIndex]);
  };

  return (
    <section id="gallery" className="py-16 sm:py-20 bg-white border-y border-purple-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-pink-50 text-xs font-bold text-pink-800 mb-3 border border-pink-200 shadow-xs">
              <Camera className="w-3.5 h-3.5 text-pink-600" />
              <span>Campus & Classroom Activities</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Moments of Learning & Activities
            </h2>
            <p className="mt-2 text-base text-slate-600 leading-relaxed font-normal">
              Real glimpses inside engaged batches, student milestones, and classroom sessions at our Lohia Chauraha, Bahraich campus.
            </p>
          </div>
        </div>

        {/* Category Filters Bar */}
        <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-8 no-scrollbar">
          {categories.map((cat) => {
            const isActive = activeCategory === cat;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all ${
                  isActive
                    ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-xs'
                    : 'bg-[#faf7fd] text-slate-700 hover:bg-purple-50/50 border border-purple-100'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Photos Grid */}
        {filteredItems.length === 0 ? (
          <div className="text-center py-12 px-4 border-2 border-dashed border-purple-200 rounded-3xl bg-[#faf7fd]">
            <Layers className="w-10 h-10 text-slate-400 mx-auto mb-3" />
            <h3 className="text-lg font-bold text-slate-800 mb-1">
              No photos found under this selection
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 mb-4">
              Switch back to All to view the entire classroom moments collection.
            </p>
            <button
              type="button"
              onClick={() => setActiveCategory('All')}
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 text-white text-xs font-bold"
            >
              Show All Photos
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.map((item) => {
              return (
                <div
                  key={item.id}
                  onClick={() => setSelectedPhoto(item)}
                  className="bg-white rounded-2xl overflow-hidden border border-purple-100/90 shadow-xs hover:shadow-md hover:border-pink-300 transition-all duration-200 cursor-pointer group flex flex-col justify-between"
                  id={`gallery-item-${item.id}`}
                >
                  <div>
                    {/* Photo Container */}
                    <div className="relative aspect-16/10 overflow-hidden bg-purple-50/40">
                      <img
                        src={item.image}
                        alt={item.title}
                        referrerPolicy="no-referrer"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = FALLBACK_IMAGE;
                        }}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        loading="lazy"
                      />

                      {/* Category Tag Badge */}
                      <div className="absolute top-3 left-3 bg-white/95 border border-purple-100 text-purple-900 text-[11px] font-bold px-2.5 py-1 rounded-lg shadow-xs">
                        {item.tag}
                      </div>

                      {/* Zoom icon on hover */}
                      <div className="absolute inset-0 bg-purple-900/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
                        <span className="w-10 h-10 rounded-full bg-white text-purple-600 flex items-center justify-center shadow-md">
                          <ZoomIn className="w-5 h-5" />
                        </span>
                      </div>
                    </div>

                    {/* Card Content */}
                    <div className="p-5">
                      <h3 className="text-base font-bold text-slate-900 mb-1.5 group-hover:text-purple-700 transition-colors line-clamp-1">
                        {item.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-slate-600 line-clamp-2 leading-relaxed font-normal">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Lightbox Modal for Full Size Photo Viewing */}
      {selectedPhoto && (
        <div
          className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-150"
          onClick={() => setSelectedPhoto(null)}
        >
          <div
            className="relative w-full max-w-4xl bg-white rounded-3xl overflow-hidden shadow-2xl border border-purple-100"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedPhoto(null)}
              className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-slate-900/70 hover:bg-slate-900 text-white flex items-center justify-center transition-colors shadow-md"
              aria-label="Close photo preview"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Navigation Arrows */}
            {filteredItems.length > 1 && (
              <>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handlePrev();
                  }}
                  className="absolute left-3 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white/95 hover:bg-white text-slate-900 shadow-md flex items-center justify-center transition-transform hover:scale-105"
                  aria-label="Previous photo"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleNext();
                  }}
                  className="absolute right-3 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white/95 hover:bg-white text-slate-900 shadow-md flex items-center justify-center transition-transform hover:scale-105"
                  aria-label="Next photo"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </>
            )}

            {/* Photo View */}
            <div className="aspect-16/10 sm:aspect-16/9 bg-slate-900 flex items-center justify-center overflow-hidden">
              <img
                src={selectedPhoto.image}
                alt={selectedPhoto.title}
                referrerPolicy="no-referrer"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = FALLBACK_IMAGE;
                }}
                className="w-full h-full object-contain"
              />
            </div>

            {/* Caption & Controls */}
            <div className="p-5 sm:p-6 bg-white flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-t border-purple-100">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-bold text-pink-600 uppercase tracking-wider">
                    {selectedPhoto.tag}
                  </span>
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-slate-900">
                  {selectedPhoto.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-2xl">
                  {selectedPhoto.description}
                </p>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <button
                  type="button"
                  onClick={() => setSelectedPhoto(null)}
                  className="px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold bg-slate-100 text-slate-700 hover:bg-slate-200 transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
