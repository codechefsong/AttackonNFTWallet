"use client";

import { useState } from "react";
import { parseEther } from "viem";
import { IntegerInput } from "~~/components/scaffold-eth";
import { useScaffoldContractWrite } from "~~/hooks/scaffold-eth";

export const DepositETH = ({ id, tbaAddress }: any) => {
  const [amount, setAmount] = useState<string | bigint>("");

  const { writeAsync: depositETH } = useScaffoldContractWrite({
    contractName: "NFTWallets",
    functionName: "depositETH",
    args: [id, tbaAddress],
    value: parseEther(amount.toString()),
  });

  return (
    <div className="flex flex-col items-center">
      <div className="flex flex-col items-center space-y-4 bg-base-100 shadow-lg shadow-secondary border-8 border-secondary rounded-xl p-6 mt-8 w-full max-w-lg">
        <div className="text-xl">Deposit ETH</div>

        <div className="w-full flex flex-col space-y-2">
          <IntegerInput
            placeholder="amount of ETH to deposit"
            value={amount.toString()}
            onChange={value => setAmount(value)}
            disableMultiplyBy1e18
          />
        </div>

        <button className="btn btn-secondary mt-2" onClick={() => depositETH()}>
          Deposit
        </button>
      </div>
    </div>
  );
};
