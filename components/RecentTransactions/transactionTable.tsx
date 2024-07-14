import React from "react";
import styles from "./transactionTable.module.css";
import { getFirstAndLastFive } from "@/utils/truncateData";
import Link from "next/link";
import LoadingComponent from "../Loader/loadingComponent";

const TransactionsTable = ({
  transactionDetails,
}: {
  transactionDetails: any;
}) => {
  return (
    <div className={styles.transactionOverview}>
      <div className={styles.transaction_Div}>
        <h1>Transactions</h1>
        <div className={styles.tableWrapper}>
          <table className={styles.transactionTable}>
            <thead className={styles.tableHead}>
              <tr>
                <th>Signatures</th>
                <th>Tx Hash</th>
                <th>Block</th>
                <th>Timestamp</th>
                <th>Meta</th>
                <th>Signer Public Key</th>
              </tr>
            </thead>
            <tbody className={styles.tableBody}>
              {transactionDetails.map((transactionData: any, index: number) => {
                const signerPublicKey =
                  transactionData.transaction.message.accountKeys.find(
                    (account: any) => account.signer === true
                  )?.pubkey;

                const firstSignature =
                  transactionData.transaction.signatures[0];

                return (
                  <tr key={index}>
                    <td>
                      <Link href={`/transactions/${firstSignature}`}>
                        {getFirstAndLastFive(firstSignature)}
                      </Link>
                    </td>
                    <td>
                      {getFirstAndLastFive(transactionData.transactionHash)}
                    </td>
                    <td>{transactionData.slot}</td>
                    <td>
                      {new Date(
                        transactionData.timestamp * 1000
                      ).toLocaleString()}
                    </td>
                    <td>
                      {
                        transactionData.transaction.message?.instructions[0]
                          ?.program
                      }
                    </td>
                    <td>{signerPublicKey}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default TransactionsTable;
