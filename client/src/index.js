import React from "react";
import ReactDOM from "react-dom";
import LoginPage from "./components/Page/LoginPage";

import "./index.css";
import App from "./App";
import { BrowserRouter as Router, Route } from "react-router-dom";

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Route exact path="/login" component={LoginPage} />
      <Route path="/" component={App} />
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);
