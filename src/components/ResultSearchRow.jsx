import { Link } from "react-router-dom";
import styles from "./AnimeSearch.module.css";

export default function ResultSearchRow({ item, setData }) {
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
