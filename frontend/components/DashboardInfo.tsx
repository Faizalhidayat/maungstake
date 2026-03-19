"use client"

import { useAccount, useReadContract } from "wagmi"
import { formatUnits } from "viem"
import { stakingAbi } from "@/lib/abi"
import { MAUNG_STAKING } from "@/lib/contracts"

const SECONDS_PER_YEAR = 31536000n
const PRECISION = 1000000000000000000n

export default function DashboardInfo() {
  const { address, isConnected } = useAccount()

  const { data: stakeData } = useReadContract({
    address: MAUNG_STAKING,
    abi: stakingAbi,
    functionName: "stakes",
    args: address ? [address] : undefined,
    query: {
      enabled: !!address,
      refetchInterval: 5000,
    },
  })

  const { data: rewardRate } = useReadContract({
    address: MAUNG_STAKING,
    abi: stakingAbi,
    functionName: "rewardRate",
  })

  const { data: pendingReward } = useReadContract({
    address: MAUNG_STAKING,
    abi: stakingAbi,
    functionName: "pending",
    args: address ? [address] : undefined,
    query: {
      enabled: !!address,
      refetchInterval: 5000,
    },
  })

  if (!isConnected) return null

  const stakeTuple = stakeData as
    | [bigint, bigint, bigint]
    | undefined

  const staked =
    stakeTuple ? formatUnits(stakeTuple[0], 18) : "0"

  const reward =
    pendingReward
      ? formatUnits(pendingReward as bigint, 18)
      : "0"

  let apr = "0"

  if (rewardRate) {
    const rate = rewardRate as bigint
    const aprValue =
      (rate * SECONDS_PER_YEAR * 100n) / PRECISION
    apr = aprValue.toString()
  }

  return (
    <div className="w-full max-w-sm flex flex-col gap-6">

      <div className="p-[1px] rounded-2xl bg-gradient-to-r from-yellow-400/50 to-yellow-500/50">
        <div className="bg-neutral-950 rounded-2xl p-6">
          <p className="text-xs text-neutral-400 mb-1">Your Staked</p>
          <p className="text-2xl font-bold text-yellow-400">
            {staked} MAUNG
          </p>
        </div>
      </div>

      <div className="p-[1px] rounded-2xl bg-gradient-to-r from-purple-500/50 to-purple-400/50">
        <div className="bg-neutral-950 rounded-2xl p-6">
          <p className="text-xs text-neutral-400 mb-1">Pending Reward</p>
          <p className="text-2xl font-bold text-purple-400">
            {reward} TARING
          </p>
        </div>
      </div>

      <div className="p-[1px] rounded-2xl bg-gradient-to-r from-green-500/50 to-green-400/50">
        <div className="bg-neutral-950 rounded-2xl p-6">
          <p className="text-xs text-neutral-400 mb-1">APR</p>
          <p className="text-2xl font-bold text-green-400">
            {apr}%
          </p>
        </div>
      </div>

    </div>
  )
}