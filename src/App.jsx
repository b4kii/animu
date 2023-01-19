import React from "react";
import {
  createBrowserRouter,
  createHashRouter,
  createRoutesFromElements,
  Route,
  Outlet,
  RouterProvider,
  ScrollRestoration,
} from "react-router-dom";
import AnimeRanking from "./pages/AnimeRanking";
import Home from "./pages/Home";
import Footer from "./components/Footer";
import AnimeSearch from "./components/AnimeSearch";
import AnimeInfo from "./pages/AnimeInfo";
import AnimeRecommendations from "./pages/AnimeRecommendations";
import NotFound from "./pages/NotFound/NotFound";

import { animeInfoLoader } from "./pages/AnimeInfo";
import { animeRankingLoader } from "./pages/AnimeRanking/AnimeRanking";
import { homeDataLoader } from "./pages/Home/Home";
import { recommendationsDataLoader } from "./pages/AnimeRecommendations/AnimeRecommendations";
import ScrollTopButton from "./components/ScrollTopButton";

// const router = createBrowserRouter(
const router = createHashRouter(
  createRoutesFromElements(
    <Route path="/" element={<Root />} errorElement={<h1>Something went wrong..</h1>}>
      <Route index element={<Home />} loader={homeDataLoader} />
      <Route
        path="anime-ranking"
        element={<AnimeRanking />}
        loader={animeRankingLoader}
      />
      <Route path="anime-recommendations" element={<AnimeRecommendations />} loader={recommendationsDataLoader} />
      <Route
        path="anime-info/:animeId"
        loader={animeInfoLoader}
        element={<AnimeInfo />}
      />
      <Route path="*" element={<NotFound />} />
    </Route>
  )
  // ), {
  //   basename: "/animu",
  // }
);

export default function App() {
  return <RouterProvider router={router} />;
}

function Root() {
  return (
    <>
      <ScrollRestoration />
      <AnimeSearch />
      <Outlet />
      <ScrollTopButton />
      <Footer />
    </>
  );
}
