// import zIndex from '@mui/material/styles/zIndex'
import React from "react";
import { Icon } from "@iconify/react";
import { lineHeight } from "@mui/system";

export default function LoadingScreen() {
  const styles = {
    width: "100vw",
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "whitesmoke",
    position: "absolute",
    top: 0,
    left: 0,
    zIndex: "100",
    gap: "1rem",
    // overflow: "hidden"
  };
  return (
    <div style={styles}>
      <span style={{ fontSize: "3rem" }}>Please wait </span>
      <Icon
        icon="svg-spinners:3-dots-bounce"
        style={{ fontSize: "5rem", marginTop: ".7rem"}}
      />{" "}
    </div>
  );
}
