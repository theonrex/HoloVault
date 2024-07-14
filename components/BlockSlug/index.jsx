import React from "react";
import Overview from "./overview";
import TransactionTable from "./transactionTable";

export default function BlockSlug({ block, solPrice }) {
  return (
    <div>
      <Overview block={block} solPrice={solPrice} />
      <TransactionTable block={block} />
    </div>
  );
}
