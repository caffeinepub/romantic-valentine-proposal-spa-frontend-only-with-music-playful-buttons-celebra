import { Volume2, VolumeX } from 'lucide-react';
import { useLocalStorageState } from '../../hooks/useLocalStorageState';
import { STORAGE_KEYS } from '../../lib/storageKeys';

export default function MuteToggle() {
  const [isMuted, setIsMuted] = useLocalStorageState(STORAGE_KEYS.MUTE_STATE, false);

  return (
    <button
      onClick={() => setIsMuted(!isMuted)}
      className="fixed top-4 right-4 z-50 p-3 rounded-full bg-white/20 backdrop-blur-md border border-white/30 hover:bg-white/30 transition-all duration-200 shadow-romantic-glow"
      aria-label={isMuted ? 'Unmute music' : 'Mute music'}
    >
      {isMuted ? (
        <VolumeX className="w-6 h-6 text-romantic-primary" />
      ) : (
        <Volume2 className="w-6 h-6 text-romantic-primary" />
      )}
    </button>
  );
}
