import React, { useState } from "react";
import styles from "./transactionTable.module.css";
import { getFirstAndLastFive } from "@/utils/truncateData";
import Link from "next/link";
import LoadingComponent from "../Loader/loadingComponent";
import { FiCopy, FiCheck } from "react-icons/fi";
import { useCopyToClipboard } from "../../utils/useCopyToClipboard";

const TransactionsTable = ({ transactionDetails }) => {
  const [copiedItem, setCopiedItem] = useState(null);
  const [isCopied, copyToClipboard] = useCopyToClipboard();

  const handleCopy = async (text, type) => {
    await copyToClipboard(text);
    setCopiedItem(type);
    setTimeout(() => setCopiedItem(null), 2000);
  };

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
              {transactionDetails.map((transactionData, index) => {
                const signerPublicKey =
                  transactionData.transaction.message.accountKeys.find(
                    (account) => account.signer === true
                  )?.pubkey;

                const firstSignature =
                  transactionData.transaction.signatures[0];

                return (
                  <tr key={index}>
                    <td>
                      <Link href={`/transactions/${firstSignature}`}>
                        {getFirstAndLastFive(firstSignature)}
                      </Link>
                      {/* {copiedItem === `${firstSignature}` ? (
                        <FiCheck className={styles.copyIcon} />
                      ) : (
                        <FiCopy
                          className={styles.copyIcon}
                          onClick={() => handleCopy(firstSignature || "N/A")}
                        />
                      )} */}
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
