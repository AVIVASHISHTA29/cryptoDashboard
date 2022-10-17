import React, { useState } from "react";
import CompareGraph from "../components/ComparePageComponents/CompareGraph";
import SelectCoins from "../components/ComparePageComponents/SelectCoins";
import Header from "../components/Header";

function ComparePage() {
  const [crypto1, setCrypto1] = useState("bitcoin");
  const [crypto2, setCrypto2] = useState("ethereum");
  const [days, setDays] = useState(30);

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
      <CompareGraph />
    </>
  );
}

export default ComparePage;
