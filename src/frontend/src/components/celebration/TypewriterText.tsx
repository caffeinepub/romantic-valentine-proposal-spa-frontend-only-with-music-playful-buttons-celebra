import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface TypewriterTextProps {
  text: string;
  speed?: number;
  className?: string;
}

export default function TypewriterText({ text, speed = 50, className }: TypewriterTextProps) {
  const [displayedText, setDisplayedText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timer = setTimeout(() => {
        setDisplayedText(prev => prev + text[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, speed);
      return () => clearTimeout(timer);
    }
  }, [currentIndex, text, speed]);

  return (
    <div className={cn('typewriter-text', className)}>
      {displayedText}
      {currentIndex < text.length && (
        <span className="inline-block w-0.5 h-5 bg-romantic-accent ml-1 animate-blink" />
      )}
    </div>
  );
}
