'use client';

import { motion } from 'framer-motion';
import { useActiveAccount, useReadContract } from 'thirdweb/react';
import { getContract } from 'thirdweb';
import { base } from 'thirdweb/chains';
import { createThirdwebClient } from 'thirdweb';
import { ParticleBackground } from '@/components/ParticleBackground';
import Link from 'next/link';

const client = createThirdwebClient({
  clientId: process.env.NEXT_PUBLIC_THIRDWEB_CLIENT_ID || '',
});

const CONTRACT_ADDRESS = '0x4f8e9bf66bf1d3f7b8ef6bf9ed5ef8ec7ed5ef8e' as const;
const TOKEN_ID = 0;

export default function ProphecyPage() {
  const account = useActiveAccount();
  const address = account?.address;

  const contract = getContract({
    client,
    chain: base,
    address: CONTRACT_ADDRESS,
  });

  const { data: balance, isLoading } = useReadContract({
    contract,
    method: 'function balanceOf(address account, uint256 id) view returns (uint256)',
    params: [address || '0x0000000000000000000000000000000000000000', BigInt(TOKEN_ID)],
  });

  const hasMemberPass = balance !== undefined && balance > BigInt(0);

  return (
    <main className="relative min-h-screen overflow-hidden">
      <ParticleBackground />
      
      <div className="fixed inset-0 z-0 bg-gradient-to-br from-purple-900/30 via-transparent to-cyan-500/20" />

      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6 py-20">
        <Link
          href="/"
          className="absolute top-8 left-8 text-gray-400 hover:text-white transition-colors font-spectral"
        >
          ← Back
        </Link>

        {!address ? (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center space-y-6 max-w-2xl"
          >
            <h1 className="font-cinzel text-5xl md:text-6xl font-bold text-white">
              The Prophecy
            </h1>
            <p className="font-spectral text-xl text-gray-400">
              Connect your wallet to unveil the prophecy
            </p>
          </motion.div>
        ) : isLoading ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center"
          >
            <div className="inline-block animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-purple-500 mb-6"></div>
            <p className="font-spectral text-xl text-gray-400">
              Checking access...
            </p>
          </motion.div>
        ) : !hasMemberPass ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, type: "spring" }}
            className="text-center space-y-8 max-w-2xl"
          >
            <motion.div
              animate={{
                opacity: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="text-6xl mb-8"
            >
              🔮
            </motion.div>
            <h1 className="font-cinzel text-4xl md:text-5xl font-bold text-gray-500">
              The veil remains closed.
            </h1>
            <p className="font-spectral text-lg text-gray-600">
              Only those who hold the Chorus Member Pass may see what lies beyond.
            </p>
            <Link
              href="/claim"
              className="inline-block mt-8 px-8 py-4 rounded-full font-spectral text-lg font-semibold
                bg-gradient-to-r from-purple-600/50 to-cyan-600/50 text-gray-400
                hover:from-purple-600/70 hover:to-cyan-600/70
                transition-all duration-300 border border-purple-500/30"
            >
              Claim Your Pass
            </Link>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="w-full max-w-4xl space-y-12"
          >
            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="text-center space-y-4"
            >
              <h1 className="font-cinzel text-5xl md:text-7xl font-bold bg-gradient-to-br from-white via-purple-200 to-cyan-300 bg-clip-text text-transparent">
                The Prophecy Unveiled
              </h1>
              <p className="font-spectral text-xl text-purple-300">
                The secrets whispered by The Chorus
              </p>
            </motion.div>

            {/* Content Cards */}
            <div className="space-y-6">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4, duration: 0.8 }}
                className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-purple-900/30 to-cyan-900/20 backdrop-blur-xl border border-purple-500/20 p-8"
              >
                <h2 className="font-cinzel text-3xl font-bold text-white mb-4">
                  The First Vision
                </h2>
                <p className="font-spectral text-lg text-gray-300 leading-relaxed">
                  In the convergence of voices, a single truth emerges: the future is not written by one hand, 
                  but woven by many. Each member of The Chorus holds a thread of destiny, and together, 
                  you shall shape what comes next.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6, duration: 0.8 }}
                className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-cyan-900/30 to-purple-900/20 backdrop-blur-xl border border-cyan-500/20 p-8"
              >
                <h2 className="font-cinzel text-3xl font-bold text-white mb-4">
                  The Harmonization
                </h2>
                <p className="font-spectral text-lg text-gray-300 leading-relaxed">
                  When the voices align, the impossible becomes inevitable. The Chorus does not predict the future—
                  it creates it. Your voice, once singular, now resonates with countless others across infinite timelines.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.8 }}
                className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-purple-900/30 to-cyan-900/30 backdrop-blur-xl border border-purple-500/20 p-8"
              >
                <h2 className="font-cinzel text-3xl font-bold text-white mb-4">
                  The Eternal Song
                </h2>
                <p className="font-spectral text-lg text-gray-300 leading-relaxed mb-6">
                  The song never ends. It echoes through space and time, growing stronger with each new voice. 
                  You are not merely a member—you are a co-creator of reality itself. The Chorus sings, 
                  and the multiverse listens.
                </p>
                <div className="flex items-center gap-3 text-purple-300">
                  <div className="text-3xl">✨</div>
                  <p className="font-spectral text-sm italic">
                    &ldquo;One voice. Many futures. Infinite possibilities.&rdquo;
                  </p>
                </div>
              </motion.div>
            </div>

            {/* Footer Note */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2, duration: 0.8 }}
              className="text-center pt-8 border-t border-purple-500/20"
            >
              <p className="font-spectral text-sm text-gray-500">
                This prophecy is bound to your soul. It cannot be transferred or traded.
              </p>
            </motion.div>
          </motion.div>
        )}
      </div>
    </main>
  );
}
