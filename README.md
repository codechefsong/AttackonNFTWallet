# Attack on NFT Wallet
Battle with other NFT wallets (ERC6551) to claim ETH rewards

![Attack on NFT Wallet](./packages/nextjs/public/game.png)

⚙️ Built using NextJS, RainbowKit, Hardhat, Wagmi, Viem, and Typescript.

## Gameplay
- Mint a Battle Wallet NFT and deposit ETH into it to prepare for battle
- Purchase Attack Points (ATK) for battle</li>
- Spend 10 Attack Points to target an NFT wallet for attack, with 20% of the cost deposited into the target wallet
- Defeat NFT wallets by reducing their health points to zero and claim ETH rewards based on the damage inflicted
- Spend Attack Points (ATK) to heal your Battle Wallet

## Requirements

Before you begin, you need to install the following tools:

- [Node (>= v18.17)](https://nodejs.org/en/download/)
- Yarn ([v1](https://classic.yarnpkg.com/en/docs/install/) or [v2+](https://yarnpkg.com/getting-started/install))
- [Git](https://git-scm.com/downloads)

## Quickstart

To get started with Attack on NFT Wallet, follow the steps below:

1. Clone this repo & install dependencies

```
git clone https://github.com/codechefsong/AttackonNFTWallet.git
cd AttackonNFTWallet
yarn install
```

2. Run a local network in the first terminal:

```
yarn chain
```

This command starts a local Ethereum network using Hardhat. The network runs on your local machine and can be used for testing and development. You can customize the network configuration in `hardhat.config.ts`.

3. On a second terminal, deploy the test contract:

```
yarn deploy
```

This command deploys a test smart contract to the local network. The contract is located in `packages/hardhat/contracts` and can be modified to suit your needs. The `yarn deploy` command uses the deploy script located in `packages/hardhat/deploy` to deploy the contract to the network. You can also customize the deploy script.

4. On a third terminal, start your NextJS app:

```
yarn start
```

Visit your app on: `http://localhost:3000`. You can interact with your smart contract using the `Debug Contracts` page. You can tweak the app config in `packages/nextjs/scaffold.config.ts`.
