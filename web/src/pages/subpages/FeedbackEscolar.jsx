import Screen from "../../components/Screen";
import NavBlockButton from "../../components/NavBlockButton";

export default function FeedbackEscolar() {
  return (
    <Screen>
      <section className="user-info">
        <div className="button-box wrap">
          <NavBlockButton page="../sub/avaliacao" image="EAV" mode="static" wrap />
          <NavBlockButton page="../sub/solicitacao" image="ESO" mode="static" wrap />
          <NavBlockButton page="../sub/sugestao" image="ESU" mode="static" wrap />
        </div>
      </section>
    </Screen>
  );
}
