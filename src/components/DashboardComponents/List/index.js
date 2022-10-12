import React, { useEffect, useState } from "react";
import "./styles.css";
import TrendingUpRoundedIcon from "@mui/icons-material/TrendingUpRounded";
import TrendingDownRoundedIcon from "@mui/icons-material/TrendingDownRounded";

function List({ coin }) {
  const [volume, setVolume] = useState(coin.total_volume);

  useEffect(() => {
    if (volume) {
      if (volume >= 1000 && volume < 1000000) {
        setVolume(
          volume.toString().slice(0, -3) +
            "." +
            volume.toString().slice(-3, -1) +
            "K"
        );
      } else if (volume >= 1000000 && volume < 1000000000) {
        setVolume(
          volume.toString().slice(0, -6) +
            "." +
            volume.toString().slice(-6, -4) +
            "M"
        );
      } else if (volume >= 1000000000) {
        setVolume(
          volume.toString().slice(0, -9) +
            "." +
            volume.toString().slice(-9, -7) +
            "B"
        );
      }
    }
  }, [volume]);

  return (
    <tr className="list-wrapper">
      <td className="image-td">
        <img src={coin.image} className="list-logo" />
      </td>

      <td className="coin-info ">
        <p className="symbol td-text">{coin.symbol}-USD</p>
        <p className="name td-text">{coin.name}</p>
      </td>
      {coin.price_change_percentage_24h > 0 ? (
        <td className="chip-flex td-chip-flex ">
          <div
            className="chip td-text td-chips"
            style={{
              color: "var(--green)",
              borderColor: "var(--green)",
            }}
          >
            {"+" + coin.price_change_percentage_24h.toFixed(2) + " %"}
          </div>
          <TrendingUpRoundedIcon
            className="trending-icon td-icon"
            fontSize="2.5rem"
          />
        </td>
      ) : (
        <td className="chip-flex td-chip-flex">
          <div className="chip red td-text td-chips">
            {coin.price_change_percentage_24h.toFixed(2) + " %"}
          </div>
          <TrendingDownRoundedIcon
            className="trending-icon red td-icon"
            fontSize="2.5rem"
          />
        </td>
      )}
      {coin.price_change_percentage_24h > 0 ? (
        <td className="price td-text" style={{ textAlign: "left" }}>
          ${coin.current_price.toLocaleString()}
        </td>
      ) : (
        <td className="price price-red td-text" style={{ textAlign: "left" }}>
          ${coin.current_price.toLocaleString()}
        </td>
      )}

      <td className="name2 td-text td-volume">
        ${coin.total_volume.toLocaleString()}
      </td>
      <td className="name2 td-text td-volume-mobile">${volume}</td>
      <td className="name2 td-text td-cap">
        ${coin.market_cap.toLocaleString()}
      </td>
    </tr>
  );
}

export default List;
