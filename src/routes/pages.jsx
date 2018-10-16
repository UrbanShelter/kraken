import PricingPage from "views/Pages/PricingPage.jsx";
import LoginPage from "views/Pages/LoginPage.jsx";
import LoginPageDetails from "views/Pages/LoginPageDetails.jsx";
import RegisterPage from "views/Pages/RegisterPage.jsx";
import RegisterPageDetails from "views/Pages/RegisterPageDetails.jsx";

// @material-ui/icons
import PersonAdd from "@material-ui/icons/PersonAdd";
import Fingerprint from "@material-ui/icons/Fingerprint";
import MonetizationOn from "@material-ui/icons/MonetizationOn";

const pagesRoutes = [
  {
    path: "/pages/register-page",
    name: "Register Page",
    short: "Register",
    mini: "RP",
    icon: PersonAdd,
    component: RegisterPage
  },
  {
    path: "/pages/register-details",
    name: "Register Page",
    short: "Register",
    mini: "RP",
    icon: PersonAdd,
    component: RegisterPageDetails
  },
  {
    path: "/pages/login-page",
    name: "Login Page",
    short: "Login",
    mini: "LP",
    icon: Fingerprint,
    component: LoginPage
  },
  {
    path: "/pages/login-details",
    name: "Login Page",
    short: "Login",
    mini: "LP",
    icon: Fingerprint,
    component: LoginPageDetails
  },
  {
    path: "/pages/pricing-page",
    name: "Pricing Page",
    short: "Pricing",
    mini: "PP",
    icon: MonetizationOn,
    component: PricingPage
  },
  {
    redirect: true,
    path: "/",
    pathTo: "/pages/login-page",
    name: "Login"
  }
];

export default pagesRoutes;
