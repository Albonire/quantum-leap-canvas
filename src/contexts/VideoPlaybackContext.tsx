import React, { createContext, useContext, useMemo, useState, useCallback, useEffect } from 'react';

type VideoPlaybackContextType = {
  currentPlayingId: number | null;
  register: (id: number, ratio: number) => void;
  unregister: (id: number) => void;
};

const VideoPlaybackContext = createContext<VideoPlaybackContextType | undefined>(undefined);

export const VideoPlaybackProvider: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
  const [visibleCards, setVisibleCards] = useState<Map<number, number>>(new Map());
  const [currentPlayingId, setCurrentPlayingId] = useState<number | null>(null);

  const register = useCallback((id: number, ratio: number) => {
    setVisibleCards(prev => new Map(prev).set(id, ratio));
  }, []);

  const unregister = useCallback((id: number) => {
    setVisibleCards(prev => {
      const newMap = new Map(prev);
      newMap.delete(id);
      return newMap;
    });
  }, []);

  useEffect(() => {
    if (visibleCards.size === 0) {
      setCurrentPlayingId(null);
      return;
    }

    let bestCardId: number | null = null;
    let maxRatio = -1;

    for (const [id, ratio] of visibleCards.entries()) {
      if (ratio > maxRatio) {
        maxRatio = ratio;
        bestCardId = id;
      }
    }
    
    setCurrentPlayingId(bestCardId);

  }, [visibleCards]);

  const value = useMemo(() => ({ currentPlayingId, register, unregister }), [currentPlayingId, register, unregister]);
  
  return <VideoPlaybackContext.Provider value={value}>{children}</VideoPlaybackContext.Provider>;
};

export function useVideoPlayback() {
  const ctx = useContext(VideoPlaybackContext);
  if (!ctx) throw new Error('useVideoPlayback must be used within a VideoPlaybackProvider');
  return ctx;
}

export default VideoPlaybackContext;
