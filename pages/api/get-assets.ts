import { NextApiRequest, NextApiResponse } from "next";

const rpcEndpoint = `https://mainnet.helius-rpc.com/?api-key=${process.env.NEXT_PUBLIC_HELIUS}`;

const getAssetsByOwner = async (ownerAddress: string) => {
  const response = await fetch(rpcEndpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      jsonrpc: "2.0",
      id: "my-id",
      method: "getAssetsByOwner",
      params: {
        ownerAddress,
        page: 1,
        limit: 1000,
        displayOptions: {
          showFungible: true, 
        },
      },
    }),
  });

  const { result } = await response.json();
  return result.items;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { wallet } = req.query;

  if (!wallet || typeof wallet !== "string") {
    return res.status(400).json({ error: "Invalid wallet address" });
  }

  try {
    const assets = await getAssetsByOwner(wallet);
    res.status(200).json(assets);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch assets" });
  }
}
