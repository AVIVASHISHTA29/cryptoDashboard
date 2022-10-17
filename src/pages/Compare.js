import React, { useState } from "react";
import CompareGraph from "../components/compareComponents/CompareGraph";
import SelectCryptos from "../components/compareComponents/Select";
import Header from "../components/Header";

function Compare() {
  const [crypto1, setCrypto1] = useState("");
  const [crypto2, setCrypto2] = useState("");

  return (
    <div>
      <Header />
      <SelectCryptos
        crypto1={crypto1}
        crypto2={crypto2}
        setCrypto1={setCrypto1}
        setCrypto2={setCrypto2}
      />
      <CompareGraph crypto1={crypto1} crypto2={crypto2} />
    </div>
  );
}

export default Compare;
