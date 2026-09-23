import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function Header() {
  const [pageTitle, setPageTitle] = useState("");

  const location = useLocation();
  const navigate = useNavigate();

  const links = [
    { name: "Canal Seguro", path: "/sub/canalseguro" },
    { name: "Feedback Escolar", path: "/sub/feedbackescolar" },
    { name: "Avaliação", path: "/sub/avaliacao" },
    { name: "Sugestão", path: "/sub/sugestao" },
    { name: "Solicitação", path: "/sub/solicitacao" },
    { name: "Relato", path: "/sub/relato" },
    { name: "Feedbacks", path: "/sub/history/feedbacks" },
    { name: "Relatos", path: "/sub/history/relatos" },
  ];

  const show = links.some((link) => link.path === location.pathname);

  useEffect(() => {
    links.forEach((link) => {
      if (link.path === location.pathname) setPageTitle(link.name);
    });
  }, [location.pathname]);

  return (
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
  );
}
