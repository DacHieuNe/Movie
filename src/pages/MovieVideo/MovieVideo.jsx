import React from "react";
import { withErrorBoundary } from "react-error-boundary";
import useSWR from "swr";
import PropTypes from "prop-types";
import apiMovieURL, { fetcher } from "../../config/config";
import { internalMutate } from "swr/_internal";

const MovieVideo = ({ id }) => {
  const { data } = useSWR(apiMovieURL.getMovieMeta(id, "videos"), fetcher);
  const results = data?.results || [];
  return (
    <div className="mt-10">
      <h3 className="mb-5 text-center text-white text-2xl font-semibold">
        Video Trailer
      </h3>
      <div className="grid grid-cols-1 gap-y-10">
        {Array.isArray(results) &&
          results.length > 0 &&
          results.slice(0, 2).map((item) => (
            <div key={item.id} className="aspect-video">
              <span className="inline-block p-3 mb-5 rounded-md bg-blue-400 text-white text-base">
                {item.name}
              </span>
              <iframe
                src={`https://www.youtube.com/embed/${item.key}`}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                className="w-full h-full object-fill"
              ></iframe>
            </div>
          ))}
      </div>
    </div>
  );
};

MovieVideo.propTypes = {
  id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
};

export default withErrorBoundary(MovieVideo, {
  fallback: <div>Something went error</div>,
});
