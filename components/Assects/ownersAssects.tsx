import React, { useState, useEffect } from "react";
import styles from "./ownersAssects.module.css";
import SearchBar from "../SearchBar/searchbar";
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";
import FungibleTokenData from "./FungibleToken/fungibleTokenData";
import NonFungibleTokenData from "./NFTs/nonFungibleTokenData";
import { AssetTypes } from "@/types/interfaces";
import { Connection, PublicKey } from "@solana/web3.js";
import * as web3 from "@solana/web3.js";
interface OwnersAssectsProps {
  assets: AssetTypes[];
  walletToQuery: string;
}

export default function OwnersAssects({
  assets,
  walletToQuery,
}: OwnersAssectsProps) {
  const [nftAccounts, setNftAccounts] = useState<AssetTypes[]>([]);
  const [fungibleTokenAccounts, setFungibleTokenAccounts] = useState<
    AssetTypes[]
  >([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loading, setLoading] = useState(true);
  const [solBalance, setSolBalance] = useState(0);
  const [tokenData, setTokenData] = useState<AssetTypes[]>([]);

  // console.log("assets", assets);
  useEffect(() => {
    const fetchSolBalance = async () => {
      try {
        const connection = new Connection(
          `https://mainnet.helius-rpc.com/?api-key=${process.env.NEXT_PUBLIC_HELIUS}`
        );
        const walletPublicKey = new PublicKey(walletToQuery);
        const balance = await connection.getAccountInfo(walletPublicKey);
        setSolBalance(balance!.lamports / web3.LAMPORTS_PER_SOL);
      } catch (error) {
        console.error("Error fetching SOL balance:", error);
      } finally {
        setLoading(false);
      }
    };

    const fetchTokenData = async () => {
      const updatedTokenData = await Promise.all(
        fungibleTokenAccounts.map(async (account) => {
          if (
            !account.token_info?.price_info?.total_price ||
            !account.token_info?.balance
          ) {
            try {
              const response = await fetch(
                `https://api.coingecko.com/api/v3/simple/token_price/solana?contract_addresses=${account.id}&vs_currencies=usd`
              );
              const data = await response.json();
              const priceInfo = data[account.id]?.usd || 0;
              const balance = account.token_info?.balance || 0;
              const decimals = account.token_info?.decimals || 0;
              const convertedBalance = balance / Math.pow(10, decimals);
              const totalPrice = priceInfo * convertedBalance;
              return {
                ...account,
                token_info: {
                  ...account.token_info,
                  price_info: {
                    price_per_token: priceInfo,
                    total_price: totalPrice,
                  },
                  balance: balance,
                },
              };
            } catch (error) {
              console.error(
                `Error fetching data for token ${account.id}:`,
                error
              );
              return account;
            }
          }
          return account;
        })
      );
      setTokenData(updatedTokenData);
    };

    fetchSolBalance();
    fetchTokenData();
  }, [fungibleTokenAccounts, walletToQuery]);

  useEffect(() => {
    if (assets) {
      // Filter assets based on the `interface` field
      const nfts = assets.filter((account) => account.interface === "V1_NFT");
      const fungibleTokens = assets.filter(
        (account) => account.interface === "FungibleToken"
      );

      setNftAccounts(nfts);
      setFungibleTokenAccounts(fungibleTokens);
      setIsLoading(false);
    }
  }, [assets]);
  const totalPrice = tokenData.reduce((total, account) => {
    return total + (account.token_info?.price_info?.total_price || 0);
  }, 0);

  const sortedTokenAccounts = [...tokenData].sort((a, b) => {
    const priceA = a.token_info?.price_info?.total_price || 0;
    const priceB = b.token_info?.price_info?.total_price || 0;
    return priceB - priceA;
  });

  // Function to format the balance
  const formatBalance = (value: number, decimals: number) => {
    const formatted = parseFloat(value.toFixed(decimals));
    return formatted.toLocaleString(undefined, {
      minimumFractionDigits: 0,
      maximumFractionDigits: decimals,
    });
  };

  if (isLoading) {
    return <div></div>;
  }

  return (
    <div className={styles.OwnersAssects}>
      {/* <h1 className={styles.headerText}>Your Assets</h1> */}
      <div className={styles.totalPriceContainer}>
        <h3 className={styles.subHeader}>Fungible Tokens</h3>
        <h3 className={styles.totalPrice}>
          <span>Total Value:</span> $
          {totalPrice ? formatBalance(totalPrice, 2) : "N/A"}
        </h3>
        <h3 className={styles.totalPrice}>
          <span>SOL Balance:</span>{" "}
          {loading ? "Loading..." : formatBalance(solBalance, 4)} SOL
        </h3>
      </div>
      <div className="flex h-screen w-full justify-center pt-14 px-4">
        <div className="w-full">
          <TabGroup>
            <TabList className="flex gap-4">
              <Tab className="rounded-full py-1 px-3 text-sm/6 font-semibold text-white focus:outline-none data-[selected]:bg-white/10 data-[hover]:bg-white/5 data-[selected]:data-[hover]:bg-white/10 data-[focus]:outline-1 data-[focus]:outline-white">
                Token
              </Tab>
              <Tab className="rounded-full py-1 px-3 text-sm/6 font-semibold text-white focus:outline-none data-[selected]:bg-white/10 data-[hover]:bg-white/5 data-[selected]:data-[hover]:bg-white/10 data-[focus]:outline-1 data-[focus]:outline-white">
                Nfts
              </Tab>
            </TabList>
            <TabPanels className="mt-3">
              <TabPanel className="rounded-xl bg-white/5 p-3">
                <FungibleTokenData
                  fungibleTokenAccounts={fungibleTokenAccounts}
                  walletToQuery={walletToQuery}
                />
              </TabPanel>
              <TabPanel className="rounded-xl bg-white/5 p-3">
                <NonFungibleTokenData
                  nftAccounts={nftAccounts}
                  walletToQuery={walletToQuery}
                />
              </TabPanel>
            </TabPanels>
          </TabGroup>
        </div>
      </div>
    </div>
  );
}
