import React from "react";
// import styles from "./Footer.module.css";
import { Icon } from "@iconify/react";

export default function Footer() {
  return (
    <footer>
      <div className="media">
        <a href="https://github.com/b4kii" target="_blank" rel="noreferrer">
          <Icon icon="bi:github" className="icon" />
        </a>
      </div>
      <div className="copy">
        <p>baki &copy; 2023</p>
      </div>
      <div className="note">
        <p>
          This project uses{" "}
          <a href="https://jikan.moe/" target="_blank" rel="noreferrer">
            <strong>
              Jikan REST API v4 - Unofficial MyAnimeList.net REST API
            </strong>
          </a>
        </p>
      </div>
    </footer>
  );
}
