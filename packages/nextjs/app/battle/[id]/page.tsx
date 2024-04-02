"use client";

import { useRouter } from "next/navigation";
import { useAccount } from "wagmi";
import { useScaffoldContractRead, useScaffoldContractWrite } from "~~/hooks/scaffold-eth";

const BattleRoom = ({ params }: { params: { id: string } }) => {
  const router = useRouter();
  const { address } = useAccount();

  const { data: matchData } = useScaffoldContractRead({
    contractName: "NFTWallets",
    functionName: "getBattleByID",
    args: [params?.id as any],
  });

  const { writeAsync: attackWallet } = useScaffoldContractWrite({
    contractName: "NFTWallets",
    functionName: "attackWallet",
    args: [BigInt(params?.id)],
    onBlockConfirmation: txnReceipt => {
      console.log("📦 Transaction blockHash", txnReceipt.blockHash);
      console.log(txnReceipt);
    },
  });

  return (
    <div className="flex items-center flex-col flex-grow pt-7">
      <div className="px-5">
        <h1 className="text-center mb-5">
          <span className="block text-2xl mb-2">Battle #{params?.id}</span>
        </h1>
        <p>{address}</p>
        <p>Health Point: {matchData?.hp.toString()}</p>
        <p>Total Damage: {matchData?.totalDamage.toString()}</p>
        <p>Prize Pool: {matchData?.prizePool.toString()} WEI</p>
        <p>Is finish: {matchData?.isFinish ? "Yes" : "No"}</p>
        <button
          className="py-2 px-16 mb-1 mt-3 bg-red-400 rounded baseline hover:bg-red-300 disabled:opacity-50"
          onClick={() => attackWallet()}
        >
          Attack
        </button>
        <button
          className="py-2 px-16 mb-1 mt-3 bg-gray-300 rounded baseline hover:bg-gray-200 disabled:opacity-50"
          onClick={() => router.push("/lobby")}
        >
          Back
        </button>
      </div>
    </div>
  );
};

export default BattleRoom;
