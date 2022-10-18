import axios from "axios";
import React, { useEffect, useState } from "react";
import { COIN_GECKO_URL } from "../../../constants";
import CoinPageList from "../../CoinPageComponents/CoinPageList";
import Loader from "../../Loader";
import "./styles.css";

function ListFlex({ crypto1, crypto2, setCrypto1Desc, setCrypto2Desc }) {
  const [coin1, setCoin1] = useState({});
  const [coin2, setCoin2] = useState({});
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    getData();
  }, [crypto1, crypto2]);

  const getData = async () => {
    const API_URL = COIN_GECKO_URL + `${crypto1}`;

    const crypto1_response = await axios.get(API_URL, {
      crossDomain: true,
    });

    if (!crypto1_response) {
      console.log("No data");
      return;
    }
    console.log("response 1", crypto1_response);

    const API_URL2 = COIN_GECKO_URL + `${crypto2}`;

    const crypto2_response = await axios.get(API_URL2, {
      crossDomain: true,
    });

    if (!crypto2_response) {
      console.log("No data");
      return;
    }

    console.log("response 2", crypto2_response);

    setCoin1({
      id: crypto1_response.data.id,
      name: crypto1_response.data.name,
      symbol: crypto1_response.data.symbol,
      image: crypto1_response.data.image.large,
      price_change_percentage_24h:
        crypto1_response.data.market_data.price_change_percentage_24h,
      total_volume: crypto1_response.data.market_data.total_volume.usd,
      current_price: crypto1_response.data.market_data.current_price.usd,
      market_cap: crypto1_response.data.market_data.market_cap.usd,
    });
    setCrypto1Desc(crypto1_response.data.description.en);

    setCoin2({
      id: crypto2_response.data.id,
      name: crypto2_response.data.name,
      symbol: crypto2_response.data.symbol,
      image: crypto2_response.data.image.large,
      price_change_percentage_24h:
        crypto2_response.data.market_data.price_change_percentage_24h,
      total_volume: crypto2_response.data.market_data.total_volume.usd,
      current_price: crypto2_response.data.market_data.current_price.usd,
      market_cap: crypto2_response.data.market_data.market_cap.usd,
    });
    setCrypto2Desc(crypto2_response.data.description.en);
    setLoading(false);
  };

  return loading ? (
    <Loader />
  ) : (
    <div>
      <CoinPageList coin={coin1} />
      <CoinPageList coin={coin2} />
    </div>
  );
}

export default ListFlex;
