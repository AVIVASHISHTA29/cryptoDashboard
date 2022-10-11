import * as React from "react";
import "./styles.css";
import Tab from "@mui/material/Tab";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import TabContext from "@mui/lab/TabContext";
import Grid from "../Grid";

function DashboardWrapper({ data }) {
  const [value, setValue] = React.useState(0);

  const style = {
    color: "white",
    width: "50vw",
    fontSize: "1.2rem",
    fontWeight: 600,
    fontFamily: "Inter",
    textTransform: "capitalize",
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className="tabs-wrapper">
      <TabContext value={value}>
        <TabList variant="fullWidth" value={value} onChange={handleChange}>
          <Tab label="Grid" sx={style} />
          <Tab label="List" sx={style} />
        </TabList>
        <TabPanel value={0}>
          <div className="grid-flex">
            {data.map((coin, i) => (
              <Grid coin={coin} key={i} />
            ))}
          </div>
        </TabPanel>
        <TabPanel value={1}>list</TabPanel>
      </TabContext>
    </div>
  );
}

export default DashboardWrapper;
