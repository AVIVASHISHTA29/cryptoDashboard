import axios from "axios";
import React, { useEffect, useState } from "react";
import "./styles.css";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

function SelectCryptos({ crypto1, crypto2, setCrypto1, setCrypto2 }) {
  const API_URL =
    "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false";

  const [data, setData] = useState([]);

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

  const handleChange1 = async (event) => {
    setCrypto1(event.target.value);
    console.log("crypto111", crypto1);
  };
  const handleChange2 = async (event) => {
    setCrypto2(event.target.value);
    console.log("crypto222", crypto2);
  };

  return (
    <div>
      <Select
        value={crypto1}
        onChange={handleChange1}
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
        {data
          .filter((item1) => item1.id !== crypto2)
          .map((item, i) => (
            <MenuItem key={i} value={item.id}>
              {item.name}
            </MenuItem>
          ))}
      </Select>
      <Select
        value={crypto2}
        onChange={handleChange2}
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
        {data
          .filter((item2) => item2.id !== crypto1)
          .map((item, i) => (
            <MenuItem key={i} value={item.id}>
              {item.name}
            </MenuItem>
          ))}
      </Select>
    </div>
  );
}

export default SelectCryptos;
