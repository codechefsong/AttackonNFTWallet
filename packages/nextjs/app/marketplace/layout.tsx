import { getMetadata } from "~~/utils/scaffold-eth/getMetadata";

export const metadata = getMetadata({
  title: "Marketplace",
  description: "Marketplace created with 🏗 Scaffold-ETH 2",
});

const MarketplaceLayout = ({ children }: { children: React.ReactNode }) => {
  return <>{children}</>;
};

export default MarketplaceLayout;
