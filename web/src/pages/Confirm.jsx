// Confirma o envio realizado por um formulário e oferece navegação de volta ao início.
import Screen from "../components/Screen";
import { useNavigate } from "react-router-dom";
import "../assets/stylesheets/pages/confirm.css";

export default function Confirm() {
  const navigate = useNavigate();

  return (
    <Screen fullscreen center>
      <div className="guide">
        <h1 className="title">Envio concluído! <ion-icon name="checkmark-circle"></ion-icon></h1>
        <button className="default" onClick={() => navigate("/")}>
          Voltar para a tela inicial
        </button>
      </div>
    </Screen>
  );
}
