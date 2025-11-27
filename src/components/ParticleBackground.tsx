'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';

function generateParticles() {
  return Array.from({ length: 40 }, (_, i) => ({
    id: i,
    x: Math.random() * 100, // Random x position as percentage
    delay: Math.random() * 10, // Random delay up to 10 seconds
    duration: 15 + Math.random() * 10, // Duration between 15-25 seconds
    opacity: 0.2 + Math.random() * 0.3, // Opacity between 0.2-0.5
    size: 2 + Math.random() * 2, // Size between 2-4px
  }));
}

export function ParticleBackground() {
  const [particles] = useState(generateParticles);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full bg-white"
          style={{
            left: `${particle.x}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            opacity: particle.opacity,
          }}
          initial={{ y: '-10px' }}
          animate={{
            y: '100vh',
          }}
          transition={{
            duration: particle.duration,
            delay: particle.delay,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
      ))}
    </div>
  );
}
