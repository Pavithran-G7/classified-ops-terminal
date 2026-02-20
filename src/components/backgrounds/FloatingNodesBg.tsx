import { useEffect, useRef } from 'react';

export default function FloatingNodesBg() {
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

    // Floating geometric shapes — hexagons, triangles
    const COUNT = 18;
    const shapes: {
      x: number; y: number; vx: number; vy: number;
      size: number; rotation: number; rotSpeed: number;
      type: 'hex' | 'tri' | 'square';
      color: string; alpha: number;
    }[] = [];

    const PALETTE = [
      'hsla(239,84%,67%',
      'hsla(187,94%,43%',
      'hsla(258,90%,66%',
    ];

    for (let i = 0; i < COUNT; i++) {
      shapes.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        size: 12 + Math.random() * 30,
        rotation: Math.random() * Math.PI * 2,
        rotSpeed: (Math.random() - 0.5) * 0.005,
        type: ['hex', 'tri', 'square'][Math.floor(Math.random() * 3)] as 'hex' | 'tri' | 'square',
        color: PALETTE[Math.floor(Math.random() * PALETTE.length)],
        alpha: 0.04 + Math.random() * 0.08,
      });
    }

    const drawHex = (cx: number, cy: number, r: number) => {
      ctx.beginPath();
      for (let i = 0; i < 6; i++) {
        const a = (Math.PI / 3) * i;
        const x = cx + r * Math.cos(a);
        const y = cy + r * Math.sin(a);
        i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
      }
      ctx.closePath();
    };

    const drawTri = (cx: number, cy: number, r: number) => {
      ctx.beginPath();
      for (let i = 0; i < 3; i++) {
        const a = (Math.PI * 2 / 3) * i - Math.PI / 2;
        const x = cx + r * Math.cos(a);
        const y = cy + r * Math.sin(a);
        i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
      }
      ctx.closePath();
    };

    let animId: number;

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      shapes.forEach(s => {
        ctx.save();
        ctx.translate(s.x, s.y);
        ctx.rotate(s.rotation);

        if (s.type === 'hex') drawHex(0, 0, s.size);
        else if (s.type === 'tri') drawTri(0, 0, s.size);
        else {
          const h = s.size * 0.9;
          ctx.beginPath();
          ctx.rect(-h / 2, -h / 2, h, h);
        }

        ctx.strokeStyle = `${s.color},${s.alpha})`;
        ctx.lineWidth = 1;
        ctx.stroke();
        ctx.restore();

        s.x += s.vx;
        s.y += s.vy;
        s.rotation += s.rotSpeed;
        if (s.x < -s.size * 2) s.x = canvas.width + s.size;
        if (s.x > canvas.width + s.size * 2) s.x = -s.size;
        if (s.y < -s.size * 2) s.y = canvas.height + s.size;
        if (s.y > canvas.height + s.size * 2) s.y = -s.size;
      });

      // Connecting lines between nearby shapes
      for (let i = 0; i < shapes.length; i++) {
        for (let j = i + 1; j < shapes.length; j++) {
          const dx = shapes[j].x - shapes[i].x;
          const dy = shapes[j].y - shapes[i].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 160) {
            const alpha = (1 - dist / 160) * 0.05;
            ctx.beginPath();
            ctx.moveTo(shapes[i].x, shapes[i].y);
            ctx.lineTo(shapes[j].x, shapes[j].y);
            ctx.strokeStyle = `hsla(239,84%,67%,${alpha})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }
      }

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
