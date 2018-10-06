import React from "react";
import PropTypes from "prop-types";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import InputAdornment from "@material-ui/core/InputAdornment";
import Icon from "@material-ui/core/Icon";
import Danger from "components/Typography/Danger.jsx";
import Muted from "components/Typography/Muted.jsx";

// @material-ui/icons
import Face from "@material-ui/icons/Face";
import Email from "@material-ui/icons/Email";
import EmailOutlined from "@material-ui/icons/EmailOutlined";
// import LockOutline from "@material-ui/icons/LockOutline";

// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";
import Button from "components/CustomButtons/Button.jsx";
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardFooter from "components/Card/CardFooter.jsx";

import { Redirect } from "react-router-dom";
// firebase functionality
import { auth } from "firebase/index.js";
import registerPageStyle from "../../assets/jss/material-dashboard-pro-react/views/registerPageStyle";

const INITIAL_STATE = {
  name: "",
  email: "",
  password: "",
  error: null,
  redirect: false
};

const byPropKey = (propertyName, value) => () => ({
  [propertyName]: value
});

const ColoredLine = ({ color, opacity }) => (
  <hr
    style={{
      color: color,
      backgroundColor: color,
      height: 1,
      opacity: opacity,
      maxWidth: "100"
    }}
  />
);

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
    const { name, email, password } = this.state;

    auth
      .doSignInWithEmailAndPassword(email, password)
      .then(authUser => {
        this.setState({ ...INITIAL_STATE, redirect: true });
      })
      .catch(error => {
        this.setState(byPropKey("error", error));
      });

    // prevents the page from reloading
    event.preventDefault();
  };
  render() {
    const { classes } = this.props;
    const { name, email, password, error, redirect } = this.state;
    return (
      <div className={classes.container}>
        <GridContainer justify="center">
          <GridItem xs={12} sm={7} md={7}>
            <form>
              <Card login className={classes[this.state.cardAnimaton]}>
                <GridContainer justify="center">
                  <GridItem xs={12} sm={10} md={9}>
                    <CardBody>
                      <h3
                        className={classes.cardTitle}
                        style={{ marginBottom: -10 }}
                      >
                        Sign Up
                      </h3>
                      <Button color="facebook" style={{ width: "100%" }}>
                        <i
                          className={
                            classes.socialButtonsIcons +
                            " " +
                            classes.marginRight +
                            " fab fa-facebook-square"
                          }
                        />{" "}
                        CONNECT WITH FACEBOOK
                      </Button>
                      <Button color="google" style={{ width: "100%" }}>
                        <i className={"fab fa-google"} /> CONNECT WITH GOOGLE
                      </Button>
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
                      <Button color="urbanshelter" style={{ width: "100%" }}>
                        <Email />
                        SIGN UP WITH EMAIL
                      </Button>
                      <ColoredLine color="#707070" opacity="0.35" />
                      {error && <Danger>{error.message}</Danger>}
                      <div style={{ textAlign: "center" }}>
                        <h6>
                          Already have an UrbanShelter account?{" "}
                          <a href="#" style={{ color: "#ef4f67" }}>
                            Log In
                          </a>
                        </h6>
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

RegisterPage.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(registerPageStyle)(RegisterPage);
