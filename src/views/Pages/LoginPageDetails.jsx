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
  name: "",
  email: "",
  password: "",
  error: null,
  redirect: false,
  checked: []
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
                      <div style={{ textAlign: "center", paddingBottom: 20 }}>
                        Log In with{" "}
                        <a
                          href="#"
                          style={{ color: "#ef4f67", fontWeight: 500 }}
                        >
                          Facebook
                        </a>{" "}
                        or{" "}
                        <a
                          href="#"
                          style={{ color: "#ef4f67", fontWeight: 500 }}
                        >
                          Google
                        </a>
                      </div>
                      <GridContainer justify="center" alignItems="center">
                        <GridItem xs={5}>
                          <ColoredLine color="#707070" opacity="0.35" />
                        </GridItem>
                        <GridItem xs>
                          <div style={{ textAlign: "center" }}>
                            <Muted>or</Muted>
                          </div>
                        </GridItem>
                        <GridItem xs={5}>
                          <ColoredLine color="#707070" opacity="0.35" />
                        </GridItem>
                      </GridContainer>
                      <form>
                        <CustomInput
                          urbanshelter
                          labelText="Email adress"
                          id="email_adress"
                          formControlProps={{
                            fullWidth: true
                          }}
                          inputProps={{
                            type: "email"
                          }}
                        />
                        <CustomInput
                          urbanshelter
                          labelText="Password"
                          id="password"
                          formControlProps={{
                            fullWidth: true
                          }}
                          inputProps={{
                            type: "password"
                          }}
                        />
                        <Button color="urbanshelter" style={{ width: "100%" }}>
                          <Email />
                          LOG IN
                        </Button>
                      </form>
                      <ColoredLine color="#707070" opacity="0.35" />
                      {error && <Danger>{error.message}</Danger>}
                      <div style={{ textAlign: "center", paddingBottom: 20 }}>
                        Don&apos;t have an UrbanShelter account yet?{" "}
                        <a
                          href="#"
                          style={{ color: "#ef4f67", fontWeight: 500 }}
                        >
                          Sign Up
                        </a>
                      </div>
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

LoginPageDetails.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(registerPageStyle)(LoginPageDetails);
