import "./App.css";
import Header from "./components/Header";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import CoinPage from "./pages/CoinPage";
import ComparePage from "./pages/Compare";
import { useEffect } from "react";
import {
  APP_AUTHOR,
  APP_DESCRIPTION,
  APP_KEYWORDS,
  APP_NAME,
  APP_URL,
} from "./constants";

function App() {
  // var cursor;
  // var cursorPointer;

  // useEffect(() => {
  //   cursor = document.getElementById("cursor");
  //   document.body.addEventListener("mousemove", function (e) {
  //     return (
  //       (cursor.style.left = e.clientX + "px"),
  //       (cursor.style.top = e.clientY + "px")
  //     );
  //   });

  //   cursorPointer = document.getElementById("cursor-pointer");
  //   document.body.addEventListener("mousemove", function (e) {
  //     return (
  //       (cursorPointer.style.left = e.clientX + "px"),
  //       (cursorPointer.style.top = e.clientY + "px")
  //     );
  //   });
  //   document.body.addEventListener("mousedown", function (e) {
  //     return (
  //       (cursor.style.height = "0.5rem"),
  //       (cursor.style.width = "0.5rem"),
  //       (cursorPointer.style.height = "2.5rem"),
  //       (cursorPointer.style.width = "2.5rem")
  //     );
  //   });
  //   document.body.addEventListener("mouseup", function (e) {
  //     return (
  //       (cursor.style.height = "0.3rem"),
  //       (cursor.style.width = "0.3rem"),
  //       (cursorPointer.style.height = "2rem"),
  //       (cursorPointer.style.width = "2rem")
  //     );
  //   });
  // }, []);
  const setInitialTheme = `
  function getUserPreference() {
    if(window.localStorage.getItem('theme')) {
      return window.localStorage.getItem('theme')
    }
    return window.matchMedia('(prefers-color-scheme: light)').matches 
      ? 'light' 
      : 'dark'
  }
  document.body.dataset.theme = getUserPreference();
`;

  return (
    <>
      <head>
        <title>{APP_NAME}</title>
        <meta name="description" content={APP_DESCRIPTION} />
        <link rel="icon" href="https://i.ibb.co/x6FTCCy/logo.png" />
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta
          name="viewport"
          content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no"
        />
        <link rel="canonical" href={APP_URL} />
        <meta name="keywords" content={APP_KEYWORDS} />
        <meta name="author" content={APP_AUTHOR} />
        {/* Social: Twitter */}
        <meta name="twitter:card" content="/icons/icon-72x72.png" />
        <meta name="twitter:site" content={APP_URL} />
        <meta name="twitter:title" content={APP_NAME} />
        <meta name="twitter:description" content={APP_DESCRIPTION} />
        <meta name="twitter:image:src" content="/icons/icon-72x72.png" />
        <meta name="twitter:image:alt" content="Logo" />
        {/* Social: Facebook / Open Graph */}
        <meta property="og:url" content={APP_URL} />
        <meta property="og:type" content="Events" />
        <meta property="og:title" content={APP_NAME} />
        <meta property="og:image" content="/icons/icon-72x72.png" />
        <meta property="og:description" content={APP_DESCRIPTION} />
        <meta property="og:site_name" content={APP_NAME} />
        {/* Social: Google+ / Schema.org */}
        <meta itemProp="name" content={APP_NAME} />
        <meta itemProp="description" content={APP_DESCRIPTION} />
        <meta itemProp="image" content="/icons/icon-72x72.png" />
      </head>
      <script dangerouslySetInnerHTML={{ __html: setInitialTheme }} />
      <div className="cursor" id="cursor"></div>
      <div className="cursor-pointer" id="cursor-pointer"></div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/compare" element={<ComparePage />} />
          <Route path="/coin" element={<CoinPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
