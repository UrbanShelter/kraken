import React from "react";
import { createBrowserHistory } from "history";
import { Router, Route, Switch } from "react-router-dom";

// components
import Pages from "layouts/Pages.jsx";
import Dashboard from "layouts/Dashboard.jsx";

// firebase functionality
import { firebase } from "firebase/index.js";

const hist = createBrowserHistory();

class RoutePaths extends React.Component {
  constructor(props) {
    super(props);

    this.state = { authenticated: false, indexRoutes: [] };
  }
  componentDidMount() {
    // listens in real time for auth state change
    // renders protected routes accordingly
    firebase.auth.onAuthStateChanged(user => {
      if (user) {
        // User is signed in.
        console.log("authorized");
        hist.length = 0;
        this.setState({ indexRoutes: [] });
        this.setState({
          indexRoutes: [{ path: "/", name: "Home", component: Dashboard }]
        });
      } else {
        // No user is signed in.
        console.log("unauthorized");
        hist.length = 0;
        this.setState({ indexRoutes: [] });
        this.setState({
          indexRoutes: [{ path: "/", name: "Pages", component: Pages }]
        });
      }
    });
  }
  render() {
    var { indexRoutes } = this.state;

    return (
      <Router history={hist}>
        <Switch>
          {indexRoutes.map((prop, key) => {
            return (
              <Route path={prop.path} component={prop.component} key={key} />
            );
          })}
        </Switch>
      </Router>
    );
  }
}

export default RoutePaths;
