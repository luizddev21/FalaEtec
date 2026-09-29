import Header from "./Header";
import { useEffect, useState } from "react";
import '../assets/stylesheets/index.css';

export default function Screen({ children, banner, center, fullscreen }) {
  const [isCenter, setIsCenter] = useState("");
  const [isFullscreen, setIsFullscreen] = useState("");

  useEffect(() => {
      if (center) {
        setIsCenter("center");
      }
      if (fullscreen) {
        setIsFullscreen("fullscreen");
      }
    }, []);
  return (
    <>
      <Header />
      <main className={`screen ${isCenter} ${isFullscreen}`}>
        {banner && (
          <img
            src={banner}
            alt="Banner principal"
            className="hero-banner potrait"
          />
        )}
        {!fullscreen ? (
          <div className="content">
            {banner && (
              <img
                src={banner}
                alt="Banner principal"
                className="hero-banner landscape"
              />
            )}
            {children}
          </div>
        ) : (
          <div>
            {banner && (
              <img
                src={banner}
                alt="Banner principal"
                className="hero-banner landscape"
              />
              
            )}
            {children}
          </div>
        )}
      </main>
    </>
  );
}
