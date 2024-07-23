import React from "react";
// import WalletInfo from "../components/WalletInfo";
import OwnersAssects from "@/components/Assects/ownersAssects";
import { AssetTypes } from "@/types/interfaces";

const rpcEndpoint = `https://mainnet.helius-rpc.com/?api-key=${process.env.NEXT_PUBLIC_HELIUS}`;

interface PageProps {
  walletToQuery: string;
  assets: AssetTypes[];
}

export async function getServerSideProps(context: {
  query: { wallet: string };
}) {
  const url = rpcEndpoint;

  // Replace with your API endpoint
  const walletToQuery =
    (context.query.wallet as string) ||
    "9m56puxb98BaPBv9xcfK6WN9PMYndjn9JpVycwUmwUBr";

  const getAssetsByOwner = async () => {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        jsonrpc: "2.0",
        id: "my-id",
        method: "getAssetsByOwner",
        params: {
          ownerAddress: walletToQuery,
          page: 1, // Starts at 1
          limit: 1000,
          displayOptions: {
            showFungible: true, // Return both fungible and non-fungible tokens
          },
        },
      }),
    });
    const { result } = await response.json();
    return result.items;
  };

  const assets = await getAssetsByOwner();

  return {
    props: {
      assets,
      walletToQuery,
    },
  };
}

// Main component for the page
const Home: React.FC<PageProps> = ({ assets, walletToQuery }) => {
  // console.log("walletToQuery", walletToQuery);

  return (
    <main className="container mx-auto">
      <div>
        <OwnersAssects assets={assets} walletToQuery={walletToQuery} />
      </div>
    </main>
  );
};

export default Home;
