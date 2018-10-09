import React from "react";
import PropTypes from "prop-types";

// react component plugin for creating a beautiful datetime dropdown picker
import Datetime from "react-datetime";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import Danger from "components/Typography/Danger.jsx";
import Muted from "components/Typography/Muted.jsx";

import Close from "@material-ui/icons/Close";

// import LockOutline from "@material-ui/icons/LockOutline";

// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";
import Button from "components/CustomButtons/Button.jsx";
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import UrbanCheckbox from "components/CustomCheckbox/UrbanCheckbox.jsx";
import ColoredLine from "components/ColoredLine/ColoredLine.jsx";

// firebase functionality
import { auth } from "firebase/index.js";

// dom components
import registerPageStyle from "../../assets/jss/material-dashboard-pro-react/views/registerPageStyle";
import { Redirect } from "react-router-dom";

const INITIAL_STATE = {
  error: null,
  redirect: { login: false, signup: false, dashboard: false },
  // register form
  registerEmail: "",
  registerEmailState: "",
  registerFirstName: "",
  registerFirstNameState: "",
  registerLastName: "",
  registerLastNameState: "",
  registerPassword: "",
  registerPasswordState: "",
  registerCheckbox: false,
  registerCheckboxState: ""
};

class RegisterPageDetails extends React.Component {
  constructor(props) {
    super(props);
    // we use this to make the card to appear after the page has been rendered
    this.state = {
      ...INITIAL_STATE,
      cardAnimaton: "cardHidden"
    };

    this.registerClick = this.registerClick.bind(this);
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
  // function that returns true if value is email, false otherwise
  verifyEmail(value) {
    var emailRex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (emailRex.test(value)) {
      return true;
    }
    return false;
  }
  // function that verifies if a string has a given length or not
  verifyLength(value, length) {
    if (value.length >= length) {
      return true;
    }
    return false;
  }
  // function that verifies if two strings are equal
  compare(string1, string2) {
    if (string1 === string2) {
      return true;
    }
    return false;
  }
  // function that verifies if value contains only numbers
  verifyNumber(value) {
    var numberRex = new RegExp("^[0-9]+$");
    if (numberRex.test(value)) {
      return true;
    }
    return false;
  }
  // verifies if value is a valid URL
  verifyUrl(value) {
    try {
      new URL(value);
      return true;
    } catch (_) {
      return false;
    }
  }
  change(event, stateName, type, stateNameEqualTo, maxValue) {
    switch (type) {
      case "email":
        if (this.verifyEmail(event.target.value)) {
          this.setState({ [stateName + "State"]: "success" });
        } else {
          this.setState({ [stateName + "State"]: "error" });
        }
        break;
      case "password":
        if (this.verifyLength(event.target.value, 1)) {
          this.setState({ [stateName + "State"]: "success" });
        } else {
          this.setState({ [stateName + "State"]: "error" });
        }
        break;
      case "equalTo":
        if (this.compare(event.target.value, this.state[stateNameEqualTo])) {
          this.setState({ [stateName + "State"]: "success" });
        } else {
          this.setState({ [stateName + "State"]: "error" });
        }
        break;
      case "checkbox":
        if (event.target.checked) {
          this.setState({ [stateName + "State"]: "success" });
        } else {
          this.setState({ [stateName + "State"]: "error" });
        }
        break;
      case "number":
        if (this.verifyNumber(event.target.value)) {
          this.setState({ [stateName + "State"]: "success" });
        } else {
          this.setState({ [stateName + "State"]: "error" });
        }
        break;
      case "length":
        if (this.verifyLength(event.target.value, stateNameEqualTo)) {
          this.setState({ [stateName + "State"]: "success" });
        } else {
          this.setState({ [stateName + "State"]: "error" });
        }
        break;
      case "max-length":
        if (!this.verifyLength(event.target.value, stateNameEqualTo + 1)) {
          this.setState({ [stateName + "State"]: "success" });
        } else {
          this.setState({ [stateName + "State"]: "error" });
        }
        break;
      case "url":
        if (this.verifyUrl(event.target.value)) {
          this.setState({ [stateName + "State"]: "success" });
        } else {
          this.setState({ [stateName + "State"]: "error" });
        }
        break;
      case "min-value":
        if (
          this.verifyNumber(event.target.value) &&
          event.target.value >= stateNameEqualTo
        ) {
          this.setState({ [stateName + "State"]: "success" });
        } else {
          this.setState({ [stateName + "State"]: "error" });
        }
        break;
      case "max-value":
        if (
          this.verifyNumber(event.target.value) &&
          event.target.value <= stateNameEqualTo
        ) {
          this.setState({ [stateName + "State"]: "success" });
        } else {
          this.setState({ [stateName + "State"]: "error" });
        }
        break;
      case "range":
        if (
          this.verifyNumber(event.target.value) &&
          event.target.value >= stateNameEqualTo &&
          event.target.value <= maxValue
        ) {
          this.setState({ [stateName + "State"]: "success" });
        } else {
          this.setState({ [stateName + "State"]: "error" });
        }
        break;
      default:
        break;
    }
    switch (type) {
      case "checkbox":
        this.setState({ [stateName]: event.target.checked });
        break;
      default:
        this.setState({ [stateName]: event.target.value });
        break;
    }
  }
  registerClick = event => {
    const {
      registerEmail,
      registerPassword,
      registerEmailState,
      registerPasswordState,
      registerFirstNameState,
      registerLastNameState,
      registerCheckboxState
    } = this.state;
    let pass = true;

    if (registerEmailState === "" || registerEmailState === "error") {
      this.setState({ registerEmailState: "error" });
      pass = false;
    }
    if (registerPasswordState === "" || registerPasswordState === "error") {
      this.setState({ registerPasswordState: "error" });
      pass = false;
    }
    if (registerFirstNameState === "" || registerFirstNameState === "error") {
      this.setState({ registerFirstNameState: "error" });
      pass = false;
    }
    if (registerLastNameState === "" || registerLastNameState === "error") {
      this.setState({ registerLastNameState: "error" });
      pass = false;
    }
    if (registerCheckboxState === "" || registerCheckboxState === "error") {
      this.setState({ registerCheckboxState: "error" });
      pass = false;
    }
    if (pass) {
      auth
        .doCreateUserWithEmailAndPassword(registerEmail, registerPassword)
        .then(authUser => {
          this.setState({ ...INITIAL_STATE, redirect: { dashboard: true } });
        })
        .catch(error => {
          this.setState({ error: error });
        });
    }

    // prevents the page from reloading
    event.preventDefault();
  };
  render() {
    const { classes } = this.props;
    const { error, redirect } = this.state;
    return (
      <div className={classes.container}>
        <GridContainer justify="center">
          <GridItem xs={12} sm={10} md={7}>
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
                    <div style={{ textAlign: "center", paddingBottom: 20 }}>
                      Sign Up with{" "}
                      <a
                        href="#"
                        style={{ color: "#ef4f67", fontWeight: 500 }}
                        onClick={() => {
                          auth.doSignInWithFacebook();
                        }}
                      >
                        Facebook
                      </a>{" "}
                      or{" "}
                      <a
                        href="#"
                        style={{ color: "#ef4f67", fontWeight: 500 }}
                        onClick={() => {
                          auth.doSignInWithGoogle();
                        }}
                      >
                        Google
                      </a>
                    </div>
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
                    <form>
                      <CustomInput
                        urbanshelter
                        error={this.state.registerEmailState === "error"}
                        labelText="Email Address"
                        id="registeremail"
                        formControlProps={{
                          fullWidth: true
                        }}
                        inputProps={{
                          onChange: event =>
                            this.change(event, "registerEmail", "email"),
                          type: "email"
                        }}
                      />
                      <CustomInput
                        urbanshelter
                        error={this.state.registerFirstNameState === "error"}
                        labelText="First Name"
                        id="firstname"
                        formControlProps={{
                          fullWidth: true
                        }}
                        inputProps={{
                          onChange: event =>
                            this.change(
                              event,
                              "registerFirstName",
                              "length",
                              2
                            ),
                          type: "text"
                        }}
                      />
                      <CustomInput
                        urbanshelter
                        error={this.state.registerLastNameState === "error"}
                        labelText="Last Name"
                        id="lastname"
                        formControlProps={{
                          fullWidth: true
                        }}
                        inputProps={{
                          onChange: event =>
                            this.change(event, "registerLastName", "length", 2),
                          type: "text"
                        }}
                      />
                      <CustomInput
                        urbanshelter
                        error={this.state.registerPasswordState === "error"}
                        labelText="Password"
                        id="registerpassword"
                        formControlProps={{
                          fullWidth: true
                        }}
                        inputProps={{
                          onChange: event =>
                            this.change(event, "registerPassword", "password"),
                          type: "password"
                        }}
                      />
                      <h6>BIRTHDAY</h6>
                      <Muted>To sign up you must be 18 years or older.</Muted>
                      <FormControl fullWidth>
                        <Datetime
                          timeFormat={false}
                          inputProps={{ placeholder: "MM/DD/YYYY" }}
                        />
                      </FormControl>
                      <div
                        className={classes.checkboxAndRadio}
                        style={{
                          justify: "center",
                          display: "flex",
                          width: "100%",
                          wrap: "no-wrap"
                        }}
                      >
                        <FormControlLabel
                          control={
                            <UrbanCheckbox
                              onClick={event =>
                                this.change(
                                  event,
                                  "registerCheckbox",
                                  "checkbox"
                                )
                              }
                            />
                          }
                          classes={{
                            label:
                              classes.label +
                              (this.state.registerCheckboxState === "error"
                                ? " " + classes.labelError
                                : "")
                          }}
                          style={{
                            marginTop: 8,
                            marginLeft: 0,
                            marginRight: 0,
                            fontSize: 14
                          }}
                          label="I want to recieve policy updates, marketing material, inspirations and special offers"
                        />
                      </div>
                      <Button
                        color="urbanshelter"
                        style={{ width: "100%" }}
                        onClick={this.registerClick}
                      >
                        <i
                          className={
                            classes.socialButtonsIcons +
                            " " +
                            classes.marginRight +
                            " far fa-envelope"
                          }
                        />{" "}
                        SIGN UP
                      </Button>
                    </form>
                    <ColoredLine color="#707070" height={1} opacity={0.35} />
                    {error && <Danger>{error.message}</Danger>}
                    <div style={{ textAlign: "center", paddingBottom: 20 }}>
                      Already have an UrbanShelter account?{" "}
                      <a
                        href=""
                        style={{ color: "#ef4f67", fontWeight: 500 }}
                        onClick={() =>
                          this.setState({ redirect: { login: true } })
                        }
                      >
                        Log In
                      </a>
                    </div>
                    {redirect.login && <Redirect to="/pages/login-page" push />}
                    {redirect.signup && (
                      <Redirect to="/pages/register-page" push />
                    )}
                    {redirect.dashboard && <Redirect to="/dashboard" push />}
                  </CardBody>
                </GridItem>
              </GridContainer>
            </Card>
          </GridItem>
        </GridContainer>
      </div>
    );
  }
}

RegisterPageDetails.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(registerPageStyle)(RegisterPageDetails);
