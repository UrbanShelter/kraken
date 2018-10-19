import React from "react";
import PropTypes from "prop-types";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";

// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Button from "components/CustomButtons/Button.jsx";
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

let UploadItem = props => (
  <div>
    <h5 style={{ marginTop: "30px" }}>{props.name}</h5>
    <Card infographic>
      <CardBody
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "25% 0"
        }}
      >
        <Button color="urbanshelter">Upload Photos</Button>
        <p style={{ color: "#3C4858", fontWeight: 400 }}>or drag them in</p>
      </CardBody>
    </Card>
    <CustomInput
      urbanshelter
      style={{ margin: "-20px 0 35px 0" }}
      id={props.id}
      formControlProps={{
        fullWidth: true
      }}
      inputProps={{
        placeholder: "Describe Room Elements",
        multiline: true,
        onChange: event => props.onChange(props.category, event)
      }}
    />
  </div>
);

UploadItem.propTypes = {
  name: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired
};
class Step9 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      descriptions: {}
    };
    this.setDescription = this.setDescription.bind(this);
  }
  sendState() {
    return this.state;
  }
  clean(obj) {
    for (var propName in obj) {
      if (
        obj[propName] === null ||
        obj[propName] === undefined ||
        obj[propName].length === 0 ||
        obj[propName] === "" ||
        obj[propName] === {} ||
        Object.keys(obj[propName]).length === 0
      ) {
        delete obj[propName];
      }
    }
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
  setDescription(key, event) {
    var descriptions = this.state.descriptions;
    let _key = key ? key : "default";

    if (descriptions[_key] !== undefined) {
      descriptions[_key][event.target.id] = event.target.value;
    } else {
      // initialize object array
      descriptions[_key] = {};
      descriptions[_key][event.target.id] = {};
      descriptions[_key][event.target.id] = event.target.value;
    }

    this.clean(descriptions[_key]);
    this.clean(descriptions);

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
    const bathrooms = this.props.allStates["listing-detail"]
      ? this.props.allStates["listing-detail"].bathrooms
      : null;

    if (bedrooms) {
      // checking if the number of rooms was modified
      let descriptions = this.state.descriptions;
      if (
        descriptions &&
        descriptions["bedrooms"] &&
        bedrooms < Object.keys(descriptions["bedrooms"]).length
      ) {
        for (
          let i = bedrooms;
          i <= Object.keys(descriptions["bedrooms"]).length;
          i++
        ) {
          delete descriptions["bedrooms"][i];
        }
        this.clean(descriptions["bedrooms"]);
        this.clean(descriptions);
        this.setState({
          descriptions: descriptions
        });
      }
    }
    if (bathrooms) {
      // checking if the number of rooms was modified
      let descriptions = this.state.descriptions;
      if (
        descriptions &&
        descriptions["bathrooms"] &&
        Math.ceil(bathrooms) < Object.keys(descriptions["bathrooms"]).length
      ) {
        for (
          let i = bedrooms;
          i <= Object.keys(descriptions["bathrooms"]).length;
          i++
        ) {
          delete descriptions["bathrooms"][i];
        }
        this.clean(descriptions["bathrooms"]);
        this.clean(descriptions);
        this.setState({
          descriptions: descriptions
        });
      }
    }
  }

  render() {
    const bedrooms = this.props.allStates["listing-detail"]
      ? this.props.allStates["listing-detail"].bedrooms
      : null;
    const bathrooms = this.props.allStates["listing-detail"]
      ? this.props.allStates["listing-detail"].bathrooms
      : null;

    // variables for dynamic field rendering
    const rooms = [];
    const baths = [];

    if (bedrooms) {
      // checking if the number of rooms was modified
      rooms.length = 0;
      for (let i = 0; i < bedrooms; i++) {
        rooms.push(
          <UploadItem
            key={i}
            name={"Bedroom " + (i + 1)}
            id={i.toString()}
            category={"bedrooms"}
            onChange={this.setDescription}
          />
        );
      }
    }
    if (bathrooms) {
      // checking if the number of bathrooms was modified
      baths.length = 0;
      for (let i = 0; i < Math.ceil(bathrooms); i++) {
        let number = bathrooms - i > 0.5 ? i + 1 : 0.5;
        baths.push(
          <UploadItem
            key={i}
            name={"Bathroom " + number}
            id={i.toString()}
            category={"bathrooms"}
            onChange={this.setDescription}
          />
        );
      }
    }

    let main = (
      <div>
        <UploadItem
          name={"Entire Building"}
          id={"entire-building"}
          category={"main"}
          onChange={this.setDescription}
        />
        <UploadItem
          name={"Layout/Floor Plan"}
          id={"layout"}
          category={"main"}
          onChange={this.setDescription}
        />
        <UploadItem
          name={"Living Room"}
          id={"living-room"}
          category={"main"}
          onChange={this.setDescription}
        />
      </div>
    );

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
          <div>
            {main}
            {rooms}
            {baths}
          </div>
        </GridItem>
      </GridContainer>
    );
  }
}

Step9.propTypes = {
  classes: PropTypes.object.isRequired,
  allStates: PropTypes.object.isRequired
};

export default withStyles(style)(Step9);
