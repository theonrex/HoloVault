// const BASE_URL =
//   "https://nd-326-444-187.p2pify.com/9de47db917d4f69168e3fed02217d15b/";
// const MAX_RETRIES = 5;

// const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// const fetchWithRetries = async (options: RequestInit, retries = 0) => {
//   try {
//     const response = await fetch(BASE_URL, options);
//     if (!response.ok) {
//       throw new Error(`HTTP error! status: ${response.status}`);
//     }
//     return await response.json();
//   } catch (error) {
//     if (error.message.includes("429") && retries < MAX_RETRIES) {
//       const waitTime = 2 ** retries * 1000; // Exponential backoff
//       console.warn(`Rate limited. Retrying in ${waitTime / 1000} seconds...`);
//       await delay(waitTime);
//       return fetchWithRetries(options, retries + 1);
//     } else {
//       throw error;
//     }
//   }
// };

// export const fetchLatestBlockhash = async () => {
//   try {
//     // Fetch the latest slot number
//     const slotOptions = {
//       method: "POST",
//       headers: {
//         accept: "application/json",
//         "content-type": "application/json",
//       },
//       body: JSON.stringify({ id: 1, jsonrpc: "2.0", method: "getSlot" }),
//     };
//     const latestSlotResponse = await fetchWithRetries(slotOptions);
//     const latestSlot = latestSlotResponse.result;
//     const startSlot = latestSlot - 30;

//     // Fetch slot leaders for the range from startSlot to latestSlot
//     const leadersOptions = {
//       method: "POST",
//       headers: {
//         accept: "application/json",
//         "content-type": "application/json",
//       },
//       body: JSON.stringify({
//         id: 1,
//         jsonrpc: "2.0",
//         method: "getSlotLeaders",
//         params: [startSlot, latestSlot],
//       }),
//     };
//     const leadersResponse = await fetch(
//       "https://solana-mainnet.g.alchemy.com/v2/eS-KRB7Pbz9HaWD4kgciIfaNaFARKTAX",
//       leadersOptions
//     );
//     const leadersData = await leadersResponse.json();
//     const slotLeaders = leadersData.result;

//     console.log("slotLeaders", slotLeaders);

//     // Fetch block slots from startSlot to latestSlot
//     const blocksOptions = {
//       method: "POST",
//       headers: {
//         accept: "application/json",
//         "content-type": "application/json",
//       },
//       body: JSON.stringify({
//         id: 1,
//         jsonrpc: "2.0",
//         method: "getBlocks",
//         params: [startSlot, latestSlot],
//       }),
//     };
//     const blocksResponse = await fetchWithRetries(blocksOptions);
//     const blockSlots = blocksResponse.result;

//     // Fetch detailed block data for each slot and include the slot number and leader in the result
//     const blockDetails = await Promise.all(
//       blockSlots.map(async (slot: number, index: number) => {
//         // Fetch detailed block data
//         const blockOptions = {
//           method: "POST",
//           headers: {
//             accept: "application/json",
//             "content-type": "application/json",
//           },
//           body: JSON.stringify({
//             id: 1,
//             jsonrpc: "2.0",
//             method: "getBlock",
//             params: [
//               slot,
//               { encoding: "jsonParsed", maxSupportedTransactionVersion: 0 },
//             ],
//           }),
//         };
//         const blockResponse = await fetchWithRetries(blockOptions);
//         const blockData = blockResponse.result;

//         // Compute total rewards
//         const totalRewards = blockData.rewards.reduce(
//           (acc: number, reward: { lamports: number }) => acc + reward.lamports,
//           0
//         );

//         return {
//           slot: slot,
//           blockHash: blockData.blockhash,
//           timestamp: blockData.blockTime,
//           txCount: blockData.transactions.length,
//           leader: slotLeaders[index],
//           reward: totalRewards,
//         };
//       })
//     );

//     // Return block details sorted from latest to earliest
//     return blockDetails.reverse();
//   } catch (error) {
//     console.error("Error fetching block data:", error);
//     return [];
//   }
// };
