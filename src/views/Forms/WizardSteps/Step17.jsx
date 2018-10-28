import React from "react";
import PropTypes from "prop-types";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";

// react component plugin for creating a beautiful datetime dropdown picker
import Datetime from "react-datetime";

// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";

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
class Step17 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      minLease: "minLease",
      maxLease: "maxLease"
    };
  }
  sendState() {
    return this.state;
  }
  handleSimple = event => {
    this.setState({ [event.target.name]: event.target.value });
    if (this.props && this.props.callback) {
      this.props.callback(1);
    }
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

    const minLeaseItems = [];
    const maxLeaseItems = [];
    for (let i = 4; i <= 48; i++) {
      if (i <= 12) {
        minLeaseItems.push(
          <MenuItem
            classes={{
              root: classes.selectMenuItem,
              selected: classes.selectMenuItemSelected
            }}
            value={i + 1}
            key={i}
          >
            {i + " months"}
          </MenuItem>
        );
      }
      if (i >= 12) {
        maxLeaseItems.push(
          <MenuItem
            classes={{
              root: classes.selectMenuItem,
              selected: classes.selectMenuItemSelected
            }}
            value={i + 1}
            key={i}
          >
            {i + " months"}
          </MenuItem>
        );
      }
    }

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
                Tip: Shorter min rental periods can mean lower vacancy periods,
                but more often turnovers.
              </p>
            </CardBody>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={6} md={5}>
          <h5 style={{ marginBottom: "35px" }}>
            What is the minimum length of a tenant lease period?
          </h5>
          <FormControl fullWidth className={classes.selectFormControl}>
            <Select
              MenuProps={{
                className: classes.selectMenu
              }}
              classes={{
                select: classes.select
              }}
              value={this.state.minLease}
              onChange={this.handleSimple}
              inputProps={{
                name: "minLease",
                id: "minLease-select"
              }}
            >
              <MenuItem
                disabled
                classes={{
                  root: classes.selectMenuItem
                }}
                value="minLease"
              >
                Choose Minimum Lease Period
              </MenuItem>
              {minLeaseItems}
            </Select>
          </FormControl>
          <p style={{ margin: "-20px 0 60px 0", fontSize: "12px" }}>
            Minimum Lease periods can range between 4 - 12 months
          </p>
          <h5 style={{ marginBottom: "35px" }}>
            How about maximum length of leasing period? (Optional)
          </h5>
          <FormControl fullWidth className={classes.selectFormControl}>
            <Select
              MenuProps={{
                className: classes.selectMenu
              }}
              classes={{
                select: classes.select
              }}
              value={this.state.maxLease}
              onChange={this.handleSimple}
              inputProps={{
                name: "maxLease",
                id: "maxLease-select"
              }}
            >
              <MenuItem
                classes={{
                  root: classes.selectMenuItem
                }}
                value="maxLease"
              >
                Choose Maximum Lease Period
              </MenuItem>
              {maxLeaseItems}
            </Select>
          </FormControl>
          <p style={{ margin: "-20px 0 60px 0", fontSize: "12px" }}>
            Maximum Lease periods can range between 12 - 48 months
          </p>
        </GridItem>
      </GridContainer>
    );
  }
}

Step17.propTypes = {
  classes: PropTypes.object.isRequired,
  data: PropTypes.object,
  allStates: PropTypes.object.isRequired
};

export default withStyles(style)(Step17);
