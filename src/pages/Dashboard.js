import React, { useEffect, useState } from "react";
import axios from "axios";
import Header from "../components/Header";
import DashboardWrapper from "../components/DashboardComponents/DashboardWrapper";

function Dashboard() {
  const API_URL =
    "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false";

  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get(API_URL).then((response) => {
      if (response.data) {
        console.log(response.data);
        setData(response.data);
      } else {
        console.log("error");
      }
    });
  }, []);

  return (
    <div>
      <Header />
      <DashboardWrapper data={data} />
    </div>
  );
}

export default Dashboard;
