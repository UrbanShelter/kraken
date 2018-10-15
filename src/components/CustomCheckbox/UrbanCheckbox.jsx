import React from "react";
// nodejs library to set properties for components
import PropTypes from "prop-types";

// @material-ui/core components
import { createMuiTheme, withStyles } from "@material-ui/core/styles";
import Checkbox from "@material-ui/core/Checkbox";

const styles = createMuiTheme({
  /* Styles applied to the root element. */
  root: {
    "&$checked": {
      color: "#ef4f67"
    },
    "&$disabled": {}
  },

  /* Styles applied to the root element if `checked={true}`. */
  checked: {},

  /* Styles applied to the root element if `disabled={true}`. */
  disabled: {}
});

let CustomCheckbox = props => (
  <Checkbox
    classes={{
      root: props.classes.root,
      checked: props.classes.checked
    }}
    onClick={props.onClick}
  />
);

CustomCheckbox.propTypes = {
  onClick: PropTypes.func,
  classes: PropTypes.object.isRequired
};

CustomCheckbox = withStyles(styles)(CustomCheckbox);

function UrbanCheckbox({ ...props }) {
  const { onClick } = props;
  return <CustomCheckbox onClick={onClick} />;
}

UrbanCheckbox.propTypes = {
  onClick: PropTypes.func
};

export default UrbanCheckbox;
