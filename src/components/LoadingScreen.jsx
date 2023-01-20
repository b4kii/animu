import React from "react";
import { Icon } from "@iconify/react";

export default function LoadingScreen() {
  return (
    <div className="loading">
      <span >Please wait </span>
      <Icon
        icon="svg-spinners:3-dots-bounce"
      />
    </div>
  );
}
