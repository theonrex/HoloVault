import React from "react";
import styles from "./NoToken.module.css";
import { NftImg } from "@/public/images";
import Image from "next/image";
export default function NoToken() {
  return (
    <div className={styles.NoToken}>
      <section>
        <div className={styles.WalletConnect_Img}>
          <Image src={NftImg} alt="Nft Image" width={500} height={500} />
        </div>{" "}
        <div className={styles.WalletConnect_Text}>
          {" "}
          <h1>No token available</h1>
          <p>
            You can transfer tokens to this wallet or buy them on any
            centralized exchange.
          </p>
        </div>
      </section>{" "}
    </div>
  );
}
