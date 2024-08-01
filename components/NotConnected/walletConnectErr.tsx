import React from "react";
import styles from "./walletConnectErr.module.css";
import { NftImg } from "@/public/images";
import Image from "next/image";
import ConnectWallet from "../SolWallet/ConnectWallet";
export default function WalletConnectErr() {
  return (
    <div className={styles.WalletConnectErr}>
      <section>
        <div className={styles.WalletConnect_Img}>
          <Image src={NftImg} alt="Nft Image" width={500} height={500} />
        </div>{" "}
        <div className={styles.WalletConnect_Text}>
          {" "}
          <h1>Your wallet is not connected</h1>
          <p>Please connect your wallet to see some magic!</p>
          <ConnectWallet />
        </div>
      </section>{" "}
    </div>
  );
}
