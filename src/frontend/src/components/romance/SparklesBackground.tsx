import { useEffect, useRef } from 'react';

interface Sparkle {
  x: number;
  y: number;
  size: number;
  opacity: number;
  fadeSpeed: number;
}

export default function SparklesBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sparklesRef = useRef<Sparkle[]>([]);
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

    const addSparkle = () => {
      if (sparklesRef.current.length < 50) {
        sparklesRef.current.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: 2 + Math.random() * 3,
          opacity: 1,
          fadeSpeed: 0.01 + Math.random() * 0.02
        });
      }
    };

    const sparkleInterval = setInterval(addSparkle, 200);

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      sparklesRef.current = sparklesRef.current.filter(sparkle => {
        sparkle.opacity -= sparkle.fadeSpeed;
        
        if (sparkle.opacity <= 0) return false;

        ctx.save();
        ctx.globalAlpha = sparkle.opacity;
        ctx.fillStyle = '#ffd700';
        ctx.shadowBlur = 10;
        ctx.shadowColor = '#ffd700';
        
        // Draw star shape
        const spikes = 4;
        const outerRadius = sparkle.size;
        const innerRadius = sparkle.size / 2;
        
        ctx.beginPath();
        for (let i = 0; i < spikes * 2; i++) {
          const radius = i % 2 === 0 ? outerRadius : innerRadius;
          const angle = (i * Math.PI) / spikes;
          const x = sparkle.x + Math.cos(angle) * radius;
          const y = sparkle.y + Math.sin(angle) * radius;
          if (i === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.closePath();
        ctx.fill();
        ctx.restore();

        return true;
      });

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      clearInterval(sparkleInterval);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ opacity: 0.4 }}
    />
  );
}
