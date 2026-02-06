import FloatingHeartsBackground from '../components/romance/FloatingHeartsBackground';
import { VALENTINE_COPY } from '../constants/valentineCopy';

export default function ReturningTransitionScreen() {
  return (
    <div className="relative min-h-screen flex items-center justify-center p-4">
      <FloatingHeartsBackground />
      
      <div className="text-center space-y-6 animate-pulse-soft">
        <div className="text-3xl md:text-4xl font-heading text-romantic-light">
          {VALENTINE_COPY.transitionText}
        </div>
        <div className="flex justify-center gap-2">
          <span className="w-3 h-3 bg-romantic-accent rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
          <span className="w-3 h-3 bg-romantic-accent rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
          <span className="w-3 h-3 bg-romantic-accent rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
        </div>
      </div>
    </div>
  );
}
