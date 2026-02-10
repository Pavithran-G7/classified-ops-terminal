import { useEffect, useRef } from 'react';

interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  pulsePhase: number;
  active: boolean;
}

export default function NeuralCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -1000, y: -1000 });
  const nodesRef = useRef<Node[]>([]);
  const frameRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = canvas.offsetWidth * window.devicePixelRatio;
      canvas.height = canvas.offsetHeight * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };
    resize();
    window.addEventListener('resize', resize);

    const w = () => canvas.offsetWidth;
    const h = () => canvas.offsetHeight;

    // Initialize nodes
    const nodeCount = 60;
    nodesRef.current = Array.from({ length: nodeCount }, () => ({
      x: Math.random() * w(),
      y: Math.random() * h(),
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      radius: Math.random() * 2 + 1.5,
      pulsePhase: Math.random() * Math.PI * 2,
      active: Math.random() > 0.7,
    }));

    const handleMouse = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    };
    canvas.addEventListener('mousemove', handleMouse);

    let animId: number;
    const animate = () => {
      frameRef.current++;
      const nodes = nodesRef.current;
      ctx.clearRect(0, 0, w(), h());

      // Update & draw connections
      const connectionDist = 120;
      for (let i = 0; i < nodes.length; i++) {
        const a = nodes[i];
        // Mouse attraction
        const dx = mouseRef.current.x - a.x;
        const dy = mouseRef.current.y - a.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 200 && dist > 0) {
          a.vx += (dx / dist) * 0.02;
          a.vy += (dy / dist) * 0.02;
        }

        a.x += a.vx;
        a.y += a.vy;
        a.vx *= 0.99;
        a.vy *= 0.99;
        a.pulsePhase += 0.02;

        if (a.x < 0 || a.x > w()) a.vx *= -1;
        if (a.y < 0 || a.y > h()) a.vy *= -1;

        // Toggle active randomly
        if (Math.random() < 0.002) a.active = !a.active;

        for (let j = i + 1; j < nodes.length; j++) {
          const b = nodes[j];
          const cdx = b.x - a.x;
          const cdy = b.y - a.y;
          const cdist = Math.sqrt(cdx * cdx + cdy * cdy);
          if (cdist < connectionDist) {
            const alpha = (1 - cdist / connectionDist) * 0.25;
            const gradient = ctx.createLinearGradient(a.x, a.y, b.x, b.y);
            gradient.addColorStop(0, `hsla(239, 84%, 67%, ${alpha})`);
            gradient.addColorStop(1, `hsla(187, 94%, 43%, ${alpha})`);
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.strokeStyle = gradient;
            ctx.lineWidth = 0.8;
            ctx.stroke();

            // Data packet animation
            if (a.active && frameRef.current % 120 < 2 && Math.random() > 0.95) {
              const t = (frameRef.current % 60) / 60;
              const px = a.x + cdx * t;
              const py = a.y + cdy * t;
              ctx.beginPath();
              ctx.arc(px, py, 2, 0, Math.PI * 2);
              ctx.fillStyle = 'hsla(120, 100%, 50%, 0.8)';
              ctx.fill();
            }
          }
        }
      }

      // Draw nodes
      for (const node of nodes) {
        const pulse = Math.sin(node.pulsePhase) * 0.5 + 0.5;
        const r = node.radius + (node.active ? pulse * 1.5 : 0);

        // Glow
        if (node.active) {
          ctx.beginPath();
          ctx.arc(node.x, node.y, r + 4, 0, Math.PI * 2);
          ctx.fillStyle = `hsla(187, 94%, 43%, ${pulse * 0.15})`;
          ctx.fill();
        }

        ctx.beginPath();
        ctx.arc(node.x, node.y, r, 0, Math.PI * 2);
        ctx.fillStyle = node.active
          ? `hsla(187, 94%, 43%, ${0.6 + pulse * 0.4})`
          : 'hsla(239, 84%, 67%, 0.5)';
        ctx.fill();
      }

      animId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
      canvas.removeEventListener('mousemove', handleMouse);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ opacity: 0.7 }}
    />
  );
}
