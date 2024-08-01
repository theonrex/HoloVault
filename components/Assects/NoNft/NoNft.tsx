import React from "react";
import styles from "./NoNft.module.css";
import { NftImg } from "@/public/images";
import Image from "next/image";
export default function NoNft() {
  return (
    <div className={styles.NoNft}>
      <section>
        <div className={styles.WalletConnect_Img}>
          <Image src={NftImg} alt="Nft Image" width={500} height={500} />
        </div>{" "}
        <div className={styles.WalletConnect_Text}>
          {" "}
          <h1>No Nft available</h1>
          <p>
            You can transfer Nfts to this wallet or buy them on any Nft
            Marketplace.
          </p>
        </div>
      </section>{" "}
    </div>
  );
}
