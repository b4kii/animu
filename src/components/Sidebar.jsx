import React from "react";
import StarIcon from "@mui/icons-material/Star";
import HomeIcon from "@mui/icons-material/Home";
import { Link } from "react-router-dom";
import { useEffect, useRef } from "react";

import styles from "./Navigation.module.css";

export default function Sidebar({ isActive, setIsActive, setQuery }) {
  const sidebarRef = useRef(null);

  useEffect(() => {
    const handler = (event) => {
      if (!sidebarRef.current.contains(event.target)) {
        setIsActive(false);
      }
    };
    document.addEventListener("click", handler);

    return () => {
      document.removeEventListener("click", handler);
    };
  });

  return (
    <section
      className={isActive ? `${styles.sidebar} ${styles.open}` : styles.sidebar}
      ref={sidebarRef}
    >
      <ul>
        <li>
          <Link
            to="/anime-ranking"
            onClick={() => {
              setQuery("");
            }}
          >
            Ranking
          </Link>
        </li>
        <li>
          <Link
            to="/anime-recommendations"
            onClick={() => {
              setQuery("");
            }}
          >
            Recommendations
          </Link>
        </li>
        <li>
          <Link
            to="/"
            onClick={() => {
              setQuery("");
            }}
          >
            Home
          </Link>
        </li>
      </ul>
    </section>
  );
}
