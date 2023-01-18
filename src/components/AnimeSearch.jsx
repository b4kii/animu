import { useContext, useEffect, useState, useRef } from "react";
import Navigation from "./Navigation";
import { AnimeDataContext } from "../contexts/AnimeDataContext";
import { Link } from "react-router-dom";

import styles from "./AnimeSearch.module.css";

function SearchListRow({ item, setData }) {
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
          <div className={ styles.SearchCell }>{item.status}</div>
          <div className={styles.imageWrapper}>
            <img
              className={styles.searchImage}
              src={item.images.jpg.small_image_url}
              alt=""
            />
          </div>
        </div>
      </Link>
    </li>
  );
}

function SearchResults({ setQuery, setData }) {
  const { data } = useContext(AnimeDataContext);
  const searchRef = useRef(null);

  useEffect(() => {
    const handleClick = (event) => {
      if (!searchRef.current.contains(event.target)) {
        setData({ animeData: [], fetched: false });
        setQuery("");
      }
    };

    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  });

  return (
    <section className={styles.resultSearch} ref={searchRef}>
      {data.animeData?.length !== 0 && data.fetched === true ? (
        <ul className={styles.result}>
          {data.animeData?.map((item, index) => (
            <SearchListRow item={item} setData={setData} key={index} />
          ))}
        </ul>
      ) : data.animeData?.length === 0 && data.fetched === true ? (
        <div className={styles.resultSearch}>
          <h1 className={styles.noResult}>No results found</h1>
        </div>
      ) : null}
    </section>
  );
}

export default function AnimeSearch() {
  const [query, setQuery] = useState("");
  const [data, setData] = useState({
    animeData: [],
    fetched: null,
  });

  return (
    <AnimeDataContext.Provider value={{ data, setData }}>
      <section className={styles.animeSearch}>
        <Navigation query={query} setQuery={setQuery} />
        <SearchResults setQuery={setQuery} setData={setData} />
      </section>
    </AnimeDataContext.Provider>
  );
}
