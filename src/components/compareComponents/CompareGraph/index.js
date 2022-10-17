import axios from "axios";
import React, { useEffect, useState } from "react";
import LineChart from "../../DashboardComponents/LineChart";
import "./styles.css";

function CompareGraph({ crypto1, crypto2, days }) {
  const [prices, setPrices] = useState([]);
  const [prices2, setPrices2] = useState([]);

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
        backgroundColor: "white",
        borderColor: "white",
        pointRadius: 0,
      },
    ],
  });

  const options = {
    plugins: {
      legend: {
        display: true,
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
        text: `Comparison Between ${crypto1} and ${crypto2} `,
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

        // grid line settings
        grid: {
          drawOnChartArea: false, // only want the grid lines for one axis to show up
        },
      },
    },
  };

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

  const getData = async () => {
    const API_URL = `https://api.coingecko.com/api/v3/coins/${crypto1}/market_chart?vs_currency=usd&days=${days}&interval=daily`;

    const prices_data = await axios.get(API_URL, {
      crossDomain: true,
    });

    if (!prices_data) {
      console.log("No price data");
      return;
    }

    const API_URL2 = `https://api.coingecko.com/api/v3/coins/${crypto2}/market_chart?vs_currency=usd&days=${days}&interval=daily`;

    const prices_data2 = await axios.get(API_URL2, {
      crossDomain: true,
    });

    if (!prices_data2) {
      console.log("No price data");
      return;
    }

    setPrices(prices_data.data.prices);
    setPrices2(prices_data2.data.prices);

    var dates_2 = getDaysArray(priorDate, today);

    setChartData({
      labels: dates_2,
      datasets: [
        {
          label: crypto1,
          data: prices_data?.data?.prices?.map((data) => data[1]),
          borderWidth: 2,
          fill: false,
          tension: 0.25,
          backgroundColor: "#111",
          borderColor: "#f94141",
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
          borderColor: "#3a80e9",
          pointRadius: 0,
          yAxisID: "y1",
        },
      ],
    });
  };

  useEffect(() => {
    getData();
  }, [crypto1, crypto2, days]);

  return (
    <div>
      <LineChart chartData={chartData} options={options} />
    </div>
  );
}

export default CompareGraph;
