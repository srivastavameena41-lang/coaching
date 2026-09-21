import { useState, useEffect, useCallback } from 'react';
import initialPermanentData from '../data/permanent_photos.json';

export interface PermanentPhotosData {
  faculty: {
    'geeta-srivastava': string | null;
    'anupama-srivastava': string | null;
    [key: string]: string | null;
  };
  gallery: Array<{
    id: string;
    image: string;
    title: string;
    category?: string;
    tag?: string;
    description?: string;
  }>;
}

export function usePhotoSync() {
  const [data, setData] = useState<PermanentPhotosData>(initialPermanentData as PermanentPhotosData);
  const [isSynced, setIsSynced] = useState<boolean>(false);
  const [isSyncing, setIsSyncing] = useState<boolean>(false);
  const [syncMessage, setSyncMessage] = useState<string | null>(null);

  // Function to push photos to the permanent server files
  const saveToPermanentDisk = useCallback(
    async (payload?: { faculty?: Record<string, string | null>; gallery?: any[] }) => {
      setIsSyncing(true);
      try {
        let facultyPayload = payload?.faculty;
        let galleryPayload = payload?.gallery;

        // If no payload passed, grab from localStorage or current state
        if (!facultyPayload) {
          const geeta = localStorage.getItem('snc_faculty_photo_geeta-srivastava');
          const anushka =
            localStorage.getItem('snc_faculty_photo_anushka-srivastava') ||
            localStorage.getItem('snc_faculty_photo_anupama-srivastava');
          facultyPayload = {
            'geeta-srivastava': geeta || data.faculty['geeta-srivastava'] || null,
            'anushka-srivastava': anushka || data.faculty['anushka-srivastava'] || data.faculty['anupama-srivastava'] || null,
            'anupama-srivastava': anushka || data.faculty['anushka-srivastava'] || data.faculty['anupama-srivastava'] || null,
          };
        }

        if (!galleryPayload) {
          const savedGallery = localStorage.getItem('snc_custom_classroom_photos');
          if (savedGallery) {
            try {
              galleryPayload = JSON.parse(savedGallery);
            } catch {
              galleryPayload = data.gallery;
            }
          } else {
            galleryPayload = data.gallery;
          }
        }

        const res = await fetch('/api/save-permanent-photos', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            faculty: facultyPayload,
            gallery: galleryPayload,
          }),
        });

        if (res.ok) {
          const resJson = await res.json();
          if (resJson.permanentData) {
            setData(resJson.permanentData);
            if (Array.isArray(resJson.permanentData.gallery)) {
              try {
                localStorage.setItem('snc_custom_classroom_photos', JSON.stringify(resJson.permanentData.gallery));
              } catch {
                // ignore
              }
            }
          }
          setIsSynced(true);
          setSyncMessage('Photos permanently saved to website files!');
          return true;
        }
      } catch (e) {
        console.error('Failed to sync to permanent disk:', e);
      } finally {
        setIsSyncing(false);
      }
      return false;
    },
    [data]
  );

  // Automatically check localStorage on mount and sync to disk
  useEffect(() => {
    // 1. First fetch latest permanent_photos.json from public if available
    fetch('/permanent_photos.json')
      .then((res) => (res.ok ? res.json() : null))
      .then((json) => {
        if (json) {
          setData((prev) => ({
            faculty: { ...prev.faculty, ...json.faculty },
            gallery: Array.isArray(json.gallery) && json.gallery.length > 0 ? json.gallery : prev.gallery,
          }));
        }
      })
      .catch(() => {
        // ignore
      });

    // 2. If localStorage has uploaded photos, immediately sync them to permanent server files
    const geetaLocal = localStorage.getItem('snc_faculty_photo_geeta-srivastava');
    const anushkaLocal =
      localStorage.getItem('snc_faculty_photo_anushka-srivastava') ||
      localStorage.getItem('snc_faculty_photo_anupama-srivastava');
    const galleryLocal = localStorage.getItem('snc_custom_classroom_photos');

    const hasRawBase64 = Boolean(
      (geetaLocal && geetaLocal.startsWith('data:image')) ||
      (anushkaLocal && anushkaLocal.startsWith('data:image')) ||
      (galleryLocal && galleryLocal.includes('data:image'))
    );

    if (hasRawBase64) {
      saveToPermanentDisk({
        faculty: {
          'geeta-srivastava': geetaLocal || null,
          'anushka-srivastava': anushkaLocal || null,
          'anupama-srivastava': anushkaLocal || null,
        },
        gallery: galleryLocal ? JSON.parse(galleryLocal) : [],
      });
    }
  }, [saveToPermanentDisk]);

  return {
    data,
    isSynced,
    isSyncing,
    syncMessage,
    saveToPermanentDisk,
  };
}
