import { ArrowUpward } from "@mui/icons-material";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const buttonStyle = {
  borderRadius: "50%",
  padding: "1rem",
  border: "none",
  display: "grid",
  placeContent: "center",
  cursor: "pointer",
  backgroundColor: "#adacac",
  right: "1.3rem",
  bottom: "1.3rem",
  position: "fixed",
  zIndex: "10"
}

export default function ScrollTopButton() {
  const [isScrolling, setIsScrolling] = useState(false);

  const handleToTopScroll = () => {
    window.scrollTo(0, 0);
  };

  useEffect(() => {
    const position = () => {
      if (window.scrollY > 420) {
        setIsScrolling(true);
      } else {
        setIsScrolling(false);
      }
    };

    window.addEventListener("scroll", position);

    return () => {
      window.removeEventListener("scroll", position);
    };
  }, []);

  const variants = {
    visible: {scale: 1, opacity: 1},
    hidden: {scale: 0, opacity: 0},
  }

  return (
    <motion.button
      onClick={handleToTopScroll}
      initial="hidden"
      animate={isScrolling ? "visible" : "hidden"}
      variants={variants}
      style={buttonStyle}
    >
      <ArrowUpward sx={{
        fontSize: "2em"
      }} />
    </motion.button>
  );
}
