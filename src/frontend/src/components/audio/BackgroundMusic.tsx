import { useEffect, useRef } from 'react';
import { useLocalStorageState } from '../../hooks/useLocalStorageState';
import { STORAGE_KEYS } from '../../lib/storageKeys';

export default function BackgroundMusic() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isMuted] = useLocalStorageState(STORAGE_KEYS.MUTE_STATE, false);

  useEffect(() => {
    // Create audio element
    const audio = new Audio('/assets/audio/romantic-loop.mp3');
    audio.loop = true;
    audio.volume = 0.3;
    audioRef.current = audio;

    // Try to play (may be blocked by browser autoplay policy)
    const playPromise = audio.play();
    if (playPromise !== undefined) {
      playPromise.catch(() => {
        // Autoplay was prevented, user will need to interact first
      });
    }

    return () => {
      audio.pause();
      audio.src = '';
    };
  }, []);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.muted = isMuted;
    }
  }, [isMuted]);

  return null;
}
