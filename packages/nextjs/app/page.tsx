"use client";

import Image from "next/image";
import Link from "next/link";
import type { NextPage } from "next";

const Home: NextPage = () => {
  return (
    <>
      <div className="flex items-center flex-col flex-grow pt-10">
        <div className="px-5">
          <h1 className="text-center">
            <span className="block text-2xl mb-2">Welcome to</span>
            <span className="block text-4xl font-bold">Attack on NFT Wallet</span>
          </h1>
          <Image className="ml-8" alt="Game" width={400} height={350} src="/game.png" />
          <p className="text-center text-lg mb-0">Battle with other NFT wallets (ERC6551) to claim ETH rewards</p>
          <div className="flex justify-center mb-2">
            <Link
              href="/marketplace"
              passHref
              className=" py-2 px-16 mb-1 mt-3 bg-green-500 rounded baseline hover:bg-green-400 disabled:opacity-50"
            >
              Get Started
            </Link>
          </div>
        </div>

        <div className="flex-grow bg-blue-200 w-full mt-16 px-8 py-12">
          <div className="text-center">
            <h2 className="mt-3 text-4xl mb-5">Gameplay</h2>
          </div>
          <div className="flex justify-center">
            <div className="w-[700px]">
              <ul className="list-disc text-xl" style={{ width: "600px" }}>
                <li>Mint a Battle Wallet NFT and deposit ETH into it to prepare for battle</li>
                <li>Purchase Attack Points (ATK) for battle</li>
                <li>
                  Spend 10 Attack Points to target an NFT wallet for attack, with 20% of the cost deposited into the
                  target wallet
                </li>
                <li>
                  Defeat NFT wallets by reducing their health points to zero and claim ETH rewards based on the damage
                  inflicted
                </li>
                <li>Spend Attack Points (ATK) to heal your Battle Wallet</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
