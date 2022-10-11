import * as React from "react";
import "./styles.css";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
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

  function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box sx={{ p: 3 }}>
            <Typography sx={{ color: "white" }}>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }

  TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
  };

  return (
    <div className="tabs-wrapper">
      <Tabs
        variant="fullWidth"
        value={value}
        onChange={handleChange}
        aria-label="basic tabs example"
      >
        <Tab label="Grid" sx={style} />
        <Tab label="List" sx={style} />
      </Tabs>
      <TabPanel value={value} index={0}>
        {data.map((coin, i) => (
          <Grid coin={coin} key={i} />
        ))}
      </TabPanel>
      <TabPanel value={value} index={1}>
        list
      </TabPanel>
    </div>
  );
}

export default DashboardWrapper;
