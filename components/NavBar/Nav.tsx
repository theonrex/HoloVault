"use client";

import { Button, Navbar } from "flowbite-react";
import ConnectWallet from "../SolWallet/ConnectWallet";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import styles from "../SolWallet/ConnectWallet.module.css"

export function NavBody() {
  return (
    <Navbar fluid rounded className="bg-black">
      <Navbar.Brand href="https://flowbite-react.com">
        <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
          HoloVault
        </span>
      </Navbar.Brand>
      <div className="flex md:order-2">
        <div className={styles.ConnectWallet}>
          <WalletMultiButton />
        </div>{" "}
      </div>
    </Navbar>
  );
}
