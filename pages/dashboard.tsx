import React, { useEffect, useState } from "react";
import OwnersAssects from "@/components/Assects/ownersAssects";
import { AssetTypes } from "@/types/interfaces";
import { useWallet } from "@solana/wallet-adapter-react";
import WalletConnectErr from "@/components/NotConnected/walletConnectErr";
import SkeletonBody from "@/components/Skeleton/SkeletonBody";
import ErrorComponent from "@/components/Error/errorPage";
export default function dashboard() {
  const {
    connected,
    // publicKey
  } = useWallet();
  const [assets, setAssets] = useState<AssetTypes[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const publicKey = "5KA1wAqUWMRmEe88zZVFc3jktEsDtGy9Cz8UU2i9b3WR";

  useEffect(() => {
    if (connected && publicKey) {
      const fetchAssets = async () => {
        setLoading(true);
        setError(null);

        try {
          const response = await fetch(
            `/api/get-assets?wallet=${publicKey.toString()}`
          );
          if (!response.ok) {
            throw new Error("Failed to fetch assets");
          }
          const data = await response.json();
          setAssets(data);
        } catch (error: any) {
          setError(error.message);
        } finally {
          setLoading(false);
        }
      };

      fetchAssets();
    }
  }, [connected, publicKey]);
  return (
    <div className="container mx-auto">
      {!connected && <WalletConnectErr />}
      {connected && loading && <SkeletonBody />}
      {connected && error && <ErrorComponent />}
      {connected && !loading && !error && (
        <OwnersAssects assets={assets} walletToQuery={publicKey.toString()} />
      )}
    </div>
  );
}
