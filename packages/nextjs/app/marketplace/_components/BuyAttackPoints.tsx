"use client";

import { useState } from "react";
import { encodeFunctionData, formatEther, parseEther } from "viem";
import { useContractWrite } from "wagmi";
import { IntegerInput } from "~~/components/scaffold-eth";
import deployedContracts from "~~/contracts/deployedContracts";
import { useScaffoldContractRead, useScaffoldContractWrite } from "~~/hooks/scaffold-eth";

const CHAIN_ID = 31337;

export const BuyAttackPoint = ({ tbaAddress }: any) => {
  const [tokensToBuy, setTokensToBuy] = useState<string | bigint>("");

  const { data: tokensPerEth } = useScaffoldContractRead({
    contractName: "NFTWallets",
    functionName: "tokensPerEth",
  });

  const { data: pointAmount } = useScaffoldContractRead({
    contractName: "AttackPoint",
    functionName: "balanceOf",
    args: [tbaAddress],
  });

  const { data: approveAmount } = useScaffoldContractRead({
    contractName: "AttackPoint",
    functionName: "allowance",
    args: [tbaAddress, deployedContracts[CHAIN_ID].NFTWallets.address],
  });

  const { writeAsync: buyTokens } = useScaffoldContractWrite({
    contractName: "NFTWallets",
    functionName: "buyAttackPoint",
    args: [tbaAddress],
    value: parseEther(tokensToBuy.toString()),
  });

  const dataApprove = encodeFunctionData({
    abi: deployedContracts[CHAIN_ID].AttackPoint.abi,
    functionName: "approve",
    args: [deployedContracts[CHAIN_ID].NFTWallets.address, parseEther(tokensToBuy.toString())],
  });

  const { writeAsync: approve } = useContractWrite({
    address: tbaAddress,
    abi: deployedContracts[CHAIN_ID].ERC6551Account.abi,
    functionName: "execute",
    args: [deployedContracts[CHAIN_ID].NFTWallets.address, BigInt("0"), dataApprove, BigInt("0")],
  });

  return (
    <div className="flex flex-col items-center mt-8">
      <div className="text-xl">
        Your Attack Points balance:{" "}
        <div className="inline-flex items-center justify-center">
          {parseFloat(formatEther(pointAmount || 0n)).toFixed(4)}
          <span className="font-bold ml-1">ATK</span>
        </div>
      </div>
      <div className="text-xl">
        Allowance amount:{" "}
        <div className="inline-flex items-center justify-center">
          {parseFloat(formatEther(approveAmount || 0n)).toFixed(4)}
          <span className="font-bold ml-1">ATK</span>
        </div>
      </div>
      <div className="flex flex-col items-center space-y-4 bg-base-100 shadow-lg shadow-secondary border-8 border-secondary rounded-xl p-6 mt-4 w-full max-w-lg">
        <div className="text-xl">Buy Attack Points</div>
        <div>{tokensPerEth?.toString() || 0} ATK per ETH</div>

        <div className="w-full flex flex-col space-y-2">
          <IntegerInput
            placeholder="amount of tokens to buy"
            value={tokensToBuy.toString()}
            onChange={value => setTokensToBuy(value)}
            disableMultiplyBy1e18
          />
        </div>

        <button className="btn btn-secondary mt-2" onClick={() => buyTokens()}>
          Buy Attack Points
        </button>
        <button className="btn btn-secondary mt-2" onClick={() => approve()}>
          Approve
        </button>
      </div>
    </div>
  );
};
