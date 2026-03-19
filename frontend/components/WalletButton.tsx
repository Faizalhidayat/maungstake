"use client"

import {
  useAccount,
  useConnect,
  useDisconnect,
  useSwitchChain,
} from "wagmi"
import { injected } from "wagmi/connectors"
import { baseSepolia } from "wagmi/chains"
import { useEffect, useState } from "react"

export default function WalletButton() {
  const [mounted, setMounted] = useState(false)

  const { address, isConnected, chain } = useAccount()
  const { connect, isPending: isConnecting } = useConnect()
  const { disconnect } = useDisconnect()
  const { switchChain, isPending: isSwitching } = useSwitchChain()

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null // prevent hydration mismatch
  }

  const shortAddress = (addr: string) =>
    `${addr.slice(0, 6)}...${addr.slice(-4)}`

  if (!isConnected) {
    return (
      <button
        onClick={() => connect({ connector: injected() })}
        disabled={isConnecting}
        className="bg-yellow-500 text-black px-6 py-3 rounded-2xl font-semibold hover:scale-105 transition disabled:opacity-50"
      >
        {isConnecting ? "Connecting..." : "Connect Wallet"}
      </button>
    )
  }

  if (chain?.id !== baseSepolia.id) {
    return (
      <div className="flex flex-col items-center gap-3 bg-gray-900 p-6 rounded-2xl border border-yellow-500">
        <p className="text-sm text-red-400">
          Wrong Network
        </p>

        <button
          onClick={() => switchChain({ chainId: baseSepolia.id })}
          disabled={isSwitching}
          className="bg-blue-500 text-white px-5 py-2 rounded-xl"
        >
          {isSwitching ? "Switching..." : "Switch Network"}
        </button>

        <button
          onClick={() => disconnect()}
          className="text-xs text-gray-400"
        >
          Disconnect
        </button>
      </div>
    )
  }

  return (
    <div className="flex flex-col items-center gap-3 bg-gray-900 p-6 rounded-2xl border border-green-500">
      <p className="text-sm text-green-400">Connected</p>

      <p className="text-xs text-gray-400">
        {address && shortAddress(address)}
      </p>

      <button
        onClick={() => disconnect()}
        className="bg-red-500 text-white px-4 py-1 rounded-lg text-sm"
      >
        Disconnect
      </button>
    </div>
  )
}
