import React, { useState } from "react";
import styles from "./transactionTable.module.css";
import { truncateData } from "../../utils/truncateData";
import SolImg from "../../public/images/solana-sol-logo.png";
import Image from "next/image";
// Helper function to convert lamports to SOL
const lamportsToSOL = (lamports) => {
  return lamports / 1_000_000_000; // Convert lamports to SOL
};

// Helper function to format the timestamp
const formatTimestamp = (timestamp) => {
  const date = new Date(timestamp * 1000); // Convert from seconds to milliseconds
  return date.toLocaleString(); // Format date as a readable string
};

export default function TransactionTable({ block }) {
  const { transactions, blockTime } = block?.blockData || {};
  const [currentPage, setCurrentPage] = useState(1);
  const transactionsPerPage = 40;

  const indexOfLastTransaction = currentPage * transactionsPerPage;
  const indexOfFirstTransaction = indexOfLastTransaction - transactionsPerPage;
  const currentTransactions =
    transactions?.slice(indexOfFirstTransaction, indexOfLastTransaction) || [];

  const totalPages = Math.ceil(
    (transactions?.length || 0) / transactionsPerPage
  );

  const handleNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  const handlePreviousPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  console.log("block", block);

  return (
    <div className={styles.transactionOverview}>
      <div className={styles.transaction_Div}>
        <h1>Transaction Overview</h1>

        {currentTransactions.length === 0 ? (
          <p>No transactions found.</p>
        ) : (
          <div className={styles.tableWrapper}>
            <table className={styles.transactionTable}>
              <thead className={styles.tableHead}>
                <tr>
                  <th>Signature</th>
                  <th>Fee (SOL)</th>
                  <th>Instructions</th>
                  <th>By</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody className={styles.tableBody}>
                {currentTransactions.map((tx, index) => (
                  <tr key={index}>
                    <td>
                      {truncateData(tx.transaction.signatures[0] || "N/A")}
                    </td>
                    <td>
                      <div>
                        {" "}
                        <Image
                          src={SolImg}
                          alt="SolImg"
                          width={300}
                          height={300}
                        />{" "}
                        {lamportsToSOL(tx.meta?.fee || 0)}{" "}
                      </div>
                    </td>
                    <td>
                      {tx.transaction?.message.instructions.length || 0}{" "}
                      instruction(s)
                    </td>
                    <td>
                      {tx.transaction?.message.accountKeys.find(
                        (key) => key.signer
                      )?.pubkey || "N/A"}
                    </td>
                    <td
                      className={tx.meta?.err ? styles.failed : styles.success}
                    >
                      {tx.meta?.err ? "Failed" : "Success"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <div className={styles.pagination}>
          <button
            onClick={handlePreviousPage}
            disabled={currentPage === 1}
            className={styles.paginationButton}
          >
            Previous
          </button>
          <span className={styles.paginationInfo}>
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
            className={styles.paginationButton}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
