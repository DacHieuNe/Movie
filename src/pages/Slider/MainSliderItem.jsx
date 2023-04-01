import React from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import Text from "../Text/Text";
import Button from "../Button/Button";

const MainSliderItem = ({ item }) => {
  const { poster_path, title, id } = item;
  const navigate = useNavigate();
  return (
    <>
      <div className="absolute inset-0 bg-gradient-to-t from-[rgba(0,0,0,0.4)] to-[rgba(0,0,0,0.2)]"></div>
      <img
        className="w-full h-[500px] object-cover"
        src={`https://image.tmdb.org/t/p/w500/${poster_path}`}
        alt="avenger"
      />
      <div className="absolute left-8 bottom-0">
        <Text
          text={title}
          styleClass="mb-5 text-4xl text-white font-semibold"
        />
        <div className="mb-5">
          <Button
            text="Action"
            styleClass="inline-block p-2 mr-4 border border-white rounded-md text-white text-sm opacity-90"
          />
          <Button
            text="Adventure"
            styleClass="inline-block p-2 mr-4 border border-white rounded-md text-white text-sm opacity-90"
          />
          <Button
            text="Demo"
            styleClass="inline-block p-2 mr-4 border border-white rounded-md text-white text-sm opacity-90"
          />
        </div>
        <Button
          onClick={() => navigate(`/movies/${id}`)}
          text="Watch"
          styleClass="inline-block py-3 px-6 mb-20 rounded-md bg-[#F62682] text-base text-white cursor-pointer"
        />
      </div>
    </>
  );
};

MainSliderItem.propTypes = {
  item: PropTypes.shape({
    poster_path: PropTypes.string,
    title: PropTypes.string,
    id: PropTypes.number,
  }),
};

export default MainSliderItem;
