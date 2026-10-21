// Cabeçalho que escolhe o título pelo caminho atual. Em telas sem nome mapeado,
// mantém o logotipo; nas demais oferece retorno à página anterior.
// Resolve o título do cabeçalho pela URL atual. Rotas sem título mapeado exibem
// o logotipo; rotas reconhecidas oferecem retorno ao histórico do navegador.
import { useEffect, useState } from "react";
import { useLocation, useNavigate, matchPath } from "react-router-dom";
import "../assets/stylesheets/components/header.css"

export default function Header() {
  const [pageTitle, setPageTitle] = useState("");

  const location = useLocation();
  const navigate = useNavigate();

  // Mapa local entre caminhos e títulos apresentados nas páginas.
  const links = [
    // Mapa local entre rotas e os títulos apresentados no cabeçalho.
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
    { name: "Informações", path: "/interaction/:id" },
    { name: "Gerenciar Usuário", path: "/admin/manage-user"},
    { name: "Adicionar Usuário", path: "/admin/add-user"},
    { name: "Gerenciar Turma", path: "/admin/manage-turma"},
    { name: "Adicionar Turma", path: "/admin/add-turma"},
    { name: "Gerenciar Curso", path: "/admin/manage-curso"},
    { name: "Adicionar Curso", path: "/admin/add-curso"}
  ];

  const currentLink = links.find((link) =>
    matchPath(
      { path: link.path, end: true },
      location.pathname
    )
  );

  useEffect(() => {
    // Atualiza o estado usado pelo título da página quando a rota muda.
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
