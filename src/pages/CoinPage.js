import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import OutlinedButton from "../components/OutlinedButton";
import LineChart from "../components/DashboardComponents/LineChart";
import Header from "../components/Header";
import Loader from "../components/Loader";
import List from "../components/DashboardComponents/List";
import CoinPageList from "../components/CoinPageComponents/CoinPageList";
import CoinPageDesc from "../components/CoinPageComponents/CoinPageDesc";
import SelectDays from "../components/CoinPageComponents/SelectDays";
import { getDaysArray } from "../functions/getDaysArray";
import { getPrices } from "../functions/getPrices";
import { getPriorDate } from "../functions/getPriorDate";

function CoinPage() {
  const [searchParams] = useSearchParams();
  console.log(searchParams);

  const [data, setData] = useState();
  const [dates, setDates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingChart, setLoadingChart] = useState(true);
  const [coin, setCoin] = useState({});
  const [days, setDays] = useState(30);

  const options = {
    plugins: {
      legend: {
        display: false,
      },
    },
    responsive: true,
    interaction: {
      mode: "index",
      intersect: false,
    },
  };

  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        data: [],
        borderWidth: 2,
        fill: false,
        tension: 0.25,
        backgroundColor: "#111",
        borderColor: "#3a80e9",
        pointRadius: 0,
      },
    ],
  });

  const [prices, setPrices] = useState([]);

  const today = new Date();
  const priorDate = new Date(new Date().setDate(today.getDate() - days));

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

    console.log("ersponse data>>>", response_data.data);

    const API_URL2 = `https://api.coingecko.com/api/v3/coins/${response_data.data.id}/market_chart?vs_currency=usd&days=${days}&interval=daily`;

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
          backgroundColor: "#111",
          borderColor: "#3a80e9",
          pointRadius: 0,
        },
      ],
    });

    setLoadingChart(false);
    setLoading(false);

    setCoin({
      id: response_data.data.id,
      name: response_data.data.name,
      symbol: response_data.data.symbol,
      image: response_data.data.image.large,
      price_change_percentage_24h:
        response_data.data.market_data.price_change_percentage_24h,
      total_volume: response_data.data.market_data.total_volume.usd,
      current_price: response_data.data.market_data.current_price.usd,
      market_cap: response_data.data.market_data.market_cap.usd,
    });
  };

  const handleChange = async (event) => {
    setDays(event.target.value);
    const prices_data = await getPrices(data.id, event.target.value);
    setPrices(prices_data);
    const priorDate = getPriorDate(event.target.value);
    var dates = getDaysArray(priorDate, today);
    setChartData({
      labels: dates,
      datasets: [
        {
          data: prices_data?.map((data) => data[1]),
        },
      ],
    });
  };

  return (
    <>
      {loading && loadingChart ? (
        <Loader />
      ) : (
        <>
          <Header />
          <CoinPageList coin={coin} />
          <div className="coin-page-div">
            <p>
              Price Change in the last
              <SelectDays days={days} handleChange={handleChange} />
            </p>
            <LineChart chartData={chartData} options={options} />
          </div>
          <CoinPageDesc name={data.name} desc={data.description.en} />
        </>
      )}
    </>
  );
}

export default CoinPage;
