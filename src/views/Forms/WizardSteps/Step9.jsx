import React from "react";
import PropTypes from "prop-types";

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

import { urbanShelterColor } from "assets/jss/material-dashboard-pro-react.jsx";
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

var amenities = {
  Deposits: ["0.5 Month's Rent", "1 Month's Rent", "2 Month's Rent"],
  Additional: ["No Smoking", "No Pets"],
  Safety: ["Smoke Detector", "Carbon-monoxide Detector", "Burglary Protection"]
};

class Step7 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      checked: []
    };
  }
  sendState() {
    return this.state;
  }
  handleToggle = value => () => {
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
  };
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
                style={{ fontSize: "25px", color: urbanShelterColor }}
              />
            </CardHeader>
            <CardBody>
              <p style={{ color: "#3C4858", fontWeight: 400 }}>
                It is advisable to have at least 8 photos for each listing.
                However, you can begin with just adding one photo. You can add
                more photos later. Including photos of all the different spaces
                the tenant can interact will help potential tenants to better
                imagine your place.
              </p>
            </CardBody>
          </Card>
          <Card infographic>
            <CardHeader style={{ margin: "10px 0 -15px" }}>
              {/* <i className={"fal fa-lightbulb"} /> */}
              <i
                className={"far fa-lightbulb"}
                style={{ fontSize: "25px", color: urbanShelterColor }}
              />
            </CardHeader>
            <CardBody>
              <p style={{ color: "#3C4858", fontWeight: 400 }}>
                Please make sure to take pictures in a well-lit room.
                Preferably, take photos during daylight hours.
              </p>
            </CardBody>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={6} md={5}>
          <h5 style={{ marginTop: "30px" }}>Precautions</h5>
          <GridContainer>
            {Object.keys(amenities).map(key => (
              <GridItem xs={12} key={key}>
                <h5
                  style={{
                    color: urbanShelterColor,
                    fontWeight: 450,
                    marginBottom: "-10px"
                  }}
                >
                  {key}
                </h5>
                {amenities[key].map(value => (
                  <GridItem xs={12} key={value}>
                    <FormControlLabel
                      control={
                        <UrbanCheckbox
                          onClick={this.handleToggle(value)}
                          classes={{
                            checked: classes.checked
                          }}
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
                        fontSize: 14,
                        fontWeight: 400
                      }}
                      label={value}
                    />
                  </GridItem>
                ))}
              </GridItem>
            ))}
          </GridContainer>
        </GridItem>
      </GridContainer>
    );
  }
}

Step7.propTypes = {
  classes: PropTypes.object.isRequired,
  allStates: PropTypes.object.isRequired
};

export default withStyles(style)(Step7);
