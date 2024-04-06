"use client";

import { useRouter } from "next/navigation";
import { useAccount, useContractRead, useContractWrite } from "wagmi";
import deployedContracts from "~~/contracts/deployedContracts";
import { useScaffoldContractRead } from "~~/hooks/scaffold-eth";

const CHAIN_ID = 31337;

const BattleRoom = ({ params }: { params: { id: string } }) => {
  const router = useRouter();
  const { address } = useAccount();

  const { data: matchData } = useScaffoldContractRead({
    contractName: "NFTWallets",
    functionName: "getBattleByID",
    args: [params?.id as any],
  });

  const { data: hp } = useContractRead({
    address: matchData?.tba,
    abi: deployedContracts[CHAIN_ID].ERC6551Account.abi,
    functionName: "getHP",
    watch: true,
  });

  const { data: totalDamage } = useContractRead({
    address: matchData?.tba,
    abi: deployedContracts[CHAIN_ID].ERC6551Account.abi,
    functionName: "getTotalDamage",
    watch: true,
  });

  const { data: playerScore } = useContractRead({
    address: matchData?.tba,
    abi: deployedContracts[CHAIN_ID].ERC6551Account.abi,
    functionName: "getPlayerScore",
    args: [address || ""],
    watch: true,
  });

  const { writeAsync: attackWallet } = useContractWrite({
    address: matchData?.tba,
    abi: deployedContracts[CHAIN_ID].ERC6551Account.abi,
    functionName: "attackWallet",
    args: [deployedContracts[CHAIN_ID].AttackPoint.address],
  });

  return (
    <div className="flex items-center flex-col flex-grow pt-7">
      <div className="px-5">
        <h1 className="text-center mb-5">
          <span className="block text-2xl mb-2">Battle #{params?.id}</span>
        </h1>
        <p>{address}</p>
        <p>Address {matchData?.tba}</p>
        <p>Health Point: {hp?.toString()}</p>
        <p>Total Damage: {totalDamage?.toString()}</p>
        <p>Your Score: {playerScore?.toString()}</p>
        <p>Prize Pool: {matchData?.prizePool?.toString()} WEI</p>
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
