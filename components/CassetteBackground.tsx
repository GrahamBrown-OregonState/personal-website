"use client";

import { useEffect, useRef } from "react";

export default function CassetteBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animFrame: number;
    let tick = 0;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const draw = () => {
      tick++;
      const w = canvas.width;
      const h = canvas.height;

      // Deep background
      ctx.fillStyle = "#0a0a08";
      ctx.fillRect(0, 0, w, h);

      // Subtle grid — perspective vanishing point
      ctx.strokeStyle = "rgba(180, 120, 40, 0.07)";
      ctx.lineWidth = 1;
      const gridSpacing = 60;
      for (let x = 0; x < w; x += gridSpacing) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, h);
        ctx.stroke();
      }
      for (let y = 0; y < h; y += gridSpacing) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(w, y);
        ctx.stroke();
      }

      // Horizontal scanlines
      for (let y = 0; y < h; y += 4) {
        ctx.fillStyle = "rgba(0,0,0,0.18)";
        ctx.fillRect(0, y, w, 2);
      }

      // Amber glow orb — top center
      const grd = ctx.createRadialGradient(w / 2, -h * 0.1, 0, w / 2, -h * 0.1, h * 0.85);
      grd.addColorStop(0, "rgba(210, 120, 20, 0.18)");
      grd.addColorStop(0.5, "rgba(180, 80, 10, 0.07)");
      grd.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = grd;
      ctx.fillRect(0, 0, w, h);

      // Secondary green phosphor glow — bottom left
      const grd2 = ctx.createRadialGradient(w * 0.1, h * 1.1, 0, w * 0.1, h * 1.1, h * 0.7);
      grd2.addColorStop(0, "rgba(40, 180, 80, 0.10)");
      grd2.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = grd2;
      ctx.fillRect(0, 0, w, h);

      // Scrolling data stream lines (vertical, amber)
      const streamCount = 12;
      for (let i = 0; i < streamCount; i++) {
        const x = (w / streamCount) * i + (w / streamCount) * 0.3;
        const speed = 0.4 + (i % 4) * 0.15;
        const offset = ((tick * speed + i * 137) % h);
        const len = 60 + (i % 5) * 30;

        const sg = ctx.createLinearGradient(x, offset - len, x, offset + len);
        sg.addColorStop(0, "rgba(200, 130, 20, 0)");
        sg.addColorStop(0.5, "rgba(200, 130, 20, 0.18)");
        sg.addColorStop(1, "rgba(200, 130, 20, 0)");
        ctx.strokeStyle = sg;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(x, offset - len);
        ctx.lineTo(x, offset + len);
        ctx.stroke();
      }

      // Noise grain overlay
      const imageData = ctx.getImageData(0, 0, w, h);
      const data = imageData.data;
      for (let i = 0; i < data.length; i += 4) {
        const noise = (Math.random() - 0.5) * 18;
        data[i] = Math.min(255, Math.max(0, data[i] + noise));
        data[i + 1] = Math.min(255, Math.max(0, data[i + 1] + noise * 0.6));
        data[i + 2] = Math.min(255, Math.max(0, data[i + 2] + noise * 0.2));
      }
      ctx.putImageData(imageData, 0, 0);

      // CRT vignette
      const vig = ctx.createRadialGradient(w / 2, h / 2, h * 0.3, w / 2, h / 2, h * 0.9);
      vig.addColorStop(0, "rgba(0,0,0,0)");
      vig.addColorStop(1, "rgba(0,0,0,0.72)");
      ctx.fillStyle = vig;
      ctx.fillRect(0, 0, w, h);

      // Occasional horizontal glitch line
      if (tick % 90 < 2) {
        const gy = Math.random() * h;
        ctx.fillStyle = "rgba(200, 150, 40, 0.12)";
        ctx.fillRect(0, gy, w, 2 + Math.random() * 3);
      }

      animFrame = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animFrame);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full -z-10"
      style={{ display: "block" }}
    />
  );
}