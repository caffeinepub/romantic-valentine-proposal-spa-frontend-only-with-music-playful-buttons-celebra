import { useEffect, useState } from 'react';
import LandingScreen from './screens/LandingScreen';
import CelebrationScreen from './screens/CelebrationScreen';
import ReturningTransitionScreen from './screens/ReturningTransitionScreen';
import BackgroundMusic from './components/audio/BackgroundMusic';
import MuteToggle from './components/audio/MuteToggle';
import PointerGlowTrail from './components/effects/PointerGlowTrail';
import { useProposalState } from './hooks/useProposalState';

type AppScreen = 'landing' | 'transition' | 'celebration';

export default function App() {
  const { isAccepted, acceptProposal } = useProposalState();
  const [currentScreen, setCurrentScreen] = useState<AppScreen>('landing');
  const [showCelebration, setShowCelebration] = useState(false);

  useEffect(() => {
    if (isAccepted && !showCelebration) {
      // Returning user - show transition first
      setCurrentScreen('transition');
      const timer = setTimeout(() => {
        setCurrentScreen('celebration');
        setShowCelebration(true);
      }, 1800); // 1.8 seconds
      return () => clearTimeout(timer);
    } else if (!isAccepted) {
      setCurrentScreen('landing');
    }
  }, [isAccepted, showCelebration]);

  const handleYesClick = () => {
    acceptProposal();
    setCurrentScreen('celebration');
    setShowCelebration(true);
  };

  return (
    <div className="relative min-h-screen overflow-hidden">
      <BackgroundMusic />
      <MuteToggle />
      <PointerGlowTrail />
      
      {currentScreen === 'landing' && <LandingScreen onYesClick={handleYesClick} />}
      {currentScreen === 'transition' && <ReturningTransitionScreen />}
      {currentScreen === 'celebration' && <CelebrationScreen />}
    </div>
  );
}
