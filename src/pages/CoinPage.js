import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import OutlinedButton from "../components/OutlinedButton";
import LineChart from "../components/DashboardComponents/LineChart";
import Header from "../components/Header";
import Loader from "../components/Loader";
import List from "../components/DashboardComponents/List";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

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
        backgroundColor: "white",
        borderColor: "white",
        pointRadius: 0,
      },
    ],
  });

  const [prices, setPrices] = useState([]);

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
    const API_URL2 = `https://api.coingecko.com/api/v3/coins/${data.id}/market_chart?vs_currency=usd&days=${event.target.value}&interval=daily`;

    const prices_data = await axios.get(API_URL2, {
      crossDomain: true,
    });

    if (!prices_data) {
      console.log("No price data");
      return;
    }

    setPrices(prices_data.data.prices);

    const priorDate_2 = new Date(
      new Date().setDate(today.getDate() - event.target.value)
    );

    var dates_2 = getDaysArray(priorDate_2, today);

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
  };

  return (
    <>
      {loading && loadingChart ? (
        <Loader />
      ) : (
        <>
          <Header />
          <div className="coin-page-div">
            <List coin={coin} />
          </div>
          <div className="coin-page-div">
            <p>
              Price Change in the last
              <span>
                <Select
                  value={days}
                  onChange={handleChange}
                  className="select-days"
                  sx={{
                    height: "2.5rem",
                    color: "var(--white)",
                    "& .MuiOutlinedInput-notchedOutline": {
                      borderColor: "var(--white)",
                    },
                    "& .MuiSvgIcon-root": {
                      color: "var(--white)",
                    },
                  }}
                >
                  <MenuItem value={7}>7</MenuItem>
                  <MenuItem value={30}>30</MenuItem>
                  <MenuItem value={60}>60</MenuItem>
                  <MenuItem value={90}>90</MenuItem>
                </Select>
              </span>
              days
            </p>
            <LineChart chartData={chartData} options={options} />
          </div>
          <div className="coin-page-div description">
            <h2>{data.name}</h2>
            <p dangerouslySetInnerHTML={{ __html: data.description.en }} />
          </div>
        </>
      )}
    </>
  );
}

export default CoinPage;
