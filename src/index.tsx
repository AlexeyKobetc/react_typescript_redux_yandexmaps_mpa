import React from "react";
import ReactDOM from "react-dom";

import { HashRouter as Router } from "react-router-dom";
import App from "./components/App";
import Footer from "./components/Footer";
import Header from "./components/Header";

import PageTemplate from "./components/PageTemplate";
import AppStore from "./redux/Store";

ReactDOM.render(
  <React.StrictMode>
    <PageTemplate>
      <Router>
        <AppStore>
          <Header />
          <App />
          <Footer />
        </AppStore>
      </Router>
    </PageTemplate>
  </React.StrictMode>,
  document.getElementById("root")
);
