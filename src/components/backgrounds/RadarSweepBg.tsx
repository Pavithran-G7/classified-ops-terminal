import { useEffect, useRef } from 'react';

export default function RadarSweepBg() {
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

    // Blips that appear when swept
    const blips: { x: number; y: number; alpha: number; size: number }[] = [];
    for (let i = 0; i < 18; i++) {
      blips.push({
        x: Math.random(),
        y: Math.random(),
        alpha: 0,
        size: 2 + Math.random() * 3,
      });
    }

    let angle = 0;
    let animId: number;

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const cx = canvas.width * 0.5;
      const cy = canvas.height * 0.5;
      const maxR = Math.max(canvas.width, canvas.height) * 0.65;

      // Rings
      [0.25, 0.5, 0.75, 1].forEach(f => {
        ctx.beginPath();
        ctx.arc(cx, cy, maxR * f, 0, Math.PI * 2);
        ctx.strokeStyle = `hsla(120,100%,50%,0.05)`;
        ctx.lineWidth = 1;
        ctx.stroke();
      });

      // Cross hairs
      ctx.strokeStyle = `hsla(120,100%,50%,0.04)`;
      ctx.lineWidth = 1;
      ctx.beginPath(); ctx.moveTo(cx, cy - maxR); ctx.lineTo(cx, cy + maxR); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(cx - maxR, cy); ctx.lineTo(cx + maxR, cy); ctx.stroke();

      // Sweep gradient — draw sweep as arc
      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(angle);
      const sweepGrad = ctx.createLinearGradient(0, 0, maxR, 0);
      sweepGrad.addColorStop(0, 'hsla(120,100%,50%,0.18)');
      sweepGrad.addColorStop(1, 'hsla(120,100%,50%,0)');
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.arc(0, 0, maxR, -0.4, 0);
      ctx.closePath();
      ctx.fillStyle = sweepGrad;
      ctx.fill();

      // Sweep line
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.lineTo(maxR, 0);
      ctx.strokeStyle = 'hsla(120,100%,50%,0.5)';
      ctx.lineWidth = 1.5;
      ctx.stroke();
      ctx.restore();

      // Update & draw blips
      blips.forEach(blip => {
        const bx = blip.x * canvas.width;
        const by = blip.y * canvas.height;
        // Check if sweep passed over this blip
        const bAngle = Math.atan2(by - cy, bx - cx);
        const normalizedAngle = ((bAngle % (Math.PI * 2)) + Math.PI * 2) % (Math.PI * 2);
        const normalizedSweep = ((angle % (Math.PI * 2)) + Math.PI * 2) % (Math.PI * 2);
        if (Math.abs(normalizedSweep - normalizedAngle) < 0.08) {
          blip.alpha = 1;
        }
        blip.alpha *= 0.985;

        if (blip.alpha > 0.01) {
          ctx.beginPath();
          ctx.arc(bx, by, blip.size, 0, Math.PI * 2);
          ctx.fillStyle = `hsla(120,100%,50%,${blip.alpha * 0.8})`;
          ctx.fill();
          ctx.beginPath();
          ctx.arc(bx, by, blip.size + 3, 0, Math.PI * 2);
          ctx.strokeStyle = `hsla(120,100%,50%,${blip.alpha * 0.3})`;
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      });

      angle += 0.012;
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
