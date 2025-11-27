'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ConnectButton } from 'thirdweb/react';
import { createThirdwebClient } from 'thirdweb';
import { ParticleBackground } from '@/components/ParticleBackground';
import { ScrollIndicator } from '@/components/ScrollIndicator';

const client = createThirdwebClient({
  clientId: process.env.NEXT_PUBLIC_THIRDWEB_CLIENT_ID || '',
});

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-hidden">
      {/* Particle Background */}
      <ParticleBackground />

      {/* Gradient Overlay */}
      <div className="fixed inset-0 z-0 bg-gradient-to-br from-purple-900/30 via-transparent to-cyan-500/20" />

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6 py-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="flex flex-col items-center gap-8 max-w-4xl mx-auto text-center"
        >
          {/* Main Title */}
          <motion.h1
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, delay: 0.2, ease: "easeOut" }}
            className="font-cinzel text-7xl md:text-8xl lg:text-9xl font-bold tracking-wider"
            style={{
              background: 'linear-gradient(to bottom, #ffffff, #a855f7)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            THE CHORUS
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="font-spectral text-xl md:text-2xl lg:text-3xl text-gray-300 tracking-wide"
          >
            One voice. Many futures.
          </motion.p>

          {/* Connect Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="mt-8 flex flex-col gap-4 items-center"
          >
            <ConnectButton
              client={client}
              connectButton={{
                label: "Enter The Chorus",
                style: {
                  background: 'linear-gradient(135deg, #a855f7 0%, #06b6d4 100%)',
                  border: 'none',
                  borderRadius: '9999px',
                  padding: '1rem 3rem',
                  fontSize: '1.125rem',
                  fontWeight: '600',
                  fontFamily: 'var(--font-spectral)',
                  letterSpacing: '0.05em',
                  boxShadow: '0 20px 40px rgba(168, 85, 247, 0.3)',
                  transition: 'all 0.3s ease',
                  cursor: 'pointer',
                },
              }}
              connectModal={{
                size: 'wide',
              }}
            />
            
            <Link
              href="/claim"
              className="font-spectral text-lg text-gray-400 hover:text-purple-400 transition-colors underline decoration-dotted underline-offset-4"
            >
              Already connected? Claim your voice →
            </Link>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <ScrollIndicator />
    </main>
  );
}

