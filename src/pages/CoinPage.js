import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import LineChart from "../components/DashboardComponents/LineChart";
import Header from "../components/Header";
import Loader from "../components/Loader";

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
  const [chartData, setChartData] = useState({});
  const [prices, setPrices] = useState([]);
  const today = new Date();
  const priorDate = new Date(new Date().setDate(today.getDate() - 90));

  const getDateArray = (start, end) => {
    var arr = new Array();
    var dt = new Date(start);
    while (dt <= end) {
      arr.push(new Date(dt).getDate() + "/" + new Date(dt).getUTCMonth());
      dt.setDate(dt.getDate() + 1);
    }
    return arr;
  };

  useEffect(() => {
    if (searchParams) {
      const API_URL = `https://api.coingecko.com/api/v3/coins/${searchParams}`;
      axios
        .get(API_URL.slice(0, -1), { crossDomain: true })
        .then((response) => {
          if (response.data) {
            console.log(response.data);
            setData(response.data);

            if (response.data) {
              const API_URL2 = `https://api.coingecko.com/api/v3/coins/${response.data.id}/market_chart?vs_currency=usd&days=90&interval=daily`;
              axios.get(API_URL2, { crossDomain: true }).then((response2) => {
                if (response2.data) {
                  setPrices(response2.data.prices);
                  setLoadingChart(false);
                  setLoading(false);
                  setChartData({
                    labels: getDateArray(priorDate, today),
                    datasets: [
                      {
                        data: prices?.map((data) => data[1]),
                        borderWidth: 2,
                        fill: false,
                        tension: 0.25,
                        backgroundColor: "white",
                        borderColor: "white",
                        pointRadius: 0,
                      },
                    ],
                  });
                } else {
                  console.log("Could not get prices");
                }
              });
            }
          } else {
            console.log("Could not get data");
          }
        });
    }
  }, [searchParams]);

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
