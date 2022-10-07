import { useState } from "react";
import Drawer from "@mui/material/Drawer";
import MenuIcon from "@mui/icons-material/Menu";
import { IconButton } from "@mui/material";
import "./styles.css";
export default function TemporaryDrawer() {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <div className="menu-button">
        <IconButton onClick={() => setOpen(true)}>
          <MenuIcon style={{ color: "var(--white)" }} />
        </IconButton>
      </div>
      <Drawer anchor={"right"} open={open} onClose={() => setOpen(false)}>
        <div className="drawer-div">
          <a href="/">
            <p className="links">Home</p>
          </a>
          <a href="/search">
            <p className="links">Search</p>
          </a>
          <a href="/about-us">
            <p className="links">About Us</p>
          </a>
          <a href="/dashboard">
            <p className="links">Dashboard</p>
          </a>
        </div>
      </Drawer>
    </div>
  );
}
