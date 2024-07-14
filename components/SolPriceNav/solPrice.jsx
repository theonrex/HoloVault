import { useEffect, useState } from "react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import Image from "next/image";
import styles from "./solPrice.module.css";

export default function SolPrice() {
  const [solanaData, setSolanaData] = useState(null);
  const [hasFetched, setHasFetched] = useState(false);

  useEffect(() => {
    if (!hasFetched) {
      console.log("Fetching solana data...");
      fetch("https://api.coingecko.com/api/v3/coins/solana")
        .then((response) => {
          if (!response.ok) {
            throw new Error(`Error fetching token: ${response.statusText}`);
          }
          return response.json();
        })
        .then((data) => {
          setSolanaData(data);
          setHasFetched(true);
        })
        .catch((err) => {
          console.error("Fetch error:", err.message);
        });
    }
  }, [hasFetched]); // Dependency array includes hasFetched to control fetch behavior

  // useEffect(() => {
  //   console.log("solanaData state updated:", solanaData);
  // }, [solanaData]);
  // console.log("hasFetched:", hasFetched);

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
              M Cap: $
              {formatMarketCap(solanaData.market_data.market_cap.usd)}
            </li>
          </ul>
        </div>
      ) : null}
    </div>
  );
}
