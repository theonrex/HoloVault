import React, { useEffect, useState } from "react";
import styles from "../ownersAssects.module.css";
import Link from "next/link";
import { LuExternalLink } from "react-icons/lu";
import { Connection, PublicKey } from "@solana/web3.js";
import * as web3 from "@solana/web3.js";
import { AssetTypes } from "@/types/interfaces";
import NoToken from "../NoToken/NoToken";

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
  const [tokenData, setTokenData] = useState<AssetTypes[]>([]);

  useEffect(() => {
    const fetchSolBalance = async () => {
      try {
        const connection = new Connection(
          `https://mainnet.helius-rpc.com/?api-key=${process.env.NEXT_PUBLIC_HELIUS}`
        );
        const walletPublicKey = new PublicKey(walletToQuery);
        const balance = await connection.getAccountInfo(walletPublicKey);
        setSolBalance(balance!.lamports / web3.LAMPORTS_PER_SOL);
      } catch (error) {
        console.error("Error fetching SOL balance:", error);
      } finally {
        setLoading(false);
      }
    };

    const fetchTokenData = async () => {
      const updatedTokenData = await Promise.all(
        fungibleTokenAccounts.map(async (account) => {
          if (
            !account.token_info?.price_info?.total_price ||
            !account.token_info?.balance
          ) {
            try {
              const response = await fetch(
                `https://api.coingecko.com/api/v3/simple/token_price/solana?contract_addresses=${account.id}&vs_currencies=usd`
              );
              const data = await response.json();
              const priceInfo = data[account.id]?.usd || 0;
              const balance = account.token_info?.balance || 0;
              const decimals = account.token_info?.decimals || 0;
              const convertedBalance = balance / Math.pow(10, decimals);
              const totalPrice = priceInfo * convertedBalance;
              return {
                ...account,
                token_info: {
                  ...account.token_info,
                  price_info: {
                    price_per_token: priceInfo,
                    total_price: totalPrice,
                  },
                  balance: balance,
                },
              };
            } catch (error) {
              console.error(
                `Error fetching data for token ${account.id}:`,
                error
              );
              return account;
            }
          }
          return account;
        })
      );
      setTokenData(updatedTokenData);
    };

    fetchSolBalance();
    fetchTokenData();
  }, [fungibleTokenAccounts, walletToQuery]);

  const totalPrice = tokenData.reduce((total, account) => {
    return total + (account.token_info?.price_info?.total_price || 0);
  }, 0);

  const sortedTokenAccounts = [...tokenData].sort((a, b) => {
    const priceA = a.token_info?.price_info?.total_price || 0;
    const priceB = b.token_info?.price_info?.total_price || 0;
    return priceB - priceA;
  });

  // Function to format the balance
  const formatBalance = (value: number, decimals: number) => {
    const formatted = parseFloat(value.toFixed(decimals));
    return formatted.toLocaleString(undefined, {
      minimumFractionDigits: 0,
      maximumFractionDigits: decimals,
    });
  };

  return (
    <div>
      {fungibleTokenAccounts.length > 0 ? (
        <div>
          <div className={styles.tableContainer}>
            <table className={styles.token_table}>
              <thead>
                <tr>
                  <th className={styles.headerCell}>
                    <span>Name</span>
                  </th>
                  <th className={styles.headerCell}>
                    {" "}
                    <span> Price</span>{" "}
                  </th>
                  <th className={styles.headerCell}>
                    {" "}
                    <span>Value (USDC)</span>{" "}
                  </th>
                  <th className={styles.headerCell}>
                    <span>Token Amount</span>
                  </th>
                  <th className={styles.headerCell}>
                    <span>Mint Addr</span>
                  </th>
                  <th className={styles.headerCell}></th>
                </tr>
              </thead>
              <tbody className={styles.token_tbody}>
                {sortedTokenAccounts.map((account, index) => {
                  const pricePerToken =
                    account.token_info?.price_info?.price_per_token || 0;
                  const totalPrice =
                    account.token_info?.price_info?.total_price || 0;
                  const balance = account.token_info?.balance || 0;
                  const decimals = account.token_info?.decimals || 0;
                  const convertedBalance = balance / Math.pow(10, decimals);

                  // Calculate token amount
                  const tokenAmount =
                    pricePerToken > 0
                      ? convertedBalance.toLocaleString(undefined, {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        })
                      : "N/A";

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
                        {formatBalance(pricePerToken, 3)}
                      </td>
                      <td className={styles.cell}>
                        ${formatBalance(totalPrice, 3)}
                      </td>
                      <td className={styles.cell}>
                        {formatBalance(convertedBalance, 2)}
                      </td>
                      <td className={styles.cell}>
                        <Link
                          href={`https://solscan.io/token/${account?.id}`}
                          target="_blank"
                        >
                          {account?.id.length > 10
                            ? `${account?.id.slice(
                                0,
                                5
                              )}.......${account?.id.slice(-5)}`
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
      ) : (
        <NoToken />
      )}
    </div>
  );
}
