import React from "react";
import PropTypes from "prop-types";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";

// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardHeader from "components/Card/CardHeader.jsx";

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

class Step4 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      country: "city",
      address: "",
      addressAdditional: "",
      town: "",
      province: "",
      postal: ""
    };
  }
  sendState() {
    return this.state;
  }
  handleSimple = event => {
    this.setState({ [event.target.name]: event.target.value });
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
              <i
                className={"far fa-lightbulb"}
                style={{ fontSize: "25px", color: urbanShelterColor }}
              />
            </CardHeader>
            <CardBody>
              <p style={{ color: "#3C4858", fontWeight: 400 }}>
                It is very helpful to create a detailed and realistic lisitng so
                that tenants can better evaluate the property for their needs,
                before visiting the home. A well listed property is more likely
                to get rented sooner.
              </p>
            </CardBody>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={6} md={5}>
          <h5 style={{ marginTop: "30px" }}>Which county is yor unit in?</h5>
          <FormControl fullWidth className={classes.selectFormControl}>
            <Select
              MenuProps={{
                className: classes.selectMenu
              }}
              classes={{
                select: classes.select
              }}
              value={this.state.country}
              onChange={this.handleSimple}
              inputProps={{
                name: "country",
                id: "country-select"
              }}
            >
              <MenuItem
                disabled
                classes={{
                  root: classes.selectMenuItem
                }}
                value="city"
              >
                Choose City
              </MenuItem>
              <MenuItem
                classes={{
                  root: classes.selectMenuItem,
                  selected: classes.selectMenuItemSelected
                }}
                value="Canada"
              >
                Canada
              </MenuItem>
            </Select>
          </FormControl>
          <h5>Unit Address</h5>
          <CustomInput
            urbanshelter
            style={{ margin: "-20px 0 15px 0" }}
            labelText={<span>STREET ADDRESS</span>}
            id="address"
            value={this.state.address}
            formControlProps={{
              fullWidth: true
            }}
            inputProps={{
              onChange: event => this.change(event, "address", "length", 3)
            }}
          />
          <CustomInput
            urbanshelter
            style={{ margin: "-20px 0 15px 0" }}
            labelText={<span>APT, SUITE NO. (OPTIONAL)</span>}
            id="address-additional"
            value={this.state.addressAdditional}
            formControlProps={{
              fullWidth: true
            }}
            inputProps={{
              onChange: event =>
                this.change(event, "addressAdditional", "length", 3)
            }}
          />
          <CustomInput
            urbanshelter
            style={{ margin: "-20px 0 15px 0" }}
            labelText={<span>TOWN/CITY</span>}
            id="town"
            value={this.state.town}
            formControlProps={{
              fullWidth: true
            }}
            inputProps={{
              onChange: event => this.change(event, "town", "length", 3)
            }}
          />
          <CustomInput
            urbanshelter
            style={{ margin: "-20px 0 15px 0" }}
            labelText={<span>PROVINCE</span>}
            id="province"
            value={this.state.province}
            formControlProps={{
              fullWidth: true
            }}
            inputProps={{
              onChange: event => this.change(event, "province", "length", 3)
            }}
          />
          <CustomInput
            urbanshelter
            style={{ margin: "-20px 0 35px 0" }}
            labelText={<span>POSTAL CODE</span>}
            id="postal"
            value={this.state.postal}
            formControlProps={{
              fullWidth: true
            }}
            inputProps={{
              onChange: event => this.change(event, "postal", "length", 3)
            }}
          />
        </GridItem>
      </GridContainer>
    );
  }
}

Step4.propTypes = {
  classes: PropTypes.object.isRequired,
  allStates: PropTypes.object.isRequired
};

export default withStyles(style)(Step4);
