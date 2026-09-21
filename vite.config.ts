import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import fs from 'fs';
import { defineConfig, type Plugin } from 'vite';

function permanentPhotosPlugin(): Plugin {
  return {
    name: 'permanent-photos-saver',
    configureServer(server) {
      server.middlewares.use('/api/save-permanent-photos', (req, res) => {
        if (req.method !== 'POST') {
          res.statusCode = 405;
          res.end(JSON.stringify({ error: 'Method not allowed' }));
          return;
        }

        const chunks: Buffer[] = [];
        req.on('data', (chunk) => chunks.push(Buffer.from(chunk)));
        req.on('end', () => {
          try {
            const rawBody = Buffer.concat(chunks).toString('utf-8');
            const data = JSON.parse(rawBody);

            const photosDir = path.resolve(__dirname, 'public/photos');
            if (!fs.existsSync(photosDir)) {
              fs.mkdirSync(photosDir, { recursive: true });
            }

            // Read existing manifest if present to preserve any existing photos
            const manifestPath = path.resolve(__dirname, 'public/permanent_photos.json');
            let permanentData: { faculty: Record<string, string | null>; gallery: any[] } = {
              faculty: {
                'geeta-srivastava': null,
                'anushka-srivastava': null,
                'anupama-srivastava': null,
              },
              gallery: [],
            };

            if (fs.existsSync(manifestPath)) {
              try {
                const parsed = JSON.parse(fs.readFileSync(manifestPath, 'utf-8'));
                if (parsed.faculty) permanentData.faculty = { ...permanentData.faculty, ...parsed.faculty };
                if (Array.isArray(parsed.gallery)) permanentData.gallery = parsed.gallery;
              } catch {
                // ignore
              }
            }

            // Process faculty photos
            if (data.faculty) {
              for (const [id, base64Url] of Object.entries(data.faculty)) {
                if (typeof base64Url === 'string' && base64Url.startsWith('data:image')) {
                  const match = base64Url.match(/^data:image\/([a-zA-Z0-9+]+);base64,(.+)$/);
                  if (match) {
                    const ext = match[1] === 'jpeg' ? 'jpg' : match[1];
                    const cleanId = id === 'anupama-srivastava' ? 'anushka-srivastava' : id.replace(/[^a-zA-Z0-9_-]/g, '');
                    const filename = `faculty_${cleanId}.${ext}`;
                    const filePath = path.join(photosDir, filename);
                    fs.writeFileSync(filePath, Buffer.from(match[2], 'base64'));
                    permanentData.faculty[id] = `/photos/${filename}`;
                    // Mirror both anushka and anupama keys so both work seamlessly
                    if (id === 'anushka-srivastava' || id === 'anupama-srivastava') {
                      permanentData.faculty['anushka-srivastava'] = `/photos/${filename}`;
                      permanentData.faculty['anupama-srivastava'] = `/photos/${filename}`;
                    }
                  }
                } else if (typeof base64Url === 'string' && base64Url.trim().length > 0) {
                  permanentData.faculty[id] = base64Url;
                  if (id === 'anushka-srivastava' || id === 'anupama-srivastava') {
                    permanentData.faculty['anushka-srivastava'] = base64Url;
                    permanentData.faculty['anupama-srivastava'] = base64Url;
                  }
                }
              }
            }

            // Process gallery photos
            if (Array.isArray(data.gallery)) {
              const updatedGallery: any[] = [];
              data.gallery.forEach((item: any, idx: number) => {
                if (item && item.image && typeof item.image === 'string' && item.image.startsWith('data:image')) {
                  const match = item.image.match(/^data:image\/([a-zA-Z0-9+]+);base64,(.+)$/);
                  if (match) {
                    const ext = match[1] === 'jpeg' ? 'jpg' : match[1];
                    const cleanName = item.title ? item.title.toLowerCase().replace(/[^a-z0-9]+/g, '_').replace(/^_|_$/g, '').slice(0, 32) : `photo_${idx + 1}`;
                    const filename = `gallery_${cleanName || (idx + 1)}.${ext}`;
                    const filePath = path.join(photosDir, filename);
                    fs.writeFileSync(filePath, Buffer.from(match[2], 'base64'));
                    updatedGallery.push({
                      ...item,
                      image: `/photos/${filename}`,
                    });
                  } else {
                    updatedGallery.push(item);
                  }
                } else if (item && item.image) {
                  updatedGallery.push(item);
                }
              });
              if (updatedGallery.length > 0) {
                permanentData.gallery = updatedGallery;
              }
            }

            // Write permanent_photos.json into both public/ and src/data/
            const jsonStr = JSON.stringify(permanentData, null, 2);
            fs.writeFileSync(manifestPath, jsonStr);
            fs.writeFileSync(path.resolve(__dirname, 'src/data/permanent_photos.json'), jsonStr);

            // Also synchronize directly into dist/ so shared preview links instantly have it
            const distPath = path.resolve(__dirname, 'dist');
            if (fs.existsSync(distPath)) {
              try {
                fs.writeFileSync(path.join(distPath, 'permanent_photos.json'), jsonStr);
                const distPhotos = path.join(distPath, 'photos');
                if (!fs.existsSync(distPhotos)) {
                  fs.mkdirSync(distPhotos, { recursive: true });
                }
                const photoFiles = fs.readdirSync(photosDir);
                for (const file of photoFiles) {
                  fs.copyFileSync(path.join(photosDir, file), path.join(distPhotos, file));
                }
              } catch (distErr) {
                console.warn('Could not sync directly to dist:', distErr);
              }
            }

            res.setHeader('Content-Type', 'application/json');
            res.statusCode = 200;
            res.end(JSON.stringify({ success: true, permanentData }));
          } catch (err: any) {
            console.error('Failed to save permanent photos:', err);
            res.statusCode = 500;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ error: err?.message || 'Server error saving photos' }));
          }
        });
      });
    },
  };
}

export default defineConfig(() => {
  return {
    plugins: [react(), tailwindcss(), permanentPhotosPlugin()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modify—file watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
    build: {
      emptyOutDir: false,
    },
  };
});
