import axios from "axios";
import { COIN_GECKO_URL } from "../constants";

export const getCoinData = async (id) => {
  console.log("hiii");
  const API_URL = COIN_GECKO_URL + `${id}`;
  console.log("api url", API_URL);
  const response_data = await axios.get(API_URL.slice(0, -1), {
    crossDomain: true,
  });

  console.log("response data", response_data);

  if (!response_data) {
    console.log("No data");
    return;
  }
  return response_data.data;
};
