import Screen from "../../components/Screen";
import NavBlockButton from "../../components/NavBlockButton";

export default function CanalSeguro() {
  return (
    <Screen>
      <section className="user-info">
        <div className="button-box wrap">
          <NavBlockButton page="../sub/interaction?type=avaliacao" image="EC" mode="static" wrap />
          <NavBlockButton page="../sub/interaction?type=solicitacao" image="RS" mode="static" wrap />
        </div>
      </section>
    </Screen>
  );
}
