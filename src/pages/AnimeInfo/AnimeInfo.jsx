import { useLoaderData } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import styles from "./AnimeInfo.module.css";

import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { displayData } from "../../utils/helpers";

function Video({ embedId }) {
  return (
    <div className={styles.videoResponsive}>
      <h2>Trailer</h2>
      <iframe
        src={`https://www.youtube-nocookie.com/embed/${embedId}`}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        title="Embedded youtube"
      />
    </div>
  );
}

function LeftSection({ data }) {
  return (
    <div className={styles.infoLeft}>
      <div className={styles.imageWrapper}>
        <div className={styles.scaleOnHover}>
          <img
            className={styles.imageInfo}
            src={data.images.webp.large_image_url}
            alt={data?.title}
          />
        </div>
      </div>
      <div className={styles.detailsWrapper}>
        <div className={styles.animeBackground}>
          {displayData(data.background)}
        </div>
        <div className={`${styles.detail}`}>
          <h4>Aired:</h4>
          {displayData(data.aired.string)}
        </div>
        <div className={`${styles.detail}`}>
          <h4>Duration:</h4>
          {displayData(data.duration)}
        </div>
        <div className={`${styles.detail}`}>
          <h4>Episodes:</h4>
          {displayData(data.episodes)}
        </div>
        <div className={`${styles.detail}`}>
          <h4>Score:</h4>
          {displayData(data.score)}
        </div>
        <div className={`${styles.detail}`}>
          <h4>Status:</h4>
          {displayData(data.status)}
        </div>
        <div className={`${styles.detail}`}>
          <h4>Rating:</h4>
          {displayData(data.rating)}
        </div>
      </div>
    </div>
  );
}

function Dropdown({ children, data }) {
  const [active, setActive] = useState(false);

  useEffect(() => {
    setActive(false);
  }, [data])

  return (
    <>
      <div className={styles.dropdownHeader}>
        <h2
          onClick={() => {
            setActive((prev) => !prev);
          }}
        >
          {children}
          <KeyboardArrowDownIcon
            sx={{
              rotate: active ? "540deg" : "0",
              transition: "200ms ease-in-out",
              fontSize: "2rem",
            }}
          />
        </h2>
      </div>
      <div
        className={styles.dropdownContent}
        style={{
          maxHeight: active ? "500px" : "0",
          overflow: "hidden",
          transition: "all 200ms ease-in-out",
        }}
      >
        {data.length !== 0 ? (
          data.map((item) => {
            return (
              <p key={item.name}>
                <a href={item.url} target="_blank" rel="noreferrer">{item.name}</a>
              </p>
            );
          })
        ) : (
          <p>No data</p>
        )}
      </div>
    </>
  );
}

function RightSection({ data }) {
  return (
    <div className={styles.infoRight}>
      <div className={styles.infoContainer}>
        <div className={styles.titles}>
          <h3 className={styles.titleNormal}>
            {data.title ? data.title : data.title_english}
          </h3>
        </div>
        <div className={styles.description}>{displayData(data.synopsis)}</div>
        <Dropdown data={data.streaming}>Streaming platforms</Dropdown>
        <Dropdown data={data.producers}>Producers</Dropdown>
      </div>
    </div>
  );
}

export default function AnimeInfo() {
  const data = useLoaderData();
  return (
    <>
      <main className={styles.mainContainer}>
        <div className={styles.top}>
          <LeftSection data={data} />
          <RightSection data={data} />
        </div>
        <Video
          embedId={
            data.trailer.youtube_id ? data.trailer.youtube_id : "dQw4w9WgXcQ"
          }
        />
      </main>
    </>
  );
}

export const animeInfoLoader = async ({ params }) => {
  try {
    const url = `https://api.jikan.moe/v4/anime/${params.animeId}/full`;
    const res = await axios.get(url);

    return res.data.data;
  } catch (error) {
    console.log(error);
  }

  return null;
};
