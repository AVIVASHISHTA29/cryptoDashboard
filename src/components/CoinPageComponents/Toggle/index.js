import * as React from "react";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import { getPrices } from "../../../functions/getPrices";
import { getPriorDate } from "../../../functions/getPriorDate";
import { getDaysArray } from "../../../functions/getDaysArray";

export default function ColorToggleButton({
  type,
  setType,
  days,
  chartData,
  setChartData,
  id,
}) {
  const today = new Date();
  const [isMobile, setIsMobile] = React.useState(false);

  const handleChange = async (event, newType) => {
    setType(newType);
    const priorDate = getPriorDate(days);
    var dates = getDaysArray(priorDate, today);
    const prices_data = await getPrices(id, days, newType);
    setChartData({
      labels: dates,
      datasets: [
        {
          data: prices_data?.map((data) => data[1]),
        },
      ],
    });
  };

  const sx = { fontSize: "0.7rem", padding: "0.5rem" };

  React.useEffect(() => {
    if (typeof window !== undefined) {
      if (window.innerWidth < 800) {
        setIsMobile(true);
      }
    }
  }, []);

  return (
    <ToggleButtonGroup
      color="primary"
      value={type}
      exclusive
      onChange={handleChange}
      aria-label="Platform"
      className="toggle-group"
      sx={{
        "&.Mui-selected, &.Mui-selected:hover": {
          color: "#3a80e9 !important",
          backgroundColor: "#3a80e9",
        },
        borderColor: "#3a80e9",
        border: "unset !important",
        "& .MuiToggleButtonGroup-grouped": {
          border: "1px solid !important",
          borderColor: "unset",
          color: "#3a80e9",
        },
        "& .MuiToggleButton-standard": {
          color: "#3a80e9",
        },
      }}
    >
      <ToggleButton value="prices" className="toggle-btn" sx={isMobile && sx}>
        Price
      </ToggleButton>
      <ToggleButton
        value="market_caps"
        className="toggle-btn"
        sx={isMobile && sx}
      >
        MKT Cap
      </ToggleButton>
      <ToggleButton
        value="total_volumes"
        className="toggle-btn"
        sx={isMobile && sx}
      >
        Volume
      </ToggleButton>
    </ToggleButtonGroup>
  );
}
