// Página de escolha dos três fluxos de participação escolar: avaliar, solicitar
// algo à escola ou enviar uma sugestão.
import Screen from "../../components/Screen";
import NavBlockButton from "../../components/NavBlockButton";

export default function FeedbackEscolar() {
  return (
    <Screen>
      <section className="user-info">
        <div className="button-box wrap">
          <NavBlockButton page="../sub/avaliacao" image="EAV" mode="static" wrap label="Avaliação" />
          <NavBlockButton page="../sub/solicitacao" image="ESO" mode="static" wrap label="Solicitação" />
          <NavBlockButton page="../sub/sugestao" image="ESU" mode="static" wrap label="Sugestão" />
        </div>
      </section>
    </Screen>
  );
}
