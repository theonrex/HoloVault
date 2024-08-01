import React, { useEffect } from "react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { useWallet } from "@solana/wallet-adapter-react";
import { useRouter } from "next/router";
import styles from "./ConnectWallet.module.css";

export default function ConnectWallet() {
  const { connected } = useWallet();
  const router = useRouter();

  useEffect(() => {
    if (connected) {
      router.push("/dashboard");
    }
  }, [connected, router]);

  return (
    <div className={styles.ConnectWallet}>
      <WalletMultiButton />
    </div>
  );
}
