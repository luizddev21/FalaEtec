// Página de entrada do Canal Seguro: oferece retorno ao feedback escolar ou
// encaminha o aluno ao formulário guiado de relato.
import Screen from "../../components/Screen";
import NavBlockButton from "../../components/NavBlockButton";

export default function CanalSeguro() {
  return (
    <Screen>
      <section className="user-info">
        <div className="button-box wrap">
          <NavBlockButton page="/" image="EC" mode="static" wrap label="Feedback Escolar" />
          <NavBlockButton page="../sub/relato" image="RS" mode="static" wrap label="Enviar relato" />
        </div>
      </section>
    </Screen>
  );
}
