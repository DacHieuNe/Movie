import React from "react";
import Nav from "../Nav/Nav";
import PropTypes from "prop-types";

const Header = (props) => {
  return (
    <header className="py-8">
      <Nav />
    </header>
  );
};

Header.propTypes = {};
export default Header;
