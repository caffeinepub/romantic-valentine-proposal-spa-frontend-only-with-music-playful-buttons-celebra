import { useEffect, useRef } from 'react';

interface Heart {
  id: number;
  x: number;
  size: number;
  duration: number;
  delay: number;
  opacity: number;
}

export default function FloatingHeartsBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const heartsRef = useRef<Heart[]>([]);
  const animationFrameRef = useRef<number | undefined>(undefined);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Initialize hearts
    const heartCount = Math.floor(window.innerWidth / 100);
    heartsRef.current = Array.from({ length: heartCount }, (_, i) => ({
      id: i,
      x: Math.random() * canvas.width,
      size: 15 + Math.random() * 25,
      duration: 8000 + Math.random() * 4000,
      delay: Math.random() * 5000,
      opacity: 0.3 + Math.random() * 0.4
    }));

    const startTime = Date.now();

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const currentTime = Date.now() - startTime;

      heartsRef.current.forEach(heart => {
        const elapsed = (currentTime - heart.delay) % heart.duration;
        if (elapsed < 0) return;

        const progress = elapsed / heart.duration;
        const y = canvas.height - (progress * (canvas.height + heart.size));
        const wobble = Math.sin(progress * Math.PI * 4) * 20;

        ctx.save();
        ctx.globalAlpha = heart.opacity * (1 - progress * 0.5);
        ctx.fillStyle = '#ff6b9d';
        
        const x = heart.x + wobble;
        const size = heart.size;
        
        // Draw heart shape
        ctx.beginPath();
        ctx.moveTo(x, y + size / 4);
        ctx.bezierCurveTo(x, y, x - size / 2, y, x - size / 2, y + size / 4);
        ctx.bezierCurveTo(x - size / 2, y + size / 2, x, y + size * 0.75, x, y + size);
        ctx.bezierCurveTo(x, y + size * 0.75, x + size / 2, y + size / 2, x + size / 2, y + size / 4);
        ctx.bezierCurveTo(x + size / 2, y, x, y, x, y + size / 4);
        ctx.fill();
        ctx.restore();
      });

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ opacity: 0.6 }}
    />
  );
}
