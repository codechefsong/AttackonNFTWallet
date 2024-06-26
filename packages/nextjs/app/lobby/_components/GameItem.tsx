"use client";

import { useRouter } from "next/navigation";
import { formatEther } from "viem";
import { Address } from "~~/components/scaffold-eth";

export const GameItem = ({ data }: any) => {
  const router = useRouter();

  return (
    <tr key={data.id.toString()} className="text-sm">
      <td className="w-1/12 md:py-4">{data.id.toString()}</td>
      <td className="w-3/12 md:py-4">{parseFloat(formatEther(data.prizePool || 0n))} ETH</td>
      <td className="w-3/12 md:py-4">
        <Address address={data.tba} />
      </td>
      <td className="w-2/12 md:py-4">
        <p>{data.isMatch ? "Yes" : "No"}</p>
      </td>
      <td className="w-2/12 md:py-4">
        <button
          className="py-2 px-16 bg-green-500 rounded baseline hover:bg-green-300 disabled:opacity-50"
          onClick={() => router.push("/battle/" + data.id.toString())}
        >
          Join
        </button>
      </td>
    </tr>
  );
};
