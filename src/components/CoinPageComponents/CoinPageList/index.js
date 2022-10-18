import React from "react";
import List from "../../DashboardComponents/List";

function CoinPageList({ coin }) {
  return (
    <div className="coin-page-div">
      <List coin={coin} />
    </div>
  );
}

export default CoinPageList;
