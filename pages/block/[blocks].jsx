import React from "react";
import { fetchBlockBySlot } from "../../lib/fetchBlockBySlot";
import BlockSlug from "../../components/BlockSlug/index";
import ErrorComponent from "../../components/Error/loadingComponent";
import LoadingComponent from "@/components/Loader/loadingComponent";

const BlockPage = ({ block, error, solPrice }) => {
  if (error) {
    return (
      <div>
        <ErrorComponent />
      </div>
    );
  }

  if (!block) {
    return (
      <div>
        <LoadingComponent />
      </div>
    );
  }

  return (
    <div>
      <BlockSlug block={block} solPrice={solPrice} />
    </div>
  );
};

export const getServerSideProps = async (context) => {
  // Extract slot from context.params
  const slot = context.query;

  // Debugging: Log context.params and slot
  console.log("context.params:", context.query);
  console.log("slot:", slot);

  const slotNumber = Number(slot.blocks);

  console.log("slotNumber:", slotNumber);

  let block = null;
  let solPrice = 0;
  let error = null;

  try {
    // Fetch block data
    block = await fetchBlockBySlot(slotNumber);
  } catch (err) {
    console.error("Error fetching block data:", err);
    error = err.message || "An error occurred while fetching block data.";
  }

  try {
    // Fetch SOL price from CoinGecko
    const res = await fetch(
      "https://api.coingecko.com/api/v3/simple/price?ids=solana&vs_currencies=usd"
    );
    const data = await res.json();
    solPrice = data.solana?.usd || 0;
  } catch (err) {
    console.error("Error fetching SOL price from CoinGecko:", err);
    // solPrice remains 0 in case of an error
  }

  return { props: { block, solPrice, error } };
};

export default BlockPage;
