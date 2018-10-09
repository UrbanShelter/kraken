import PropTypes from "prop-types";
import React from "react";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import Close from "@material-ui/icons/Close";
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import Button from "components/CustomButtons/Button.jsx";
// import LockOutline from "@material-ui/icons/LockOutline";
// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Danger from "components/Typography/Danger.jsx";
import Muted from "components/Typography/Muted.jsx";
import ColoredLine from "components/ColoredLine/ColoredLine.jsx";

// firebase functionality
import { auth } from "firebase/index.js";

// dom components
import registerPageStyle from "../../assets/jss/material-dashboard-pro-react/views/registerPageStyle";
import { Redirect } from "react-router-dom";

const INITIAL_STATE = {
  error: null,
  redirect: { login: false, signup: false, dashboard: false }
};

class RegisterPage extends React.Component {
  constructor(props) {
    super(props);
    // we use this to make the card to appear after the page has been rendered
    this.state = {
      ...INITIAL_STATE,
      cardAnimaton: "cardHidden"
    };
  }
  componentDidMount() {
    // we add a hidden class to the card and after 700 ms we delete it and the transition appears
    this.timeOutFunction = setTimeout(
      function() {
        this.setState({ cardAnimaton: "" });
      }.bind(this),
      700
    );
    // TODO: create a state variable for detecting when the redirect was initialized, to show a loader while the
    // request is being processed on redirect. This would avoid showing the same login screen while the user waits.
    // checking for Firebase redirect sign-ins
    auth
      .getRedirectResult()
      .then(result => {
        if (result.credential) {
          this.setState({ ...INITIAL_STATE, redirect: { dashboard: true } });
        }
      })
      .catch(error => {
        this.setState({ error: error });
      });
    if (auth.getCurrentUser()) {
      this.setState({ ...INITIAL_STATE, redirect: { dashboard: true } });
    }
  }
  componentWillUnmount() {
    clearTimeout(this.timeOutFunction);
    this.timeOutFunction = null;
  }
  render() {
    const { classes } = this.props;
    const { error, redirect } = this.state;
    return (
      <div className={classes.container}>
        <GridContainer justify="center">
          <GridItem xs={12} sm={10} md={7}>
            <form>
              <Card login className={classes[this.state.cardAnimaton]}>
                <div
                  style={{
                    alignItems: "center",
                    justifyContent: "flex-end",
                    display: "flex",
                    paddingRight: 16,
                    paddingTop: 12
                  }}
                >
                  <Button
                    justIcon
                    className={classes.modalCloseButton}
                    key="close"
                    aria-label="Close"
                    color="transparent"
                  >
                    <Close
                      className={classes.modalClose}
                      style={{ color: "#707070", opacity: 0.35 }}
                    />
                  </Button>
                </div>
                <GridContainer justify="center">
                  <GridItem xs={12} sm={10} md={9}>
                    <CardBody>
                      <h3
                        className={classes.cardTitle}
                        style={{ marginBottom: -10 }}
                      >
                        Log In
                      </h3>
                      <Button
                        color="facebook"
                        style={{ width: "100%" }}
                        onClick={() => {
                          auth.doSignInWithFacebook();
                        }}
                      >
                        <i
                          className={
                            classes.socialButtonsIcons +
                            " " +
                            classes.marginRight +
                            " fab fa-facebook-f"
                          }
                        />{" "}
                        LOG IN WITH FACEBOOK
                      </Button>
                      <Button
                        color="google"
                        style={{ width: "100%" }}
                        onClick={() => {
                          auth.doSignInWithGoogle();
                        }}
                      >
                        <i className={"fab fa-google"} /> LOG IN WITH GOOGLE
                      </Button>
                      <GridContainer justify="center" alignItems="center">
                        <GridItem xs={5}>
                          <ColoredLine
                            color="#707070"
                            height={1}
                            opacity={0.35}
                          />
                        </GridItem>
                        <GridItem xs>
                          <div style={{ textAlign: "center" }}>
                            <Muted>or</Muted>
                          </div>
                        </GridItem>
                        <GridItem xs={5}>
                          <ColoredLine
                            color="#707070"
                            height={1}
                            opacity={0.35}
                          />
                        </GridItem>
                      </GridContainer>
                      <Button
                        color="urbanshelter"
                        style={{ width: "100%" }}
                        onClick={() =>
                          this.setState({ redirect: { login: true } })
                        }
                      >
                        <i
                          className={
                            classes.socialButtonsIcons +
                            " " +
                            classes.marginRight +
                            " far fa-envelope"
                          }
                        />{" "}
                        LOG IN WITH EMAIL
                      </Button>
                      <ColoredLine color="#707070" height={1} opacity={0.35} />
                      {error && <Danger>{error.message}</Danger>}
                      <div style={{ textAlign: "center", paddingBottom: 20 }}>
                        Don&apos;t have an UrbanShelter account yet?{" "}
                        <a
                          href="/pages/register-page"
                          style={{ color: "#ef4f67", fontWeight: 500 }}
                          onClick={() =>
                            this.setState({ redirect: { signup: true } })
                          }
                        >
                          Sign Up
                        </a>
                      </div>
                      {redirect.login && (
                        <Redirect to="/pages/login-details" push />
                      )}
                      {redirect.signup && (
                        <Redirect to="/pages/register-page" push />
                      )}
                      {redirect.dashboard && <Redirect to="/dashboard" push />}
                    </CardBody>
                  </GridItem>
                </GridContainer>
              </Card>
            </form>
          </GridItem>
        </GridContainer>
      </div>
    );
  }
}

RegisterPage.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(registerPageStyle)(RegisterPage);
