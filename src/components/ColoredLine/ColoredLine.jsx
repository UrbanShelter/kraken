import React from "react";
import PropTypes from "prop-types";

function ColoredLine({ ...props }) {
  const { color, height, opacity } = props;
  var bgColor = color ? color : "#707070";
  var componentHeight = height ? height : 1;
  var componentOpacity = opacity ? opacity : 1;
  return (
    <hr
      style={{
        backgroundColor: bgColor,
        height: componentHeight,
        opacity: componentOpacity,
        maxWidth: "100"
      }}
    />
  );
}

ColoredLine.propTypes = {
  color: PropTypes.string,
  height: PropTypes.number,
  opacity: PropTypes.number
};

export default ColoredLine;
