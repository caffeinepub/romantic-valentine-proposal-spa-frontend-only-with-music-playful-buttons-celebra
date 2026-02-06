import { useState, useEffect } from 'react';
import FloatingHeartsBackground from '../components/romance/FloatingHeartsBackground';
import SparklesBackground from '../components/romance/SparklesBackground';
import GlassCard from '../components/romance/GlassCard';
import TypewriterText from '../components/celebration/TypewriterText';
import ConfettiBurst from '../components/celebration/ConfettiBurst';
import HeartBurst from '../components/celebration/HeartBurst';
import HeartPulse from '../components/celebration/HeartPulse';
import { VALENTINE_COPY } from '../constants/valentineCopy';

export default function CelebrationScreen() {
  const [showConfetti, setShowConfetti] = useState(true);
  const [showHeartBurst, setShowHeartBurst] = useState(true);
  const [showSurprise, setShowSurprise] = useState(false);
  const [showHugPulse, setShowHugPulse] = useState(false);
  const [replayKey, setReplayKey] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSurprise(true);
    }, 5000);
    return () => clearTimeout(timer);
  }, [replayKey]);

  const handleReplay = () => {
    setShowConfetti(false);
    setShowHeartBurst(false);
    setShowSurprise(false);
    setReplayKey(prev => prev + 1);
    
    setTimeout(() => {
      setShowConfetti(true);
      setShowHeartBurst(true);
    }, 50);
  };

  const handleVirtualHug = () => {
    setShowHugPulse(true);
    setTimeout(() => setShowHugPulse(false), 1000);
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center p-4 celebration-glow">
      <FloatingHeartsBackground />
      <SparklesBackground />
      
      {showConfetti && <ConfettiBurst key={`confetti-${replayKey}`} />}
      {showHeartBurst && <HeartBurst key={`heart-${replayKey}`} />}
      {showHugPulse && <HeartPulse />}
      
      <GlassCard className="max-w-3xl w-full animate-soft-zoom">
        <div className="space-y-8 p-8 md:p-12">
          <div className="text-center space-y-6">
            <TypewriterText 
              text={VALENTINE_COPY.celebrationMessage}
              speed={30}
              className="text-lg md:text-xl text-romantic-blush font-body whitespace-pre-line leading-relaxed"
            />
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-6">
            <button
              onClick={handleVirtualHug}
              className="px-8 py-3 bg-romantic-accent text-white rounded-full font-medium font-body hover:scale-105 transition-transform duration-200 shadow-romantic-glow"
            >
              {VALENTINE_COPY.hugButton}
            </button>
            
            <button
              onClick={handleReplay}
              className="px-6 py-3 text-romantic-blush rounded-full font-medium font-body hover:scale-105 transition-transform duration-200"
              style={{
                background: 'rgba(184, 107, 140, 0.3)',
                border: '2px solid rgba(184, 107, 140, 0.5)'
              }}
            >
              Replay ✨
            </button>
          </div>
          
          {showSurprise && (
            <p className="text-center text-romantic-accent font-medium font-body text-lg animate-fade-in pt-4">
              {VALENTINE_COPY.surpriseText}
            </p>
          )}
        </div>
      </GlassCard>
    </div>
  );
}
