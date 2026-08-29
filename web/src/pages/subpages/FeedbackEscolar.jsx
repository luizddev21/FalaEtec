import Screen from "../../components/Screen";
import NavBlockButton from "../../components/NavBlockButton";

export default function FeedbackEscolar() {
  return (
    <Screen>
      <section className="user-info">
        <div className="button-box wrap">
          <NavBlockButton page="../sub/interaction?type=avaliacao" image="EAV" mode="static" wrap />
          <NavBlockButton page="../sub/interaction?type=solicitacao" image="ESO" mode="static" wrap />
          <NavBlockButton page="../sub/interaction?type=sugestao" image="ESU" mode="static" wrap />
        </div>
      </section>
    </Screen>
  );
}
