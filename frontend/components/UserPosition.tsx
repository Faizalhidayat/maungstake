"use client"

type Props = {
  staked: number
  reward: number
  apr: number
}

export default function UserPosition({ staked, reward, apr }: Props) {
  return (
    <div className="w-full max-w-5xl grid md:grid-cols-3 gap-6 mb-10">
      
      <div className="p-6 rounded-3xl bg-neutral-950/80 border border-yellow-400/20 backdrop-blur-xl">
        <p className="text-xs uppercase tracking-widest text-neutral-500">
          Your Staked
        </p>
        <p className="text-3xl font-bold text-white mt-3">
          {staked} MAUNG
        </p>
      </div>

      <div className="p-6 rounded-3xl bg-neutral-950/80 border border-yellow-400/20 backdrop-blur-xl">
        <p className="text-xs uppercase tracking-widest text-neutral-500">
          Pending Reward
        </p>
        <p className="text-3xl font-bold text-yellow-400 mt-3 animate-pulse">
          {reward} MAUNG
        </p>
      </div>

      <div className="p-6 rounded-3xl bg-neutral-950/80 border border-yellow-400/20 backdrop-blur-xl">
        <p className="text-xs uppercase tracking-widest text-neutral-500">
          APR
        </p>
        <p className="text-3xl font-bold text-white mt-3">
          {apr}%
        </p>
      </div>

    </div>
  )
}
