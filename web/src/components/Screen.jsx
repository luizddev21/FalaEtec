// Moldura compartilhada das páginas públicas e de aluno: aplica preferências
// salvas, inclui cabeçalho, aviso, banner e conteúdo em uma região principal.
// Moldura compartilhada das páginas de aluno: cabeçalho, avisos, banner e
// conteúdo principal, além da restauração do filtro de cores salvo no perfil.
import Header from "./Header";
import { useEffect, useState } from "react";
import "../assets/stylesheets/index.css";
import Loading from "../components/Loading";
import Message from "./Message";

const STORAGE_KEY = "colorBlindnessFilter";

const filters = [
  "normal",
  "protanopia",
  "protanomalia",
  "deuteranopia",
  "deuteranomalia",
  "tritanopia",
  "tritanomalia",
  "acromatopsia",
  "acromatomalia",
];

export default function Screen({
  children,
  banner,
  center,
  fullscreen,
  loading = false,
  message = { type: "", message: "" },
}) {
  // As opções center/fullscreen são aplicadas como classes para reutilizar o CSS.
  // As classes opcionais controlam alinhamento/altura sem duplicar o componente.
  const [isCenter, setIsCenter] = useState("");
  const [isFullscreen, setIsFullscreen] = useState("");

  useEffect(() => {
    // Reaplica no documento o filtro de cores escolhido anteriormente no perfil.
    const filter = localStorage.getItem(STORAGE_KEY) || "normal";

    document.documentElement.classList.remove(...filters);
    document.documentElement.classList.add(filter);
  }, []);

  useEffect(() => {
    if (center) {
      setIsCenter("center");
    }

    if (fullscreen) {
      setIsFullscreen("fullscreen");
    }
  }, [center, fullscreen]);

  return loading ? (
    <Loading />
  ) : (
    <>
      <Header />

      <a className="skip-link" href="#main-content">Pular para o conteúdo</a>
      <main id="main-content" tabIndex={-1} className={`screen ${isCenter} ${isFullscreen}`}>
        {message.message !== "" && (
          <Message type={message.type} message={message.message} />
        )}

        {banner && (
          // Versão retrato exibida em telas menores; a versão paisagem vem abaixo.
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
