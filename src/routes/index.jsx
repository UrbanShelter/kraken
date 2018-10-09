import Pages from "layouts/Pages.jsx";
import RTL from "layouts/RTL.jsx";
import Dashboard from "layouts/Dashboard.jsx";

var indexRoutes = [
  { path: "/rtl", name: "RTL", component: RTL },
  { path: "/dashboard", name: "Home", component: Dashboard },
  { path: "/", name: "Pages", component: Pages }
];

export default indexRoutes;
