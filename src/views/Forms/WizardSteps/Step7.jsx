import React from "react";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import FormControlLabel from "@material-ui/core/FormControlLabel";

// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import UrbanCheckbox from "components/CustomCheckbox/UrbanCheckbox.jsx";


import customSelectStyle from "assets/jss/material-dashboard-pro-react/customSelectStyle.jsx";

const style = {
  infoText: {
    fontWeight: "300",
    margin: "10px 0 30px",
    textAlign: "center"
  },
  inputAdornmentIcon: {
    color: "#555"
  },
  inputAdornment: {
    position: "relative"
  },
  ...customSelectStyle
};

class Step4 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstname: "",
      firstnameState: "",
      lastname: "",
      lastnameState: "",
      email: "",
      emailState: ""
    };
  }
  sendState() {
    return this.state;
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
  change(event, stateName, type, stateNameEqualTo) {
    switch (type) {
      case "email":
        if (this.verifyEmail(event.target.value)) {
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
      default:
        break;
    }
    this.setState({ [stateName]: event.target.value });
  }
  // isValidated() {
  //   if (
  //     this.state.firstnameState === "success" &&
  //     this.state.lastnameState === "success" &&
  //     this.state.emailState === "success"
  //   ) {
  //     return true;
  //   } else {
  //     if (this.state.firstnameState !== "success") {
  //       this.setState({ firstnameState: "error" });
  //     }
  //     if (this.state.lastnameState !== "success") {
  //       this.setState({ lastnameState: "error" });
  //     }
  //     if (this.state.emailState !== "success") {
  //       this.setState({ emailState: "error" });
  //     }
  //   }
  //   return false;
  // }
  render() {
    const { classes } = this.props;
    return (
      <GridContainer justify="space-evenly" direction="row-reverse">
        <GridItem xs={12} sm={4}>
          <Card infographic>
            <CardHeader style={{ margin: "10px 0 -15px" }}>
              {/* <i className={"fal fa-lightbulb"} /> */}
              <i
                className={"far fa-lightbulb"}
                style={{ fontSize: "25px", color: "#ef4f67" }}
              />
            </CardHeader>
            <CardBody>
              <p style={{ color: "#3C4858", fontWeight: 400 }}>
                When mentioning Other Amenities please add a comma to separate
                the amenities.
              </p>
            </CardBody>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={6} md={5}>
          <h5 style={{ marginTop: "30px" }}>
            What amenities are included within the unit?
          </h5>
          <FormControlLabel
            control={
              <UrbanCheckbox
                onClick={event =>
                  this.change(event, "registerCheckbox", "checkbox")
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
        </GridItem>
      </GridContainer>
    );
  }
}

export default withStyles(style)(Step4);
