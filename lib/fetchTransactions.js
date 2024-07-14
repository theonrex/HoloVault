const BASE_URL = "https://api.mainnet-beta.solana.com";
const MAX_RETRIES = 5;

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const fetchWithRetries = async (options, retries = 0) => {
  try {
    const response = await fetch(BASE_URL, options);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    if (error.message.includes("429") && retries < MAX_RETRIES) {
      const waitTime = 2 ** retries * 1000; 
      console.warn(`Rate limited. Retrying in ${waitTime / 1000} seconds...`);
      await delay(waitTime);
      return fetchWithRetries(options, retries + 1);
    } else {
      throw error;
    }
  }
};

export const fetchTransactionDetails = async () => {
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
    const latestSlotResponse = await fetchWithRetries(slotOptions);
    const latestSlot = latestSlotResponse.result;
    const startSlot = latestSlot - 100;

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
    const blocksResponse = await fetchWithRetries(blocksOptions);
    const blockSlots = blocksResponse.result;

    // Fetch transactions for each block
    const transactionDetails = [];
    for (const slot of blockSlots) {
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
      const blockResponse = await fetchWithRetries(blockOptions);
      const blockData = blockResponse.result;

      blockData.transactions.forEach((transaction) => {
        transactionDetails.push({
          slot: slot,
          transactionHash: transaction.transaction.signatures[0],
          timestamp: blockData.blockTime,
          transaction: transaction.transaction,
          meta: transaction.meta,
        });
      });

      if (transactionDetails.length >= 30) break;
    }

    // Return the latest 30 transactions
    return transactionDetails.slice(0, 30).reverse();
  } catch (error) {
    console.error("Error fetching transaction data:", error);
    throw new Error(error.message || "An unknown error occurred.");
  }
};
