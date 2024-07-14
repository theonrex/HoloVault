import React from "react";
import SolChart from "./SolPriceChart/solChart";
import SolData from "./solData";
export default function SolDataIndex(solanaData) {
  return (
    <div>
      <SolData solanaData={solanaData} />
      <SolChart solanaData={solanaData} />
    </div>
  );
}
