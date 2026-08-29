import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function Screen({ children, banner }) {
  const [pageTitle, setPageTitle] = useState("");

  const location = useLocation();
  const navigate = useNavigate();

  const links = [
    { name: "Canal Seguro", path: "/sub/canalseguro" },
    { name: "Feedback Escolar", path: "/sub/feedbackescolar" },
    { name: "Feedback", path: "/sub/interaction" }
  ];

  const show = links.some((link) => link.path === location.pathname);

  useEffect(() => {
    links.forEach((link) => {
      if (link.path === location.pathname) setPageTitle(link.name);
    });
  }, [location.pathname]);

  return (
    <>
      <header>
        {!show && (
          <img
            src="/src/assets/images/falaetec_logo.png"
            alt="Logotipo do FalaEtec"
          />
        )}
        <div className="content">
          {show && (
            <>
              <button className="go-back" onClick={() => navigate(-1)}>
                <ion-icon name="chevron-back-outline"></ion-icon> Voltar
              </button>
              <h1 className="title">{pageTitle}</h1>
            </>
          )}
        </div>
      </header>
      <main className="screen">
        {banner && (
          <img
            src={banner}
            alt="Banner principal"
            className="hero-banner potrait"
          />
        )}
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
      </main>
    </>
  );
}
