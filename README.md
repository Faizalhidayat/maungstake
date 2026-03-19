# 🐯 MaungStake

Simple DeFi staking app where users stake **MAUNG** tokens and earn **TARING** rewards.

---

## 🚀 Live Demo

https://maungstake.vercel.app

---

## ✨ Features

- Stake MAUNG tokens  
- Earn TARING rewards (fixed APR 20%)  
- Rewards calculated per second  
- Claim anytime  
- Withdraw anytime  
- Clean Web3 UI  

---

## 🏗️ Project Structure

```
maungstake/
├── contracts/   # Smart contracts (Foundry)
├── frontend/    # Next.js dApp
```

---

## 💻 Tech Stack

- Next.js  
- TailwindCSS  
- Wagmi + Viem  
- Solidity (Foundry)  
- Vercel  

---

## ⚙️ Setup

### Frontend

```
cd frontend
npm install
npm run dev
```

### Contracts

```
cd contracts
forge build
forge test
```

---

## 🔐 Environment

Create `.env.local` in frontend:

```
NEXT_PUBLIC_MAUNG_TOKEN=0x...
NEXT_PUBLIC_STAKING=0x...
NEXT_PUBLIC_CHAIN_ID=84532

---

## 👨‍💻 Author

Faizal
