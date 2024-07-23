import React, { useEffect, useState } from "react";
import styles from "../ownersAssects.module.css";
import Link from "next/link";
import { LuExternalLink } from "react-icons/lu";
import { Connection, PublicKey } from "@solana/web3.js";
import * as web3 from "@solana/web3.js";
import { AssetTypes } from "@/types/interfaces";

interface PageProps {
  walletToQuery: string;
  fungibleTokenAccounts: AssetTypes[];
}

export default function FungibleTokenData({
  fungibleTokenAccounts,
  walletToQuery,
}: PageProps) {
  const [solBalance, setSolBalance] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSolBalance = async () => {
      try {
        const connection = new Connection(
          `https://mainnet.helius-rpc.com/?api-key=${process.env.NEXT_PUBLIC_HELIUS}`
        );
        const walletPublicKey = new PublicKey(walletToQuery);
        const balance = await connection.getAccountInfo(walletPublicKey);
        // Convert balance from lamports to SOL
        setSolBalance(balance!.lamports / web3.LAMPORTS_PER_SOL);
      } catch (error) {
        console.error("Error fetching SOL balance:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSolBalance();
  }, []);

  // console.log("fungibleTokenAccounts", fungibleTokenAccounts);

  // Calculate the total price of all tokens
  const totalPrice = fungibleTokenAccounts.reduce((total, account) => {
    return total + (account.token_info?.price_info?.total_price || 0);
  }, 0);

  // Sort fungibleTokenAccounts by total_price in descending order
  const sortedTokenAccounts = [...fungibleTokenAccounts].sort((a, b) => {
    const priceA = a.token_info?.price_info?.total_price || 0;
    const priceB = b.token_info?.price_info?.total_price || 0;
    return priceB - priceA; // Descending order
  });

  return (
    <div>
      <div className={styles.totalPriceContainer}>
        <h2 className={styles.subHeader}>Fungible Tokens</h2>
        <h3 className={styles.totalPrice}>
          <span>Total Value:</span> $
          {totalPrice
            ? totalPrice.toLocaleString(undefined, {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })
            : "N/A"}
        </h3>
        <h3 className={styles.totalPrice}>
          <span>SOL Balance:</span>{" "}
          {loading
            ? "Loading..."
            : solBalance.toLocaleString(undefined, {
                minimumFractionDigits: 4,
                maximumFractionDigits: 4,
              })}{" "}
          SOL
        </h3>
      </div>
      <div className={styles.tableContainer}>
        <table className={styles.token_table}>
          <thead>
            <tr>
              <th className={styles.headerCell}>Name</th>
              <th className={styles.headerCell}>Price</th>
              <th className={styles.headerCell}>Value (USDC)</th>
              <th className={styles.headerCell}>Token Amount</th>
              <th className={styles.headerCell}>Mint Addr</th>

              <th className={styles.headerCell}></th>
            </tr>
          </thead>
          <tbody className={styles.token_tbody}>
            {sortedTokenAccounts.map((account, index) => {
              const pricePerToken =
                account.token_info?.price_info?.price_per_token || 0;
              const totalPrice =
                account.token_info?.price_info?.total_price || 0;
              const tokenAmount =
                pricePerToken > 0
                  ? (totalPrice / pricePerToken).toLocaleString(undefined, {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })
                  : "N/A"; // Calculate token amount

              return (
                <tr key={index} className={styles.token_TR}>
                  <td className={styles.token_image}>
                    <div>
                      <img
                        src={
                          account?.content?.links?.image
                            ? account?.content?.links?.image
                            : `https://dd.dexscreener.com/ds-data/tokens/solana/${account?.id}.png`
                        }
                        alt={`${account?.content?.metadata?.name} logo`}
                      />
                      <span>{account?.content?.metadata?.name}</span>
                      <span className={styles.symbol}>
                        {" "}
                        ({account?.content?.metadata?.symbol || "N/A"})
                      </span>
                    </div>
                  </td>
                  <td className={styles.cell}>
                    {pricePerToken < 1
                      ? pricePerToken.toLocaleString(undefined, {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 8,
                        })
                      : pricePerToken.toLocaleString(undefined, {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        })}
                  </td>
                  <td className={styles.cell}>
                    $
                    {totalPrice.toLocaleString(undefined, {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </td>
                  <td className={styles.cell}>{tokenAmount}</td>
                  <td className={styles.cell}>
                    <Link
                      href={`https://solscan.io/token/${account?.id}`}
                      target="_blank"
                    >
                      {account?.id.length > 10
                        ? `${account?.id.slice(0, 5)}.......${account?.id.slice(
                            -5
                          )}`
                        : account?.id}
                    </Link>
                  </td>

                  <td className={styles.cell}>
                    <Link
                      className={styles.ViewMore}
                      href={`https://solscan.io/token/${account?.id}`}
                    >
                      View More <LuExternalLink />
                    </Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
