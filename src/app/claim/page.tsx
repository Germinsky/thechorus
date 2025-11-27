'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { 
  useActiveAccount,
  useReadContract,
  useSendTransaction,
} from 'thirdweb/react';
import { getContract, prepareContractCall } from 'thirdweb';
import { base } from 'thirdweb/chains';
import { createThirdwebClient } from 'thirdweb';
import { ParticleBackground } from '@/components/ParticleBackground';
import Link from 'next/link';

const client = createThirdwebClient({
  clientId: process.env.NEXT_PUBLIC_THIRDWEB_CLIENT_ID || '',
});

const CONTRACT_ADDRESS = '0x4f8e9bf66bf1d3f7b8ef6bf9ed5ef8ec7ed5ef8e' as const;
const TOKEN_ID = 0;

export default function ClaimPage() {
  const account = useActiveAccount();
  const address = account?.address;
  const [claimStatus, setClaimStatus] = useState<'idle' | 'claiming' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const contract = getContract({
    client,
    chain: base,
    address: CONTRACT_ADDRESS,
  });

  // Check if user has already claimed
  const { data: balance, isLoading: balanceLoading } = useReadContract({
    contract,
    method: 'function balanceOf(address account, uint256 id) view returns (uint256)',
    params: [address || '0x0000000000000000000000000000000000000000', BigInt(TOKEN_ID)],
  });

  const { mutate: sendTransaction, isPending: isClaimPending } = useSendTransaction();

  const hasClaimed = balance !== undefined && balance > BigInt(0);
  // For demo purposes, assume allowlisted if connected (you can implement merkle proof check)
  const isAllowlisted = address !== undefined && !hasClaimed;
  const isLoading = balanceLoading;

  const handleClaim = async () => {
    if (!address || hasClaimed) return;

    try {
      setClaimStatus('claiming');
      
      const transaction = prepareContractCall({
        contract,
        method: 'function claim(address receiver, uint256 tokenId, uint256 quantity, address currency, uint256 pricePerToken, (bytes32[],uint256,uint256,address) allowlistProof, bytes data)',
        params: [
          address,
          BigInt(TOKEN_ID),
          BigInt(1),
          '0x0000000000000000000000000000000000000000',
          BigInt(0),
          [[], BigInt(0), BigInt(0), '0x0000000000000000000000000000000000000000'],
          '0x',
        ],
      });

      sendTransaction(transaction, {
        onSuccess: () => {
          setClaimStatus('success');
        },
        onError: (error) => {
          setClaimStatus('error');
          setErrorMessage(error.message);
        },
      });
    } catch (error: unknown) {
      setClaimStatus('error');
      setErrorMessage(error instanceof Error ? error.message : 'An error occurred');
    }
  };

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

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="w-full max-w-2xl"
        >
          {/* Claim Card */}
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-purple-900/20 to-cyan-900/20 backdrop-blur-xl border border-purple-500/20 shadow-2xl">
            {/* Artwork Section */}
            <div className="relative h-96 bg-gradient-to-br from-purple-600 via-purple-800 to-cyan-600 overflow-hidden">
              <div className="absolute inset-0 bg-black/40" />
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.div
                  animate={{
                    scale: [1, 1.05, 1],
                    rotate: [0, 5, -5, 0],
                  }}
                  transition={{
                    duration: 10,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="text-center"
                >
                  <h2 className="font-cinzel text-6xl font-bold text-white mb-4">
                    THE CHORUS
                  </h2>
                  <p className="font-spectral text-2xl text-purple-200">
                    Voice #{TOKEN_ID}
                  </p>
                </motion.div>
              </div>
            </div>

            {/* Content Section */}
            <div className="p-8 space-y-6">
              <div className="text-center space-y-2">
                <h3 className="font-cinzel text-3xl font-bold text-white">
                  Claim Your Voice
                </h3>
                <p className="font-spectral text-lg text-gray-300">
                  Join the collective consciousness
                </p>
              </div>

              {/* Status Messages */}
              <div className="space-y-4">
                {!address ? (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-center py-8"
                  >
                    <p className="font-spectral text-xl text-gray-400">
                      Connect your wallet to check eligibility
                    </p>
                  </motion.div>
                ) : isLoading ? (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-center py-8"
                  >
                    <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
                    <p className="font-spectral text-lg text-gray-400 mt-4">
                      Checking eligibility...
                    </p>
                  </motion.div>
                ) : claimStatus === 'success' ? (
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.5, type: "spring" }}
                    className="text-center py-8 space-y-4"
                  >
                    <motion.div
                      animate={{
                        scale: [1, 1.2, 1],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                      }}
                      className="text-6xl"
                    >
                      ✨
                    </motion.div>
                    <h4 className="font-cinzel text-2xl font-bold text-white">
                      Welcome to The Chorus
                    </h4>
                    <p className="font-spectral text-lg text-gray-300">
                      Your voice has been claimed successfully
                    </p>
                  </motion.div>
                ) : hasClaimed ? (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-center py-8 space-y-4"
                  >
                    <div className="text-5xl mb-4">🎭</div>
                    <h4 className="font-cinzel text-2xl font-bold text-purple-300">
                      You already hear the voice
                    </h4>
                    <p className="font-spectral text-gray-400">
                      Your voice is already part of The Chorus
                    </p>
                  </motion.div>
                ) : isAllowlisted ? (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="space-y-4"
                  >
                    <div className="text-center py-4">
                      <p className="font-spectral text-lg text-green-400 mb-4">
                        ✓ You are on the allowlist
                      </p>
                      <p className="font-spectral text-gray-400 text-sm">
                        Free claim available
                      </p>
                    </div>
                    
                    <button
                      onClick={handleClaim}
                      disabled={isClaimPending || claimStatus === 'claiming'}
                      className="w-full py-4 px-8 rounded-full font-spectral text-lg font-semibold
                        bg-gradient-to-r from-purple-600 to-cyan-600 text-white
                        hover:from-purple-700 hover:to-cyan-700
                        disabled:opacity-50 disabled:cursor-not-allowed
                        transition-all duration-300 shadow-lg hover:shadow-purple-500/50"
                    >
                      {isClaimPending || claimStatus === 'claiming' ? (
                        <span className="flex items-center justify-center gap-2">
                          <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white"></div>
                          Claiming...
                        </span>
                      ) : (
                        'Claim Your Voice'
                      )}
                    </button>

                    {claimStatus === 'error' && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-red-400 text-sm text-center"
                      >
                        {errorMessage || 'Claim failed. Please try again.'}
                      </motion.div>
                    )}
                  </motion.div>
                ) : (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-center py-8 space-y-4"
                  >
                    <div className="text-5xl mb-4">🔒</div>
                    <h4 className="font-cinzel text-2xl font-bold text-gray-400">
                      The Chorus has not called you... yet.
                    </h4>
                    <p className="font-spectral text-gray-500">
                      You are not currently on the allowlist
                    </p>
                  </motion.div>
                )}
              </div>

              {/* Soulbound Notice */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="pt-6 border-t border-purple-500/20"
              >
                <div className="flex items-center justify-center gap-2 text-gray-500 text-sm font-spectral">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                    />
                  </svg>
                  <span>Soulbound Token - Non-transferable</span>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </main>
  );
}
