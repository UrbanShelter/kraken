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
  handleProcessing(file, load, error, progress, abort) {
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
      <GridContainer justify="space-evenly">
        <GridItem xs={10}>
          <h5>This is how tenants will rent with you</h5>
        </GridItem>
        <GridItem xs={12} sm={10}>
          <GridContainer>
            <GridItem xs={12} sm={6} md={4}>
              <Card infographic style={{ minHeight: "550px" }}>
                <CardHeader
                  style={{
                    margin: "50px 0 35px 0",
                    display: "flex",
                    justifyContent: "center"
                  }}
                >
                  <i
                    className={"fas fa-street-view"}
                    style={{ fontSize: "67px", color: urbanShelterColor }}
                  />
                </CardHeader>
                <CardBody style={{ marginBottom: "50px" }}>
                  <p style={{ color: "#3C4858", fontWeight: "bold" }}>
                    Qualified Tenants find your listing
                  </p>
                  <p style={{ color: "#3C4858", fontWeight: 400 }}>
                    Anyone who wants to rent with you needs to provided their
                    contact information, pervious references, credit scores and
                    proof of payments.
                  </p>
                </CardBody>
              </Card>
            </GridItem>
            <GridItem xs={12} sm={6} md={4}>
              <Card infographic style={{ minHeight: "550px" }}>
                <CardHeader
                  style={{
                    margin: "50px 0 35px 0",
                    display: "flex",
                    justifyContent: "center"
                  }}
                >
                  <i
                    className={"fas fa-clipboard-list"}
                    style={{ fontSize: "67px", color: urbanShelterColor }}
                  />
                </CardHeader>
                <CardBody style={{ marginBottom: "50px" }}>
                  <p style={{ color: "#3C4858", fontWeight: "bold" }}>
                    We will help you decided who gets to stay at your listed
                    home
                  </p>
                  <p style={{ color: "#3C4858", fontWeight: 400 }}>
                    After a tenant completes a rental application, we will add
                    the tentant’s information to your tentant application
                    management system, where you can see the details of all the
                    tenants side by side. This will help you decide who get to
                    stay at your listed home.
                  </p>
                </CardBody>
              </Card>
            </GridItem>
            <GridItem xs={12} sm={6} md={4}>
              <Card infographic style={{ minHeight: "550px" }}>
                <CardHeader
                  style={{
                    margin: "50px 0 35px 0",
                    display: "flex",
                    justifyContent: "center"
                  }}
                >
                  <i
                    className={"fas fa-file-alt"}
                    style={{ fontSize: "67px", color: urbanShelterColor }}
                  />
                </CardHeader>
                <CardBody style={{ marginBottom: "50px" }}>
                  <p style={{ color: "#3C4858", fontWeight: "bold" }}>
                    Once you select the right tenant, we will start the tenant
                    on-boarding process
                  </p>
                  <p style={{ color: "#3C4858", fontWeight: 400 }}>
                    The tenant will receive an email notification prompting them
                    to sign your rental agreement. Once the document is signed,
                    we work with the tenants to set up deposits and payments to
                    your account.{" "}
                  </p>
                </CardBody>
              </Card>
            </GridItem>
          </GridContainer>
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
