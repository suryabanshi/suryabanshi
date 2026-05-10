"use client";

import { useEffect, useRef } from "react";

type Node = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  color: string;
  pulseOffset: number;
  label?: string;
};

type Edge = {
  from: number;
  to: number;
  progress: number;
  speed: number;
  active: boolean;
};

export default function CoreNetwork() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const colors = {
      red: "#C9252D",
      green: "#1FA36B",
      grey: "#6B7075",
      light: "rgba(244,245,242,0.4)",
    };

    const nodeColors = [colors.red, colors.red, colors.green, colors.grey, colors.grey, colors.light, colors.green];

    let W = canvas.parentElement?.clientWidth || 600;
    let H = canvas.parentElement?.clientHeight || 500;
    canvas.width = W;
    canvas.height = H;

    const nodes: Node[] = Array.from({ length: 18 }, (_, i) => ({
      x: Math.random() * W,
      y: Math.random() * H,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      r: i < 3 ? 6 : i < 7 ? 4 : 2.5,
      color: nodeColors[i % nodeColors.length],
      pulseOffset: Math.random() * Math.PI * 2,
      label: i === 0 ? "CORE" : i === 1 ? "AI" : i === 2 ? "FLOW" : undefined,
    }));

    const edges: Edge[] = [];
    nodes.forEach((_, i) => {
      nodes.forEach((_, j) => {
        if (j > i) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 160) {
            edges.push({
              from: i,
              to: j,
              progress: Math.random(),
              speed: 0.003 + Math.random() * 0.004,
              active: Math.random() > 0.4,
            });
          }
        }
      });
    });

    let t = 0;

    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      t += 0.01;

      // Update nodes
      nodes.forEach((n) => {
        n.x += n.vx;
        n.y += n.vy;
        if (n.x < 0 || n.x > W) n.vx *= -1;
        if (n.y < 0 || n.y > H) n.vy *= -1;
      });

      // Draw edges
      edges.forEach((e) => {
        if (!e.active) return;
        const a = nodes[e.from];
        const b = nodes[e.to];
        const dx = b.x - a.x;
        const dy = b.y - a.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist > 180) return;

        const alpha = 1 - dist / 180;

        // Base line
        ctx.strokeStyle = `rgba(107,112,117,${alpha * 0.25})`;
        ctx.lineWidth = 0.5;
        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);
        ctx.stroke();

        // Flowing particle
        e.progress = (e.progress + e.speed) % 1;
        const px = a.x + dx * e.progress;
        const py = a.y + dy * e.progress;
        const edgeColor = a.color === colors.red || b.color === colors.red ? colors.red : colors.green;

        ctx.beginPath();
        ctx.arc(px, py, 1.5, 0, Math.PI * 2);
        ctx.fillStyle = edgeColor + "cc";
        ctx.fill();
      });

      // Draw nodes
      nodes.forEach((n) => {
        const pulse = Math.sin(t * 1.5 + n.pulseOffset) * 0.5 + 0.5;
        const r = n.r + pulse * (n.r > 4 ? 3 : 1.5);
        const glowR = r * 3.5;

        // Glow
        if (n.r > 3) {
          const gradient = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, glowR);
          const c = n.color === colors.red ? "201,37,45" : n.color === colors.green ? "31,163,107" : "107,112,117";
          gradient.addColorStop(0, `rgba(${c},0.35)`);
          gradient.addColorStop(1, `rgba(${c},0)`);
          ctx.beginPath();
          ctx.arc(n.x, n.y, glowR, 0, Math.PI * 2);
          ctx.fillStyle = gradient;
          ctx.fill();
        }

        // Node
        ctx.beginPath();
        ctx.arc(n.x, n.y, r, 0, Math.PI * 2);
        ctx.fillStyle = n.color;
        ctx.fill();

        // Label for large nodes
        if (n.label && n.r > 4) {
          ctx.fillStyle = "rgba(244,245,242,0.7)";
          ctx.font = `500 9px var(--font-space-grotesk, sans-serif)`;
          ctx.letterSpacing = "0.08em";
          ctx.fillText(n.label, n.x + r + 5, n.y + 3);
        }
      });

      animRef.current = requestAnimationFrame(draw);
    };

    draw();

    const resize = () => {
      W = canvas.parentElement?.clientWidth || 600;
      H = canvas.parentElement?.clientHeight || 500;
      canvas.width = W;
      canvas.height = H;
    };
    window.addEventListener("resize", resize);

    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        opacity: 0.85,
      }}
    />
  );
}
