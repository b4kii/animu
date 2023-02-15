import React, { useContext } from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import { Icon } from "@iconify/react";

import useDebounce from "../hooks/useDebounce";
import { AnimeDataContext } from "../contexts/AnimeDataContext";
import Sidebar from "./Sidebar";

import styles from "./Navigation.module.css";
import { Link, useNavigate } from "react-router-dom";
import ListLinkItem from "./ListLinkItem";

function SearchBar({ setQuery, query, searchInputRef }) {
  const navigate = useNavigate();

  return (
    <div className={styles.searchBar}>
      <Icon
        icon="material-symbols:search-rounded"
        style={{
          fontSize: "1.6em",
          pointerEvents: "none",
          position: "absolute",
          marginLeft: ".2em",
        }}
      />
      <input
        ref={searchInputRef}
        id="search-id"
        className={styles.searchInput}
        type="search"
        placeholder="Search..."
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        onKeyDown={(event) => {
          if (event.key === "Enter") {
            query !== "" && navigate(`/search-results/${event.target.value}`);
            searchInputRef.current.blur();
            setQuery("");
          }
        }}
        autoComplete="off"
      />
    </div>
  );
}

export default function Navigation({ query, setQuery, searchInputRef }) {
  const { setData } = useContext(AnimeDataContext);
  const navigate = useNavigate();

  const debouncedSearched = useDebounce(query, 600);

  const url = (phrase, limit) =>
    `https://api.jikan.moe/v4/anime?q=${phrase}&limit=${limit}`;

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
            <span
              className={styles.letter}
              onClick={() => {
                navigate("/");
              }}
            >
              A
            </span>
          </div>
        </div>
        <div className={styles.searchBarWrapper}>
        <SearchBar
          setQuery={setQuery}
          query={query}
          searchInputRef={searchInputRef}
        />
        </div>
        <ul className={styles.links}>
          <ListLinkItem
            to={"/anime-ranking"}
            click={() => {
              setQuery("");
            }}
          >
            Ranking
          </ListLinkItem>
          <ListLinkItem
            to={"/anime-recommendations"}
            click={() => {
              setQuery("");
            }}
          >
            Recommendations
          </ListLinkItem>
        </ul>
      </nav>
      <Sidebar setQuery={setQuery} />
    </>
  );
}
