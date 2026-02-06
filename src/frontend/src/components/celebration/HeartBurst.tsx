import { useEffect, useRef } from 'react';

interface Heart {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
  rotation: number;
}

export default function HeartBurst() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const heartsRef = useRef<Heart[]>([]);
  const animationFrameRef = useRef<number | undefined>(undefined);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Create hearts
    for (let i = 0; i < 30; i++) {
      const angle = (i / 30) * Math.PI * 2;
      const speed = 3 + Math.random() * 4;
      heartsRef.current.push({
        x: canvas.width / 2,
        y: canvas.height / 2,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        size: 20 + Math.random() * 20,
        opacity: 1,
        rotation: Math.random() * 360
      });
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      heartsRef.current = heartsRef.current.filter(heart => {
        heart.x += heart.vx;
        heart.y += heart.vy;
        heart.opacity -= 0.015;

        if (heart.opacity <= 0) return false;

        ctx.save();
        ctx.globalAlpha = heart.opacity;
        ctx.fillStyle = '#ff1493';
        
        const x = heart.x;
        const y = heart.y;
        const size = heart.size;
        
        // Draw heart
        ctx.beginPath();
        ctx.moveTo(x, y + size / 4);
        ctx.bezierCurveTo(x, y, x - size / 2, y, x - size / 2, y + size / 4);
        ctx.bezierCurveTo(x - size / 2, y + size / 2, x, y + size * 0.75, x, y + size);
        ctx.bezierCurveTo(x, y + size * 0.75, x + size / 2, y + size / 2, x + size / 2, y + size / 4);
        ctx.bezierCurveTo(x + size / 2, y, x, y, x, y + size / 4);
        ctx.fill();
        ctx.restore();

        return true;
      });

      if (heartsRef.current.length > 0) {
        animationFrameRef.current = requestAnimationFrame(animate);
      }
    };

    animate();

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-50" />;
}
