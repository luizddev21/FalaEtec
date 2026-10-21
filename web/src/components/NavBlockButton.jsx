// Atalho em bloco com arte pronta: seleciona a versão responsiva da imagem e
// atua como link de rota ou como botão de ação, conforme as props recebidas.
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import "../assets/stylesheets/components/navblockbutton.css";

export default function NavBlockButton({ button, image, page, mode, wrap, column, onClick, label }) {
  const accessibleLabel = label || ({ EC: "Feedback Escolar", RS: "Enviar relato" }[image] || image);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const [isWrap, setIsWrap] = useState("");
  const [isColumn, setIsColumn] = useState("");

  // Converte opções booleanas em classes existentes no CSS do botão.
  useEffect(() => {
    if (wrap) {
      setIsWrap("wrap");
    }

    if (column) {
      setIsColumn("column");
      setIsWrap("");
    }
  }, []);

  // Atualiza a largura para escolher a arte Small, Medium ou Large.
  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // O modo estático é usado nas categorias; os demais modos seguem a largura.
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
    button ?
      <button aria-label={accessibleLabel} className={`nav-block-button ${isWrap} ${isColumn}`} onClick={onClick}>
        <img
          src={`/src/assets/images/button_assets/${image}-${buttonType}.png`}
          alt=""
        />
      </button>
      :
      <Link aria-label={accessibleLabel} to={`/${page}`} className={`nav-block-button ${isWrap} ${isColumn}`}>
        <img
          src={`/src/assets/images/button_assets/${image}-${buttonType}.png`}
          alt=""
        />
      </Link>
  );
}
