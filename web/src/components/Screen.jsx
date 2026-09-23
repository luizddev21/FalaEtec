import Header from "./Header";

export default function Screen({ children, banner, fullscreen = false }) {
  return (
    <>
      <Header />
      <main className="screen">
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
