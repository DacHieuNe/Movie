import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import PropTypes from "prop-types";

const Nav = (props) => {
  const [changeBorder, setChangeBorder] = useState(true);
  return (
    <div className="relative z-10 flex items-center justify-center gap-x-5">
      <div>
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive
              ? "inline-block p-2 font-semibold text-primary border border-primary"
              : "inline-block p-2 font-semibold text-white border border-white"
          }
        >
          Home
        </NavLink>
      </div>
      <div>
        <NavLink
          end
          to="/movies"
          className={({ isActive }) =>
            isActive
              ? "inline-block p-2 font-semibold text-primary border border-primary"
              : "inline-block p-2 font-semibold text-white border border-white"
          }
        >
          Movies
        </NavLink>
      </div>
    </div>
  );
};

Nav.propTypes = {};

export default Nav;
