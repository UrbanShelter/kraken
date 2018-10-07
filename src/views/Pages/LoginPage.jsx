import React from "react";
import PropTypes from "prop-types";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import Danger from "components/Typography/Danger.jsx";
import Muted from "components/Typography/Muted.jsx";

import Email from "@material-ui/icons/Email";
import Close from "@material-ui/icons/Close";

// import LockOutline from "@material-ui/icons/LockOutline";

// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";
import Button from "components/CustomButtons/Button.jsx";
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import ColoredLine from "components/ColoredLine/ColoredLine.jsx";

// firebase functionality
import { auth } from "firebase/index.js";
import registerPageStyle from "../../assets/jss/material-dashboard-pro-react/views/registerPageStyle";

const INITIAL_STATE = {
  error: null,
  redirect: false,
  checked: [],
  // login form
  loginEmail: "",
  loginEmailState: "",
  loginPassword: "",
  loginPasswordState: ""
};

const byPropKey = (propertyName, value) => () => ({
  [propertyName]: value
});

class LoginPageDetails extends React.Component {
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
  }
  componentWillUnmount() {
    clearTimeout(this.timeOutFunction);
    this.timeOutFunction = null;
  }
  checkFields() {
    const { name, email, password } = this.state;
    return name && email && password !== "" ? false : true;
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
  onSubmit = event => {
    const { email, password } = this.state;

    auth
      .doSignInWithEmailAndPassword(email, password)
      .then(() => {
        this.setState({ ...INITIAL_STATE, redirect: true });
      })
      .catch(error => {
        this.setState(byPropKey("error", error));
      });

    // prevents the page from reloading
    event.preventDefault();
  };
  handleToggle(value) {
    const { checked } = this.state;
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    this.setState({
      checked: newChecked
    });
  }
  render() {
    const { classes } = this.props;
    const { error } = this.state;
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
                      Log In with{" "}
                      <a href="#" style={{ color: "#ef4f67", fontWeight: 500 }}>
                        Facebook
                      </a>{" "}
                      or{" "}
                      <a href="#" style={{ color: "#ef4f67", fontWeight: 500 }}>
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
                        labelText="Email Address"
                        id="loginemail"
                        formControlProps={{
                          fullWidth: true
                        }}
                        inputProps={{
                          onChange: event =>
                            this.change(event, "loginEmail", "email"),
                          type: "email"
                        }}
                      />
                      <CustomInput
                        urbanshelter
                        labelText="Password"
                        id="loginpassword"
                        formControlProps={{
                          fullWidth: true
                        }}
                        inputProps={{
                          onChange: event =>
                            this.change(event, "loginPassword", "password"),
                          type: "password"
                        }}
                      />
                      <Button color="urbanshelter" style={{ width: "100%" }}>
                        <i
                          className={
                            classes.socialButtonsIcons +
                            " " +
                            classes.marginRight +
                            " far fa-envelope"
                          }
                        />{" "}
                        LOG IN
                      </Button>
                    </form>
                    <ColoredLine color="#707070" height={1} opacity={0.35} />
                    {error && <Danger>{error.message}</Danger>}
                    <div style={{ textAlign: "center", paddingBottom: 20 }}>
                      Don&apos;t have an UrbanShelter account yet?{" "}
                      <a href="#" style={{ color: "#ef4f67", fontWeight: 500 }}>
                        Sign Up
                      </a>
                    </div>
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

LoginPageDetails.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(registerPageStyle)(LoginPageDetails);
