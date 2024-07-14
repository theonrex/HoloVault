import React, { useState, useEffect } from "react";
import BlocksTable from "../../components/Blocks/blocksTable";
import ErrorComponent from "../../components/Error/loadingComponent";
import { fetchBlockDetails } from "../../lib/fetchBlock";

const Block = () => {
  const [blockDetails, setBlockDetails] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchBlockDetails();
        setBlockDetails(data);
      } catch (error) {
        setError(error.message || "An unknown error occurred.");
      }
    };

    fetchData();
  }, []);

  if (error) {
    return (
      <div>
        <ErrorComponent />
      </div>
    );
  }

  if (!blockDetails) {
    return (
      <div>
        <ErrorComponent />
      </div>
    );
  }

  return (
    <main className="container mx-auto">
      <div>
        <BlocksTable blockDetails={blockDetails} />
      </div>
    </main>
  );
};

export default Block;
