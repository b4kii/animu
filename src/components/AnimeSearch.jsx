import React from "react";
import { useContext, useEffect, useState, useRef } from "react";
import Navigation from "./Navigation";
import { AnimeDataContext } from "../contexts/AnimeDataContext";
import { Link } from "react-router-dom";

import styles from "./AnimeSearch.module.css";

function DropdownListRow({ item, setData }) {
  return (
    <li>
      <Link
        to={`/anime-info/${item.mal_id}`}
        onClick={() => {
          setData({ animeData: [], fetched: false });
        }}
      >
        <div className={styles.resultRow}>
          <div>
            <span className={styles.titleEnglish}>
              {item.title ? item.title : item.title_english}
            </span>
          </div>
          <div className={styles.searchCell}>{item.type}</div>
          <div className={styles.SearchCell}>{item.status}</div>
          <div className={styles.imageWrapper}>
            <img
              className={styles.searchImage}
              src={item.images.webp.small_image_url}
              alt={item?.title}
            />
          </div>
        </div>
      </Link>
    </li>
  );
}

function DropdownSearch({ setQuery, setData, searchInputRef }) {
  const { data } = useContext(AnimeDataContext);
  const resultSearchRef = useRef(null);

  useEffect(() => {
    if (data.animeData.length !== 0) {
      const handleClick = (event) => {
        if (!resultSearchRef.current.contains(event.target)) {
          if (event.target !== searchInputRef.current) {
            setData({ animeData: [], fetched: false });
            setQuery("");
          }
        }
      };

      document.addEventListener("click", handleClick);
      return () => {
        document.removeEventListener("click", handleClick);
      };
    }
  }, []);

  return (
    <section className={styles.resultSearch} ref={resultSearchRef}>
      {data.animeData?.length !== 0 ? (
        <ul className={styles.result}>
          {data.animeData?.map((item, index) => (
            <DropdownListRow item={item} setData={setData} key={item.mal_id} />
          ))}
        </ul>
      ) : data.animeData?.length === 0 ? (
        <div className={styles.resultSearch}>
          <h1 className={styles.noResult}>No results found..</h1>
        </div>
      ) : null }
    </section>
  );
}

export default function AnimeSearch() {
  const searchInputRef = useRef(null);
  const [query, setQuery] = useState("");
  const [data, setData] = useState({
    animeData: [],
    fetched: false,
  });


  return (
    <AnimeDataContext.Provider value={{ data, setData }}>
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
    </AnimeDataContext.Provider>
  );
}
