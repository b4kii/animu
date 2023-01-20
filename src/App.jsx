import React, {lazy, Suspense} from "react";
import {
  createBrowserRouter,
  createHashRouter,
  createRoutesFromElements,
  Route,
  Outlet,
  RouterProvider,
  ScrollRestoration,
} from "react-router-dom";

// import AnimeRanking from "./pages/AnimeRanking";
// import Home from "./pages/Home";
// import AnimeInfo from "./pages/AnimeInfo";
// import NotFound from "./pages/NotFound/NotFound";
// import AnimeRecommendations from "./pages/AnimeRecommendations";

import Footer from "./components/Footer";
import AnimeSearch from "./components/AnimeSearch";
import ErrorPage from "./pages/ErrorPage";

import { animeInfoLoader } from "./pages/AnimeInfo";
import { animeRankingLoader } from "./pages/AnimeRanking/AnimeRanking";
import { homeDataLoader } from "./pages/Home/Home";
import { recommendationsDataLoader } from "./pages/AnimeRecommendations/AnimeRecommendations";
import ScrollTopButton from "./components/ScrollTopButton";
import LoadingScreen from "./components/LoadingScreen";

// const Home = lazy(() => import("./pages/Home"));
// const AnimeRanking = lazy(() => import("./pages/AnimeRanking"));
// const AnimeInfo = lazy(() => import("./pages/AnimeInfo"));
// const NotFound = lazy(()=> import("./pages/NotFound"));
// const AnimeRecommendations = lazy(() => import("./pages/AnimeRecommendations"));

const Home = lazy(() => {
  return Promise.all([
    import("./pages/Home"),
    new Promise(resolve => setTimeout(resolve, 500))
  ])
  .then(([moduleExports]) => moduleExports);
});
const AnimeRanking = lazy(() => {
  return Promise.all([
    import("./pages/AnimeRanking"),
    new Promise(resolve => setTimeout(resolve, 500))
  ])
  .then(([moduleExports]) => moduleExports);
});
const AnimeInfo = lazy(() => {
  return Promise.all([
    import("./pages/AnimeInfo"),
    new Promise(resolve => setTimeout(resolve, 500))
  ])
  .then(([moduleExports]) => moduleExports);
});
const NotFound = lazy(() => {
  return Promise.all([
    import("./pages/NotFound"),
    new Promise(resolve => setTimeout(resolve, 500))
  ])
  .then(([moduleExports]) => moduleExports);
});
const AnimeRecommendations = lazy(() => {
  return Promise.all([
    import("./pages/AnimeRecommendations"),
    new Promise(resolve => setTimeout(resolve, 500))
  ])
  .then(([moduleExports]) => moduleExports);
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
      <Route path="anime-recommendations" element={<AnimeRecommendations />} loader={recommendationsDataLoader} />
      <Route
        path="anime-info/:animeId"
        loader={animeInfoLoader}
        element={<AnimeInfo />}
      />
      <Route path="*" element={<NotFound />} />
    </Route>
  )
);

export default function App() {
  return <RouterProvider router={router} />;
}

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
