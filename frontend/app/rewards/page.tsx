"use client"

import Navbar from "@/components/Navbar"
import RewardPanel from "@/components/RewardPanel"

export default function RewardsPage() {
  return (
    <main className="relative min-h-screen bg-black text-white overflow-hidden">

      <Navbar />

      {/* 🌟 Background Effects */}
      <div className="absolute inset-0">

        {/* gradient base */}
        <div className="absolute inset-0 bg-gradient-to-br from-black via-neutral-950 to-black"></div>

        {/* purple glow left */}
        <div className="absolute -top-40 -left-40 w-[600px] h-[600px] bg-purple-500/15 blur-[200px] rounded-full animate-pulse"></div>

        {/* yellow glow right */}
        <div className="absolute -bottom-40 -right-40 w-[600px] h-[600px] bg-yellow-400/10 blur-[200px] rounded-full animate-pulse"></div>

        {/* center light */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-purple-500/5 blur-[180px] rounded-full"></div>

      </div>

      {/* CONTENT */}
      <div className="relative z-10 flex flex-col items-center justify-center px-6 py-20">

        {/* Header */}
        <div className="text-center mb-12">

          <h1 className="text-4xl font-bold text-purple-400 mb-4">
            Claim Rewards
          </h1>

          <p className="text-neutral-400 max-w-xl">
            Your TARING rewards accumulate every second based on your MAUNG
            staking position. Claim anytime.
          </p>

        </div>

        {/* Reward Card */}
        <div className="w-full max-w-xl">
          <RewardPanel />
        </div>

      </div>

    </main>
  )
}