import React from "react";
import PropTypes from "prop-types";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import Danger from "components/Typography/Danger.jsx";
import Muted from "components/Typography/Muted.jsx";

import Close from "@material-ui/icons/Close";

// import LockOutline from "@material-ui/icons/LockOutline";

// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Button from "components/CustomButtons/Button.jsx";
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import ColoredLine from "components/ColoredLine/ColoredLine.jsx";

// firebase functionality
import { auth } from "firebase/index.js";

// dom components
import { urbanShelterColor } from "assets/jss/material-dashboard-pro-react.jsx";
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
    // request is being processed on redirect. This would avoid showing the same login screen while the user waits.
    // checking for Firebase redirect sign-ins
    auth
      .getRedirectResult()
      .then(result => {
        if (result.credential) {
          this.setState({ ...INITIAL_STATE });
        }
      })
      .catch(error => {
        this.setState({ error: error });
      });
    if (auth.getCurrentUser()) {
      this.setState({ ...INITIAL_STATE });
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
                        Sign Up
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
                        CONNECT WITH FACEBOOK
                      </Button>
                      <Button
                        color="google"
                        style={{ width: "100%" }}
                        onClick={() => {
                          auth.doSignInWithGoogle();
                        }}
                      >
                        <i className={"fab fa-google"} /> CONNECT WITH GOOGLE
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
                          this.setState({ redirect: { signup: true } })
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
                        SIGN UP WITH EMAIL
                      </Button>
                      <ColoredLine color="#707070" height={1} opacity={0.35} />
                      {error && <Danger>{error.message}</Danger>}
                      <div style={{ textAlign: "center", paddingBottom: 20 }}>
                        Already have an UrbanShelter account?{" "}
                        <a
                          href=""
                          style={{ color: urbanShelterColor, fontWeight: 500 }}
                          onClick={() =>
                            this.setState({ redirect: { login: true } })
                          }
                        >
                          Log In
                        </a>
                      </div>
                      {redirect.login && (
                        <Redirect to="/pages/login-page" push />
                      )}
                      {redirect.signup && (
                        <Redirect to="/pages/register-details" push />
                      )}
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
