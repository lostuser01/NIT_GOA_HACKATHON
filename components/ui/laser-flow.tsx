"use client";

import React, { useEffect, useRef } from "react";

interface LaserFlowProps {
  className?: string;
}

export function LaserFlow({ className = "" }: LaserFlowProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas size
    const setCanvasSize = () => {
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * window.devicePixelRatio;
      canvas.height = rect.height * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };

    setCanvasSize();
    window.addEventListener("resize", setCanvasSize);

    // Laser beam properties
    let animationFrame: number;
    let offset = 0;

    const particles: {
      x: number;
      y: number;
      speed: number;
      size: number;
      opacity: number;
    }[] = [];

    // Create particles
    for (let i = 0; i < 50; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        speed: Math.random() * 2 + 1,
        size: Math.random() * 2 + 1,
        opacity: Math.random() * 0.5 + 0.2,
      });
    }

    const animate = () => {
      const width = canvas.getBoundingClientRect().width;
      const height = canvas.getBoundingClientRect().height;

      // Clear canvas
      ctx.clearRect(0, 0, width, height);

      // Draw background particles
      particles.forEach((particle) => {
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(168, 85, 247, ${particle.opacity * 0.3})`;
        ctx.fill();

        // Update particle position
        particle.y += particle.speed;
        if (particle.y > height) {
          particle.y = -10;
          particle.x = Math.random() * width;
        }
      });

      // Draw laser beam from top center
      const centerX = width / 2;
      const beamWidth = 200;
      const beamHeight = 300;

      // Main laser glow
      const gradient = ctx.createRadialGradient(
        centerX,
        0,
        0,
        centerX,
        beamHeight,
        beamWidth
      );
      gradient.addColorStop(0, "rgba(255, 255, 255, 0.8)");
      gradient.addColorStop(0.2, "rgba(200, 150, 255, 0.6)");
      gradient.addColorStop(0.4, "rgba(168, 85, 247, 0.4)");
      gradient.addColorStop(0.7, "rgba(168, 85, 247, 0.2)");
      gradient.addColorStop(1, "rgba(168, 85, 247, 0)");

      ctx.fillStyle = gradient;
      ctx.fillRect(centerX - beamWidth, 0, beamWidth * 2, beamHeight);

      // Central bright beam
      const coreGradient = ctx.createLinearGradient(
        centerX - 30,
        0,
        centerX + 30,
        0
      );
      coreGradient.addColorStop(0, "rgba(255, 255, 255, 0)");
      coreGradient.addColorStop(0.5, "rgba(255, 255, 255, 0.9)");
      coreGradient.addColorStop(1, "rgba(255, 255, 255, 0)");

      ctx.fillStyle = coreGradient;
      ctx.fillRect(centerX - 30, 0, 60, beamHeight);

      // Animated flowing effect
      offset += 2;
      if (offset > 20) offset = 0;

      for (let i = 0; i < 3; i++) {
        const y = (offset + i * 50) % beamHeight;
        const flowGradient = ctx.createRadialGradient(
          centerX,
          y,
          0,
          centerX,
          y,
          50
        );
        flowGradient.addColorStop(0, "rgba(255, 255, 255, 0.6)");
        flowGradient.addColorStop(0.5, "rgba(200, 150, 255, 0.3)");
        flowGradient.addColorStop(1, "rgba(168, 85, 247, 0)");

        ctx.fillStyle = flowGradient;
        ctx.fillRect(centerX - 50, y - 25, 100, 50);
      }

      // Edge glow
      ctx.shadowBlur = 40;
      ctx.shadowColor = "rgba(168, 85, 247, 0.5)";
      ctx.strokeStyle = "rgba(200, 150, 255, 0.4)";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(centerX - 25, 0);
      ctx.lineTo(centerX - 25, beamHeight);
      ctx.moveTo(centerX + 25, 0);
      ctx.lineTo(centerX + 25, beamHeight);
      ctx.stroke();
      ctx.shadowBlur = 0;

      animationFrame = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", setCanvasSize);
      cancelAnimationFrame(animationFrame);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 pointer-events-none ${className}`}
      style={{ width: "100%", height: "100%" }}
    />
  );
}
