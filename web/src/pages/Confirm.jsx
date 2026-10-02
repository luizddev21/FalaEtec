import Screen from "../components/Screen";
import { useNavigate } from "react-router-dom";
import "../assets/stylesheets/pages/confirm.css";

export default function Confirm() {
  const navigate = useNavigate();

  return (
    <Screen fullscreen center>
      <div className="guide">
        <h2 className="title">Envio concluído! <ion-icon name="checkmark-circle"></ion-icon></h2>
        <button className="default" onClick={() => navigate("/")}>
          Voltar para a tela inicial
        </button>
      </div>
    </Screen>
  );
}
