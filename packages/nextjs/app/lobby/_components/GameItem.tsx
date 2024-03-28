"use client";

export const GameItem = ({ data }: any) => {
  return (
    <tr key={data.id.toString()} className="text-sm">
      <td className="w-1/12 md:py-4">{data.id.toString()}</td>
      <td className="w-3/12 md:py-4">{data.numberOfPlayers.toString()}</td>
      <td className="w-3/12 md:py-4">{data.prizePool.toString()} ETH</td>
      <td className="w-2/12 md:py-4">
        <p>{data.isMatch ? "Yes" : "No"}</p>
      </td>
      <td className="w-2/12 md:py-4">
        <button
          className="py-2 px-16 bg-green-500 rounded baseline hover:bg-green-300 disabled:opacity-50"
          onClick={() => console.log("Join")}
        >
          Join
        </button>
      </td>
    </tr>
  );
};
