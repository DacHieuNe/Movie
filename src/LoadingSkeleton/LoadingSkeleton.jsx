import React from "react";
import PropTypes from "prop-types";

const LoadingSkeleton = ({ width, height }) => {
  return (
    <div
      className="skeleton"
      style={{
        width,
        height,
      }}
    ></div>
  );
};

LoadingSkeleton.propTypes = {};

export default LoadingSkeleton;
