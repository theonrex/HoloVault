import React from "react";
import styles from "./transactionStyles.module.css";
import { formatDate } from "@/utils/formatDate";

// Function to convert lamports to SOL
const lamportsToSol = (lamports) => lamports / 1_000_000_000;

export function TransactionSlug({ transaction, solPrice }) {
  // Calculate fee deducted
  const preBalances = transaction?.meta?.preBalances || [];
  const postBalances = transaction?.meta?.postBalances || [];
  const feeDeductedLamports = preBalances[0] - postBalances[0];
  const feeDeductedSol = lamportsToSol(feeDeductedLamports);

  return (
    <div className={styles.Transaction_body}>
      {" "}
      <h1 className={styles.Details_H1}> Transaction Details</h1>
      <div className={styles.TransactionSlug}>
        <h1>Overview</h1>
        <ul>
          <li>
            <span>Signature:</span>
            <span>
              {transaction?.transaction?.signatures[0]
                ? transaction?.transaction?.signatures[0]
                : "N?A"}
            </span>
          </li>{" "}
          <li>
            <span>Block:</span>
            <span>{transaction?.slot ? transaction?.slot : "N/A"}</span>
          </li>
          <li>
            <span>Status:</span>
            <span
              className={
                transaction?.meta.err === null ? styles.success : styles.error
              }
            >
              {transaction?.meta.err === null ? "Success" : "Failed"}
            </span>
          </li>
          <li>
            <span>Time: </span>
            <span>
              {transaction?.blockTime
                ? formatDate(transaction?.blockTime)
                : "N/A"}
            </span>
          </li>{" "}
          <li>
            <span>Signer: </span>
            <span>
              {transaction?.transaction?.message?.accountKeys
                ? transaction?.transaction?.message?.accountKeys[0]
                : "N/A"}
            </span>
          </li>{" "}
          <li>
            <span>Balance Before:</span>
            <span>
              {preBalances ? lamportsToSol(preBalances[0]).toFixed(9) : "N/A"}{" "}
              SOL
            </span>
          </li>
          <li>
            <span>Balance After:</span>
            <span>
              {postBalances ? lamportsToSol(postBalances[0]).toFixed(9) : "N/A"}{" "}
              SOL
            </span>
          </li>
          <li>
            <span>Fee Deducted:</span>
            <span className={feeDeductedSol ? styles.feeNegative : "N/A"}>
              {feeDeductedSol
                ? `-${Math.abs(feeDeductedSol).toFixed(6)} SOL`
                : "None"}
              <span>
                {feeDeductedSol
                  ? `$${(Math.abs(feeDeductedSol) * solPrice).toFixed(5)}`
                  : ""}
              </span>
            </span>{" "}
          </li>
        </ul>
      </div>
    </div>
  );
}
