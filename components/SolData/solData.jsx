import React from "react";
import styles from "./solData.module.css";
export default function SolData({ solanaData }) {
  // Function to format numbers with commas and two decimal places
  //console.log("solanaData", solanaData)
  const formatNumber = (num) => {
    return num?.toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };

  // Function to add ordinal suffixes to numbers
  const getOrdinalSuffix = (number) => {
    if (number === undefined || number === null) return "";
    const n = parseInt(number, 10);
    if (isNaN(n)) return number;

    const suffix = ["th", "st", "nd", "rd"];
    const mod = n % 100;
    return n + (suffix[(mod - 20) % 10] || suffix[mod] || suffix[0]);
  };

  return (
    <div className={styles.SolData}>
      <section>
        <div className={styles.SolData_Header}>
          <h3>SOL Supply</h3>
          <h1>{formatNumber(solanaData?.data?.market_data?.total_supply)}</h1>
        </div>
        <div className={styles.data_box}>
          <div>
            <h2>Circulating Supply</h2>
            <h3>
              {formatNumber(solanaData?.data?.market_data?.circulating_supply)}
            </h3>
          </div>
          <hr />
          <div>
            <h2>SOL Supply</h2>
            <h3>{formatNumber(solanaData?.data?.market_data?.total_supply)}</h3>
          </div>
        </div>
      </section>

      <section>
        <div className={styles.SolData_Header}>
          <h3>Market Cap Rank</h3>
          <h1>
            {getOrdinalSuffix(solanaData?.data?.market_data?.market_cap_rank)}
          </h1>
        </div>
        <div className={styles.data_box}>
          <div>
            <h2>All Time Low Price</h2>
            <h3>${formatNumber(solanaData?.data?.market_data?.ath.usd)}</h3>
          </div>
          <hr />
          <div>
            <h2> All TIme Low Price</h2>
            <h3> $ {formatNumber(solanaData?.data?.market_data?.atl.usd)}</h3>
          </div>
        </div>
      </section>

      <section>
        <div className={styles.SolData_Header}>
          <h3>Market Cap</h3>
          <h1>
            ${formatNumber(solanaData?.data?.market_data?.market_cap.usd)}
          </h1>
        </div>
        <div className={styles.data_box}>
          <div>
            <h2>Total Vol</h2>
            <h3>
              ${formatNumber(solanaData?.data?.market_data?.total_volume.usd)}
            </h3>
          </div>
          <hr />
          <div>
            <h2> Fully Diluted Vol</h2>
            <h3>
              {" "}
              ${" "}
              {formatNumber(
                solanaData?.data?.market_data?.fully_diluted_valuation.usd
              )}
            </h3>
          </div>
        </div>
      </section>
    </div>
  );
}
