import { useEffect, useState } from "react";
import { useLocation, useNavigate, matchPath } from "react-router-dom";

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
    { name: "Relatos", path: "/sub/history/relatos" },
    { name: "Sugestões", path: "/sub/history/sugestoes" },
    { name: "Solicitações", path: "/sub/history/solicitacoes" },
    { name: "Avaliações", path: "/sub/history/avaliacoes" },
    { name: "Informações", path: "/interaction/:id" }
  ];

  const currentLink = links.find((link) =>
    matchPath(
      { path: link.path, end: true },
      location.pathname
    )
  );

  useEffect(() => {
    setPageTitle(currentLink?.name || "");
  }, [currentLink]);

  return (
    <header>
      {!currentLink && (
        <img
          src="/src/assets/images/falaetec_logo.png"
          alt="Logotipo do FalaEtec"
        />
      )}

      <div className="content">
        {currentLink && (
          <>
            <button className="go-back" onClick={() => navigate(-1)}>
              <ion-icon name="chevron-back-outline"></ion-icon>
              Voltar
            </button>

            <h1 className="title">{pageTitle}</h1>
          </>
        )}
      </div>
    </header>
  );
}