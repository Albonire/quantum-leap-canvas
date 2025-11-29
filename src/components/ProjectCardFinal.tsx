import React, { useEffect, useRef, useState, useCallback } from 'react';
import { useVideoPlayback } from '@/contexts/VideoPlaybackContext';
import { Play, Pause, ExternalLink } from 'lucide-react';
import { Tooltip, TooltipTrigger, TooltipContent } from './ui/tooltip';
import CyberButton from './CyberButton';
import type { Project } from '@/data/projects';
import thumbnailCache from '@/lib/thumbnailCache';

interface Props { project: Project }

const ProjectCardFinal: React.FC<Props> = ({ project }) => {
  const [isHovered, setIsHovered] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const [thumbnail, setThumbnail] = useState<string | null>(null);
  const [isInView, setIsInView] = useState(false);
  const [canPlay, setCanPlay] = useState(false);
  const cardRef = useRef<HTMLDivElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const videoContainerRef = useRef<HTMLDivElement | null>(null);

  const { currentPlayingId, register, unregister } = useVideoPlayback();

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const touch = 'ontouchstart' in window || navigator.maxTouchPoints > 0 || window.matchMedia('(hover: none)').matches;
    setIsTouchDevice(Boolean(touch));
  }, []);

  useEffect(() => {
    const el = cardRef.current; if (!el) return;
    
    const obs = new IntersectionObserver(([entry]) => {
      setIsInView(entry.isIntersecting);
      if (entry.isIntersecting) {
        register(project.id, entry.intersectionRatio);
      } else {
        unregister(project.id);
      }
    }, { 
      threshold: Array.from({ length: 21 }, (_, i) => i * 0.05)
    });

    obs.observe(el);
    
    return () => {
      obs.disconnect();
      unregister(project.id);
    };
  }, [project.id, register, unregister]);
  
  useEffect(() => {
    if (!project.video || !isInView) return;
    const key = project.id || project.video;
    let canceled = false;
    const cached = thumbnailCache.getFromCache(key);
    if (cached) { setThumbnail(cached); return; }
    // Queue generation to limit concurrent canvas/video work
    const generate = async () => {
      if (canceled) return null;
      try {
        const v = document.createElement('video');
        v.muted = true; v.playsInline = true; v.crossOrigin = 'anonymous';
        v.src = project.video;
        await new Promise<void>((res, rej) => {
          const onLoaded = () => res();
          const onError = () => rej(new Error('load error'));
          v.addEventListener('loadeddata', onLoaded);
          v.addEventListener('error', onError);
          v.load();
        });
        const seekTo = Math.min(1, (v.duration || 1) * 0.25);
        await new Promise<void>((res) => {
          const onSeeked = () => { res(); v.removeEventListener('seeked', onSeeked); };
          v.addEventListener('seeked', onSeeked);
          try { v.currentTime = seekTo; } catch (e) { void e; v.play().then(() => { v.currentTime = seekTo; }).catch(() => void 0); }
        });
        const canvas = document.createElement('canvas');
        const canvasWidth = Math.min(640, v.videoWidth || 640);
        const canvasHeight = Math.max(1, Math.floor(canvasWidth * ((v.videoHeight || 360) / (v.videoWidth || 640))));
        canvas.width = canvasWidth;
        canvas.height = canvasHeight;
        const ctx = canvas.getContext('2d'); if (!ctx) return null;
        ctx.drawImage(v, 0, 0, canvas.width, canvas.height);
        const data = canvas.toDataURL('image/png');
        try { v.src = ''; } catch (e) { /* ignore */ }
        return data;
      } catch (err) {
        return null;
      }
    };
    let canceledFlag = false;
    let scheduledPromise: Promise<string | null> | null = null;
    const scheduleGeneration = () => {
      scheduledPromise = thumbnailCache.queueThumbnailGeneration(key, async () => {
        if (canceledFlag) return null;
        const out = await generate();
        if (out && !canceledFlag) setThumbnail(out);
        return out;
      });
      scheduledPromise.catch(() => null);
    };
    let timer: number | null = null;
    const winWithIdle = window as unknown as { requestIdleCallback?: (cb: () => void) => void };
    if (typeof winWithIdle.requestIdleCallback === 'function') {
      winWithIdle.requestIdleCallback(() => scheduleGeneration());
    } else {
      timer = window.setTimeout(() => scheduleGeneration(), 250);
    }
    return () => { canceled = true; canceledFlag = true; if (timer) window.clearTimeout(timer); };
  }, [project.video, isInView, project.id]);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    const onPlay = () => setIsPlaying(true);
    const onPause = () => setIsPlaying(false);
    const onCanPlay = () => setCanPlay(true);
    v.addEventListener('play', onPlay);
    v.addEventListener('pause', onPause);
    v.addEventListener('canplay', onCanPlay);
    return () => { v.removeEventListener('play', onPlay); v.removeEventListener('pause', onPause); v.removeEventListener('canplay', onCanPlay); };
  }, []);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;

    // On non-touch devices, hover is king.
    if (!isTouchDevice) {
        if (isHovered && v.paused) {
            v.play().catch(() => setIsPlaying(false));
        } else if (!isHovered && !v.paused) {
            v.pause();
        }
        return;
    }

    // On touch devices, visibility is king.
    if (currentPlayingId === project.id && v.paused) {
        v.play().catch(() => setIsPlaying(false));
    } else if (currentPlayingId !== project.id && !v.paused) {
        v.pause();
    }
  }, [project.id, currentPlayingId, isHovered, isTouchDevice]);

  // Release video resource when the card is out of view and not playing to reduce memory/decoding pressure
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    if (!isInView && v.paused) {
      try { v.src = ''; } catch (e) { void e; }
    } else if (isInView && !v.src && project.video) {
      try {
        v.src = project.video;
        v.load();
      } catch (e) { void e; }
    }
  }, [isInView, project.video]);

  const togglePlay = useCallback((e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) {
      v.play().catch(() => void 0);
    } else {
      v.pause();
    }
  }, []);

  // Prevent rapid toggling; keep a small lock window
  const toggleLockRef = useRef(false);
  const togglePlayDebounced = useCallback((e?: React.MouseEvent) => {
    if (toggleLockRef.current) return;
    toggleLockRef.current = true;
    togglePlay(e);
    setTimeout(() => { toggleLockRef.current = false; }, 300);
  }, [togglePlay]);

  const onEnter = useCallback(() => setIsHovered(true), []);
  const onLeave = useCallback(() => setIsHovered(false), []);

  const TRANSITION_MS = 700; // increase duration for smoother zoom-out

  const isCardActive = (!isTouchDevice && isHovered) || (isTouchDevice && isPlaying);

  return (
    <div
      ref={cardRef}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      className={`group relative transform-gpu bg-white/90 dark:bg-neural-gray/30 backdrop-blur-md border border-gray-300 dark:border-cyber-lime/20 rounded-xl overflow-hidden hover:border-sage-accent dark:hover:border-cyber-lime transition-[transform,border-color] duration-300 shadow-lg ${isCardActive ? 'scale-[1.03]' : 'hover:scale-[1.03]'}`}
      style={{ willChange: 'transform' }}
    >
      <div ref={videoContainerRef} className="relative h-64 overflow-hidden">
        {project.video ? (
          <div className="w-full h-full relative">
              <video
              ref={videoRef}
              src={isInView ? project.video : undefined}
              poster={thumbnail}
              controls={isTouchDevice}
              preload={isInView ? 'auto' : 'metadata'}
              playsInline
              loop
              muted
              className={`w-full h-full transform-gpu transition-[object-fit] duration-700 ease-in-out ${isCardActive ? 'object-contain' : 'object-cover'}`}
              style={{
                willChange: 'object-fit',
                transformOrigin: 'center center',
              }}
            />

            <div
              aria-hidden
              className={`absolute inset-0 z-20 transform-gpu transition-opacity duration-300 ease-out pointer-events-none ${isCardActive ? 'object-contain' : 'object-cover'}`}
              style={{
                backgroundImage: `url(${thumbnail || ''})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                opacity: canPlay ? 0 : 1,
                willChange: 'opacity, object-fit',
                transformOrigin: 'center center',
                transition: `object-fit ${TRANSITION_MS}ms cubic-bezier(0.25, 1, 0.5, 1), opacity 180ms ease-out`,
              }}
            />

            <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-30">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  togglePlayDebounced();
                }}
                className={`pointer-events-auto transition-opacity duration-200 bg-black/50 p-2 rounded-full text-white shadow-lg ${isHovered ? 'opacity-100' : 'opacity-0'}`}
                aria-label={isPlaying ? 'Pause video' : 'Play video'}
              >
                {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
              </button>
            </div>

            <div className="absolute inset-0 bg-gradient-to-t from-void-black/90 via-void-black/50 to-transparent z-10" />
          </div>
        ) : (
          <img
            loading="lazy"
            src={project.image}
            alt={project.title}
            className={`w-full h-full object-cover transform-gpu transition-[object-fit] duration-700 ease-in-out ${isCardActive ? 'object-contain' : 'object-cover'}`}
            style={{
              willChange: 'object-fit',
              transformOrigin: 'center center',
            }}
          />
        )}
      </div>
      <div className="p-6"><div className="flex items-center justify-between mb-3"><h3 className="text-2xl font-space-grotesk font-bold text-gray-800 dark:text-quantum-silver group-hover:text-sage-accent dark:group-hover:text-cyber-lime transition-colors">{project.title}</h3><span className="px-3 py-1 text-xs font-inter font-medium bg-sage-accent/20 dark:bg-cyber-lime/20 text-sage-accent dark:text-cyber-lime rounded-full">{project.category.toUpperCase()}</span></div><p className="text-gray-700 dark:text-quantum-silver/80 font-inter mb-6 leading-relaxed">{project.description}</p><div className="flex flex-wrap gap-2 mb-6">{project.technologies.map((tech) => (<span key={tech} className="px-3 py-1 bg-gray-200/80 dark:bg-neural-gray/50 text-gray-800 dark:text-quantum-silver text-sm rounded-full font-inter border border-transparent group-hover:border-sage-accent/30 dark:group-hover:border-cyber-lime/30 transition-all duration-300">{tech}</span>))}</div><div className="flex gap-4">{project.demoUrl && (<Tooltip><TooltipTrigger asChild><CyberButton size="sm" onClick={() => window.open(project.demoUrl, '_blank')} className="flex items-center gap-2">View Demo<ExternalLink className="w-3 h-3 opacity-70" /></CyberButton></TooltipTrigger><TooltipContent>Open demo in a new tab</TooltipContent></Tooltip>)}{project.githubUrl && (<CyberButton variant="secondary" size="sm" onClick={() => window.open(project.githubUrl, '_blank')}>Source Code</CyberButton>)}</div></div>{isHovered && (<div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-sage-accent dark:via-cyber-lime to-transparent animate-cyber-scan" />)}</div>
  );
};

export default React.memo(ProjectCardFinal);
