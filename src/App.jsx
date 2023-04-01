import { useState, lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.scss";
// import PageErrors from "pages/PageErrors/PageErrors";
import BodyMain from "@/pages/Body/BodyMain";
import MoviePageV2 from "@/pages/MoviePage/MoviePageV2";
import MovieDetail from "@/pages/MovieDetail/MovieDetail";

// lazy load có thể chấp nhận dynamic import với absolute path
const Container = lazy(() => import("@/pages/Container/Container"));
const PageErrors = lazy(() => import("@/pages/PageErrors/PageErrors"));
// const BodyMain = lazy(() => import("@/pages/Body/BodyMain"));
// const MoviePage = lazy(() => import("@/pages/MoviePage/MoviePage"));
// const MoviePageV2 = lazy(() => import("@/pages/MoviePage/MoviePageV2"));
// const MovieDetail = lazy(() => import("@/pages/MovieDetail/MovieDetail"));

const App = () => {
  return (
    <div className="app">
      <Suspense
        fallback={
          <div className="fixed inset-0 flex flex-col justify-center items-center">
            <h3 className="mb-3 text-red-400 text-3xl font-semibold">
              Loading Component ...
            </h3>
            <div className="w-[80px] h-[80px] border-4 border-red-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        }
      >
        <Routes>
          <Route path="/" element={<Container />}>
            <Route path="/" element={<BodyMain />} />
            <Route path="/movies" element={<MoviePageV2 type="popular" />} />
            <Route path="/movies/:slug" element={<MovieDetail />} />
          </Route>
          <Route path="*" element={<PageErrors />}></Route>
        </Routes>
      </Suspense>
    </div>
  );
};

export default App;
