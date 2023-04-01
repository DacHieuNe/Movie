import React from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

const PageErrors = (props) => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="mb-6 text-8xl text-white">Oops !</h1>
      <h3 className="mb-5 font-semibold text-3xl text-white">
        404 - PAGE NOT FOUND
      </h3>
      <p className="mb-6 text-base text-white text-center">
        The page you are looking for might have been removed
        <br />
        had its name changed or is temporarily unavailable
      </p>
      <button
        onClick={() => navigate("/")}
        className="px-6 py-4 shadow-md rounded-full bg-blue-500 text-white text-base "
      >
        GO TO HOMEPAGE
      </button>
    </div>
  );
};

PageErrors.propTypes = {};

export default PageErrors;
