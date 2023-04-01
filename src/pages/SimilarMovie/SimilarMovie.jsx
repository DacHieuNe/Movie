import React from "react";
import { withErrorBoundary } from "react-error-boundary";
import { Swiper, SwiperSlide } from "swiper/react";
import useSWR from "swr";
import PropTypes from "prop-types";
import apiMovieURL, { fetcher } from "../../config/config";
import MovieItem from "../Movie/MovieItem";

const SimilarMovie = ({ id }) => {
  const { data } = useSWR(apiMovieURL.getMovieMeta(id, "similar"), fetcher);
  const results = data?.results || [];
  return (
    <div className="my-10">
      <h3 className="mb-5 text-2xl text-white text-center font-semibold">
        Similar Movie
      </h3>
      <Swiper grabCursor={true} spaceBetween={10} slidesPerView="4">
        {Array.isArray(results) &&
          results.length > 0 &&
          results.map((item) => (
            <SwiperSlide key={item.id}>
              <MovieItem item={item} />
            </SwiperSlide>
          ))}
      </Swiper>
    </div>
  );
};

SimilarMovie.propTypes = {
  id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
};

export default withErrorBoundary(SimilarMovie, {
  fallback: <div>Something went error</div>,
});
