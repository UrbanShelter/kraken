import React from "react";
// nodejs library to set properties for components
import PropTypes from "prop-types";

// core components
import CustomInput from "components/CustomInput/CustomInput.jsx";

// Filepond
import { FilePond, registerPlugin } from "react-filepond";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import "filepond/dist/filepond.min.css";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";

// Register the plugins
registerPlugin(FilePondPluginImagePreview);

let UploadItem = props => (
  <div>
    <h5 style={{ margin: "30px 0 20px 0" }}>{props.name}</h5>
    <FilePond
      style={{ minHeight: "200px" }}
      allowMultiple={true}
      maxFiles={4}
      ref={ref => (this.pond = ref)}
      server={{
        process: props.processing && props.processing,
        revert: props.revert && props.revert
      }}
    />
    {props.description && (
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
          onChange: event =>
            props.onChange && props.onChange(props.category || "default", event)
        }}
      />
    )}
  </div>
);

// Specifies the default values for props:
UploadItem.defaultProps = {
  maxFiles: 4,
  name: "Upload",
  id: "default",
  category: "default",
  description: false
};

UploadItem.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string,
  category: PropTypes.string,
  maxFiles: PropTypes.number,
  description: PropTypes.bool,
  onChange: PropTypes.func,
  processing: PropTypes.func.isRequired,
  revert: PropTypes.func.isRequired
};

export default UploadItem;
