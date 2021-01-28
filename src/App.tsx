import React from "react";
import Router from "./Router";
import "./assets/sanitize.css";
import "./assets/style.css";
// import { Header } from "./components/Header";

const App = () => {
  return (
    <React.Fragment>
      {/* <Header /> */}
      <main className="head-main">
        <Router />
      </main>
    </React.Fragment>
  );
};

export default App;
