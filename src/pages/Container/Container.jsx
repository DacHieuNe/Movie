import React from "react";
import { Outlet } from "react-router-dom";
import PropTypes from "prop-types";
import Header from "../Header/Header";

const Container = (props) => {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
};

Container.propTypes = {};

export default Container;
