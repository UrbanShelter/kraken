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
class Step13 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      descriptions: []
    };
    this.handleProcessing = this.handleProcessing.bind(this);
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
  render() {
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
                Upload other documents you’d like the tenant to sign. These may
                include documents from your property management firm if you have
                one.
              </p>
            </CardBody>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={6} md={5}>
          <UploadItem
            name={"Upload Other Documents"}
            id={"additional-docs"}
            category={"docs"}
            processing={this.handleProcessing}
            revert={this.handleRemove}
            files={this.state.files ? this.state.files : []}
          />
        </GridItem>
      </GridContainer>
    );
  }
}

Step13.propTypes = {
  classes: PropTypes.object.isRequired,
  data: PropTypes.object,
  allStates: PropTypes.object.isRequired
};

export default withStyles(style)(Step13);
