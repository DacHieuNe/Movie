export const fetcher = (...args) => fetch(...args).then((res) => res.json());

const apiKey = "95f2419536f533cdaa1dadf83c606027";
const baseURL = "https://api.themoviedb.org/3/movie";
const subURL = "https://api.themoviedb.org/3/search/movie";

const apiMovieURL = {
  getMovieList: (type, page = 1) => {
    return `${baseURL}/${type}?api_key=${apiKey}&language=en-US&page=${page}`;
  },
  getSearchMovie: (value, page = 1) => {
    return `${subURL}?api_key=${apiKey}&query=${value}&page=${page}`;
  },
  getMovieDetail: (slug) => {
    return `${baseURL}/${slug}?api_key=${apiKey}&language=en-US`;
  },
  getMovieMeta: (slug, type) => {
    return `${baseURL}/${slug}/${type}?api_key=${apiKey}&language=en-US`;
  },
};

export default apiMovieURL;
