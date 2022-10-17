import axios from "axios";
import React, { useEffect, useState } from "react";
import LineChart from "../../DashboardComponents/LineChart";
import Loader from "../../Loader";
import "./styles.css";
function CompareGraph({ crypto1, crypto2, days }) {
  const [prices1, setPrices1] = useState([]);
  const [prices2, setPrices2] = useState([]);

  const today = new Date();
  const priorDate = new Date(new Date().setDate(today.getDate() - days));

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
    stacked: false,
    plugins: {
      title: {
        display: true,
        text: `Comparison betweeen ${crypto1} and ${crypto2}`,
      },
    },
    scales: {
      y: {
        type: "linear",
        display: true,
        position: "left",
      },
      y1: {
        type: "linear",
        display: true,
        position: "right",
        grid: {
          drawOnChartArea: false,
        },
      },
    },
  };

  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [],
  });

  useEffect(() => {
    getData();
  }, [crypto1, crypto2, days]);

  const getData = async () => {
    const API_URL = `https://api.coingecko.com/api/v3/coins/${crypto1}/market_chart?vs_currency=usd&days=${days}&interval=daily`;

    const prices_data1 = await axios.get(API_URL, {
      crossDomain: true,
    });

    if (!prices_data1) {
      console.log("No data");
      return;
    }
    setPrices1(prices_data1.data.prices);

    const API_URL2 = `https://api.coingecko.com/api/v3/coins/${crypto2}/market_chart?vs_currency=usd&days=${days}&interval=daily`;

    const prices_data2 = await axios.get(API_URL2, {
      crossDomain: true,
    });

    if (!prices_data2) {
      console.log("No price data");
      return;
    }

    setPrices2(prices_data2.data.prices);

    var dates = getDaysArray(priorDate, today);

    setChartData({
      labels: dates,
      datasets: [
        {
          label: crypto1,
          data: prices_data1?.data?.prices?.map((data) => data[1]),
          borderWidth: 2,
          fill: false,
          tension: 0.25,
          backgroundColor: "#111",
          borderColor: "#3a80e9",
          pointRadius: 0,
          yAxisID: "y",
        },
        {
          label: crypto2,
          data: prices_data2?.data?.prices?.map((data) => data[1]),
          borderWidth: 2,
          fill: false,
          tension: 0.25,
          backgroundColor: "#111",
          borderColor: "#61c96f",
          pointRadius: 0,
          yAxisID: "y1",
        },
      ],
    });
  };
  return (
    <div className="coin-page-div">
      <LineChart chartData={chartData} options={options} />
    </div>
  );
}

export default CompareGraph;
