import React from "react";

import styles from "./Navigation.module.css";

export default function MenuButton({isActive, setIsActive}) {
  const handleClick = (event) => {
    // event.stopPropagation();
    setIsActive(prev => !prev);
  }
  return (
    <div className={styles.menuButton}>
      <div id="hamburgerButton" className={isActive ? `${styles.buttonWrapper} ${styles.open}` : styles.buttonWrapper} onClick={handleClick}>
        <div className={styles.bar}></div>
      </div>
    </div>
  )
}
