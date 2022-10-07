import Drawer from "./Drawer";
import React from "react";
import Button from "../Button";
import "./styles.css";

function Header() {
  return (
    <div className="navbar">
      <h1 className="heading">
        CryptoTracker<span style={{ color: "var(--blue)" }}>.</span>
      </h1>

      <div className="links-flex">
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
          <p className="links">
            <Button text="Dashboard" />
          </p>
        </a>
      </div>
      <div className="menu-div">
        <Drawer />
      </div>
    </div>
  );
}

export default Header;
