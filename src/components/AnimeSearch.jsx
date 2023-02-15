import React from "react";
import { useContext, useEffect, useState, useRef } from "react";
import Navigation from "./Navigation";
import { AnimeDataContext } from "../contexts/AnimeDataContext";

import styles from "./AnimeSearch.module.css";
import ResultSearchRow from "./ResultSearchRow";

function DropdownSearch({ setQuery, setData, searchInputRef }) {
  const { data } = useContext(AnimeDataContext);
  const resultSearchRef = useRef(null);

  useEffect(() => {
      const handleClick = (event) => {
        if (!resultSearchRef.current.contains(event.target)) {
          if (event.target !== searchInputRef.current) {
            console.log("click");
            setData({ animeData: [], fetched: false });
            setQuery("");
          }
        }
      };

      document.addEventListener("click", handleClick);
      return () => {
        document.removeEventListener("click", handleClick);
      };
  }, []);

  return (
    <section className={styles.resultSearch} ref={resultSearchRef}>
      {data.animeData?.length !== 0 ? (
        <ul className={styles.result}>
          {data.animeData.slice(0, 10)?.map((item, index) => (
            <ResultSearchRow item={item} setData={setData} key={item.mal_id} />
          ))}
        </ul>
      ) : data.animeData?.length === 0 ? (
        <div className={styles.resultSearch}>
          <h1 className={styles.noResult}>No results found..</h1>
        </div>
      ) : null}
    </section>
  );
}

export default function AnimeSearch() {
  const searchInputRef = useRef(null);
  const [query, setQuery] = useState("");
  // const [data, setData] = useState({
  //   animeData: [],
  //   fetched: false,
  // });
  const {data, setData} = useContext(AnimeDataContext);
  console.log(data);

  return (
    <>
    {/* <AnimeDataContext.Provider value={{ data, setData }}> */}
      <Navigation
        query={query}
        setQuery={setQuery}
        searchInputRef={searchInputRef}
      />
      {data.fetched === true ? (
        <DropdownSearch
          setQuery={setQuery}
          setData={setData}
          searchInputRef={searchInputRef}
        />
      ) : null}
    {/* </AnimeDataContext.Provider> */}
    </>
  );
}
