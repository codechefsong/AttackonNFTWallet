"use client";

import { useState } from "react";
import { BuyAttackPoint } from "./_components/BuyAttackPoints";
import { DepositETH } from "./_components/DepositETH";
import type { NextPage } from "next";
import { Address, formatEther } from "viem";
import { useAccount, useContractWrite } from "wagmi";
import { Balance } from "~~/components/scaffold-eth";
import deployedContracts from "~~/contracts/deployedContracts";
import { useScaffoldContractRead, useScaffoldContractWrite } from "~~/hooks/scaffold-eth";

const CHAIN_ID = 31337;

const Marketplace: NextPage = () => {
  const { address } = useAccount();

  const [selectedNFT, setSelectNFT] = useState(-1);

  const { data: nfts } = useScaffoldContractRead({
    contractName: "BattleWalletNFT",
    functionName: "getMyNFTs",
    args: [address],
  });

  const { data: pointAmount } = useScaffoldContractRead({
    contractName: "AttackPoint",
    functionName: "balanceOf",
    args: [nfts && nfts[selectedNFT]?.tba],
  });

  const { writeAsync: mintAndCreateTokenBoundAccount } = useScaffoldContractWrite({
    contractName: "NFTWallets",
    functionName: "mintAndCreateTokenBoundAccount",
    args: [deployedContracts[CHAIN_ID].ERC6551Account.address, BigInt(CHAIN_ID), BigInt("1"), "0x", ""],
    onBlockConfirmation: txnReceipt => {
      console.log("📦 Transaction blockHash", txnReceipt.blockHash);
      console.log(txnReceipt);
    },
  });

  const { writeAsync: createBattle } = useScaffoldContractWrite({
    contractName: "NFTWallets",
    functionName: "createBattle",
    args: [BigInt(selectedNFT), nfts && nfts[selectedNFT]?.tba],
    onBlockConfirmation: txnReceipt => {
      console.log("📦 Transaction blockHash", txnReceipt.blockHash);
      console.log(txnReceipt);
    },
  });

  const { writeAsync: heal } = useContractWrite({
    address: nfts && nfts[selectedNFT]?.tba,
    abi: deployedContracts[CHAIN_ID].ERC6551Account.abi,
    functionName: "healWallet",
  });

  return (
    <div className="flex items-center flex-col flex-grow pt-7">
      <div className="grid lg:grid-cols-2 flex-grow gap-[30px]">
        <div>
          <h2 className="mb-5">
            <span className="block text-3xl mb-2">Select your wallet NFT</span>
          </h2>

          <div className="flex">
            {nfts?.map((n, index) => (
              <div
                key={index}
                className="w-16 h-20 border border-gray-30 flex items-center justify-center font-bold mr-2 mb-2 cursor-pointer"
                style={{ background: selectedNFT === Number(n.id) ? "#00cc99" : "white" }}
                onClick={() => setSelectNFT(Number(n.id))}
              >
                {n?.id?.toString()}
              </div>
            ))}
          </div>

          <h2 className="mb-5">
            <span className="block text-2xl mb-2">Buy a Wallet NFT</span>
          </h2>

          <button
            className="py-2 px-16 mb-1 mt-3 bg-green-500 rounded baseline hover:bg-green-300 disabled:opacity-50"
            onClick={() => mintAndCreateTokenBoundAccount()}
          >
            Buy
          </button>
          <BuyAttackPoint />
        </div>
        <div className="px-5">
          {selectedNFT !== -1 && (
            <div>
              <h2 className="mb-5">
                <span className="block text-3xl mb-2">Wallet NFT Info</span>
              </h2>
              <p>ID: {nfts && Number(nfts[selectedNFT].id)}</p>
              <p>TBA: {nfts && nfts[selectedNFT].tba}</p>
              <p>Is Battled: {nfts && nfts[selectedNFT].isDeployed ? "Yes" : "No"}</p>
              <div className="text-xl">
                Attack Points balance:{" "}
                <div className="inline-flex items-center justify-center">
                  {parseFloat(formatEther(pointAmount || 0n)).toFixed(4)}
                  <span className="font-bold ml-1">ATK</span>
                </div>
              </div>
              <p className="flex items-center">
                Balance: {nfts && nfts[selectedNFT]?.tba && <Balance address={nfts[selectedNFT]?.tba as Address} />}
              </p>
              {nfts && !nfts[selectedNFT].isDeployed && (
                <button
                  className="py-2 px-16 mb-10 mt-3 bg-green-500 rounded baseline hover:bg-green-300 disabled:opacity-50"
                  onClick={() => createBattle()}
                >
                  Create Battle
                </button>
              )}
              <button
                className="py-2 px-16 mb-10 mt-3 bg-green-500 rounded baseline hover:bg-green-300 disabled:opacity-50"
                onClick={() => heal()}
              >
                Heal
              </button>
              <DepositETH id={nfts && Number(nfts[selectedNFT].id)} tbaAddress={nfts && nfts[selectedNFT]?.tba} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Marketplace;
