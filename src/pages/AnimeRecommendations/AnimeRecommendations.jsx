import React, { useState } from "react";
import axios from "axios";
import { Link, useLoaderData } from "react-router-dom";
import { motion } from "framer-motion";
import InfiniteScroll from "react-infinite-scroll-component";
import { Icon } from "@iconify/react";

import styles from "./AnimeRecommendations.module.css";
const url = "https://api.jikan.moe/v4/recommendations/anime";

function Recommendation({ data }) {
  const variants = {
    visible: { scale: 1, opacity: 1 },
    hidden: { scale: 0, opacity: 1 },
  };

  return (
    <motion.div
      className={styles.recommendation}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      transition={{
        duration: 0.4,
      }}
      variants={variants}
    >
      <div className={styles.desc}>{data.content}</div>
      <div className={styles.links}>
        {data.entry.map((entry, index) => {
          return (
            <div className={styles.link} key={data.content.slice(index, 10)}>
              <Link
                className={styles.imageLink}
                to={`/anime-info/${entry.mal_id}`}
                target="_blank"
              >
                <img
                  src={entry.images.webp.image_url}
                  alt={entry?.title}
                  loading={index < 6 ? "eager" : "lazy"}
                  width="150"
                  height="200"
                />
              </Link>
              <Link to={`/anime-info/${entry.mal_id}`} target="_blank">
                <p>{entry.title}</p>
              </Link>
            </div>
          );
        })}
      </div>
    </motion.div>
  );
}

export default function AnimeRecommendations() {
  const [data, error] = useLoaderData();

  const [start, setStart] = useState(20);
  const [end, setEnd] = useState(40);
  const [dataSource, setDataSource] = useState(Array.from(data?.slice(0, 20)));
  const [hasMore, setHasMore] = useState(true);

  const getMoreData = () => {
    if (dataSource.length < 100) {
      setTimeout(() => {
        setDataSource(dataSource.concat(Array.from(data.slice(start, end))));
        setStart(end);
        setEnd(end + 20);
      }, 1000);
    } else {
      setHasMore(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <h1 className="main-header">RECOMMENDATIONS</h1>
        <p>
          Scroll down
        </p>
          <Icon
            icon="material-symbols:keyboard-double-arrow-down"
            className={styles.downArrow}
          />
      </div>
      <InfiniteScroll
        dataLength={dataSource.length}
        next={getMoreData}
        hasMore={hasMore}
        loader={<Icon icon="svg-spinners:bars-scale" className="loading" />}
        endMessage={<p>No more data</p>}
      >
        {dataSource.map((item, index) => {
          return <Recommendation key={index} data={item} />;
        })}
      </InfiniteScroll>
    </div>
  );
}

export const recommendationsDataLoader = async () => {
  try {
    const result = await axios.get(url);
    return [result.data.data, null];
  } catch (error) {
    return [null, "Error while fetching"];
  }
};
