import { useEffect, useRef } from 'react';

interface Confetti {
  x: number;
  y: number;
  vx: number;
  vy: number;
  rotation: number;
  rotationSpeed: number;
  color: string;
  size: number;
}

export default function ConfettiBurst() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const confettiRef = useRef<Confetti[]>([]);
  const animationFrameRef = useRef<number | undefined>(undefined);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const colors = ['#ff6b9d', '#ffc0cb', '#ffb6c1', '#ff69b4', '#ff1493', '#ffd700', '#ff6347'];
    
    // Create confetti
    for (let i = 0; i < 150; i++) {
      confettiRef.current.push({
        x: canvas.width / 2,
        y: canvas.height / 2,
        vx: (Math.random() - 0.5) * 15,
        vy: (Math.random() - 0.5) * 15 - 5,
        rotation: Math.random() * 360,
        rotationSpeed: (Math.random() - 0.5) * 10,
        color: colors[Math.floor(Math.random() * colors.length)],
        size: 8 + Math.random() * 8
      });
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      confettiRef.current = confettiRef.current.filter(confetti => {
        confetti.x += confetti.vx;
        confetti.y += confetti.vy;
        confetti.vy += 0.3; // gravity
        confetti.rotation += confetti.rotationSpeed;

        if (confetti.y > canvas.height + 50) return false;

        ctx.save();
        ctx.translate(confetti.x, confetti.y);
        ctx.rotate((confetti.rotation * Math.PI) / 180);
        ctx.fillStyle = confetti.color;
        ctx.fillRect(-confetti.size / 2, -confetti.size / 2, confetti.size, confetti.size);
        ctx.restore();

        return true;
      });

      if (confettiRef.current.length > 0) {
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
