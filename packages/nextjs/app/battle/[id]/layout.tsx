import { getMetadata } from "~~/utils/scaffold-eth/getMetadata";

export const metadata = getMetadata({
  title: "Battle",
  description: "Battle created with 🏗 Scaffold-ETH 2",
});

const BattleLayout = ({ children }: { children: React.ReactNode }) => {
  return <>{children}</>;
};

export default BattleLayout;
