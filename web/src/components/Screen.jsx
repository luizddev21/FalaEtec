import Header from "./Header";
import { useEffect, useState } from "react";
import '../assets/stylesheets/index.css';
import Loading from "../components/Loading";
import Message from "./Message";

export default function Screen({ children, banner, center, fullscreen, loading = false, message={type: "", message: ""} }) {
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
    loading ?
      <Loading />
      :
      <>
        <Header />
        <main className={`screen ${isCenter} ${isFullscreen}`}>
        {message.message !== "" && <Message type={message.type} message={message.message}/>}
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
