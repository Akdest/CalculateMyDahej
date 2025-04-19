'use client';

import { motion } from 'framer-motion';
import { useEffect, useRef } from 'react';

export default function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Vibrant golden particle animation
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    let animationFrameId: number;

    if (canvas && ctx) {
      const particles: { x: number; y: number; size: number; speedX: number; speedY: number }[] = [];
      const createParticles = () => {
        for (let i = 0; i < 80; i++) {
          particles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            size: Math.random() * 2 + 0.5,
            speedX: (Math.random() - 0.5) * 0.5,
            speedY: (Math.random() - 0.5) * 0.5,
          });
        }
      };

      const animate = () => {
        if (!ctx || !canvas) return;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = '#FFD700'; // VIBRANT GOLD

        particles.forEach((p) => {
          p.x += p.speedX;
          p.y += p.speedY;

          if (p.x < 0) p.x = canvas.width;
          if (p.x > canvas.width) p.x = 0;
          if (p.y < 0) p.y = canvas.height;
          if (p.y > canvas.height) p.y = 0;

          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fill();
        });

        animationFrameId = requestAnimationFrame(animate);
      };

      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      createParticles();
      animate();
    }

    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  return (
    <section className="relative w-full h-screen flex  items-center justify-center bg-white overflow-hidden">
      {/* Background Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none z-0"
      />

      {/* Hero Content */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="relative z-10 text-center px-6 max-w-6xl"
      >
        <h1 className="text-gray-900 lg:text-7xl text-4xl md:text-6xl font-extrabold mb-12 lg:mb-16">
          CalculateMy<span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-yellow-700">Dahej</span>
        </h1>
       
        <a href='#form' className="text-white bg-gradient-to-r from-yellow-500  to-yellow-700 hover:from-yellow-600 hover:to-yellow-800 transition-colors duration-300 px-6 lg:py-6 py-4 text-lg rounded-xl font-semibold shadow-lg pointer-cursor focus:outline-none ">
          Start Calculating
        </a>
      </motion.div>
      {/* Scroll Down Indicator */}
<div className="absolute bottom-10 flex flex-col items-center z-10">
  <span className="text-gray-700 font-semibold text-lg mb-2">Scroll Down</span>
  <svg
    className="w-10 h-10 text-yellow-600 animate-bounce"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    viewBox="0 0 24 24"
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
  </svg>
</div>

    </section>
  );
}
