import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import OutlinedButton from "../components/OutlinedButton";
import LineChart from "../components/DashboardComponents/LineChart";
import Header from "../components/Header";
import Loader from "../components/Loader";
import List from "../components/DashboardComponents/List";

function CoinPage() {
  const [searchParams] = useSearchParams();
  console.log(searchParams);

  const [data, setData] = useState();
  const [dates, setDates] = useState([]);

  const [coin, setCoin] = useState({});

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
    labels: [],
    datasets: [
      {
        data: [],
        borderWidth: 2,
        fill: false,
        tension: 0.25,
        backgroundColor: "white",
        borderColor: "white",
        pointRadius: 0,
      },
    ],
  });

  const [prices, setPrices] = useState([]);

  const today = new Date();
  const priorDate = new Date(new Date().setDate(today.getDate() - 30));

  var getDaysArray = function (starting, ending) {
    for (
      var a = [], d = new Date(starting);
      d <= new Date(ending);
      d.setDate(d.getDate() + 1)
    ) {
      a.push(new Date(d).getDate() + "/" + (new Date(d).getUTCMonth() + 1));
    }
    return a;
  };

  useEffect(() => {
    if (searchParams) {
      getData();
    }
  }, [searchParams]);

  const getData = async () => {
    const API_URL = `https://api.coingecko.com/api/v3/coins/${searchParams}`;

    const response_data = await axios.get(API_URL.slice(0, -1), {
      crossDomain: true,
    });

    if (!response_data) {
      console.log("No data");
      return;
    }
    setData(response_data.data);

    console.log(response_data.data);

    const API_URL2 = `https://api.coingecko.com/api/v3/coins/${response_data.data.id}/market_chart?vs_currency=usd&days=30&interval=daily`;

    const prices_data = await axios.get(API_URL2, {
      crossDomain: true,
    });

    if (!prices_data) {
      console.log("No price data");
      return;
    }

    setPrices(prices_data.data.prices);

    var dates_2 = getDaysArray(priorDate, today);

    setChartData({
      labels: dates_2,
      datasets: [
        {
          data: prices_data?.data?.prices?.map((data) => data[1]),
          borderWidth: 2,
          fill: false,
          tension: 0.25,
          backgroundColor: "white",
          borderColor: "white",
          pointRadius: 0,
        },
      ],
    });

    setLoadingChart(false);
    setLoading(false);

    setCoin({
      id: response_data.data.id,
      name: response_data.data.name,
      image: response_data.data.image.large,
      symbol: response_data.data.symbol,
      market_cap: response_data.data.market_data.market_cap.usd,
      price_change_percentage_24h:
        response_data.data.market_data.price_change_24h,
      current_price: response_data.data.market_data.current_price.usd,
      total_volume: response_data.data.market_data.total_volume.usd,
      no_link: true,
    });
  };

  return (
    <>
      {loading && loadingChart ? (
        <Loader />
      ) : (
        <>
          <Header />
          <div className="data-list-div">
            <List coin={coin} />
          </div>
          <div className="data-list-div">
            <h2>Price Change in Last 30 days</h2>
            <LineChart chartData={chartData} options={options} />
          </div>
          <div className="data-list-div">
            <h2>{data.name}</h2>
            <p dangerouslySetInnerHTML={{ __html: data.description.en }} />
          </div>
        </>
      )}
    </>
  );
}

export default CoinPage;
