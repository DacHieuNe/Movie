import React from "react";
import useSWR from "swr";
import { withErrorBoundary } from "react-error-boundary";
import { Swiper, SwiperSlide } from "swiper/react";
import PropTypes from "prop-types";
import MainSliderItem from "@/pages/Slider/MainSliderItem";
import apiMovieURL, { fetcher } from "@/config/config";

const MainSlider = ({ type = "upcoming" }) => {
  const { data } = useSWR(apiMovieURL.getMovieList(type), fetcher);
  const movie = data?.results || [];
  return (
    <div className="relative page-container mb-10">
      <Swiper grabCursor={true} slidesPerView="auto">
        {Array.isArray(movie) &&
          movie.length > 0 &&
          movie.map((item) => (
            <SwiperSlide key={item.id}>
              <MainSliderItem item={item} />
            </SwiperSlide>
          ))}
      </Swiper>
    </div>
  );
};

MainSlider.propTypes = {
  type: PropTypes.string,
};

export default withErrorBoundary(MainSlider, {
  fallback: <div>Something went wrong</div>,
});
