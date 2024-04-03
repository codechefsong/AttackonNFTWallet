"use client";

import { useState } from "react";
import { formatEther, parseEther } from "viem";
import { IntegerInput } from "~~/components/scaffold-eth";
import { useScaffoldContractRead, useScaffoldContractWrite } from "~~/hooks/scaffold-eth";

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

  const { writeAsync: buyTokens } = useScaffoldContractWrite({
    contractName: "NFTWallets",
    functionName: "buyAttackPoint",
    args: [tbaAddress],
    value: parseEther(tokensToBuy.toString()),
  });

  return (
    <div className="flex flex-col items-center">
      <div className="text-xl">
        Your Attack Points balance:{" "}
        <div className="inline-flex items-center justify-center">
          {parseFloat(formatEther(pointAmount || 0n)).toFixed(4)}
          <span className="font-bold ml-1">ATK</span>
        </div>
      </div>
      <div className="flex flex-col items-center space-y-4 bg-base-100 shadow-lg shadow-secondary border-8 border-secondary rounded-xl p-6 mt-8 w-full max-w-lg">
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
      </div>
    </div>
  );
};
