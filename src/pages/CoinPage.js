import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import LineChart from "../components/DashboardComponents/LineChart";
import Header from "../components/Header";
import Loader from "../components/Loader";
import CoinPageList from "../components/CoinPageComponents/CoinPageList";
import CoinPageDesc from "../components/CoinPageComponents/CoinPageDesc";
import SelectDays from "../components/CoinPageComponents/SelectDays";
import { getDaysArray } from "../functions/getDaysArray";
import { getPrices } from "../functions/getPrices";
import { getPriorDate } from "../functions/getPriorDate";
import { getCoinData } from "../functions/getCoinData";

function CoinPage() {
  const [searchParams] = useSearchParams();
  const [data, setData] = useState();
  const [loading, setLoading] = useState(true);
  const [loadingChart, setLoadingChart] = useState(true);
  const [coin, setCoin] = useState({});
  const [days, setDays] = useState(30);
  const [prices, setPrices] = useState([]);
  const today = new Date();
  const priorDate = new Date(new Date().setDate(today.getDate() - days));

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

  useEffect(() => {
    if (searchParams) {
      getData();
    }
  }, [searchParams]);

  const getData = async () => {
    const response_data = await getCoinData(searchParams, true);
    setData(response_data);
    const prices_data = await getPrices(response_data.id, days);
    setPrices(prices_data);
    var dates = getDaysArray(priorDate, today);
    setChartData({
      labels: dates,
      datasets: [
        {
          data: prices_data?.map((data) => data[1]),
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
      id: response_data.id,
      name: response_data.name,
      symbol: response_data.symbol,
      image: response_data.image.large,
      price_change_percentage_24h:
        response_data.market_data.price_change_percentage_24h,
      total_volume: response_data.market_data.total_volume.usd,
      current_price: response_data.market_data.current_price.usd,
      market_cap: response_data.market_data.market_cap.usd,
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
