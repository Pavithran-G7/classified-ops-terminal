import { useEffect, useRef } from 'react';

export default function DataStreamBg() {
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

    // Vertical data streams (Matrix-like but cyan/indigo themed)
    const COLS = 32;
    const streams: {
      x: number; y: number; speed: number;
      chars: string[]; color: string; alpha: number; length: number;
    }[] = [];

    const CHARS = 'ABCDEF0123456789<>{}[]|/\\@#$%^&*';
    const COLORS = [
      'hsla(239,84%,67%', // indigo
      'hsla(187,94%,43%', // cyan
      'hsla(258,90%,66%', // violet
    ];

    const init = () => {
      streams.length = 0;
      const spacing = canvas.width / COLS;
      for (let i = 0; i < COLS; i++) {
        const len = 4 + Math.floor(Math.random() * 10);
        streams.push({
          x: spacing * i + spacing / 2,
          y: Math.random() * canvas.height,
          speed: 0.4 + Math.random() * 1.2,
          chars: Array.from({ length: len }, () => CHARS[Math.floor(Math.random() * CHARS.length)]),
          color: COLORS[Math.floor(Math.random() * COLORS.length)],
          alpha: 0.05 + Math.random() * 0.12,
          length: len,
        });
      }
    };
    init();

    let animId: number;
    let frame = 0;

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      frame++;

      streams.forEach(s => {
        // Occasionally scramble a character
        if (frame % 8 === 0) {
          const idx = Math.floor(Math.random() * s.chars.length);
          s.chars[idx] = CHARS[Math.floor(Math.random() * CHARS.length)];
        }

        s.chars.forEach((char, i) => {
          const fadeFactor = 1 - i / s.length;
          ctx.font = `bold 11px 'JetBrains Mono', monospace`;
          ctx.fillStyle = `${s.color},${s.alpha * fadeFactor})`;
          ctx.fillText(char, s.x, s.y - i * 14);
        });

        s.y += s.speed;
        if (s.y - s.length * 14 > canvas.height) {
          s.y = -s.length * 14;
          s.x = (canvas.width / COLS) * Math.floor(Math.random() * COLS) + canvas.width / COLS / 2;
        }
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
