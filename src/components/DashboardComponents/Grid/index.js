import React from "react";
import "./styles.css";
function Grid({ coin }) {
  return (
    <div className="coin-box">
      <div className="logo-div">
        <img src={coin.image} className="logo" />
        <div className="coin-info">
          <p className="symbol">{coin.symbol}-USD</p>
          <p className="name">{coin.name}</p>
        </div>
      </div>
    </div>
  );
}

export default Grid;
