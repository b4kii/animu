import { createContext } from "react";

// export const AnimeDataContext = createContext({ data: [], setData: () => {} });
export const AnimeDataContext = createContext({ data: {
  animeData: [],
  fetched: null
}, setData: () => {} });
