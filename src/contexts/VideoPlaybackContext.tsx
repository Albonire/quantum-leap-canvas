import React from 'react';

type VideoPlaybackContextType = {
  currentPlayingId: number | null;
  register: (id: number, ratio: number) => void;
  unregister: (id: number) => void;
};

const VideoPlaybackContext = React.createContext<VideoPlaybackContextType | undefined>(undefined);

export const VideoPlaybackProvider: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
  const [visibleCards, setVisibleCards] = React.useState<Map<number, number>>(new Map());
  const [currentPlayingId, setCurrentPlayingId] = React.useState<number | null>(null);

  const register = React.useCallback((id: number, ratio: number) => {
    setVisibleCards(prev => new Map(prev).set(id, ratio));
  }, []);

  const unregister = React.useCallback((id: number) => {
    setVisibleCards(prev => {
      const newMap = new Map(prev);
      newMap.delete(id);
      return newMap;
    });
  }, []);

  React.useEffect(() => {
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

  const value = React.useMemo(() => ({ currentPlayingId, register, unregister }), [currentPlayingId, register, unregister]);
  
  return <VideoPlaybackContext.Provider value={value}>{children}</VideoPlaybackContext.Provider>;
};

export function useVideoPlayback() {
  const ctx = React.useContext(VideoPlaybackContext);
  if (!ctx) throw new Error('useVideoPlayback must be used within a VideoPlaybackProvider');
  return ctx;
}

export default VideoPlaybackContext;
