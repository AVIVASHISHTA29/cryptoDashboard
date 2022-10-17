import React, { useState } from "react";
import CompareGraph from "../components/ComparePageComponents/CompareGraph";
import ListFlex from "../components/ComparePageComponents/ListFlex";
import SelectCoins from "../components/ComparePageComponents/SelectCoins";
import Header from "../components/Header";

function ComparePage() {
  const [crypto1, setCrypto1] = useState("bitcoin");
  const [crypto2, setCrypto2] = useState("ethereum");
  const [days, setDays] = useState(30);
  const [crypto1Desc, setCrypto1Desc] = useState("");
  const [crypto2Desc, setCrypto2Desc] = useState("");

  return (
    <>
      <Header />
      <SelectCoins
        crypto1={crypto1}
        crypto2={crypto2}
        setCrypto1={setCrypto1}
        setCrypto2={setCrypto2}
        days={days}
        setDays={setDays}
      />
      <ListFlex
        crypto1={crypto1}
        crypto2={crypto2}
        setCrypto1Desc={setCrypto1Desc}
        setCrypto2Desc={setCrypto2Desc}
      />
      <CompareGraph crypto1={crypto1} crypto2={crypto2} days={days} />
      <div className="coin-page-div description">
        <h2>{crypto1}</h2>
        <p dangerouslySetInnerHTML={{ __html: crypto1Desc }} />
      </div>
      <div className="coin-page-div description">
        <h2>{crypto2}</h2>
        <p dangerouslySetInnerHTML={{ __html: crypto2Desc }} />
      </div>
    </>
  );
}

export default ComparePage;
