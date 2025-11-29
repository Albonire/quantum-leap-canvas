import React, { createContext, useContext, useMemo, useState, useCallback, useEffect } from 'react';

type VideoPlaybackContextType = {
  currentPlayingId: number | string | null;
  register: (id: number | string, ratio: number) => void;
  unregister: (id: number | string) => void;
  hoverPlay: (id: number | string | null) => void; // For desktop hover
};

const VideoPlaybackContext = React.createContext<VideoPlaybackContextType | undefined>(undefined);

export const VideoPlaybackProvider: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
  const [visibleCards, setVisibleCards] = useState<Map<number | string, number>>(new Map());
  const [hoveredId, setHoveredId] = useState<number | string | null>(null);
  const [currentPlayingId, setCurrentPlayingId] = useState<number | string | null>(null);

  const register = useCallback((id: number | string, ratio: number) => {
    setVisibleCards(prev => new Map(prev).set(id, ratio));
  }, []);

  const unregister = useCallback((id: number | string) => {
    setVisibleCards(prev => {
      const newMap = new Map(prev);
      newMap.delete(id);
      return newMap;
    });
  }, []);
  
  const hoverPlay = useCallback((id: number | string | null) => {
    setHoveredId(id);
  }, []);

  useEffect(() => {
    // Desktop hover takes precedence
    if (hoveredId) {
      setCurrentPlayingId(hoveredId);
      return;
    }

    // Mobile visibility logic
    if (visibleCards.size === 0) {
      setCurrentPlayingId(null);
      return;
    }

    let bestCardId: number | string | null = null;
    let maxRatio = -1;

    for (const [id, ratio] of visibleCards.entries()) {
      if (ratio > maxRatio) {
        maxRatio = ratio;
        bestCardId = id;
      }
    }
    
    if (maxRatio > 0.5) { // Only play if more than 50% visible
        setCurrentPlayingId(bestCardId);
    } else {
        setCurrentPlayingId(null);
    }

  }, [visibleCards, hoveredId]);

  const value = useMemo(() => ({ currentPlayingId, register, unregister, hoverPlay }), [currentPlayingId, register, unregister, hoverPlay]);
  
  return <VideoPlaybackContext.Provider value={value}>{children}</VideoPlaybackContext.Provider>;
};

export function useVideoPlayback() {
  const ctx = React.useContext(VideoPlaybackContext);
  if (!ctx) throw new Error('useVideoPlayback must be used within a VideoPlaybackProvider');
  return ctx;
}