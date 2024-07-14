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

  if (!block || block === null || undefined) {
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
  const { slot } = context.params;

  // Convert slot to a number
  const slotNumber = Number(slot);

  try {
    // Fetch block data
    const block = await fetchBlockBySlot(slotNumber);

    // Fetch SOL price from CoinGecko
    const res = await fetch(
      "https://api.coingecko.com/api/v3/simple/price?ids=solana&vs_currencies=usd"
    );
    const data = await res.json();
    const solPrice = data.solana?.usd || null;

    return { props: { block, solPrice } };
  } catch (error) {
    console.error("Error fetching block data or SOL price:", error);
    return {
      props: {
        block: null,
        solPrice: null,
        error: error.message || "An unknown error occurred.",
      },
    };
  }
};

export default BlockPage;
