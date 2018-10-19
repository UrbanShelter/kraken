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

class Step6 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      offering: "entire",
      bedroomNumber: 1,
      descriptions: []
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
  setBedroomsDescription(event) {
    // const descriptions = event.target.value;
    var descriptions = this.state.descriptions;
    descriptions[event.target.id] = event.target.value;
    this.setState({ descriptions: descriptions });
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
  componentDidUpdate() {
    const bedrooms = this.props.allStates["listing-detail"]
      ? this.props.allStates["listing-detail"].bedrooms
      : null;

    if (bedrooms) {
      // checking if the number of rooms was modified
      if (
        (this.state.bedroomNumber !== "rooms" &&
          bedrooms < this.state.bedroomNumber) ||
        (this.state.descriptions && bedrooms < this.state.descriptions.length)
      ) {
        var descriptions = this.state.descriptions.slice(0, bedrooms);
        this.setState({
          bedroomNumber: 1,
          offering: "entire",
          descriptions: descriptions
        });
      }
    }
  }

  render() {
    const { classes } = this.props;
    const bedrooms = this.props.allStates["listing-detail"]
      ? this.props.allStates["listing-detail"].bedrooms
      : null;

    // variables for dynamic field rendering
    const menuItems = [];
    const descriptions = [];

    if (bedrooms) {
      // checking if the number of rooms was modified
      menuItems.length = 0;
      descriptions.length = 0;
      for (let i = 0; i < bedrooms; i++) {
        let text = i + 1 > 1 ? " Bedrooms" : " Bedroom";
        menuItems.push(
          <MenuItem
            classes={{
              root: classes.selectMenuItem,
              selected: classes.selectMenuItemSelected
            }}
            value={i + 1}
            key={i}
          >
            {i + 1 + text}
          </MenuItem>
        );

        if (this.state.offering === "entire") {
          descriptions.push(
            <div key={i}>
              <h5>{"Bedroom " + (i + 1)}</h5>
              <CustomInput
                urbanshelter
                style={{ margin: "-20px 0 35px 0" }}
                id={i.toString()}
                formControlProps={{
                  fullWidth: true
                }}
                inputProps={{
                  placeholder: "Enter Description",
                  multiline: true,
                  onChange: event => this.setBedroomsDescription(event)
                }}
              />
            </div>
          );
        } else if (
          this.state.offering === "private" &&
          i < this.state.bedroomNumber
        ) {
          descriptions.push(
            <div key={i}>
              <h5>{"Bedroom " + (i + 1)}</h5>
              <CustomInput
                urbanshelter
                style={{ margin: "-20px 0 35px 0" }}
                id={i.toString()}
                formControlProps={{
                  fullWidth: true
                }}
                inputProps={{
                  placeholder: "Enter Description",
                  multiline: true,
                  onChange: event => this.setBedroomsDescription(event)
                }}
              />
            </div>
          );
        }
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
                Bedroom descriptions help to understand what makes each room
                different. This allows tenants to quickly understand the layout
                and easily choose between the available rooms.
              </p>
            </CardBody>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={6} md={5}>
          <h5 style={{ marginTop: "30px" }}>
            What will your tenants have access to?
          </h5>
          <FormControl fullWidth className={classes.selectFormControl}>
            <Select
              MenuProps={{
                className: classes.selectMenu
              }}
              classes={{
                select: classes.select
              }}
              value={this.state.offering}
              onChange={this.handleSimple}
              inputProps={{
                name: "offering",
                id: "offering-select"
              }}
            >
              <MenuItem
                disabled
                classes={{
                  root: classes.selectMenuItem
                }}
                value="offering"
              >
                Choose Offering
              </MenuItem>
              <MenuItem
                classes={{
                  root: classes.selectMenuItem,
                  selected: classes.selectMenuItemSelected
                }}
                value="private"
              >
                Private Rooms
              </MenuItem>
              <MenuItem
                classes={{
                  root: classes.selectMenuItem,
                  selected: classes.selectMenuItemSelected
                }}
                value="entire"
              >
                Entire Place
              </MenuItem>
            </Select>
          </FormControl>
          {this.state.offering === "private" && (
            <div>
              <h5>How many bedrooms are you listing?</h5>
              <FormControl fullWidth className={classes.selectFormControl}>
                <Select
                  MenuProps={{
                    className: classes.selectMenu
                  }}
                  classes={{
                    select: classes.select
                  }}
                  value={this.state.bedroomNumber}
                  onChange={this.handleSimple}
                  inputProps={{
                    name: "bedroomNumber",
                    id: "bedroomNumber-select"
                  }}
                >
                  <MenuItem
                    disabled
                    classes={{
                      root: classes.selectMenuItem
                    }}
                    value="rooms"
                  >
                    Number of Rooms
                  </MenuItem>
                  {menuItems}
                </Select>
              </FormControl>
            </div>
          )}
          <div>
            {descriptions.length > 0 && <h3>Bedroom Descriptions</h3>}
            {descriptions}
          </div>
        </GridItem>
      </GridContainer>
    );
  }
}

Step6.propTypes = {
  classes: PropTypes.object.isRequired,
  allStates: PropTypes.object.isRequired
};

export default withStyles(style)(Step6);
