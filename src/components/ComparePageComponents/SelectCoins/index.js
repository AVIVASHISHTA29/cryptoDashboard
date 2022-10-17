import axios from "axios";
import React, { useEffect, useState } from "react";
import SelectComponent from "../Select";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import "./styles.css";

function SelectCoins({
  crypto1,
  crypto2,
  setCrypto1,
  setCrypto2,
  days,
  setDays,
}) {
  const API_URL =
    "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false";

  const [data, setData] = useState([]);

  const handleChange1 = (e) => {
    setCrypto1(e.target.value);
  };

  const handleChange2 = (e) => {
    setCrypto2(e.target.value);
  };

  const handleChange3 = (e) => {
    setDays(e.target.value);
  };

  useEffect(() => {
    axios.get(API_URL, { crossDomain: true }).then((response) => {
      if (response.data) {
        console.log(response.data);
        setData(response.data);
      } else {
        console.log("error");
      }
    });
  }, []);

  return (
    <div className="select-flex">
      <div className="text-select">
        <p>Crypto 1</p>
        <SelectComponent
          value={crypto1}
          handleChange={handleChange1}
          data={data}
          filter={crypto2}
        />
      </div>
      <div className="text-select">
        <p>Crypto 2</p>
        <SelectComponent
          value={crypto2}
          handleChange={handleChange2}
          data={data}
          filter={crypto1}
        />
      </div>
      <div className="text-select inverse">
        <Select
          value={days}
          onChange={handleChange3}
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
          <MenuItem value={7}>7 Days</MenuItem>
          <MenuItem value={30}>30 Days</MenuItem>
          <MenuItem value={60}>60 Days</MenuItem>
          <MenuItem value={90}>90 Days</MenuItem>
        </Select>
      </div>
    </div>
  );
}

export default SelectCoins;
