import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import LineChart from "../components/DashboardComponents/LineChart";
import Header from "../components/Header";
import Loader from "../components/Loader";
import { dates, prices } from "../prices";

function CoinPage() {
  const [searchParams] = useSearchParams();
  console.log(searchParams);

  const [data, setData] = useState();

  const options = {
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  const [loading, setLoading] = useState(true);
  const [loadingChart, setLoadingChart] = useState(true);
  const [chartData, setChartData] = useState({
    labels: dates,
    datasets: [
      {
        data: prices.map((item) => item[1]),
        borderWidth: 2,
        fill: false,
        tension: 0.25,
        backgroundColor: "white",
        borderColor: "white",
        pointRadius: 0,
      },
    ],
  });

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

  //   useEffect(() => {
  //     if (data) {
  //       const API_URL = `https://api.coingecko.com/api/v3/coins/${data.id}/market_chart?vs_currency=usd&days=30&interval=daily`;
  //       axios.get(API_URL).then((response) => {
  //         if (response.data) {
  //           setPrices("prices>>>>", response.data.prices);
  //           setLoadingChart(false);
  //           setChartData({
  //             labels: prices?.map((data) => data[0]),
  //             datasets: [
  //               {
  //                 data: prices?.map((data) => data[1]),
  //                 borderWidth: 2,
  //                 fill: false,
  //                 tension: 0.25,
  //                 backgroundColor: "white",
  //                 borderColor: "white",
  //                 pointRadius: 0,
  //               },
  //             ],
  //           });
  //         } else {
  //           console.log("Could not get prices");
  //         }
  //       });
  //     }
  //   }, [data]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <Header />
          <div>
            <LineChart chartData={chartData} options={options} />
          </div>
        </>
      )}
    </>
  );
}

export default CoinPage;
