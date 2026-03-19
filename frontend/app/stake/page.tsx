"use client"

import Navbar from "@/components/Navbar"
import DashboardInfo from "@/components/DashboardInfo"
import StakePanel from "@/components/StakePanel"

export default function StakePage() {
  return (
    <main className="relative min-h-screen bg-black text-white overflow-hidden">

      <Navbar />

      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-black via-neutral-950 to-black"></div>
        <div className="absolute -top-40 -left-40 w-[600px] h-[600px] bg-yellow-400/10 blur-[200px] rounded-full"></div>
        <div className="absolute -bottom-40 -right-40 w-[600px] h-[600px] bg-purple-500/10 blur-[200px] rounded-full"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-16">

        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-yellow-400 mb-3">
            Stake MAUNG
          </h1>
          <p className="text-neutral-400">
            Deposit MAUNG tokens and earn TARING rewards with fixed APR.
          </p>
        </div>

        {/* Protocol Stats */}
        <div className="grid grid-cols-3 gap-6 mb-12">

          <div className="bg-neutral-900/70 backdrop-blur p-6 rounded-xl border border-white/5">
            <p className="text-neutral-400 text-sm">Total Value Locked</p>
            <p className="text-2xl font-bold text-yellow-400">$420,000</p>
          </div>

          <div className="bg-neutral-900/70 backdrop-blur p-6 rounded-xl border border-white/5">
            <p className="text-neutral-400 text-sm">Total Stakers</p>
            <p className="text-2xl font-bold text-green-400">1,240</p>
          </div>

          <div className="bg-neutral-900/70 backdrop-blur p-6 rounded-xl border border-white/5">
            <p className="text-neutral-400 text-sm">APR</p>
            <p className="text-2xl font-bold text-purple-400">20%</p>
          </div>

        </div>

        {/* CENTERED GRID */}
        <div className="flex justify-center">
          <div className="grid md:grid-cols-3 gap-10 max-w-5xl w-full">

            {/* Sidebar */}
            <div>
              <DashboardInfo />
            </div>

            {/* Stake Panel */}
            <div className="md:col-span-2">
              <StakePanel />
            </div>

          </div>
        </div>

      </div>

    </main>
  )
}