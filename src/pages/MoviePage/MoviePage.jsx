import React, { useState, useEffect } from "react";
import { withErrorBoundary } from "react-error-boundary";
import ReactPaginate from "react-paginate";
import useSWR from "swr";
import PropTypes from "prop-types";
import MovieItem from "/src/pages/Movie/MovieItem";
import Credit from "@/pages/Credit/Credit";
import apiMovieURL, { fetcher } from "@/config/config";
import useDebounce from "@/hooks/useDebounce";
import LoadingSkeleton from "@/LoadingSkeleton/LoadingSkeleton";

const MoviePage = ({ type }) => {
  const [searchValue, setSearchValue] = useState("");
  const [pageValue, setPageValue] = useState(0);
  const [url, setUrl] = useState(apiMovieURL.getMovieList(type));
  const { data, error } = useSWR(url, fetcher);
  const { debounceValue: filterValue } = useDebounce(searchValue);
  const [itemOffset, setItemOffset] = useState(0);
  const itemsPerPage = 20;
  const totalPages = data?.total_pages || 0;
  const pageCount = totalPages;
  const movies = data?.results || [];

  useEffect(() => {
    if (filterValue) {
      setUrl(apiMovieURL.getSearchMovie(filterValue));
      setPageValue(0);
    } else {
      setUrl(apiMovieURL.getMovieList(type));
      setPageValue(0);
    }
  }, [filterValue]);
  useEffect(() => {
    if (pageValue !== "") {
      if (filterValue) {
        setUrl(apiMovieURL.getSearchMovie(filterValue, pageValue + 1));
      } else {
        setUrl(apiMovieURL.getMovieList(type, pageValue + 1));
      }
    }
  }, [pageValue]);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % (totalPages * 20);
    setPageValue(event.selected);
    setItemOffset(newOffset);
  };

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
      {/* <div className="w-full max-w-[300px] mt-4 mx-auto">
        <button
          onClick={() => setPageValue(pageValue - 1)}
          className="py-2 px-4 mx-2 bg-black text-white text-xl"
        >
          &#60;
        </button>
        <button
          onClick={() => setPageValue(1)}
          className="py-2 px-4 mx-2 bg-black text-white text-lg"
        >
          1
        </button>
        <button
          onClick={() => setPageValue(2)}
          className="py-2 px-4 mx-2 bg-black text-white text-lg"
        >
          2
        </button>
        <button
          onClick={() => setPageValue(3)}
          className="py-2 px-4 mx-2 bg-black text-white text-lg"
        >
          3
        </button>
        <button
          onClick={() => setPageValue(pageValue + 1)}
          className="py-2 px-4 mx-2 bg-black text-white text-lg"
        >
          &#62;
        </button>
      </div> */}
      <ReactPaginate
        className="pagination flex justify-center mt-5 text-lg text-white gap-3"
        forcePage={pageValue}
        breakLabel="..."
        nextLabel=">"
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={pageCount}
        previousLabel="<"
        renderOnZeroPageCount={null}
      />
    </div>
  );
};

MoviePage.propTypes = {
  type: PropTypes.string,
};

export default withErrorBoundary(MoviePage, {
  fallback: <div>Something went errors</div>,
});
