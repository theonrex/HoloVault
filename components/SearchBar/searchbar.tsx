import React, { useState } from "react";
import styles from "./searchbar.module.css";
import { LuSearch } from "react-icons/lu";

interface SearchBarProps {
  walletToQuery: string;
}

export default function SearchBar({ walletToQuery }: SearchBarProps) {
  const [walletInput, setWalletInput] = useState(walletToQuery);

  const handleWalletChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setWalletInput(event.target.value);
  };

  const handleWalletSubmit = () => {
    if (walletInput.length === 43) {
      window.location.href = `/?wallet=${walletInput}`;
    } else {
      alert("Please enter a valid Solana wallet address (43 characters long).");
    }
  };

  return (
    <main className={styles.SearchBar_Body}>
      <div className={styles.SearchBar_div}>
        <input
          type="text"
          value={walletInput}
          onChange={handleWalletChange}
          placeholder="Enter Solana Wallet Address"
        />
        <button onClick={handleWalletSubmit} className="wallet-submit-button">
          <LuSearch />
        </button>
      </div>
    </main>
  );
}
