import { useEffect, useState } from "react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import Image from "next/image";
import styles from "./solPrice.module.css";

export default function SolPrice() {
  const [solanaData, setSolanaData] = useState(null);
  const [error, setError] = useState(null);
  const [hasFetched, setHasFetched] = useState(false); 

  useEffect(() => {
    if (!hasFetched) {
      // Only fetch if data has not been fetched
      console.log("Fetching solana data...");
      fetch("/api/solanaData")
        .then((response) => {
          if (response.ok) {
            throw new Error(
              `Error fetching token: ${response.statusText}`
            );
          }
          return response.json();
        })
        .then((data) => {
          if (data.error) {
            throw new Error(data.error);
          }
          setSolanaData(data.solanaData);
          setHasFetched(true); 
        })
        .catch((err) => {
          setError(err.message);
        });
    }
  }, [hasFetched]); // Dependency array includes hasFetched to control fetch behavior

  useEffect(() => {
    console.log("solanaData state updated:", solanaData);
  }, [solanaData]);
  console.log("error:", error);
  console.log("hasFetched:", hasFetched);

  if (error) {
    return (
      <main className="">
        <div className="">
          <h1>Error</h1>
          <p>{error}</p>
        </div>
      </main>
    );
  }

  const formatMarketCap = (value) => {
    if (value >= 1e9) {
      return `${(value / 1e9).toFixed(2)}B`;
    } else if (value >= 1e6) {
      return `${(value / 1e6).toFixed(2)}M`;
    } else if (value >= 1e3) {
      return `${(value / 1e3).toFixed(2)}K`;
    } else {
      return value.toFixed(2);
    }
  };

  const priceChangePercentage =
    solanaData?.market_data?.price_change_percentage_24h.toFixed(2);
  const priceChangeClass =
    priceChangePercentage < 0
      ? styles.priceChangeNegative
      : styles.priceChangePositive;

  return (
    <div className="">
      {solanaData ? (
        <div className={styles.sol_div}>
          <div className={styles.sol_Img}>
            <Image
              src={solanaData.image.large}
              alt="Solana Logo"
              width={600}
              height={600}
            />
          </div>
          <ul>
            <li className={styles.current_price}>
              ${solanaData.market_data.current_price.usd}
            </li>
            <li className={priceChangeClass}>{priceChangePercentage}% </li>
          </ul>{" "}
          &nbsp;|
          <ul>
            <li className={styles.marketCap}>
              Market Cap: $
              {formatMarketCap(solanaData.market_data.market_cap.usd)}
            </li>
          </ul>
        </div>
      ) : (
        <p></p>
      )}
    </div>
  );
}
