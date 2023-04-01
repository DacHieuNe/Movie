import React, { useState, useEffect } from "react";
import { withErrorBoundary } from "react-error-boundary";
import useSWR from "swr";
import useSWRInfinite from "swr/infinite";
import PropTypes from "prop-types";
import MovieItem from "/src/pages/Movie/MovieItem";
import Credit from "@/pages/Credit/Credit";
import apiMovieURL, { fetcher } from "@/config/config";
import useDebounce from "@/hooks/useDebounce";
import LoadingSkeleton from "@/LoadingSkeleton/LoadingSkeleton";
import Button from "@/pages/Button/Button";

const PAGE_SIZE = 20;

const MoviePageV2 = ({ type }) => {
  const [searchValue, setSearchValue] = useState("");
  const [url, setUrl] = useState(apiMovieURL.getMovieList(type));
  const { data, error, size, setSize } = useSWRInfinite((index) => {
    return url.replace(/page=[0-9]+/, `page=${index + 1}`);
  }, fetcher);
  const { debounceValue: filterValue } = useDebounce(searchValue);
  const isEmpty = data?.[0]?.results?.length === 0;
  const isReachingEnd =
    isEmpty || (data && data[data.length - 1]?.results?.length < PAGE_SIZE);
  const movies =
    (Array.isArray(data) &&
      data.length > 0 &&
      data.reduce(
        (initial, current) => [...initial, ...current.results],
        []
      )) ||
    [];
  useEffect(() => {
    if (filterValue) {
      setUrl(apiMovieURL.getSearchMovie(filterValue));
    } else {
      setUrl(apiMovieURL.getMovieList(type));
    }
  }, [filterValue]);

  const loading = !data && !error;
  return (
    <div className="pb-5 page-container">
      <div className="flex mb-4">
        <input
          onChange={(e) => setSearchValue(e.target.value)}
          value={searchValue}
          className="flex-1 p-4 rounded-tl-md rounded-bl-md outline-none bg-slate-700 text-white text-base"
          type="text"
          placeholder="Search here"
        />
        <button className="p-4 bg-[#F62682] text-white text-base">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
            />
          </svg>
        </button>
      </div>
      {loading && (
        <div className="grid grid-cols-4 gap-4">
          {Array(4)
            .fill({})
            .map((item, index) => (
              <div key={index} className="p-3 rounded-lg bg-slate-800">
                <div className="mb-4">
                  <LoadingSkeleton width="100%" height="250px" />
                </div>
                <LoadingSkeleton width="100%" height="30px" />
                <div className="mt-4 flex justify-between">
                  <LoadingSkeleton width="34px" height="20px" />
                  <div className="flex items-center">
                    <div className="mr-2">
                      <LoadingSkeleton width="20px" height="20px" />
                    </div>
                    <LoadingSkeleton width="16px" height="20px" />
                  </div>
                </div>
                <div className="mt-4 mb-2">
                  <LoadingSkeleton width="100%" height="52px" />
                </div>
              </div>
            ))}
        </div>
      )}
      {!loading && (
        <div className="grid grid-cols-4 gap-4">
          {Array.isArray(movies) &&
            movies.length > 0 &&
            movies.map((item) => <MovieItem key={item.id} item={item} />)}
        </div>
      )}
      <div className="text-center">
        <Button
          onClick={() => !isReachingEnd && setSize(size + 1)}
          text="Load More"
          styleClass={`mt-8 p-4 rounded-md bg-primary text-white text-base ${
            isReachingEnd && "opacity-70"
          }`}
          disabled={isReachingEnd}
        />
      </div>
    </div>
  );
};

MoviePageV2.propTypes = {
  type: PropTypes.string,
};

export default withErrorBoundary(MoviePageV2, {
  fallback: <div>Something went errors</div>,
});
