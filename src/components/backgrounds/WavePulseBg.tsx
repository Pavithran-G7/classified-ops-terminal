import { useEffect, useRef } from 'react';

export default function WavePulseBg() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    // Sound-wave / EKG style pulses — Contact section theme
    const WAVES = 4;
    let t = 0;
    let animId: number;

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      t += 0.02;

      const COLORS = [
        'hsla(239,84%,67%',
        'hsla(187,94%,43%',
        'hsla(120,100%,50%',
        'hsla(258,90%,66%',
      ];

      for (let w = 0; w < WAVES; w++) {
        const yBase = canvas.height * (0.2 + w * 0.2);
        const amplitude = 8 + w * 4;
        const freq = 0.012 + w * 0.004;
        const phase = t + w * 1.2;
        const alpha = 0.06 + w * 0.02;

        ctx.beginPath();
        for (let x = 0; x <= canvas.width; x += 3) {
          // EKG-style spike every ~200px
          const ekg = ((x + t * 30) % 220 < 12)
            ? Math.sin(((x + t * 30) % 220) / 12 * Math.PI) * amplitude * 4
            : 0;
          const wave = Math.sin(x * freq + phase) * amplitude;
          const y = yBase + wave + ekg;
          x === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
        }
        ctx.strokeStyle = `${COLORS[w]},${alpha})`;
        ctx.lineWidth = 1.5;
        ctx.stroke();
      }

      // Expanding rings from center-left
      [0.8, 1.6, 2.4].forEach((delay, i) => {
        const radius = ((t * 40 + delay * 60) % 200);
        const alpha = (1 - radius / 200) * 0.06;
        ctx.beginPath();
        ctx.arc(canvas.width * 0.15, canvas.height * 0.5, radius, 0, Math.PI * 2);
        ctx.strokeStyle = `hsla(187,94%,43%,${alpha})`;
        ctx.lineWidth = 1;
        ctx.stroke();
      });

      animId = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
    />
  );
}
