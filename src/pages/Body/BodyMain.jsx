import React, { useState } from "react";
import { AiOutlineRight, AiOutlineLeft } from "react-icons/ai";
import PropTypes from "prop-types";
import MainSlider from "../Slider/MainSlider";
import Text from "../Text/Text";
import Button from "../Button/Button";
import MovieItem from "../Movie/MovieItem";
import MovieList from "../Movie/MovieList";

const BodyMain = (props) => {
  return (
    <main>
      <MainSlider />
      <div className="page-container mt-4 mb-5">
        <div className="flex justify-between">
          <Text
            text="Now Playing"
            styleClass="mb-4 capitalize text-2xl text-white"
          />
          <div className="text-center">
            <Button
              text={
                <AiOutlineLeft className="w-[14px] h-[14px] inline-block" />
              }
              styleClass="w-[30px] h-[30px] mr-3 rounded-full bg-gray-700 text-gray-300"
            />
            <Button
              text={
                <AiOutlineRight className="w-[14px] h-[14px] inline-block" />
              }
              styleClass="w-[30px] h-[30px] rounded-full bg-gray-700 text-gray-300"
            />
          </div>
        </div>
        <MovieList type="now_playing" />
      </div>
      <div className="page-container mt-4 mb-5">
        <div className="flex justify-between">
          <Text
            text="Top Rated"
            styleClass="mb-4 capitalize text-2xl text-white"
          />
          <div className="text-center">
            <Button
              text={
                <AiOutlineLeft className="w-[14px] h-[14px] inline-block" />
              }
              styleClass="w-[30px] h-[30px] mr-3 rounded-full bg-gray-700 text-gray-300"
            />
            <Button
              text={
                <AiOutlineRight className="w-[14px] h-[14px] inline-block" />
              }
              styleClass="w-[30px] h-[30px] rounded-full bg-gray-700 text-gray-300"
            />
          </div>
        </div>
        <MovieList type="top_rated" />
      </div>
      <div className="page-container mt-4 mb-5">
        <div className="flex justify-between">
          <Text
            text="Popular"
            styleClass="mb-4 capitalize text-2xl text-white"
          />
          <div className="text-center">
            <Button
              text={
                <AiOutlineLeft className="w-[14px] h-[14px] inline-block" />
              }
              styleClass="w-[30px] h-[30px] mr-3 rounded-full bg-gray-700 text-gray-300"
            />
            <Button
              text={
                <AiOutlineRight className="w-[14px] h-[14px] inline-block" />
              }
              styleClass="w-[30px] h-[30px] rounded-full bg-gray-700 text-gray-300"
            />
          </div>
        </div>
        <MovieList type="popular" />
      </div>
    </main>
  );
};

BodyMain.propTypes = {};

export default BodyMain;
