import { useLoaderData, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import styles from "./AnimeInfo.module.css";

import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { displayData, displayArrayData } from "../../utils/helpers";


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

function ImageSection({ data }) {
  console.log(data);
  return (
    <div className={styles.infoLeft}>
      <div className={styles.imageWrapper}>
        <div className={styles.scaleOnHover}>
          <img
            className={styles.imageInfo}
            src={data.images.webp.large_image_url}
            alt="Anime"
          />
        </div>
      </div>
      <div className={styles.detailsWrapper}>
        <div className={styles.animeBackground}>{displayData(data.background)}</div>
        <div className={`${styles.detail}`}><h4>Aired:</h4>{displayData(data.aired.string)}</div>
        <div className={`${styles.detail}`}><h4>Duration:</h4>{displayData(data.duration)}</div>
        <div className={`${styles.detail}`}><h4>Episodes:</h4>{displayData(data.episodes)}</div>
        <div className={`${styles.detail}`}><h4>Score:</h4>{displayData(data.score)}</div>
        <div className={`${styles.detail}`}><h4>Status:</h4>{displayData(data.status)}</div>
        <div className={`${styles.detail}`}><h4>Rating:</h4>{displayData(data.rating)}</div>
      </div>
    </div> 
  );
}

function InfoSection({ data }) {
  const [active, setActive] = useState([
    {
      item: "1",
      isActive: false,
    },
    {
      item: "2",
      isActive: false,
    },
  ]);

  const getState = (item) => {
    let result;
    active.forEach((state) => {
      if (state.item === item) {
        result = state.isActive;
      }
    });
    return result;
  };

  const handleClick = (event) => {
    let dataInfo = event.target.getAttribute("data-item");
    const updateState = active.map((state) => {
      if (state.item === dataInfo) {
        return {
          ...state,
          isActive: !state.isActive,
        };
      }
      return state;
    });

    setActive(updateState);
  };

  const { animeId } = useParams();

  useEffect(() => {
    setActive(prev => {
      return prev.map((state) => {
        return {
          ...state,
          isActive: false
        }
      })
    })
  }, [animeId]);

  return (
    <div className={styles.infoRight}>
      <div className={styles.infoContainer}>
        <div className={styles.titles}>
          <h3 className={styles.titleNormal}>{
            data.title ? data.title : data.title_english
          }</h3>
        </div>
        <div className={styles.description}>{displayData(data.synopsis)}</div>
        <div className={styles.dropdown}>
          <h2 onClick={handleClick} data-item="1">
            Streaming platforms
            <KeyboardArrowDownIcon
              sx={{
                rotate: getState("1") ? "180deg" : "0",
                transition: "all 200ms ease-in-out",
                fontSize: "2rem",
              }}
            />
          </h2>
        </div>
        <div
          className={styles.streaming}
          style={{
            maxHeight: getState("1") ? "500px" : "0",
            overflow: "hidden",
            transition: "all 200ms ease-in-out",
          }}
        >
          {
            displayArrayData(data.streaming, {name: "name", url: "url"})
          }
        </div>
        <div className={styles.dropdown}>
          <h2 onClick={handleClick} data-item="2">
            Producers
            <KeyboardArrowDownIcon
              sx={{
                rotate: getState("2") ? "180deg" : "0",
                transition: "all 200ms ease-in-out",
                fontSize: "2rem",
              }}
            />
          </h2>
        </div>
        <div
          className={styles.producers}
          style={{
            maxHeight: getState("2") ? "500px" : "0",
            overflow: "hidden",
            transition: "all 200ms ease-in-out",
          }}
        >
          {
            displayArrayData(data.producers, {name: "name", url: null})
          }
        </div>
      </div>
    </div>
  );
}

export default function AnimeInfo() {
  const data = useLoaderData();
  console.log(data);

  return (
    <>
      <main className={styles.mainContainer}>
        <div className={styles.top}>
          <ImageSection data={data} />
          <InfoSection data={data} />
        </div>
        <Video embedId={data.trailer.youtube_id} />
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

  return null
};
