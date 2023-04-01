import React from "react";
import PropTypes from "prop-types";

const Button = ({ text, styleClass, onClick = () => {}, ...props }) => {
  return (
    <button onClick={onClick} className={styleClass} {...props}>
      {text}
    </button>
  );
};

Button.propTypes = {
  text: PropTypes.node,
  styleClass: PropTypes.string.isRequired,
  handleClick: PropTypes.func,
};

export default Button;
