import React from "react";
import PropTypes from "prop-types";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";

// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import { BlobProvider } from "@react-pdf/renderer";
import { Document, Page } from "react-pdf/dist/entry.webpack";

import { urbanShelterColor } from "assets/jss/material-dashboard-pro-react.jsx";
import customSelectStyle from "assets/jss/material-dashboard-pro-react/customSelectStyle.jsx";
import { Button } from "@material-ui/core";
import ReactDOMServer from "react-dom/server";
// firebase
import { storage } from "firebase/index.js";
import Content from "./content.jsx";
import file from "./document.pdf";

// const styles = StyleSheet.create({
//   page: {
//     flexDirection: "row",
//     backgroundColor: "#E4E4E4"
//   },
//   section: {
//     margin: 10,
//     padding: 10,
//     flexGrow: 1
//   }
// });

// const App = () => (
//   <div>
//     <PDFDownloadLink document={doc} fileName="somename.pdf">
//       {"Loading"}
//     </PDFDownloadLink>
//   </div>
// );

// const MyFancyDownloadLink = () => {
//   return (
//     <BlobProvider document={doc}>
//       {({ blob, url, loading, error }) => {
//         const url1 = URL.createObjectURL(blob);
//         return <a src={url1}>Download</a>;
//       }}
//     </BlobProvider>
//   );
// };
class Step10 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      descriptions: []
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
  setDescription(event) {
    // const descriptions = event.target.value;
    var descriptions = this.state.descriptions;
    descriptions[event.target.id] = event.target.value;
    this.setState({ descriptions: descriptions });
  }
  blobToFile(theBlob, fileName) {
    //A Blob() is almost a File() - it's just missing the two properties below which we will add
    theBlob.lastModifiedDate = new Date();
    theBlob.name = fileName;
    return theBlob;
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
    // const test = ReactDOMServer.renderToStaticMarkup(<Content />);
    // const fileURL = URL.createObjectURL(file);
    // if (this.props.data && this.props.data.resference) {
    //   let reference = this.props.data.reference;
    //   // handle file upload here
    //   const fileUpload = file;

    //   storage.uploadTest(`${reference}/${file.name}`, fileUpload);
    // }
    // <div
    //       dangerouslySetInnerHTML={{
    //         __html: test
    //       }}
    //     />
    // <div>
    //       <BlobProvider document={doc}>
    //         {({ blob, url, loading, error }) => {
    //           // Do whatever you need with blob here
    //           const fileBlob = new Blob([blob], { type: "application/pdf" });
    //           const file = this.blobToFile(fileBlob, "Agreement.pdf");
    //           // const fileURL = URL.createObjectURL(file);
    //           // if (this.props.data && this.props.data.reference) {
    //           //   let reference = this.props.data.reference;
    //           //   // handle file upload here
    //           //   const fileUpload = file;

    //           //   storage.uploadTest(`${reference}/${file.name}`, fileUpload);
    //           // }

    //         }}
    //       </BlobProvider>
    //     </div>
    // <PDFViewer style={{ width: "100%", height: "100%" }}>
    //       <Content />
    //     </PDFViewer>
    return (
      <BlobProvider document={<Content />}>
        {({ blob, url, loading, error }) => {
          // Do whatever you need with blob here
          console.log(error);
          return loading ? (
            <h3>Loading...</h3>
          ) : (
            <div
              style={{
                display: "flex",
                justifyContent: "center"
              }}
            >
              <Document file={file}>
                <Page pageNumber={1} renderTextLayer={false} scale={0.8} width={300} />
              </Document>
            </div>
          );
        }}
      </BlobProvider>
    );
  }
}

Step10.propTypes = {
  classes: PropTypes.object.isRequired,
  allStates: PropTypes.object.isRequired
};

export default withStyles()(Step10);
