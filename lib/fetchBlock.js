const BASE_URL =
  "https://nd-326-444-187.p2pify.com/9de47db917d4f69168e3fed02217d15b/";

// Utility function to handle delays
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export const fetchBlockDetails = async () => {
  try {
    // Fetch the latest slot number
    const slotOptions = {
      method: "POST",
      headers: {
        accept: "application/json",
        "content-type": "application/json",
      },
      body: JSON.stringify({ id: 1, jsonrpc: "2.0", method: "getSlot" }),
    };
    const latestSlotResponse = await fetch(BASE_URL, slotOptions);
    if (!latestSlotResponse.ok) {
      throw new Error(`HTTP error! status: ${latestSlotResponse.status}`);
    }
    const latestSlotResponseData = await latestSlotResponse.json();
    const latestSlot = latestSlotResponseData.result;
    const startSlot = latestSlot - 30;

    // Fetch slot leaders for the range from startSlot to latestSlot
    const leadersOptions = {
      method: "POST",
      headers: {
        accept: "application/json",
        "content-type": "application/json",
      },
      body: JSON.stringify({
        id: 1,
        jsonrpc: "2.0",
        method: "getSlotLeaders",
        params: [startSlot, 30],
      }),
    };
    const leadersResponse = await fetch(
      "https://api.mainnet-beta.solana.com",
      leadersOptions
    );
    if (!leadersResponse.ok) {
      throw new Error(`HTTP error! status: ${leadersResponse.status}`);
    }
    const leadersData = await leadersResponse.json();
    const slotLeaders = leadersData.result;

    // Fetch block slots from startSlot to latestSlot
    const blocksOptions = {
      method: "POST",
      headers: {
        accept: "application/json",
        "content-type": "application/json",
      },
      body: JSON.stringify({
        id: 1,
        jsonrpc: "2.0",
        method: "getBlocks",
        params: [startSlot, latestSlot],
      }),
    };
    const blocksResponse = await fetch(BASE_URL, blocksOptions);
    if (!blocksResponse.ok) {
      throw new Error(`HTTP error! status: ${blocksResponse.status}`);
    }
    const blocksResponseData = await blocksResponse.json();
    const blockSlots = blocksResponseData.result;

    // Fetch detailed block data
    const blockDetails = await Promise.all(
      blockSlots.map(async (slot, index) => {
        const blockOptions = {
          method: "POST",
          headers: {
            accept: "application/json",
            "content-type": "application/json",
          },
          body: JSON.stringify({
            id: 1,
            jsonrpc: "2.0",
            method: "getBlock",
            params: [
              slot,
              { encoding: "jsonParsed", maxSupportedTransactionVersion: 0 },
            ],
          }),
        };
        const blockResponse = await fetch(BASE_URL, blockOptions);
        if (!blockResponse.ok) {
          throw new Error(`HTTP error! status: ${blockResponse.status}`);
        }
        const blockData = await blockResponse.json();

        // Total rewards
        const totalRewards = blockData.result.rewards.reduce(
          (acc, reward) => acc + reward.lamports,
          0
        );

        return {
          slot: slot,
          blockHash: blockData.result.blockhash || null,
          timestamp: blockData.result.blockTime || null,
          txCount: blockData.result.transactions.length || null,
          leader: slotLeaders[index] || null,
          reward: totalRewards || null,
        };
      })
    );

    // Return block details sorted from latest to earliest
    return blockDetails.reverse();
  } catch (error) {
    console.error("Error fetching block data:", error);
    throw new Error(error.message || "An unknown error occurred.");
  }
};
