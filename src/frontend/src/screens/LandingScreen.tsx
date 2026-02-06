import FloatingHeartsBackground from '../components/romance/FloatingHeartsBackground';
import SparklesBackground from '../components/romance/SparklesBackground';
import GlassCard from '../components/romance/GlassCard';
import PlayfulChoiceButtons from '../components/proposal/PlayfulChoiceButtons';
import { VALENTINE_COPY } from '../constants/valentineCopy';

interface LandingScreenProps {
  onYesClick: () => void;
}

export default function LandingScreen({ onYesClick }: LandingScreenProps) {
  return (
    <div className="relative min-h-screen flex items-center justify-center p-4">
      <FloatingHeartsBackground />
      <SparklesBackground />
      
      <GlassCard className="max-w-2xl w-full animate-fade-in-up">
        <div className="text-center space-y-6 p-8 md:p-12">
          <h1 className="text-4xl md:text-6xl font-heading text-romantic-light leading-tight">
            {VALENTINE_COPY.heading}
          </h1>
          <p className="text-lg md:text-xl text-romantic-blush font-body">
            {VALENTINE_COPY.subtitle}
          </p>
          
          <div className="pt-8">
            <PlayfulChoiceButtons onYesClick={onYesClick} />
          </div>
        </div>
      </GlassCard>
    </div>
  );
}
