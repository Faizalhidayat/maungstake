"use client"

import { useState } from "react"
import { useAccount, useReadContract, useWriteContract } from "wagmi"
import { parseUnits, formatUnits } from "viem"

import { erc20Abi, stakingAbi } from "@/lib/abi"
import { MAUNG_TOKEN, MAUNG_STAKING } from "@/lib/contracts"

export default function StakePanel() {

  const { address, isConnected } = useAccount()
  const { writeContractAsync } = useWriteContract()

  const [amount, setAmount] = useState("")

  const parsedAmount = amount ? parseUnits(amount, 18) : 0n

  const { data: balance } = useReadContract({
    address: MAUNG_TOKEN,
    abi: erc20Abi,
    functionName: "balanceOf",
    args: address ? [address] : undefined,
    query: { enabled: !!address }
  })

  const { data: allowance } = useReadContract({
    address: MAUNG_TOKEN,
    abi: erc20Abi,
    functionName: "allowance",
    args: address ? [address, MAUNG_STAKING] : undefined,
    query: { enabled: !!address }
  })

  const needsApproval =
    allowance !== undefined &&
    parsedAmount > (allowance as bigint)

  const handleApprove = async () => {
    await writeContractAsync({
      address: MAUNG_TOKEN,
      abi: erc20Abi,
      functionName: "approve",
      args: [MAUNG_STAKING, parsedAmount]
    })
  }

  const handleStake = async () => {
    await writeContractAsync({
      address: MAUNG_STAKING,
      abi: stakingAbi,
      functionName: "stake",
      args: [parsedAmount]
    })
  }

  const handleWithdraw = async () => {
    await writeContractAsync({
      address: MAUNG_STAKING,
      abi: stakingAbi,
      functionName: "withdraw",
      args: [parsedAmount]
    })
  }

  const setMax = () => {
    if (!balance) return
    setAmount(formatUnits(balance as bigint, 18))
  }

  if (!isConnected) return null

  return (
    <div className="w-full max-w-lg">

      <div className="p-[1px] rounded-3xl bg-gradient-to-r from-yellow-400 via-purple-500 to-green-400">

        <div className="bg-neutral-950 rounded-3xl p-8">

          {/* Header */}
          <div className="flex justify-between items-center mb-6">

            <div>
              <h2 className="text-xl font-bold text-yellow-400">
                Stake MAUNG
              </h2>
              <p className="text-xs text-neutral-400">
                Earn TARING rewards
              </p>
            </div>

            <span className="text-sm bg-green-500/20 text-green-400 px-3 py-1 rounded-full">
              20% APR
            </span>

          </div>

          {/* Balance */}
          <p className="text-xs text-neutral-400 mb-3">
            Balance: {balance ? formatUnits(balance as bigint, 18) : "0"} MAUNG
          </p>

          {/* Input */}
          <div className="flex items-center justify-between bg-black border border-neutral-800 rounded-xl px-4 py-4 mb-6">

            <input
              type="number"
              placeholder="0"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="bg-transparent outline-none text-white text-lg w-full"
            />

            <button
              onClick={setMax}
              className="text-xs bg-yellow-500 text-black px-3 py-1 rounded-lg font-semibold"
            >
              MAX
            </button>

          </div>

          {/* Reward preview */}
          {amount && (
            <div className="text-xs text-neutral-400 mb-6">
              Est. daily reward ≈{" "}
              <span className="text-purple-400">
                {(Number(amount) * 0.20 / 365).toFixed(4)} TARING
              </span>
            </div>
          )}

          {/* Buttons */}

          {needsApproval ? (

            <button
              onClick={handleApprove}
              className="w-full py-4 bg-yellow-500 text-black rounded-xl font-bold hover:scale-[1.02] transition"
            >
              Approve MAUNG
            </button>

          ) : (

            <button
              onClick={handleStake}
              className="w-full py-4 bg-green-500 text-black rounded-xl font-bold hover:scale-[1.02] transition"
            >
              Stake MAUNG
            </button>

          )}

          <button
            onClick={handleWithdraw}
            className="w-full mt-4 py-3 bg-red-500/20 text-red-400 border border-red-500/30 rounded-xl font-semibold hover:bg-red-500/30 transition"
          >
            Withdraw
          </button>

        </div>
      </div>
    </div>
  )
}