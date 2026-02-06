import { useState, useRef, useEffect } from 'react';
import { VALENTINE_COPY } from '../../constants/valentineCopy';

interface PlayfulChoiceButtonsProps {
  onYesClick: () => void;
}

export default function PlayfulChoiceButtons({ onYesClick }: PlayfulChoiceButtonsProps) {
  const [noPosition, setNoPosition] = useState({ x: 0, y: 0 });
  const [noScale, setNoScale] = useState(1);
  const [isNoHovered, setIsNoHovered] = useState(false);
  const noButtonRef = useRef<HTMLButtonElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const moveNoButton = () => {
    if (!containerRef.current || !noButtonRef.current) return;

    const container = containerRef.current.getBoundingClientRect();
    const button = noButtonRef.current.getBoundingClientRect();
    
    const maxX = container.width - button.width - 40;
    const maxY = 100;
    
    const newX = (Math.random() - 0.5) * maxX;
    const newY = (Math.random() - 0.5) * maxY;
    
    setNoPosition({ x: newX, y: newY });
    setNoScale(Math.max(0.7, noScale - 0.1));
  };

  const handleNoInteraction = (e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();
    moveNoButton();
  };

  useEffect(() => {
    if (isNoHovered) {
      moveNoButton();
    }
  }, [isNoHovered]);

  return (
    <div ref={containerRef} className="relative flex flex-col sm:flex-row gap-6 justify-center items-center min-h-[120px]">
      <button
        onClick={onYesClick}
        className="yes-button px-8 py-4 text-lg md:text-xl font-semibold font-body rounded-full transition-all duration-300 hover:scale-110 active:scale-95 z-20"
      >
        {VALENTINE_COPY.yesButton}
      </button>
      
      <button
        ref={noButtonRef}
        onMouseEnter={() => setIsNoHovered(true)}
        onMouseLeave={() => setIsNoHovered(false)}
        onTouchStart={handleNoInteraction}
        onClick={handleNoInteraction}
        className="no-button px-6 py-3 text-base md:text-lg font-medium font-body rounded-full transition-all duration-300 hover:scale-105 active:scale-95"
        style={{
          transform: `translate(${noPosition.x}px, ${noPosition.y}px) scale(${noScale})`,
          transition: 'transform 0.3s ease-out'
        }}
      >
        {VALENTINE_COPY.noButton}
      </button>
    </div>
  );
}
