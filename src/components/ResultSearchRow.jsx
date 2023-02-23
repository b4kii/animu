import { Link } from "react-router-dom";
// import styles from "./AnimeSearch.module.css";

export default function ResultSearchRow({ item, setData, styles, showGenres }) {
  return (
    <li key={item.mal_id}>
      <Link
        to={`/anime-info/${item.mal_id}`}
        onClick={() => {
          !showGenres && setData({ animeData: [], fetched: false });
        }}
      >
        <div className={styles.resultRow}>
          <div className={styles.title}>
            {item.title ? item.title : item.title_english}
          </div>
          <div className={styles.type}>{item.type}</div>
          <div className={styles.status}>{item.status}</div>
          <div className={styles.imageWrapper}>
            <img
              className={styles.searchImage}
              src={item.images.webp.small_image_url}
              alt={item?.title}
            />
          </div>
        </div>
        {showGenres && (
          <div className={styles.genres}>
            {item.genres.length !== 0 ? (
              item.genres.map((genre) => {
                return <p key={genre.mal_id}>{genre.name}</p>;
              })
            ) : (
              <p>No data</p>
            )}
          </div>
        )}
      </Link>
    </li>
  );
}
