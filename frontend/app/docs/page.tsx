"use client"

import Navbar from "@/components/Navbar"

export default function DocsPage() {
  return (
    <main className="relative min-h-screen bg-black text-white overflow-hidden">

      <Navbar />

      {/* 🌟 Background Effects */}
      <div className="absolute inset-0">

        {/* base gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-black via-neutral-950 to-black"></div>

        {/* gold glow */}
        <div className="absolute -top-40 -left-40 w-[600px] h-[600px] bg-yellow-400/10 blur-[200px] rounded-full animate-pulse"></div>

        {/* blue glow */}
        <div className="absolute -bottom-40 -right-40 w-[600px] h-[600px] bg-blue-500/10 blur-[200px] rounded-full animate-pulse"></div>

        {/* center light */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-yellow-500/5 blur-[180px] rounded-full"></div>

      </div>

      {/* CONTENT */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 py-20">

        {/* Title */}
        <h1 className="text-4xl font-bold text-yellow-400 mb-10">
          MaungStake Documentation
        </h1>

        {/* Grid Sections */}
        <div className="grid md:grid-cols-3 gap-8">

          {/* Overview */}
          <div className="bg-neutral-900/70 backdrop-blur p-6 rounded-xl border border-white/5">
            <h2 className="font-semibold mb-3 text-yellow-300">
              Overview
            </h2>

            <p className="text-neutral-400 text-sm leading-relaxed">
              MaungStake is a staking protocol deployed on Base Sepolia.
              Users deposit MAUNG tokens and receive TARING rewards based
              on a fixed emission rate.
            </p>
          </div>

          {/* How It Works */}
          <div className="bg-neutral-900/70 backdrop-blur p-6 rounded-xl border border-white/5">

            <h2 className="font-semibold mb-3 text-yellow-300">
              How It Works
            </h2>

            <ul className="text-neutral-400 text-sm space-y-2">
              <li>• Stake MAUNG tokens</li>
              <li>• Rewards accumulate every second</li>
              <li>• Claim TARING anytime</li>
              <li>• Withdraw without lock period</li>
            </ul>

          </div>

          {/* Protocol Info */}
          <div className="bg-neutral-900/70 backdrop-blur p-6 rounded-xl border border-white/5">

            <h2 className="font-semibold mb-3 text-yellow-300">
              Protocol Info
            </h2>

            <ul className="text-neutral-400 text-sm space-y-2">
              <li>APR: 20%</li>
              <li>Network: Base Sepolia</li>
              <li>Reward Token: TARING</li>
            </ul>

          </div>

        </div>

      </div>

    </main>
  )
}