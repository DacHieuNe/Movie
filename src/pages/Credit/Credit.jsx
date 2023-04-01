import React from "react";
import { withErrorBoundary } from "react-error-boundary";
import useSWR from "swr";
import PropTypes from "prop-types";
import apiMovieURL, { fetcher } from "../../config/config";

// https://api.themoviedb.org/3/movie/{movie_id}/credits?api_key=95f2419536f533cdaa1dadf83c606027&language=en-US

const Credit = ({ id }) => {
  const { data } = useSWR(apiMovieURL.getMovieMeta(id, "credits"), fetcher);
  const list = data?.cast || [];
  return (
    <div className="grid grid-cols-4 gap-4">
      {Array.isArray(list) &&
        list.length > 0 &&
        list.slice(0, 4).map((item) => (
          <div key={item.id} className="p-2">
            <img
              src={`https://image.tmdb.org/t/p/w500/${item.profile_path}`}
              alt="thumbnail"
            />
            <h3 className="mt-3 text-center text-xl text-white font-medium">
              {item.name}
            </h3>
          </div>
        ))}
    </div>
  );
};

Credit.propTypes = {
  id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
};

export default withErrorBoundary(Credit, {
  fallback: <div>Something went error</div>,
});
