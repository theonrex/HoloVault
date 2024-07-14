// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default async function handler(req, res) {
  const options = {
    method: "GET",
    headers: { accept: "application/json" },
  };

  try {
    const response = await fetch(
      "https://api.coingecko.com/api/v3/coins/solana",
      options
    );
    if (!response.ok) {
      throw new Error(``);
    }
    const data = await response.json();
    console.log("console");
    res.status(200).json({ solanaData: data });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}


