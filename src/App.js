import "./App.css";
import Header from "./components/Header";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import CoinPage from "./pages/CoinPage";
import ComparePage from "./pages/Compare";
import { useEffect } from "react";

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
