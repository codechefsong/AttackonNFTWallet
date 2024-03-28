"use client";

import { GameItem } from "./_components/GameItem";
import type { NextPage } from "next";
import { useScaffoldContractRead, useScaffoldContractWrite } from "~~/hooks/scaffold-eth";

const Lobby: NextPage = () => {
  const { data: battles } = useScaffoldContractRead({
    contractName: "NFTWallets",
    functionName: "getBattles",
  });

  const { writeAsync: createBattle } = useScaffoldContractWrite({
    contractName: "NFTWallets",
    functionName: "createBattle",
    onBlockConfirmation: txnReceipt => {
      console.log("📦 Transaction blockHash", txnReceipt.blockHash);
      console.log(txnReceipt);
    },
  });

  return (
    <div className="flex flex-col items-center">
      <h2 className="text-2xl mt-10 mb-0">List of NFT Wallets</h2>
      <button
        className="py-2 px-16 bg-green-500 rounded baseline hover:bg-green-300 disabled:opacity-50"
        onClick={() => createBattle()}
      >
        Create Battle
      </button>
      <div className="flex justify-center px-4 md:px-0 mt-5">
        <div className="overflow-x-auto w-full shadow-2xl rounded-xl">
          <table className="table text-xl bg-base-100 table-zebra w-full md:table-md table-sm">
            <thead>
              <tr className="rounded-xl text-sm text-base-content">
                <th className="bg-primary">Player ID</th>
                <th className="bg-primary">Prize Pool</th>
                <th className="bg-primary">Is Finish?</th>
                <th className="bg-primary">Action</th>
              </tr>
            </thead>
            <tbody>
              {battles?.map((m, index) => (
                <GameItem data={m} key={index} />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Lobby;
