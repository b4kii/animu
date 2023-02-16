import React, { lazy, Suspense } from "react";
import {
  createBrowserRouter,
  createHashRouter,
  createRoutesFromElements,
  Route,
  Outlet,
  RouterProvider,
  ScrollRestoration,
} from "react-router-dom";

import Footer from "./components/Footer";
import AnimeSearch from "./components/AnimeSearch";
import ErrorPage from "./pages/ErrorPage";

// loaders
import { animeInfoLoader } from "./pages/AnimeInfo";
import { animeRankingLoader } from "./pages/AnimeRanking/AnimeRanking";
import { homeDataLoader } from "./pages/Home/Home";
import { recommendationsDataLoader } from "./pages/AnimeRecommendations/AnimeRecommendations";
import { searchResultsDataLoader } from "./pages/SearchResults/SearchResults";

import ScrollTopButton from "./components/ScrollTopButton";
import LoadingScreen from "./components/LoadingScreen";

const Home = lazy(() => {
  return Promise.all([
    import("./pages/Home"),
    new Promise((resolve) => setTimeout(resolve, 500)),
  ]).then(([moduleExports]) => moduleExports);
});
const AnimeRanking = lazy(() => {
  return Promise.all([
    import("./pages/AnimeRanking"),
    new Promise((resolve) => setTimeout(resolve, 500)),
  ]).then(([moduleExports]) => moduleExports);
});
const AnimeInfo = lazy(() => {
  return Promise.all([
    import("./pages/AnimeInfo"),
    new Promise((resolve) => setTimeout(resolve, 500)),
  ]).then(([moduleExports]) => moduleExports);
});
const NotFound = lazy(() => {
  return Promise.all([
    import("./pages/NotFound"),
    new Promise((resolve) => setTimeout(resolve, 500)),
  ]).then(([moduleExports]) => moduleExports);
});
const AnimeRecommendations = lazy(() => {
  return Promise.all([
    import("./pages/AnimeRecommendations"),
    new Promise((resolve) => setTimeout(resolve, 500)),
  ]).then(([moduleExports]) => moduleExports);
});

const SearchResults = lazy(() => {
  return Promise.all([
    import("./pages/SearchResults/SearchResults"),
    new Promise((resolve) => setTimeout(resolve, 500)),
  ]).then(([moduleExports]) => moduleExports);
});

const router = createHashRouter(
  createRoutesFromElements(
    <Route path="/" element={<Root />} errorElement={<ErrorPage />}>
      <Route index element={<Home />} loader={homeDataLoader} />
      <Route
        path="anime-ranking"
        element={<AnimeRanking />}
        loader={animeRankingLoader}
      />
      <Route
        path="anime-recommendations"
        element={<AnimeRecommendations />}
        loader={recommendationsDataLoader}
      />
      <Route
        path="anime-info/:animeId"
        loader={animeInfoLoader}
        element={<AnimeInfo />}
      />
      <Route
        path="search-results/:searchKeyword/:page"
        element={<SearchResults />}
        loader={searchResultsDataLoader}
      />
      <Route path="*" element={<NotFound />} />
    </Route>
  )
);

function Root() {
  return (
    <>
      <ScrollRestoration />
      <AnimeSearch />
      <Suspense fallback={<LoadingScreen />}>
        <Outlet />
      </Suspense>
      <ScrollTopButton />
      <Footer />
    </>
  );
}

export default function App() {
  return <RouterProvider router={router} />;
}
