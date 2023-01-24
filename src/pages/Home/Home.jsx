import React, { useEffect, useState, useCallback } from "react";
import styles from "./Home.module.css";
import axios from "axios";
import { useLoaderData } from "react-router-dom";

import { displayData } from "../../utils/helpers";
import { motion } from "framer-motion";

const url = "https://api.jikan.moe/v4/random/anime";

function RandomAnime({ data }) {
  return (
    <div className={styles.randomAnime}>
      <p>Check this out</p>
      <div className={`${styles.suggestion}`}>
        <p className={styles.title}>{displayData(data.title)}</p>
        <div className={styles.synopsis}>
          {displayData(data.synopsis?.split(" ").splice(0, 5).join(" "))}..
        </div>
        <img
          src={data.images.webp.large_image_url}
          alt={data?.title}
          width="150"
          height="250"
        />
      </div>
    </div>
  );
}

export default function Home() {
  const [data, error] = useLoaderData();

  return (
    <main className={styles.container}>
      <div>
        {/* <h1 className="main-header">HOME PAGE</h1> */}
        <p style={{ fontSize: "2em" }}>Hello there!</p>
        <p>Search for information about your favourite anime.</p>
        <p>Check anime ranking.</p>
        <p>Look into interesting recommendations.</p>
      </div>
      <RandomAnime data={data} />
    </main>
  );
}

export const homeDataLoader = async () => {
  try {
    const result = await axios.get(url);
    return [result.data.data, null];
  } catch (error) {
    return [null, "Error while fetching"];
  }
};
