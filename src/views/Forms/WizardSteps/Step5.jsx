import React from "react";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";

// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
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
      homeType: "",
      bedrooms: "1",
      bathrooms: "1",
      footage: ""
    };
  }
  sendState() {
    return this.state;
  }
  handleSimple = event => {
    this.setState({ [event.target.name]: event.target.value });
  };
  increase = (id, increment) => {
    let value = increment ? increment : 1;
    this.setState({ [id]: parseFloat(this.state[id]) + value });
  };
  decrease = (id, decrement, minimum) => {
    let value = decrement ? decrement : 1;
    let min = minimum ? minimum : 1;
    if (parseFloat(this.state[id]) - value >= min) {
      this.setState({ [id]: parseFloat(this.state[id]) - value });
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
  change(event, stateName, type, stateNameEqualTo, minimum) {
    let continueDefault = true;
    let min = minimum ? minimum : 1;
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
      case "min":
        continueDefault = false;
        // Sets the minimum value
        if (event.target.value >= minimum) {
          this.setState({ [event.target.id]: event.target.value });
        } else {
          this.setState({ [event.target.id]: minimum });
        }
        break;
      default:
        break;
    }
    if (continueDefault) {
      this.setState({ [event.target.id]: event.target.value });
    }
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
    console.log(this.props.allStates);
    return (
      <GridContainer justify="space-evenly" direction="row-reverse">
        <GridItem xs={12} sm={4}>
          <Card infographic>
            <CardHeader style={{ margin: "10px 0 -15px" }}>
              <i
                className={"far fa-lightbulb"}
                style={{ fontSize: "25px", color: "#ef4f67" }}
              />
            </CardHeader>
            <CardBody>
              <p style={{ color: "#3C4858", fontWeight: 400 }}>
                In this section you are describing the entire unit and not what
                each tenant is offered.
              </p>
            </CardBody>
          </Card>
          <Card infographic>
            <CardHeader style={{ margin: "10px 0 -15px" }}>
              <i
                className={"far fa-lightbulb"}
                style={{ fontSize: "25px", color: "#ef4f67" }}
              />
            </CardHeader>
            <CardBody>
              <p style={{ color: "#3C4858", fontWeight: 400 }}>
                A ‘0.5’ washroom is a washroom without a rain shower or bathtub.
              </p>
            </CardBody>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={6} md={5}>
          <h5 style={{ marginTop: "30px" }}>
            What kind of place are you listing?
          </h5>
          <FormControl fullWidth className={classes.selectFormControl}>
            <InputLabel htmlFor="simple-select" className={classes.selectLabel}>
              Choose Home Type
            </InputLabel>
            <Select
              MenuProps={{
                className: classes.selectMenu
              }}
              classes={{
                select: classes.select
              }}
              value={this.state.homeType}
              onChange={this.handleSimple}
              inputProps={{
                name: "homeType",
                id: "hometype-select"
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
                value="Condominium"
              >
                Condominium
              </MenuItem>
              <MenuItem
                classes={{
                  root: classes.selectMenuItem,
                  selected: classes.selectMenuItemSelected
                }}
                value="Apartment"
              >
                Apartment
              </MenuItem>
            </Select>
          </FormControl>
          <h5>How many bedrooms does this unit have?</h5>
          <GridContainer style={{ marginTop: "-5px", marginBottom: "25px" }}>
            <GridItem
              xs={4}
              md={3}
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center"
              }}
            >
              <Button
                color="urbanshelter"
                size="sm"
                round
                className={classes.firstButton}
                onClick={() => this.decrease("bedrooms")}
              >
                <div style={{ fontSize: "14px", padding: "0 5px" }}>-</div>
              </Button>
            </GridItem>
            <GridItem
              xs={4}
              md={3}
              xl={2}
              style={{ display: "flex", justifyContent: "center" }}
            >
              <CustomInput
                regular
                urbanshelter
                id="bedrooms"
                formControlProps={{
                  fullWidth: true
                }}
                inputProps={{
                  placeholder: "1",
                  value: this.state.bedrooms,
                  onChange: event => this.change(event, "bedrooms", "min", 3),
                  // deeper text field component input props
                  inputProps: {
                    style: { textAlign: "center" }
                  }
                }}
                style={{ paddingBottom: "0", paddingTop: "15px" }}
              />
            </GridItem>
            <GridItem
              xs={4}
              md={3}
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center"
              }}
            >
              <Button
                color="urbanshelter"
                size="sm"
                round
                className={classes.lastButton}
                onClick={() => this.increase("bedrooms")}
              >
                <div style={{ fontSize: "14px", padding: "0 5px" }}>+</div>
              </Button>
            </GridItem>
          </GridContainer>
          <h5>How many bathrooms does this unit have?</h5>
          <GridContainer style={{ marginTop: "-5px", marginBottom: "25px" }}>
            <GridItem
              xs={4}
              md={3}
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center"
              }}
            >
              <Button
                color="urbanshelter"
                size="sm"
                round
                className={classes.firstButton}
                onClick={() => this.decrease("bathrooms", 0.5, 0.5)}
              >
                <div style={{ fontSize: "14px", padding: "0 5px" }}>-</div>
              </Button>
            </GridItem>
            <GridItem
              xs={4}
              md={3}
              xl={2}
              style={{ display: "flex", justifyContent: "center" }}
            >
              <CustomInput
                regular
                urbanshelter
                id="bathrooms"
                formControlProps={{
                  fullWidth: true
                }}
                inputProps={{
                  placeholder: "1",
                  value: this.state.bathrooms,
                  onChange: event =>
                    this.change(event, "bathrooms", "min", 1, 0.5),
                  // deeper text field component input props
                  inputProps: {
                    style: { textAlign: "center" }
                  }
                }}
                style={{ paddingBottom: "0", paddingTop: "15px" }}
              />
            </GridItem>
            <GridItem
              xs={4}
              md={3}
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center"
              }}
            >
              <Button
                color="urbanshelter"
                size="sm"
                round
                className={classes.lastButton}
                onClick={() => this.increase("bathrooms", 0.5)}
              >
                <div style={{ fontSize: "14px", padding: "0 5px" }}>+</div>
              </Button>
            </GridItem>
          </GridContainer>
          <h5>What is the size of this unit? (sqft)</h5>
          <CustomInput
            urbanshelter
            style={{ margin: "-20px 0 35px 0" }}
            labelText={<span>ENTER HOME SIZE</span>}
            id="footage"
            formControlProps={{
              fullWidth: true
            }}
            inputProps={{
              value: this.state.footage,
              onChange: event => this.change(event, "footage", "length", 3)
            }}
          />
        </GridItem>
      </GridContainer>
    );
  }
}

export default withStyles(style)(Step4);
