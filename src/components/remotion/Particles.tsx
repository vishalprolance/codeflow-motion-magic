
import { useEffect, useMemo, useRef } from 'react';
import { useCurrentFrame, random } from 'remotion';

interface Particle {
  x: number;
  y: number;
  size: number;
  speed: number;
  opacity: number;
  color: string;
}

const Particles: React.FC<{
  count?: number;
  colors?: string[];
}> = ({
  count = 50,
  colors = ['#9b87f5', '#1EAEDB', '#33C3F0', '#ffffff'],
}) => {
  const frame = useCurrentFrame();
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const particles = useMemo(() => {
    return Array.from({ length: count }, (_, i) => {
      const randomValue = random(`particle-${i}`);
      const randomColor = colors[Math.floor(random(`color-${i}`) * colors.length)];
      
      return {
        x: random(`x-${i}`) * 1920,
        y: random(`y-${i}`) * 1080,
        size: 1 + random(`size-${i}`) * 3,
        speed: 0.2 + random(`speed-${i}`) * 0.5,
        opacity: 0.1 + random(`opacity-${i}`) * 0.4,
        color: randomColor,
      };
    });
  }, [count, colors]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const drawParticle = (particle: Particle) => {
      const { x, y, size, opacity, color } = particle;
      
      const yPosition = (y + frame * particle.speed) % 1080;
      
      ctx.globalAlpha = opacity;
      ctx.fillStyle = color;
      ctx.beginPath();
      ctx.arc(x, yPosition, size, 0, Math.PI * 2);
      ctx.fill();
    };

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Draw particles
    particles.forEach(drawParticle);
    
  }, [frame, particles]);

  return (
    <canvas
      ref={canvasRef}
      width={1920}
      height={1080}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
      }}
    />
  );
};

export default Particles;
