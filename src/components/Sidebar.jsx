import React from "react";
import { Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";

import styles from "./Navigation.module.css";

import MenuButton from "./MenuButton";

export default function Sidebar({ setQuery }) {
  const sidebarRef = useRef(null);
  const hamburgerRef = useRef(null);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    const handler = (event) => {
      if (
        !sidebarRef.current.contains(event.target) &&
        event.target !== hamburgerRef.current
      ) {
        setIsActive(false);
      }
    };
    document.addEventListener("click", handler);

    return () => {
      document.removeEventListener("click", handler);
    };
  });

  return (
    <>
      <MenuButton
        isActive={isActive}
        setIsActive={setIsActive}
        hamburgerRef={hamburgerRef}
      />
      <section
        className={
          isActive ? `${styles.sidebar} ${styles.open}` : styles.sidebar
        }
        ref={sidebarRef}
      >
        <ul>
          <li>
            <Link
              to="/anime-ranking"
              onClick={() => {
                setQuery("");
                setIsActive(false);
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
                setIsActive(false);
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
                setIsActive(false);
              }}
            >
              Home
            </Link>
          </li>
        </ul>
      </section>
    </>
  );
}
