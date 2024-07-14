import React from "react";
import ErrorComponent from "../components/Error/loadingComponent";
import SolDataIndex from "../components/SolData/SolDataIndex";

const Home = ({ solanaData, error }) => {
  if (error) {
    return (
      <div>
        <ErrorComponent message={error} />
      </div>
    );
  }

  if (!solanaData) {
    return (
      <div>
        <ErrorComponent message="Data is undefined or null" />
      </div>
    );
  }

  return (
    <main className="container mx-auto">
      <div>
        <SolDataIndex data={solanaData} />
      </div>
    </main>
  );
};

export async function getServerSideProps() {
  try {
    const res = await fetch(
      "https://api.coingecko.com/api/v3/coins/solana?localization=false&tickers=true&market_data=true&community_data=true&developer_data=true&sparkline=true"
    );
    if (!res.ok) {
      throw new Error(`Failed to fetch data: ${res.statusText}`);
    }
    const solanaData = await res.json();
    return {
      props: {
        solanaData,
        error: null, // Ensure error is null if there's no error
      },
    };
  } catch (error) {
    return {
      props: {
        solanaData: null, // Ensure solanaData is null if there's an error
        error: error.message,
      },
    };
  }
}

export default Home;
