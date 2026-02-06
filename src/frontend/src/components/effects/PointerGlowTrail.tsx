import { useEffect, useRef } from 'react';

interface GlowParticle {
  x: number;
  y: number;
  opacity: number;
  size: number;
}

export default function PointerGlowTrail() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<GlowParticle[]>([]);
  const animationFrameRef = useRef<number | undefined>(undefined);
  const lastPositionRef = useRef({ x: 0, y: 0 });

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

    const handlePointerMove = (e: MouseEvent | TouchEvent) => {
      const x = 'touches' in e ? e.touches[0].clientX : e.clientX;
      const y = 'touches' in e ? e.touches[0].clientY : e.clientY;

      // Only add particle if moved enough
      const dx = x - lastPositionRef.current.x;
      const dy = y - lastPositionRef.current.y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance > 5) {
        particlesRef.current.push({
          x,
          y,
          opacity: 0.8,
          size: 15 + Math.random() * 10
        });

        // Limit particles
        if (particlesRef.current.length > 30) {
          particlesRef.current.shift();
        }

        lastPositionRef.current = { x, y };
      }
    };

    window.addEventListener('mousemove', handlePointerMove);
    window.addEventListener('touchmove', handlePointerMove);

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particlesRef.current = particlesRef.current.filter(particle => {
        particle.opacity -= 0.02;

        if (particle.opacity <= 0) return false;

        ctx.save();
        ctx.globalAlpha = particle.opacity;
        
        const gradient = ctx.createRadialGradient(
          particle.x, particle.y, 0,
          particle.x, particle.y, particle.size
        );
        gradient.addColorStop(0, '#ff69b4');
        gradient.addColorStop(0.5, '#ffc0cb');
        gradient.addColorStop(1, 'transparent');
        
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();

        return true;
      });

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handlePointerMove);
      window.removeEventListener('touchmove', handlePointerMove);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-40"
      style={{ mixBlendMode: 'screen' }}
    />
  );
}
