import { useEffect, useRef } from 'react';

interface Props { opacity?: number; }

export default function CircuitBoardBg({ opacity = 1 }: Props) {
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

    // Circuit nodes
    const nodes: { x: number; y: number; pulsePhase: number; active: boolean }[] = [];
    const lines: { from: number; to: number; progress: number; speed: number; active: boolean }[] = [];

    const GRID = 80;
    const initNodes = () => {
      nodes.length = 0;
      lines.length = 0;
      const cols = Math.ceil(canvas.width / GRID) + 1;
      const rows = Math.ceil(canvas.height / GRID) + 1;
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          if (Math.random() < 0.45) {
            nodes.push({
              x: c * GRID + (Math.random() - 0.5) * 20,
              y: r * GRID + (Math.random() - 0.5) * 20,
              pulsePhase: Math.random() * Math.PI * 2,
              active: Math.random() < 0.3,
            });
          }
        }
      }
      // Connect nearby nodes
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[j].x - nodes[i].x;
          const dy = nodes[j].y - nodes[i].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < GRID * 1.6 && Math.random() < 0.35) {
            lines.push({ from: i, to: j, progress: Math.random(), speed: 0.003 + Math.random() * 0.006, active: Math.random() < 0.2 });
          }
        }
      }
    };
    initNodes();

    let animId: number;
    let t = 0;

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      t += 0.016;

      // Draw lines
      lines.forEach(line => {
        const a = nodes[line.from];
        const b = nodes[line.to];
        if (!a || !b) return;

        // Static dim line
        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);
        ctx.strokeStyle = line.active
          ? `hsla(239,84%,67%,0.12)`
          : `hsla(217,33%,35%,0.08)`;
        ctx.lineWidth = 1;
        ctx.stroke();

        // Traveling pulse
        if (line.active) {
          line.progress = (line.progress + line.speed) % 1;
          const px = a.x + (b.x - a.x) * line.progress;
          const py = a.y + (b.y - a.y) * line.progress;
          const alpha = Math.sin(line.progress * Math.PI) * 0.9;
          ctx.beginPath();
          ctx.arc(px, py, 2.5, 0, Math.PI * 2);
          ctx.fillStyle = `hsla(187,94%,43%,${alpha})`;
          ctx.fill();
        }
      });

      // Draw nodes
      nodes.forEach(node => {
        const pulse = Math.sin(t * 1.5 + node.pulsePhase) * 0.5 + 0.5;
        const r = node.active ? 3 + pulse * 2 : 2;
        const alpha = node.active ? 0.6 + pulse * 0.4 : 0.15;
        const color = node.active ? `hsla(239,84%,67%,${alpha})` : `hsla(217,33%,50%,${alpha})`;

        ctx.beginPath();
        ctx.arc(node.x, node.y, r, 0, Math.PI * 2);
        ctx.fillStyle = color;
        ctx.fill();

        if (node.active) {
          ctx.beginPath();
          ctx.arc(node.x, node.y, r + 4, 0, Math.PI * 2);
          ctx.strokeStyle = `hsla(239,84%,67%,${alpha * 0.3})`;
          ctx.lineWidth = 1;
          ctx.stroke();
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
      style={{ opacity }}
      className="absolute inset-0 w-full h-full pointer-events-none"
    />
  );
}
