import React from "react";
import styles from "./Overview.module.css";
import { formatDate } from "../../utils/formatDate";
import Image from "next/image";
import SolImg from "../../public/images/solana-sol-logo.png";

const lamportsToSol = (lamports) => lamports / 1_000_000_000;

const Overview = ({ block, solPrice }) => {
  // Log values to check if they are valid
  console.log("SOL Price:", solPrice);
  console.log("Block Data:", block?.blockData);

  return (
    <div className={styles.Overview}>
      <div className={styles.overview_Body}>
        <h1>Overview</h1>
        <ul>
          <li>
            <span>Block:</span>
            <span>{block?.slot}</span>
          </li>
          <li>
            <span>Block Hash</span>
            <span>{block?.blockHash}</span>
          </li>
          <li>
            <span>Block</span>
            <span>{block?.slot}</span>
          </li>
          <li>
            <span>Time: </span>
            <span>
              {block?.blockData?.blockTime
                ? formatDate(block.blockData.blockTime)
                : "N/A"}
            </span>
          </li>
          <li>
            <span>blockHeight: </span>
            <span>{block?.blockData?.blockHeight ?? "N/A"}</span>
          </li>
          <li>
            <span>parentSlot: </span>
            <span>{block?.blockData?.parentSlot ?? "N/A"}</span>
          </li>
          <li>
            <span>previousBlockhash: </span>
            <span>{block?.blockData?.previousBlockhash ?? "N/A"}</span>
          </li>
        </ul>
        {block?.blockData?.rewards?.map((reward, index) => {
          const solAmount = lamportsToSol(reward.lamports);
          const usdAmount = solAmount * solPrice;

          return (
            <ul key={index}>
              <li>
                <span>Reward Type: </span>
                <span>{reward.rewardType ? reward.rewardType : "N/A"}</span>
              </li>
              <li>
                <span>Reward in SOL: </span>
                <span className={styles.Reward}>
                  <span>
                    {" "}
                    <Image
                      src={SolImg}
                      alt="SolImg"
                      width={300}
                      height={300}
                    />{" "}
                    {solAmount.toFixed(5)}{" "}
                  </span>{" "}
                  {reward.lamports ? `$${usdAmount.toFixed(3)}` : ""}
                </span>
              </li>
            </ul>
          );
        })}
      </div>
    </div>
  );
};

export default Overview;
