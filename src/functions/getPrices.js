import axios from "axios";
import { COIN_GECKO_URL } from "../constants";

export const getPrices = async (id, days) => {
  const API_URL =
    COIN_GECKO_URL +
    `${id}/market_chart?vs_currency=usd&days=${days}&interval=daily`;

  const prices_data = await axios.get(API_URL, {
    crossDomain: true,
  });

  if (!prices_data) {
    console.log("No price data");
    return;
  }

  return prices_data.data.prices;
};
