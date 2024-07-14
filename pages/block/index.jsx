import React from "react";
import BlocksTable from "../../components/Blocks/blocksTable";
import ErrorComponent from "../../components/Error/loadingComponent";
import { fetchBlockDetails } from "../../lib/fetchBlock";

const Block = ({ blockDetails, error }) => {
  console.log("error", error);
  if (error) {
    return (
      <div>
        <ErrorComponent />
      </div>
    );
  }

  if (!blockDetails || blockDetails === null || undefined) {
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

export async function getServerSideProps() {
  try {
    const blockDetails = await fetchBlockDetails();
    return {
      props: {
        blockDetails,
      },
    };
  } catch (error) {
    return {
      props: {
        blockDetails: [],
        error: error.message || "An unknown error occurred.",
      },
    };
  }
}

export default Block;
