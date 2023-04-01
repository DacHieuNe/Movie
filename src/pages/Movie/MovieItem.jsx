import React from "react";
import { useNavigate } from "react-router-dom";
import { AiTwotoneStar } from "react-icons/ai";
import PropTypes from "prop-types";
import Text from "../Text/Text";
import Button from "../Button/Button";
import error from "../../assets/error.jpg";

const MovieItem = ({ item }) => {
  const { poster_path, title, vote_average, release_date, id } = item;
  const navigate = useNavigate();

  const handleImageError = (e) => {
    e.target.src = error;
  };
  return (
    <div className="p-3 rounded-lg bg-slate-800">
      <div className="mb-4">
        <img
          className="w-full h-[250px] rounded-lg object-cover"
          src={`https://image.tmdb.org/t/p/w500/${poster_path}`}
          onError={handleImageError}
          alt="thumbnail"
        />
      </div>
      <Text
        text={title}
        styleClass="mb-3 text-[20px] text-white text-ellipsis whitespace-nowrap overflow-hidden"
      />
      <div className="flex justify-between">
        <Text
          text={new Date(release_date).getFullYear()}
          styleClass="text-sm text-white opacity-70"
        />
        <div className="flex items-center">
          <Text
            text={vote_average}
            styleClass="mr-2 text-sm text-white opacity-70"
          />
          <AiTwotoneStar className="text-yellow-400" />
        </div>
      </div>
      <Button
        text="Watch now"
        styleClass="w-full mt-4 mb-2 p-3 rounded-md bg-[#F62682] text-lg text-white"
        onClick={() => navigate(`/movies/${id}`)}
      />
    </div>
  );
};

MovieItem.propTypes = {
  item: PropTypes.shape({
    poster_path: PropTypes.string,
    title: PropTypes.string,
    vote_average: PropTypes.number,
    release_date: PropTypes.string,
    id: PropTypes.number,
  }),
};

export default MovieItem;
