import React, { useEffect, useState } from "react";
import axios from "axios";
import Header from "../components/Header";
import Loader from "../components/Loader";
import DashboardWrapper from "../components/DashboardComponents/DashboardWrapper";
import Search from "../components/DashboardComponents/Search";

function Dashboard() {
  const API_URL =
    "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false";

  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  const filteredCoins = data?.filter(
    (coin) =>
      coin.name.toLowerCase().includes(search.toLowerCase()) ||
      coin.symbol.toLowerCase().includes(search.toLowerCase())
  );

  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  useEffect(() => {
    axios.get(API_URL, { crossDomain: true }).then((response) => {
      if (response.data) {
        console.log(response.data);
        setData(response.data);
        setLoading(false);
      } else {
        console.log("error");
      }
    });
  }, []);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <Header />
          <Search handleChange={handleChange} />
          <DashboardWrapper data={filteredCoins} />
        </>
      )}
    </>
  );
}

export default Dashboard;
