const BASE_URL =
  "https://nd-326-444-187.p2pify.com/9de47db917d4f69168e3fed02217d15b/";

export const fetchBlockBySlot = async (slot) => {
  // console.log("277576659277576659277576659", slot);
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

  const response = await fetch(BASE_URL, blockOptions);
  if (!response.ok) {
    throw new Error(`Failed to fetch block data: ${response.statusText}`);
  }

  const data = await response.json();
  if (!data.result) {
    throw new Error(`No block data found for slot ${slot}`);
  }

  const blockData = data.result;

  return {
    blockHash: blockData.blockhash,
    slot: slot,
    blockData,
  };
};
