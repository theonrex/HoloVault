import React, { useState, useEffect } from "react";
import { formatTimeAgo } from "../../utils/formatTimeAgo";
import { FiCopy, FiCheck } from "react-icons/fi";
import { useCopyToClipboard } from "../../utils/useCopyToClipboard";
import styles from "./blocksTable.module.css";
import Link from "next/link";
import { truncateData } from "../../utils/truncateData";
import SolImg from "../../public/images/solana-sol-logo.png";
import Image from "next/image";

export default function BlocksTable({ blockDetails }) {
  const [copiedItem, setCopiedItem] = useState(null);
  const [isCopied, copyToClipboard] = useCopyToClipboard();
  const [formattedBlockDetails, setFormattedBlockDetails] = useState([]);

  useEffect(() => {
    if (blockDetails) {
      setFormattedBlockDetails(
        blockDetails.map((block) => ({
          ...block,
          formattedTime: formatTimeAgo(block.timestamp),
        }))
      );
    }
  }, [blockDetails]);

  // Function to convert lamports to SOL
  const lamportsToSol = (lamports) => lamports / 1_000_000_000;

  const handleCopy = async (text, type) => {
    await copyToClipboard(text);
    setCopiedItem(type);
    setTimeout(() => setCopiedItem(null), 2000);
  };

  return (
    <div className={styles.BlocksTable}>
      <h1>Blocks</h1>
      {!blockDetails ? (
        <p>Loading...</p>
      ) : (
        <div className={styles.tableWrapper}>
          <table>
            <thead className={styles.tableHead}>
              <tr>
                <th>Block Hash</th>
                <th>Slot</th>
                <th>Time</th>
                <th>Tx Count</th>
                <th>Leader</th>
                <th>Reward (SOL)</th>
              </tr>
            </thead>
            <tbody className={styles.tableBody}>
              {formattedBlockDetails.map((block) => (
                <tr key={block.slot}>
                  <td>
                    <div>
                      <Link href={`/block/${block.slot}`}>
                        <span>
                          {block.blockHash
                            ? truncateData(block.blockHash)
                            : "N/A"}
                        </span>
                      </Link>
                      {copiedItem === `hash-${block.slot}` ? (
                        <FiCheck className={styles.copyIcon} />
                      ) : (
                        <FiCopy
                          className={styles.copyIcon}
                          onClick={() =>
                            handleCopy(
                              block.blockHash || "N/A",
                              `hash-${block.slot}`
                            )
                          }
                        />
                      )}
                    </div>
                  </td>
                  <td>{block.slot || "N/A"}</td>
                  <td>{block.formattedTime || "N/A"}</td>
                  <td>{block.txCount || "N/A"}</td>
                  <td>
                    <div>
                      <Link href={"#"}>
                        <span>
                          {block.leader ? truncateData(block.leader) : "N/A"}
                        </span>
                      </Link>
                      {copiedItem === `leader-${block.slot}` ? (
                        <FiCheck className={styles.copyIcon} />
                      ) : (
                        <FiCopy
                          className={styles.copyIcon}
                          onClick={() =>
                            handleCopy(
                              block.leader || "N/A",
                              `leader-${block.slot}`
                            )
                          }
                        />
                      )}
                    </div>
                  </td>
                  <td className={styles.Reward}>
                    <span>
                      {" "}
                      <Image
                        src={SolImg}
                        alt="SolImg"
                        width={300}
                        height={300}
                      />{" "}
                      {block.reward !== undefined
                        ? lamportsToSol(block.reward).toFixed(9)
                        : "N/A"}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
