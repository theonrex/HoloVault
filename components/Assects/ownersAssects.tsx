import React, { useState, useEffect } from "react";
import styles from "./ownersAssects.module.css";
import SearchBar from "../SearchBar/searchbar";
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";
import FungibleTokenData from "./FungibleToken/fungibleTokenData";
import NonFungibleTokenData from "./NFTs/nonFungibleTokenData";
import { AssetTypes } from "@/types/interfaces";

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

  // console.log("assets", assets);

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

  if (isLoading) {
    return <div></div>;
  }

  return (
    <div className={styles.OwnersAssects}>
      {/* <h1 className={styles.headerText}>Your Assets</h1> */}
      <SearchBar walletToQuery={walletToQuery} />

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
