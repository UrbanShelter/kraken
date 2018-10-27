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
      server={{ process: props.processing, revert: props.revert }}
    />
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
  onChange: PropTypes.func.isRequired,
  processing: PropTypes.func.isRequired,
  revert: PropTypes.func.isRequired
};

export default UploadItem;
