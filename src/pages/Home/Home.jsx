import styles from "./Home.module.css";
import { motion } from "framer-motion";
import axios from "axios";
import { useEffect, useState } from "react";
import { useLoaderData } from "react-router-dom";

import { displayData } from "../../utils/helpers";

const url = "https://api.jikan.moe/v4/random/anime";

export default function Home() {
  const [data, error] = useLoaderData();
  // console.log(data);

  return (
    <main className={styles.container}>
      <h1>HOME PAGE</h1>
      <div className={styles.random}>
        <h5 className={styles.title}>
          {displayData(data.title)}
        </h5>
        <div className={styles.synopsis}>
          {displayData(data.synopsis)}
        </div>
        <img src={data.images.webp.large_image_url} alt="test" />
      </div>
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
