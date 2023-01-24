import React, { useRef } from "react";

import styles from "./Navigation.module.css";

export default function MenuButton({ isActive, setIsActive, hamburgerRef }) {
  const handleClick = (event) => {
    setIsActive((prev) => !prev);
  };

  return (
    <div className={styles.menuButton} ref={hamburgerRef} onClick={handleClick}>
      <div
        id="hamburgerButton"
        className={
          isActive
            ? `${styles.buttonWrapper} ${styles.open}`
            : styles.buttonWrapper
        }
      >
        <div className={styles.bar}></div>
      </div>
    </div>
  );
}
