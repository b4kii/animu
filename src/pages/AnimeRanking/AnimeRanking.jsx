import React, { useEffect, useState, useRef, useCallback } from "react";
import axios from "axios";
import styles from "./AnimeRanking.module.css";
import { Link, useLoaderData } from "react-router-dom";

import { motion } from "framer-motion";
import { displayData } from "../../utils/helpers";
import { Icon } from "@iconify/react";

const types = ["tv", "movie", "ova", "special", "ona", "music"];
const tbd = ["airing", "upcoming", "popularity", "favorite"];
const getUrl = (type, filter, limit) => {
  return `https://api.jikan.moe/v4/top/anime?type=${type}&filter=${filter}&limit=${limit}`;
};

function RankingResults({ data }) {
  const variants = {
    visible: { x: 0, opacity: 1, pointerEvents: "all" },
    hidden: { x: "-30vw", opacity: 0, pointerEvents: "none" },
  };

  return (
    <div className={styles.result}>
      {data?.map((anime, index) => {
        return (
          <motion.div
            className={styles.details}
            key={anime.mal_id}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.5 }}
            transition={{
              type: "spring",
              stiffness: 50,
            }}
            variants={variants}
          >
            <div className={styles.number}>{index + 1}.</div>
            <div className={styles.center}>
              <h3>{displayData(anime.title)}</h3>
              <div>
                <span>SCORE</span> {displayData(anime.score)}
              </div>
              <div>
                <span>SCORED BY</span> {displayData(anime.scored_by)}
              </div>
              <div>
                <span>POPULARITY</span> {displayData(anime.popularity)}
              </div>
              <div>
                <span>FAVORITES</span> {displayData(anime.favorites)}
              </div>
              <div>
                <span>MEMBERS</span> {displayData(anime.members)}
              </div>
              <div>
                <span>RANK</span> {displayData(anime.rank)}
              </div>
            </div>
            <div className={styles.right}>
              <Link to={`/anime-info/${anime.mal_id}`} target="_blank">
                <img
                  src={anime?.images.webp.image_url}
                  width="100"
                  height="150"
                  alt={anime?.title}
                  loading="lazy"
                />
              </Link>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}

function RankingFilter({ data, which, handleClick, type, setActive }) {
  return (
    <div className={styles.filter}>
      {data.map((item, index) => {
        return (
          <button
            className={`${styles.btn}
              ${
                type === item
                  ? which === "types"
                    ? styles.typeActive
                    : styles.tbdActive
                  : styles.inactive
              }
            `}
            key={index}
            onClick={(event) => {
              setActive(item);
            }}
            value={item}
          >
            {item}
          </button>
        );
      })}
    </div>
  );
}

function Ranking({ data, setData }) {
  const [type, setType] = useState("tv");
  const [filter, setFilter] = useState("airing");
  const [loading, setLoading] = useState(false);

  const handleShow = () => {
    const fetchData = async () => {
      setLoading(true);
      const response = await axios.get(getUrl(type, filter, 20));
      const sortedData = response.data.data.sort((a, b) => {
        return b.score - a.score;
      });
      setData(sortedData);
      setLoading(false);
    };
    fetchData();
  };

  return (
    <>
      <div className={styles.filters}>
        <RankingFilter
          data={types}
          which={"types"}
          type={type}
          setActive={setType}
        />
        <RankingFilter
          data={tbd}
          which={"tbd"}
          type={filter}
          setActive={setFilter}
        />
        <div className={styles.wrapper}>
          <button
            onClick={handleShow}
            className={`${styles.btn} ${styles.show}`}
          >
            show
          </button>
        </div>
      </div>
      {loading ? (
        <Icon icon="svg-spinners:bars-scale" className="loading" />
      ) : (
        <RankingResults key={data.mal_id} data={data} />
      )}
    </>
  );
}

export default function AnimeRanking() {
  const initialData = useLoaderData();

  const [data, setData] = useState(initialData);
  return (
    <main className={styles.ranking}>
      <h1 className="main-header">ANIME RANKING</h1>
      <Ranking data={data} setData={setData} />
    </main>
  );
}

export const animeRankingLoader = async () => {
  try {
    const result = await axios.get(getUrl("tv", "airing", 20));
    return result.data.data;
  } catch (error) {
    // TODO: Handle fetch error in the UI
    console.log(error);
  }

  return null;
};
