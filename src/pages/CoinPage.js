import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Header from "../components/Header";
import Loader from "../components/Loader";

function CoinPage() {
  const [searchParams] = useSearchParams();
  console.log(searchParams);

  const [data, setData] = useState();
  const [prices, setPrices] = useState();
  const [loading, setLoading] = useState(true);
  const [loadingChart, setLoadingChart] = useState(true);

  useEffect(() => {
    if (searchParams) {
      const API_URL = `https://api.coingecko.com/api/v3/coins/${searchParams}`;
      axios.get(API_URL.slice(0, -1)).then((response) => {
        if (response.data) {
          console.log(response.data);
          setData(response.data);
          setLoading(false);
        } else {
          console.log("Could not get data");
        }
      });
    }
  }, [searchParams]);

  useEffect(() => {
    if (data) {
      const API_URL = `https://api.coingecko.com/api/v3/coins/${data.id}/market_chart?vs_currency=usd&days=30&interval=daily`;
      axios.get(API_URL).then((response) => {
        if (response.data) {
          setPrices(response.data.prices);
          setLoadingChart(false);
        } else {
          console.log("Could not get prices");
        }
      });
    }
  }, [data]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <Header />
          <p>got the data</p>
          {prices?.map((item, i) => (
            <>
              <p>{i}</p>
              <p>{item[1]}</p>
            </>
          ))}
        </>
      )}
    </>
  );
}

export default CoinPage;
