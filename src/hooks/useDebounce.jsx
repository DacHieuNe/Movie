import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

const useDebounce = (value, delay = 1000) => {
  const [debounceValue, setDebounceValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebounceValue(value);
    }, delay);
    return () => {
      clearTimeout(timer);
    };
  }, [value]);
  return { debounceValue };
};

useDebounce.propTypes = {
  value: PropTypes.string,
  delay: PropTypes.number,
};

export default useDebounce;
