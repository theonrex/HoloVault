// pages/transactions.js
import React from "react";
import TransactionsTable from "../../components/RecentTransactions/transactionTable";
import ErrorComponent from "../../components/Error/loadingComponent";
import LoadingComponent from "../../components/Loader/loadingComponent";
import { fetchTransactionDetails } from "../../lib/fetchTransactions";

const Transactions = ({ transactionDetails, error }) => {
  if (error) {
    return (
      <div>
        <ErrorComponent />
      </div>
    );
  }

  if (!transactionDetails) {
    return (
      <div>
        <LoadingComponent />
      </div>
    );
  }

  return (
    <main className="container mx-auto">
      <div>
        <TransactionsTable transactionDetails={transactionDetails} />
      </div>
    </main>
  );
};

export async function getServerSideProps() {
  try {
    const transactionDetails = await fetchTransactionDetails();
    return {
      props: {
        transactionDetails,
      },
    };
  } catch (error) {
    return {
      props: {
        transactionDetails: [],
        error: error.message || "An unknown error occurred.",
      },
    };
  }
}

export default Transactions;
