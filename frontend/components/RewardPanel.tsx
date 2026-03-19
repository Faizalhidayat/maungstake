"use client"

import { useAccount, useReadContract, useWriteContract } from "wagmi"
import { formatUnits } from "viem"
import { stakingAbi } from "@/lib/abi"
import { MAUNG_STAKING } from "@/lib/contracts"

export default function RewardPanel() {
  const { address, isConnected } = useAccount()
  const { writeContractAsync } = useWriteContract()

  const { data: reward } = useReadContract({
    address: MAUNG_STAKING,
    abi: stakingAbi,
    functionName: "pending",
    args: address ? [address] : undefined,
    query: { enabled: !!address, refetchInterval: 5000 },
  })

  const handleClaim = async () => {
    try {
      await writeContractAsync({
        address: MAUNG_STAKING,
        abi: stakingAbi,
        functionName: "claim",
      })
    } catch (err) {
      console.error("Claim error:", err)
    }
  }

  if (!isConnected) return null

  return (
    <div className="w-full max-w-3xl mt-8 p-6 bg-neutral-950 rounded-3xl border border-purple-500/20">

      <p className="text-lg font-bold text-purple-400">
        Pending TARING Reward:
      </p>

      <p className="text-2xl text-white mb-6">
        {reward ? formatUnits(reward as bigint, 18) : "0"} TARING
      </p>

      <button
        onClick={handleClaim}
        className="w-full py-4 bg-purple-500 text-black rounded-xl font-bold"
      >
        Claim TARING
      </button>

    </div>
  )
}
