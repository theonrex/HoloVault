import React from "react";
import styles from "../ownersAssects.module.css";
import Link from "next/link";
import { AssetTypes } from "@/types/interfaces";
import NoNft from "../NoNft/NoNft";

interface PageProps {
  walletToQuery: string;
  nftAccounts: AssetTypes[];
}

export default function NonFungibleTokenData({
  nftAccounts,
  walletToQuery,
}: PageProps) {
  // console.log("nftAccounts", nftAccounts);

  // Calculate the total price of all tokens
  const totalPrice = nftAccounts.reduce((total, account) => {
    return total + (account.token_info?.price_info?.total_price || 0);
  }, 0);

  // Filter out NFTs with empty symbol or image
  const filteredNftAccounts = nftAccounts.filter(
    (account) =>
      account?.content?.metadata?.symbol && account?.content?.links?.image
  );

  return (
    <div>
      {nftAccounts.length > 0 ? (
        <div>
          <div className={styles.totalPriceContainer}>
            <h2 className={styles.subHeader}> Non-Fungible Tokens</h2>
          </div>
          <div className={styles.tableContainer}>
            {" "}
            <div className={styles.totalPriceContainer}> </div>{" "}
            <div>
              <table className={styles.token_table}>
                <thead>
                  <tr>
                    <th className={styles.headerCell}>Name</th>
                    <th className={styles.headerCell}>Symbol</th>
                    <th className={styles.headerCell}>Mint Addr</th>
                  </tr>
                </thead>
                <tbody className={styles.token_tbody}>
                  {filteredNftAccounts.map((account, index) => (
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
                        </div>
                      </td>
                      <td className={styles.cell}>
                        {account?.content?.metadata?.symbol || "N/A"}
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
                            : account?.id}{" "}
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      ) : (
        <NoNft />
      )}
    </div>
  );
}
