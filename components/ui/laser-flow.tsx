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

    let animationFrame: number;

    // Set canvas size
    const setCanvasSize = () => {
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * window.devicePixelRatio;
      canvas.height = rect.height * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };

    setCanvasSize();
    window.addEventListener("resize", setCanvasSize);

    // Animation state
    let time = 0;

    // Particle system
    const particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      life: number;
      maxLife: number;
    }> = [];

    const createParticle = (x: number, y: number) => {
      return {
        x,
        y,
        vx: (Math.random() - 0.5) * 0.5,
        vy: Math.random() * 2 + 1,
        life: 1,
        maxLife: Math.random() * 60 + 40,
      };
    };

    // Initialize particles
    for (let i = 0; i < 30; i++) {
      const x = canvas.width / 2 + (Math.random() - 0.5) * 100;
      const y = Math.random() * canvas.height;
      particles.push(createParticle(x, y));
    }

    const animate = () => {
      const width = canvas.getBoundingClientRect().width;
      const height = canvas.getBoundingClientRect().height;

      // Clear with slight trail effect
      ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
      ctx.fillRect(0, 0, width, height);

      time += 0.02;

      // Center position
      const centerX = width / 2;

      // Main vertical laser beam
      const beamWidth = 200;

      // Outer glow
      const outerGlow = ctx.createRadialGradient(
        centerX,
        height * 0.3,
        0,
        centerX,
        height * 0.5,
        beamWidth * 1.5,
      );
      outerGlow.addColorStop(0, "rgba(168, 85, 247, 0.3)");
      outerGlow.addColorStop(0.5, "rgba(168, 85, 247, 0.1)");
      outerGlow.addColorStop(1, "rgba(168, 85, 247, 0)");

      ctx.fillStyle = outerGlow;
      ctx.fillRect(0, 0, width, height);

      // Main beam gradient
      const mainGradient = ctx.createLinearGradient(
        centerX - beamWidth / 2,
        0,
        centerX + beamWidth / 2,
        0,
      );
      mainGradient.addColorStop(0, "rgba(168, 85, 247, 0)");
      mainGradient.addColorStop(0.3, "rgba(200, 150, 255, 0.6)");
      mainGradient.addColorStop(0.5, "rgba(240, 220, 255, 0.9)");
      mainGradient.addColorStop(0.7, "rgba(200, 150, 255, 0.6)");
      mainGradient.addColorStop(1, "rgba(168, 85, 247, 0)");

      ctx.fillStyle = mainGradient;
      ctx.fillRect(centerX - beamWidth / 2, 0, beamWidth, height);

      // Bright core
      const coreGradient = ctx.createLinearGradient(
        centerX - 40,
        0,
        centerX + 40,
        0,
      );
      coreGradient.addColorStop(0, "rgba(255, 255, 255, 0)");
      coreGradient.addColorStop(0.4, "rgba(255, 255, 255, 0.8)");
      coreGradient.addColorStop(0.5, "rgba(255, 255, 255, 1)");
      coreGradient.addColorStop(0.6, "rgba(255, 255, 255, 0.8)");
      coreGradient.addColorStop(1, "rgba(255, 255, 255, 0)");

      ctx.fillStyle = coreGradient;
      ctx.shadowBlur = 30;
      ctx.shadowColor = "rgba(255, 255, 255, 0.8)";
      ctx.fillRect(centerX - 40, 0, 80, height);
      ctx.shadowBlur = 0;

      // Flowing waves
      for (let i = 0; i < 5; i++) {
        const waveY = ((time * 100 + i * 100) % height) - 50;
        const waveGradient = ctx.createRadialGradient(
          centerX,
          waveY,
          0,
          centerX,
          waveY,
          80,
        );
        waveGradient.addColorStop(0, "rgba(255, 255, 255, 0.8)");
        waveGradient.addColorStop(0.3, "rgba(220, 180, 255, 0.6)");
        waveGradient.addColorStop(0.7, "rgba(168, 85, 247, 0.3)");
        waveGradient.addColorStop(1, "rgba(168, 85, 247, 0)");

        ctx.fillStyle = waveGradient;
        ctx.fillRect(centerX - 80, waveY - 40, 160, 80);
      }

      // Edge glow lines
      ctx.strokeStyle = "rgba(200, 150, 255, 0.5)";
      ctx.lineWidth = 2;
      ctx.shadowBlur = 20;
      ctx.shadowColor = "rgba(168, 85, 247, 0.8)";

      ctx.beginPath();
      ctx.moveTo(centerX - 35, 0);
      ctx.lineTo(centerX - 35, height);
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(centerX + 35, 0);
      ctx.lineTo(centerX + 35, height);
      ctx.stroke();

      ctx.shadowBlur = 0;

      // Update and draw particles
      particles.forEach((particle, index) => {
        particle.x += particle.vx;
        particle.y += particle.vy;
        particle.life -= 1;

        if (particle.life <= 0 || particle.y > height) {
          particles[index] = createParticle(
            centerX + (Math.random() - 0.5) * 100,
            -10,
          );
        }

        const alpha = Math.min(particle.life / particle.maxLife, 0.6);
        const size = Math.random() * 2 + 1;

        ctx.fillStyle = `rgba(200, 150, 255, ${alpha})`;
        ctx.shadowBlur = 4;
        ctx.shadowColor = `rgba(168, 85, 247, ${alpha})`;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, size, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      // Sparkles
      if (Math.random() > 0.7) {
        const sparkleX = centerX + (Math.random() - 0.5) * 60;
        const sparkleY = Math.random() * height;
        const sparkleSize = Math.random() * 3 + 1;

        ctx.fillStyle = `rgba(255, 255, 255, ${Math.random() * 0.8 + 0.2})`;
        ctx.shadowBlur = 8;
        ctx.shadowColor = "rgba(255, 255, 255, 0.9)";
        ctx.beginPath();
        ctx.arc(sparkleX, sparkleY, sparkleSize, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
      }

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
      className={`w-full h-full ${className}`}
      style={{ display: "block" }}
    />
  );
}
