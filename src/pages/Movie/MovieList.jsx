import React, { useState, useEffect } from "react";
import { withErrorBoundary } from "react-error-boundary";
import useSWR from "swr";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Autoplay, Navigation, Pagination } from "swiper";
import PropTypes from "prop-types";
import MovieItem from "./MovieItem";
import apiMovieURL, { fetcher } from "../../config/config";
import "swiper/css";

const MovieList = ({ type }) => {
  const { data, error, isLoading } = useSWR(
    apiMovieURL.getMovieList(type),
    fetcher
  );
  const [list, setList] = useState([]);
  useEffect(() => {
    if (data && data.results) {
      setList(data.results);
    }
  }, [data]);
  return (
    <div>
      <Swiper grabCursor={true} slidesPerView={"4"} spaceBetween={10}>
        {Array.isArray(list) &&
          list.length > 0 &&
          list.map((item) => (
            <SwiperSlide key={item.id}>
              <MovieItem item={item} />
            </SwiperSlide>
          ))}
      </Swiper>
    </div>
  );
};

MovieList.propTypes = {
  type: PropTypes.string,
};

export default withErrorBoundary(MovieList, {
  fallback: <div>Something went error</div>,
});
