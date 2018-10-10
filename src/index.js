import React from "react";
import ReactDOM from "react-dom";
// import { createBrowserHistory } from "history";
// import { Router, Route, Switch } from "react-router-dom";

// import indexRoutes from "routes/index.jsx";
import RoutePaths from "./routes/routerender.jsx";

import "assets/scss/material-dashboard-pro-react.css?v=1.3.0";

// const hist = createBrowserHistory();

ReactDOM.render(<RoutePaths />, document.getElementById("root"));
