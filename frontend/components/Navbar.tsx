"use client"

import Link from "next/link"
import { useAccount } from "wagmi"

import WalletInfo from "@/components/WalletInfo"
import WalletButton from "@/components/WalletButton"

export default function Navbar() {
  const { isConnected } = useAccount()

  return (
    <header className="sticky top-0 z-40 bg-transparent">

      <div className="max-w-7xl mx-auto px-6 py-6 flex items-center justify-between">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-3">
          <span className="text-2xl">🐯</span>
          <span className="text-xl font-bold text-yellow-400">
            MaungStake
          </span>
        </Link>

        {/* Navigation */}
        <nav className="hidden md:flex items-center gap-8 text-neutral-400">

          <Link href="/stake" className="hover:text-white transition">
            Stake
          </Link>

          <Link href="/rewards" className="hover:text-white transition">
            Rewards
          </Link>

          <Link href="/docs" className="hover:text-white transition">
            Docs
          </Link>

        </nav>

        {/* Wallet */}
        <div>
          {isConnected ? <WalletInfo /> : <WalletButton />}
        </div>

      </div>

    </header>
  )
}