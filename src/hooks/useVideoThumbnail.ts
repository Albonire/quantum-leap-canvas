// src/hooks/useVideoThumbnail.ts
import { useState, useEffect, useRef } from 'react';
import { thumbnailCache } from '@/lib/thumbnailCache';

export const useVideoThumbnail = (videoUrl: string | undefined, thumbnailKey?: string) => {
  const [thumbnail, setThumbnail] = useState<string | null>(null);
  const isCanceled = useRef(false);
  const key = thumbnailKey || videoUrl;

  useEffect(() => {
    isCanceled.current = false;
    if (!videoUrl || !key) {
      setThumbnail(null);
      return;
    }

    const cached = thumbnailCache.getFromCache(key);
    if (cached) {
      setThumbnail(cached);
      return;
    }

    const generate = async () => {
      if (isCanceled.current) return null;
      try {
        const v = document.createElement('video');
        v.muted = true;
        v.playsInline = true;
        v.crossOrigin = 'anonymous';
        v.src = videoUrl;

        await new Promise<void>((resolve, reject) => {
          const onLoaded = () => { resolve(); };
          const onError = () => { reject(new Error('video load error')); };
          v.addEventListener('loadeddata', onLoaded);
          v.addEventListener('error', onError);
          v.load();
        });

        if (isCanceled.current) { v.src = ''; return null; }

        const seekTo = Math.min(1, (v.duration || 1) * 0.25);
        await new Promise<void>((resolve) => {
          const onSeeked = () => { resolve(); v.removeEventListener('seeked', onSeeked); };
          v.addEventListener('seeked', onSeeked);
          try {
            v.currentTime = seekTo;
          } catch (e) {
            // Fallback for some browsers if currentTime set before ready
            v.play().then(() => { v.currentTime = seekTo; }).catch(() => {});
          }
        });

        if (isCanceled.current) { v.src = ''; return null; }

        const canvas = document.createElement('canvas');
        // Scale down for smaller thumbnail size (e.g., max 640px width)
        const canvasWidth = Math.min(640, v.videoWidth || 640);
        const canvasHeight = Math.max(1, Math.floor(canvasWidth * ((v.videoHeight || 360) / (v.videoWidth || 640))));
        canvas.width = canvasWidth;
        canvas.height = canvasHeight;
        
        const ctx = canvas.getContext('2d');
        if (!ctx) { v.src = ''; return null; }
        
        ctx.drawImage(v, 0, 0, canvas.width, canvas.height);
        const dataUrl = canvas.toDataURL('image/jpeg', 0.8); // 80% quality JPEG

        // Clean up video element
        v.src = '';
        v.remove();
        
        return dataUrl;
      } catch (err) {
        console.error(`Error generating thumbnail for ${videoUrl}:`, err);
        return null;
      }
    };

    thumbnailCache.queueThumbnailGeneration(key, generate)
      .then(generatedThumbnail => {
        if (!isCanceled.current && generatedThumbnail) {
          setThumbnail(generatedThumbnail);
        }
      })
      .catch(err => {
        console.error("Thumbnail queue failed:", err);
      });

    return () => {
      isCanceled.current = true;
    };
  }, [videoUrl, key]);

  return thumbnail;
};
