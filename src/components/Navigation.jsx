import React, { useContext } from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import { Icon } from "@iconify/react";

import useDebounce from "../hooks/useDebounce";
import { AnimeDataContext } from "../contexts/AnimeDataContext";
import Sidebar from "./Sidebar";

import styles from "./Navigation.module.css";

function SearchBar({ handleInputChange, query, searchInputRef }) {
  return (
    <div className={styles.searchBar}>
      <Icon
        icon="material-symbols:search-rounded"
        style={{
          fontSize: "1.6em",
          pointerEvents: "none",
          position: "absolute",
          marginLeft: ".3em",
        }}
      />
      <input
        ref={searchInputRef}
        id="search-id"
        className={styles.searchInput}
        type="search"
        placeholder="Search..."
        value={query}
        onChange={handleInputChange}
        onKeyDown={(event) => {
          if (event.key === "Enter") {
            console.log("enter");
          }
        }}
        autoComplete="off"
      />
    </div>
  );
}

export default function Navigation({ query, setQuery, searchInputRef }) {
  const { setData } = useContext(AnimeDataContext);

  const debouncedSearched = useDebounce(query, 600);

  const url = (phrase, limit) =>
    `https://api.jikan.moe/v4/anime?q=${phrase}&limit=${limit}`;

  const handleInputChange = (event) => {
    setQuery(event.target.value);
  };

  useEffect(() => {
    try {
      const fetchData = async () => {
        const res = await axios.get(url(debouncedSearched, 30));
        setData((prev) => {
          return {
            ...prev,
            animeData: res.data.data,
            fetched: true,
          };
        });
      };
      if (debouncedSearched) {
        fetchData();
      }
      if (query === "")
        setData((prev) => {
          return { ...prev, animeData: [], fetched: false };
        });
    } catch (error) {
      console.log(error);
    }
  }, [debouncedSearched]);

  return (
    <>
      <nav className={styles.navbar}>
        <div className={styles.logo}>
          <div className={styles.letters}>
            <span className={styles.letter}>A</span>
          </div>
        </div>
        <SearchBar
          handleInputChange={handleInputChange}
          query={query}
          searchInputRef={searchInputRef}
        />
      </nav>
      <Sidebar
        setQuery={setQuery}
      />
    </>
  );
}
