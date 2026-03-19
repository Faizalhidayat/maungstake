"use client"

import Navbar from "@/components/Navbar"
import Link from "next/link"

export default function Home() {
  return (
    <main className="relative min-h-screen bg-black text-white overflow-hidden">

      <Navbar />

      {/* Glow background */}
      <div className="absolute inset-0">

        <div className="absolute top-[-200px] left-[-200px] w-[500px] h-[500px] bg-yellow-500/20 blur-[200px] rounded-full"></div>

        <div className="absolute bottom-[-200px] right-[-200px] w-[500px] h-[500px] bg-purple-500/20 blur-[200px] rounded-full"></div>

      </div>

      <div className="relative z-10 flex flex-col items-center justify-center text-center px-6 py-24">

        {/* Title */}
        <h1 className="text-6xl md:text-7xl font-extrabold mb-6 bg-gradient-to-r from-yellow-300 via-yellow-400 to-yellow-500 bg-clip-text text-transparent">

          🐯 MaungStake

        </h1>

        {/* Subtitle */}
        <p className="text-xl text-neutral-400 max-w-2xl mb-12">

          Stake MAUNG tokens and earn TARING rewards with a simple,
          transparent staking protocol built on Base Sepolia.

        </p>

        {/* CTA Buttons */}
        <div className="flex gap-6">

          <Link
            href="/stake"
            className="bg-yellow-500 text-black px-8 py-4 rounded-xl font-bold hover:scale-105 transition"
          >
            Start Staking
          </Link>

          <Link
            href="/docs"
            className="border border-neutral-700 px-8 py-4 rounded-xl hover:bg-neutral-900 transition"
          >
            Read Docs
          </Link>

        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-8 mt-20 max-w-4xl w-full">

          <div className="bg-neutral-900/70 backdrop-blur p-6 rounded-xl">

            <p className="text-neutral-400 text-sm">APR</p>
            <p className="text-3xl font-bold text-green-400">20%</p>

          </div>

          <div className="bg-neutral-900/70 backdrop-blur p-6 rounded-xl">

            <p className="text-neutral-400 text-sm">Reward Token</p>
            <p className="text-3xl font-bold text-purple-400">TARING</p>

          </div>

          <div className="bg-neutral-900/70 backdrop-blur p-6 rounded-xl">

            <p className="text-neutral-400 text-sm">Network</p>
            <p className="text-3xl font-bold text-yellow-400">Base</p>

          </div>

        </div>

      </div>

    </main>
  )
}