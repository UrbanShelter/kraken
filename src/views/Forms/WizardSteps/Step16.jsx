import React from "react";
import PropTypes from "prop-types";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";

// react component plugin for creating a beautiful datetime dropdown picker
import Datetime from "react-datetime";

// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import UrbanCheckbox from "components/CustomCheckbox/UrbanCheckbox.jsx";
import Muted from "components/Typography/Muted.jsx";
import ColoredLine from "components/ColoredLine/ColoredLine.jsx";

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
class Step15 extends React.Component {
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

  validDate(current) {
    // Static moment reference in the Datetime component
    const yesterday = Datetime.moment().subtract(1, "day");
    return current.isAfter(yesterday);
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
      <GridContainer justify="space-evenly">
        <GridItem xs={10}>
          <GridContainer>
            <GridItem xs={12} sm={10} md={8}>
              <h5>What is the start date of the leasing period?</h5>
            </GridItem>
            <GridItem xs={12} sm={10} md={8}>
              <FormControlLabel
                control={
                  <UrbanCheckbox
                    onClick={this.handleToggle("expedite")}
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
                  marginLeft: -12,
                  marginRight: 0,
                  fontSize: 14
                }}
                label={
                  "I want to get a Tenant for my home as soon as possible!"
                }
              />
            </GridItem>
            {this.state.checked[0] !== "expedite" && (
              <GridItem xs={12} sm={10} md={8}>
                <GridContainer>
                  <GridItem xs={12} md={8}>
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
                  </GridItem>
                  <GridItem xs={12} md={8}>
                    <FormControl fullWidth>
                      <Datetime
                        utc
                        timeFormat={false}
                        inputProps={{ placeholder: "MM/DD/YYYY" }}
                        isValidDate={this.validDate}
                        onChange={moment =>
                          this.setState({ startDate: moment.toDate() })
                        }
                      />
                    </FormControl>
                  </GridItem>
                </GridContainer>
              </GridItem>
            )}
          </GridContainer>
        </GridItem>
      </GridContainer>
    );
  }
}

Step15.propTypes = {
  classes: PropTypes.object.isRequired,
  data: PropTypes.object,
  allStates: PropTypes.object.isRequired
};

export default withStyles(style)(Step15);
