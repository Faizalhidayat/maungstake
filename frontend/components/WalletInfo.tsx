"use client"

import {
  useAccount,
  useDisconnect,
  useChainId,
  useReadContract,
} from "wagmi"
import { formatUnits } from "viem"
import { erc20Abi } from "@/lib/abi"
import { MAUNG_TOKEN } from "@/lib/contracts"

function shorten(address: string) {
  return `${address.slice(0, 6)}...${address.slice(-4)}`
}

export default function WalletInfo() {
  const { address, isConnected } = useAccount()
  const { disconnect } = useDisconnect()
  const chainId = useChainId()

  const { data: balance } = useReadContract({
    address: MAUNG_TOKEN,
    abi: erc20Abi,
    functionName: "balanceOf",
    args: address ? [address] : undefined,
    query: {
      enabled: !!address,
    },
  })

  if (!isConnected || !address) return null

  return (
    <div className="relative w-full md:w-auto p-[1px] rounded-3xl bg-gradient-to-r from-yellow-400 via-purple-500 to-green-400">

      <div className="bg-neutral-950 rounded-3xl p-6 flex items-center gap-6">

        {/* Avatar */}
        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-yellow-400 to-purple-500 flex items-center justify-center text-black font-bold">
          🐯
        </div>

        <div>
          <p className="text-sm text-neutral-400">Wallet</p>
          <p className="text-yellow-400 font-semibold">
            {shorten(address)}
          </p>

          <p className="text-xs text-neutral-500 mt-1">
            {balance
              ? `${formatUnits(balance as bigint, 18)} MAUNG`
              : "0 MAUNG"} Balance
          </p>
        </div>

        <div className="flex items-center gap-3 ml-4">

          <span className="text-xs px-3 py-1 rounded-full bg-green-500/20 text-green-400 border border-green-500/30">
            {chainId === 84532
              ? "Base Sepolia"
              : `Chain ${chainId}`}
          </span>

          <button
            onClick={() => disconnect()}
            className="text-xs px-4 py-2 bg-red-500/20 text-red-400 border border-red-500/30 rounded-xl hover:scale-105 transition"
          >
            Disconnect
          </button>

        </div>

      </div>
    </div>
  )
}