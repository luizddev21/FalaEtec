import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import "../assets/stylesheets/components/navblockbutton.css";

export default function NavBlockButton({ image, page, mode, wrap }) {
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const [isWrap, setIsWrap] = useState("");

  useEffect(() => {
    if (wrap) {
      setIsWrap("wrap");
    }
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  let buttonType;

  if (mode === "static") {
    buttonType = "Static";
  } else if (screenWidth <= 425) {
    buttonType = "Small";
  } else if (screenWidth <= 768) {
    buttonType = "Medium";
  } else {
    buttonType = "Large";
  }

  return (
    <Link to={`/${page}`} className={`nav-block-button ${isWrap}`}>
      <img
        src={`/src/assets/images/button_assets/${image}-${buttonType}.png`}
        alt=""
      />
    </Link>
  );
}
