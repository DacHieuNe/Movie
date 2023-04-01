import React from "react";
import PropTypes from "prop-types";

const Text = ({ text, styleClass }) => {
  return (
    <h3 className={styleClass}>
      {typeof text == "number" && Number.isNaN(text)
        ? Math.floor(Math.random() * 44 + 1980)
        : text}
    </h3>
  );
};

Text.propTypes = {
  text: PropTypes.node.isRequired,
  styleClass: PropTypes.string.isRequired,
};

export default Text;
