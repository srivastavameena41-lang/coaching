import React, { useState, useRef, useEffect } from 'react';
import {
  ShieldCheck,
  Upload,
  CheckCircle2,
  AlertCircle,
  X,
  Camera,
  Image as ImageIcon,
  RefreshCw,
  Sparkles,
  Lock
} from 'lucide-react';
import { usePhotoSync } from '../utils/photoSync';
import { FACULTY_MEMBERS, GALLERY_ITEMS } from '../data/content';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export const PermanentPhotoManagerModal: React.FC<Props> = ({ isOpen, onClose }) => {
  const { data, isSyncing, syncMessage, saveToPermanentDisk } = usePhotoSync();
  const [localGeeta, setLocalGeeta] = useState<string | null>(null);
  const [localAnupama, setLocalAnupama] = useState<string | null>(null);
  const [localGallery, setLocalGallery] = useState<any[]>([]);
  const [statusText, setStatusText] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  const geetaInputRef = useRef<HTMLInputElement | null>(null);
  const anupamaInputRef = useRef<HTMLInputElement | null>(null);
  const galleryInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (!isOpen) return;

    // Load from localStorage or data
    try {
      const g = localStorage.getItem('snc_faculty_photo_geeta-srivastava') || data.faculty['geeta-srivastava'];
      const a =
        localStorage.getItem('snc_faculty_photo_anupama-srivastava') ||
        localStorage.getItem('snc_faculty_photo_anushka-srivastava') ||
        data.faculty['anupama-srivastava'];

      setLocalGeeta(g);
      setLocalAnupama(a);

      const savedGal = localStorage.getItem('snc_custom_classroom_photos');
      if (savedGal) {
        setLocalGallery(JSON.parse(savedGal));
      } else if (data.gallery && data.gallery.length > 0) {
        setLocalGallery(data.gallery);
      }
    } catch {
      // ignore
    }
  }, [isOpen, data]);

  if (!isOpen) return null;

  const handleUploadPhoto = (
    type: 'geeta' | 'anupama' | 'gallery',
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;

    if (type === 'geeta' || type === 'anupama') {
      const file = files[0];
      const reader = new FileReader();
      reader.onload = (e) => {
        const dataUrl = e.target?.result as string;
        if (dataUrl) {
          if (type === 'geeta') {
            setLocalGeeta(dataUrl);
            localStorage.setItem('snc_faculty_photo_geeta-srivastava', dataUrl);
          } else {
            setLocalAnupama(dataUrl);
            localStorage.setItem('snc_faculty_photo_anushka-srivastava', dataUrl);
            localStorage.setItem('snc_faculty_photo_anupama-srivastava', dataUrl);
          }
          setStatusText(`Photo loaded! Click 'Lock & Save Permanently' below to fix it to the website.`);
        }
      };
      reader.readAsDataURL(file);
    } else if (type === 'gallery') {
      const newItems: any[] = [];
      let loadedCount = 0;
      Array.from(files).forEach((file, index) => {
        const reader = new FileReader();
        reader.onload = (e) => {
          const dataUrl = e.target?.result as string;
          if (dataUrl) {
            newItems.push({
              id: `user-perm-${Date.now()}-${index}`,
              image: dataUrl,
              title: file.name.replace(/\.[^/.]+$/, '').replace(/[-_]/g, ' '),
              category: 'Classroom Batches',
              tag: 'Classroom Batches',
              description: 'Real classroom and student activity session at Shree Narayan Coaching Classes, Bahraich.',
            });
          }
          loadedCount++;
          if (loadedCount === files.length) {
            setLocalGallery((prev) => {
              const merged = [...newItems, ...prev];
              localStorage.setItem('snc_custom_classroom_photos', JSON.stringify(merged));
              return merged;
            });
            setStatusText(`${newItems.length} photos added! Click 'Lock & Save Permanently' to fix them.`);
          }
        };
        reader.readAsDataURL(file);
      });
    }
    event.target.value = '';
  };

  const handleSaveAll = async () => {
    setIsSaving(true);
    setStatusText('Saving photos into permanent website files on the server...');
    try {
      const success = await saveToPermanentDisk({
        faculty: {
          'geeta-srivastava': localGeeta,
          'anushka-srivastava': localAnupama,
          'anupama-srivastava': localAnupama,
        },
        gallery: localGallery,
      });

      if (success) {
        setStatusText('Success! Photos are permanently saved in the website code and files.');
        setTimeout(() => {
          window.location.reload();
        }, 1200);
      } else {
        setStatusText('Saved to browser. Dev server is syncing files.');
      }
    } catch (e: any) {
      setStatusText('Error saving: ' + (e?.message || 'Unknown error'));
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-2xl bg-white rounded-3xl p-6 sm:p-8 border border-purple-100 shadow-2xl my-8 text-slate-800"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-start justify-between gap-4 mb-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-purple-600 to-pink-600 text-white flex items-center justify-center shadow-md shrink-0">
              <Lock className="w-6 h-6" />
            </div>
            <div>
              <div className="inline-flex items-center gap-1 text-[11px] font-bold uppercase tracking-wider text-pink-600 bg-pink-50 px-2 py-0.5 rounded-full mb-1 border border-pink-200">
                <ShieldCheck className="w-3 h-3" />
                Permanent Website Storage
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-slate-900">
                Lock Photos to Website
              </h3>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <p className="text-xs sm:text-sm text-slate-600 mb-6 leading-relaxed">
          When you upload photos, this tool writes them directly into the website’s permanent storage files so they
          <strong className="text-slate-900 font-bold"> never disappear on shared links, other devices, or parent phones</strong>.
        </p>

        {/* Status Text / Toast */}
        {statusText && (
          <div className="mb-6 p-3.5 rounded-2xl bg-purple-50 border border-purple-200 text-xs sm:text-sm font-semibold text-purple-900 flex items-center gap-2.5">
            <Sparkles className="w-4 h-4 text-purple-600 shrink-0" />
            <span>{statusText}</span>
          </div>
        )}

        {/* Hidden File Inputs */}
        <input
          type="file"
          accept="image/*"
          ref={geetaInputRef}
          className="hidden"
          onChange={(e) => handleUploadPhoto('geeta', e)}
        />
        <input
          type="file"
          accept="image/*"
          ref={anupamaInputRef}
          className="hidden"
          onChange={(e) => handleUploadPhoto('anupama', e)}
        />
        <input
          type="file"
          accept="image/*"
          multiple
          ref={galleryInputRef}
          className="hidden"
          onChange={(e) => handleUploadPhoto('gallery', e)}
        />

        {/* Section 1: Leadership & Faculty */}
        <div className="mb-6 p-4 rounded-2xl bg-[#faf7fd] border border-purple-100">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">
            1. Faculty Photos
          </h4>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Geeta Srivastava */}
            <div className="p-3 bg-white rounded-xl border border-purple-100 flex items-center gap-3">
              <div className="w-14 h-16 rounded-lg bg-purple-100 overflow-hidden shrink-0 border border-purple-200 flex items-center justify-center">
                {localGeeta ? (
                  <img src={localGeeta} alt="Geeta" className="w-full h-full object-cover object-top" />
                ) : (
                  <ImageIcon className="w-6 h-6 text-purple-400" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-xs font-bold text-slate-900 truncate">Geeta Srivastava</div>
                <div className="text-[10px] text-slate-500 mb-1.5">
                  {localGeeta ? '✓ Custom photo ready' : 'Default photo'}
                </div>
                <button
                  type="button"
                  onClick={() => geetaInputRef.current?.click()}
                  className="inline-flex items-center gap-1 text-[11px] font-bold text-purple-700 hover:text-pink-600 transition-colors"
                >
                  <Camera className="w-3 h-3" />
                  <span>Choose Photo</span>
                </button>
              </div>
            </div>

            {/* Anushka Srivastava */}
            <div className="p-3 bg-white rounded-xl border border-purple-100 flex items-center gap-3">
              <div className="w-14 h-16 rounded-lg bg-purple-100 overflow-hidden shrink-0 border border-purple-200 flex items-center justify-center">
                {localAnupama ? (
                  <img src={localAnupama} alt="Anushka" className="w-full h-full object-cover object-top" />
                ) : (
                  <ImageIcon className="w-6 h-6 text-purple-400" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-xs font-bold text-slate-900 truncate">Anushka Srivastava</div>
                <div className="text-[10px] font-semibold text-purple-700">M.A, B.Ed, D.El.Ed • UPTET/CTET</div>
                <div className="text-[10px] text-slate-500 mb-1.5">
                  {localAnupama ? '✓ Custom photo ready' : 'Default photo'}
                </div>
                <button
                  type="button"
                  onClick={() => anupamaInputRef.current?.click()}
                  className="inline-flex items-center gap-1 text-[11px] font-bold text-purple-700 hover:text-pink-600 transition-colors"
                >
                  <Camera className="w-3 h-3" />
                  <span>Choose Photo</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Section 2: Moments of Learning & Activities */}
        <div className="mb-6 p-4 rounded-2xl bg-[#faf7fd] border border-purple-100">
          <div className="flex items-center justify-between mb-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
              2. Moments of Learning Photos ({localGallery.length})
            </h4>
            <button
              type="button"
              onClick={() => galleryInputRef.current?.click()}
              className="inline-flex items-center gap-1 text-xs font-bold text-purple-700 hover:text-pink-600"
            >
              <Upload className="w-3.5 h-3.5" />
              <span>+ Add Activity Photos</span>
            </button>
          </div>

          {localGallery.length > 0 ? (
            <div className="grid grid-cols-4 sm:grid-cols-6 gap-2 max-h-36 overflow-y-auto p-1">
              {localGallery.slice(0, 12).map((item, idx) => (
                <div
                  key={item.id || idx}
                  className="aspect-square rounded-lg bg-white border border-purple-200 overflow-hidden relative group"
                >
                  <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
          ) : (
            <p className="text-xs text-slate-500 py-2">
              No custom classroom photos currently uploaded. Click '+ Add Activity Photos' to select real campus photos.
            </p>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2 border-t border-slate-100">
          <div className="text-[11px] text-slate-500 flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>Files are saved directly to public/photos</span>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 sm:flex-initial px-4 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm font-semibold text-slate-600 hover:bg-slate-50"
            >
              Cancel
            </button>

            <button
              type="button"
              onClick={handleSaveAll}
              disabled={isSaving || isSyncing}
              className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl text-xs sm:text-sm font-bold text-white bg-gradient-to-r from-purple-600 to-pink-600 hover:opacity-95 shadow-md disabled:opacity-50 transition-opacity"
            >
              {isSaving || isSyncing ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Saving to Files...</span>
                </>
              ) : (
                <>
                  <Lock className="w-4 h-4" />
                  <span>Lock & Save Permanently</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
