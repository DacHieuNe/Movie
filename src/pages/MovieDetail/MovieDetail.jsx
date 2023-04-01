import React from "react";
import { withErrorBoundary } from "react-error-boundary";
import { useParams } from "react-router-dom";
import useSWR from "swr"; // stale while revalidate
import PropTypes from "prop-types";
import Credit from "@/pages/Credit/Credit";
import MovieVideo from "@/pages/MovieVideo/MovieVideo";
import SimilarMovie from "@/pages/SimilarMovie/SimilarMovie";
import apiMovieURL, { fetcher } from "@/config/config";

const MovieDetail = (props) => {
  const { slug } = useParams();
  const { data } = useSWR(apiMovieURL.getMovieDetail(slug), fetcher);

  const item = data || {};
  const { backdrop_path, poster_path, title, overview } = item;

  return (
    <>
      {Object.keys(item).length > 0 && (
        <>
          <div
            className="absolute top-0 left-0 w-full h-[500px] bg-cover bg-no-repeat"
            style={{
              backgroundImage: `url(https://image.tmdb.org/t/p/original/${backdrop_path})`,
            }}
          >
            <div className="absolute inset-0 bg-black bg-opacity-25"></div>
          </div>
          <div className="mb-[394px]"></div>
          <div
            className="relative w-full max-w-[800px] h-[400px] -mt-[200px] mx-auto rounded-md bg-cover bg-no-repeat"
            style={{
              backgroundImage: `url(https://image.tmdb.org/t/p/original/${poster_path})`,
            }}
          ></div>
          <div className="page-container mt-10">
            <h3 className="mb-6 text-center text-white text-3xl font-semibold">
              {title}
            </h3>
            <p className="mb-6 leading-relaxed text-white text-center text-lg">
              {overview}
            </p>
            <h3 className="mb-6 text-2xl text-white text-center font-semibold">
              Casts
            </h3>
            <Credit id={slug} />
            <MovieVideo id={slug} />
            <SimilarMovie id={slug} />
          </div>
        </>
      )}
    </>
  );
};

MovieDetail.propTypes = {};

export default withErrorBoundary(MovieDetail, {
  fallback: <div>Something went Error</div>,
});
