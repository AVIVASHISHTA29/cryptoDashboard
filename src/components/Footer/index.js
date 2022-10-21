import React from "react";
import styles from "./styles.css";
import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookIcon from "@mui/icons-material/Facebook";
import EmailIcon from "@mui/icons-material/Email";
import InsertLinkIcon from "@mui/icons-material/InsertLink";
import TwitterIcon from "@mui/icons-material/Twitter";
function Footer() {
  return (
    <div id="footer" className="footer-wrapper">
      <h1 className="heading">CryptoTracker.</h1>
      <div className="socials">
        <InstagramIcon style={{ fontSize: "2rem" }} />
        <FacebookIcon style={{ fontSize: "2rem" }} />
        <TwitterIcon style={{ fontSize: "2rem" }} />
        <EmailIcon style={{ fontSize: "2rem" }} />
        <InsertLinkIcon style={{ fontSize: "2rem" }} />
      </div>
    </div>
  );
}

export default Footer;

//todo:seo
//todo:Add footer to every page + responsive.
//todo:Home Page more components.
//todo:news api for crypto prod
