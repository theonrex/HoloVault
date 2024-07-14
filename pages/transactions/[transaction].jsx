import { useRouter } from "next/router";
import { TransactionSlug } from "@/components/transactionSlug";
import ErrorComponent from "../../components/Error/loadingComponent";
const TransactionPage = ({ transaction, solPrice, error }) => {
  const router = useRouter();

  if (error) {
    return (
      <div>
        <ErrorComponent />
      </div>
    );
  }

  if (!transaction) {
    return (
      <div>
        {" "}
        <ErrorComponent />{" "}
      </div>
    );
  }

  return (
    <div>
      <TransactionSlug transaction={transaction} solPrice={solPrice} />
    </div>
  );
};

export const getServerSideProps = async (context) => {
  const { transaction: transactionSignature } = context.query;

  if (!transactionSignature) {
    console.log("No transactionSignature provided.");
    return {
      props: {
        transaction: null,
        error: "No transactionSignature provided.",
      },
    };
  }

  try {
    const [transactionResponse, solPriceResponse] = await Promise.all([
      fetch("https://api.mainnet-beta.solana.com", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          jsonrpc: "2.0",
          id: 1,
          method: "getTransaction",
          params: [transactionSignature, "json"],
        }),
      }),
      fetch(
        "https://api.coingecko.com/api/v3/simple/price?ids=solana&vs_currencies=usd"
      ),
    ]);

    if (!transactionResponse.ok) {
      throw new Error(`HTTP error! status: ${transactionResponse.status}`);
    }

    const [transactionData, solPriceData] = await Promise.all([
      transactionResponse.json(),
      solPriceResponse.json(),
    ]);

    return {
      props: {
        transaction: transactionData.result || null,
        solPrice: solPriceData.solana.usd || null,
        error: null,
      },
    };
  } catch (error) {
    console.error("Failed to fetch transaction:", error);

    return {
      props: {
        transaction: null,
        error: error.message || "An unknown error occurred.",
      },
    };
  }
};

export default TransactionPage;
