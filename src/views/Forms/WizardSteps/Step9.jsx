import React from "react";
import PropTypes from "prop-types";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";

// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import UploadItem from "components/CustomUpload/UploadItem.jsx";

// firebase
import { storage } from "firebase/index.js";

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
class Step9 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      descriptions: {}
    };
    this.setDescription = this.setDescription.bind(this);
    this.handleProcessing = this.handleProcessing.bind(this);
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
  handleProcessing(fieldName, file, metadata, load, error, progress, abort) {
    if (this.props.data.reference) {
      let reference = this.props.data.reference;
      // handle file upload here
      const fileUpload = file;

      const upload = storage.uploadTest(
        `${reference}/${file.name}`,
        fileUpload
      );

      upload.on(
        `state_changed`,
        snapshot => {
          progress(true, snapshot.bytesTransferred, snapshot.totalBytes);
        },
        err => {
          error(err.message);
        },
        () => {
          load(upload.snapshot.ref.location.path);
          // upload.snapshot.ref.getDownloadURL().then(function(downloadURL) {
          //   load(downloadURL);
          // });
        }
      );
      return {
        abort: () => {
          upload.cancel();
          abort();
        }
      };
    } else {
      error("Could not reach server");
    }

    // storageRef
    //   .getMetadata()
    //   .then(metadata => {
    //     // Metadata now contains the metadata for 'filepond/${file.name}'
    //     let metadataFile = {
    //       name: metadata.name,
    //       size: metadata.size,
    //       contentType: metadata.contentType,
    //       fullPath: metadata.fullPath,
    //       downloadURLs: metadata.downloadURLs[0]
    //     };

    //     const databaseRef = firebase.database().ref("/filepond");

    //     databaseRef.push({
    //       metadataFile
    //     });
    //   })
    //   .catch(function(error) {
    //     this.setState({
    //       message: `Upload error : ${error.message}`
    //     });
    //   });
  }
  handleRemove(ref, load, error) {
    storage
      .deleteTest(ref)
      .then(function() {
        // File deleted successfully
      })
      .catch(function(err) {
        error(err.message);
      });

    // Should call the load method when done, no parameters required
    load();
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
    const bedrooms = this.props.allStates["listing-offering"]
      ? this.props.allStates["listing-offering"].bedroomNumber
      : null;
    const bathrooms = this.props.allStates["listing-detail"]
      ? this.props.allStates["listing-detail"].bathrooms
      : null;
    const suiteAmenities = this.props.allStates["listing-amenities"]
      ? this.props.allStates["listing-amenities"].checked["In-Suite"]
      : null;
    const buildingAmenities = this.props.allStates["listing-amenities"]
      ? this.props.allStates["listing-amenities"].checked["In-Building"]
      : null;

    let descriptions = this.state.descriptions;

    if (bedrooms) {
      // checking if the number of rooms was modified
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
    if (suiteAmenities) {
      // checking if the In-Suite amenities was modified
      if (
        descriptions &&
        descriptions["suiteAmenities"] &&
        suiteAmenities.length <
          Object.keys(descriptions["suiteAmenities"]).length
      ) {
        // Operations here are different than above
        // since the keys are not numbers and since
        // entires are based on checkbox

        // find the differences in the arrays
        let keys = Object.keys(descriptions["suiteAmenities"]).filter(
          key => !suiteAmenities.includes(key)
        );
        // delete the differences
        keys.forEach(key => delete descriptions["suiteAmenities"][key]);
        this.clean(descriptions["suiteAmenities"]);
        this.clean(descriptions);
        this.setState({
          descriptions: descriptions
        });
      }
    }
    if (buildingAmenities) {
      // checking if the In-Suite amenities was modified
      if (
        descriptions &&
        descriptions["buildingAmenities"] &&
        buildingAmenities.length <
          Object.keys(descriptions["buildingAmenities"]).length
      ) {
        // Operations here are different than above
        // since the keys are not numbers and since
        // entires are based on checkbox

        // find the differences in the arrays
        let keys = Object.keys(descriptions["buildingAmenities"]).filter(
          key => !buildingAmenities.includes(key)
        );
        // delete the differences
        keys.forEach(key => delete descriptions["buildingAmenities"][key]);
        this.clean(descriptions["buildingAmenities"]);
        this.clean(descriptions);
        this.setState({
          descriptions: descriptions
        });
      }
    }
  }

  render() {
    const bedrooms = this.props.allStates["listing-offering"]
      ? this.props.allStates["listing-offering"].bedroomNumber
      : null;
    const bathrooms = this.props.allStates["listing-detail"]
      ? this.props.allStates["listing-detail"].bathrooms
      : null;
    const suiteAmenities = this.props.allStates["listing-amenities"]
      ? this.props.allStates["listing-amenities"].checked["In-Suite"]
      : null;
    const buildingAmenities = this.props.allStates["listing-amenities"]
      ? this.props.allStates["listing-amenities"].checked["In-Building"]
      : null;

    // console.log(suiteAmenities);

    // variables for dynamic field rendering
    const rooms = [];
    const baths = [];
    const suite = [];
    const building = [];

    if (bedrooms) {
      // checking if the number of rooms was modified
      rooms.length = 0;
      for (let i = 0; i < bedrooms; i++) {
        rooms.push(
          <UploadItem
            key={"bedroom" + i}
            name={"Bedroom " + (i + 1)}
            id={i.toString()}
            category={"bedrooms"}
            onChange={this.setDescription}
            processing={this.handleProcessing}
            revert={this.handleRemove}
            files={this.state.files ? this.state.files : []}
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
            key={"bathroom" + i}
            name={"Bathroom " + number}
            id={i.toString()}
            category={"bathrooms"}
            onChange={this.setDescription}
            processing={this.handleProcessing}
            revert={this.handleRemove}
            files={this.state.files ? this.state.files : []}
          />
        );
      }
    }
    if (suiteAmenities) {
      // checking if the number of bathrooms was modified
      suite.length = 0;
      for (let i = 0; i < suiteAmenities.length; i++) {
        suite.push(
          <UploadItem
            key={"suiteAmenities" + i}
            name={suiteAmenities[i] + " (In-Suite)"}
            id={suiteAmenities[i]}
            category={"suiteAmenities"}
            onChange={this.setDescription}
            processing={this.handleProcessing}
            revert={this.handleRemove}
            files={this.state.files ? this.state.files : []}
          />
        );
      }
    }
    if (buildingAmenities) {
      // checking if the number of bathrooms was modified
      building.length = 0;
      for (let i = 0; i < buildingAmenities.length; i++) {
        suite.push(
          <UploadItem
            key={"buildingAmenities" + i}
            name={buildingAmenities[i] + " (In-Building)"}
            id={buildingAmenities[i]}
            category={"buildingAmenities"}
            onChange={this.setDescription}
            processing={this.handleProcessing}
            revert={this.handleRemove}
            files={this.state.files ? this.state.files : []}
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
          processing={this.handleProcessing}
          revert={this.handleRemove}
          files={this.state.files ? this.state.files : []}
        />
        <UploadItem
          name={"Layout/Floor Plan"}
          id={"layout"}
          category={"main"}
          onChange={this.setDescription}
          processing={this.handleProcessing}
          revert={this.handleRemove}
          files={this.state.files ? this.state.files : []}
        />
        <UploadItem
          name={"Living Room"}
          id={"living-room"}
          category={"main"}
          onChange={this.setDescription}
          processing={this.handleProcessing}
          revert={this.handleRemove}
          files={this.state.files ? this.state.files : []}
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
            {suite}
            {building}
          </div>
        </GridItem>
      </GridContainer>
    );
  }
}

Step9.propTypes = {
  classes: PropTypes.object.isRequired,
  data: PropTypes.object,
  allStates: PropTypes.object.isRequired
};

export default withStyles(style)(Step9);
