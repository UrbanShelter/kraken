import React from "react";
import PropTypes from "prop-types";

function ColoredLine(...props) {
  const { color, opacity } = props;
  return (
    <hr
      style={{
        color: color,
        backgroundColor: color,
        height: 1,
        opacity: opacity,
        maxWidth: "100"
      }}
    />
  );
}

ColoredLine.propTypes = {
  color: PropTypes.string,
  opacity: PropTypes.number
};

export default ColoredLine;
