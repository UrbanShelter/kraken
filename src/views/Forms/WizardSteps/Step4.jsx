import React from "react";

// @material-ui/icons
import Face from "@material-ui/icons/Face";
import RecordVoiceOver from "@material-ui/icons/RecordVoiceOver";
import Email from "@material-ui/icons/Email";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import InputAdornment from "@material-ui/core/InputAdornment";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";

// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import PictureUpload from "components/CustomUpload/PictureUpload.jsx";
import Button from "components/CustomButtons/Button.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardHeader from "components/Card/CardHeader.jsx";

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
  isValidated() {
    if (
      this.state.firstnameState === "success" &&
      this.state.lastnameState === "success" &&
      this.state.emailState === "success"
    ) {
      return true;
    } else {
      if (this.state.firstnameState !== "success") {
        this.setState({ firstnameState: "error" });
      }
      if (this.state.lastnameState !== "success") {
        this.setState({ lastnameState: "error" });
      }
      if (this.state.emailState !== "success") {
        this.setState({ emailState: "error" });
      }
    }
    return false;
  }
  render() {
    const { classes } = this.props;
    return (
      <GridContainer justify="space-evenly" direction="row-reverse">
        <GridItem xs={12} sm={4} md={4}>
          <Card infographic>
            <CardHeader style={{ margin: "10px 0 -15px" }}>
              {/* <i className={"fal fa-lightbulb"} /> */}
              <i
                className={"far fa-lightbulb"}
                style={{ fontSize: "25px", color: "#E91E63" }}
              />
            </CardHeader>
            <CardBody>
              <p style={{ color: "#3C4858", fontWeight: 400 }}>
                In this section you are describing the entire unit and not what
                each tenant is offered.
              </p>
            </CardBody>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={4} md={4}>
          <h5 style={{ marginTop: "30px" }}>Which county is yor unit in?</h5>
          <FormControl fullWidth className={classes.selectFormControl}>
            <InputLabel htmlFor="simple-select" className={classes.selectLabel}>
              Choose City
            </InputLabel>
            <Select
              MenuProps={{
                className: classes.selectMenu
              }}
              classes={{
                select: classes.select
              }}
              value={this.state.simpleSelect}
              onChange={this.handleSimple}
              inputProps={{
                name: "simpleSelect",
                id: "simple-select"
              }}
            >
              <MenuItem
                disabled
                classes={{
                  root: classes.selectMenuItem
                }}
              >
                Choose City
              </MenuItem>
              <MenuItem
                classes={{
                  root: classes.selectMenuItem,
                  selected: classes.selectMenuItemSelected
                }}
                value="2"
              >
                Paris
              </MenuItem>
              <MenuItem
                classes={{
                  root: classes.selectMenuItem,
                  selected: classes.selectMenuItemSelected
                }}
                value="3"
              >
                Bucharest
              </MenuItem>
            </Select>
          </FormControl>
          <h5>How many bedrooms does this unit have?</h5>
          <FormControl fullWidth className={classes.selectFormControl}>
            <InputLabel htmlFor="simple-select" className={classes.selectLabel}>
              Choose City
            </InputLabel>
            <Select
              MenuProps={{
                className: classes.selectMenu
              }}
              classes={{
                select: classes.select
              }}
              value={this.state.simpleSelect}
              onChange={this.handleSimple}
              inputProps={{
                name: "simpleSelect",
                id: "simple-select"
              }}
            >
              <MenuItem
                disabled
                classes={{
                  root: classes.selectMenuItem
                }}
              >
                Choose City
              </MenuItem>
              <MenuItem
                classes={{
                  root: classes.selectMenuItem,
                  selected: classes.selectMenuItemSelected
                }}
                value="2"
              >
                Paris
              </MenuItem>
              <MenuItem
                classes={{
                  root: classes.selectMenuItem,
                  selected: classes.selectMenuItemSelected
                }}
                value="3"
              >
                Bucharest
              </MenuItem>
            </Select>
          </FormControl>
          <h5>How many bathrooms does this unit have?</h5>
          <FormControl fullWidth className={classes.selectFormControl}>
            <InputLabel htmlFor="simple-select" className={classes.selectLabel}>
              Choose City
            </InputLabel>
            <Select
              MenuProps={{
                className: classes.selectMenu
              }}
              classes={{
                select: classes.select
              }}
              value={this.state.simpleSelect}
              onChange={this.handleSimple}
              inputProps={{
                name: "simpleSelect",
                id: "simple-select"
              }}
            >
              <MenuItem
                disabled
                classes={{
                  root: classes.selectMenuItem
                }}
              >
                Choose City
              </MenuItem>
              <MenuItem
                classes={{
                  root: classes.selectMenuItem,
                  selected: classes.selectMenuItemSelected
                }}
                value="2"
              >
                Paris
              </MenuItem>
              <MenuItem
                classes={{
                  root: classes.selectMenuItem,
                  selected: classes.selectMenuItemSelected
                }}
                value="3"
              >
                Bucharest
              </MenuItem>
            </Select>
          </FormControl>
          <h5>What is the size of this unit? (sqft)</h5>
          <CustomInput
            urbanshelter
            style={{ margin: "-20px 0 35px 0" }}
            labelText={<span>ENTER HOME SIZE</span>}
            id="firstname"
            formControlProps={{
              fullWidth: true
            }}
            inputProps={{
              onChange: event => this.change(event, "firstname", "length", 3)
            }}
          />
          <GridContainer>
            <GridItem
              xs={3}
              style={{ display: "flex", justifyContent: "center" }}
            >
              <Button
                color="urbanshelter"
                size="sm"
                round
                className={classes.lastButton}
              >
                <div style={{ fontSize: "14px" }}>-</div>
              </Button>
            </GridItem>
            <GridItem
              xs={1}
              style={{ display: "flex", justifyContent: "center" }}
            >
              <span
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  height: "100%",
                  width: "100%"
                }}
              >
                {1}
              </span>
            </GridItem>
            <GridItem
              xs={3}
              style={{ display: "flex", justifyContent: "center" }}
            >
              <Button
                color="urbanshelter"
                size="sm"
                round
                className={classes.lastButton}
              >
                <div style={{ fontSize: "14px" }}>+</div>
              </Button>
            </GridItem>
          </GridContainer>
        </GridItem>
      </GridContainer>
    );
  }
}

export default withStyles(style)(Step4);
