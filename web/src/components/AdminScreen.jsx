// Estrutura visual e estados comuns às telas administrativas: mostra loading,
// uma mensagem opcional e o conteúdo dentro da área principal do painel.
// Moldura das telas de gestão: apresenta carregamento ou mensagem opcional,
// aplica o tema administrativo e envolve o conteúdo da página.
import "../assets/stylesheets/admin.css";
import Loading from "../components/Loading";
import Message from "./Message";

export default function Screen({
  children,
  loading = false,
  message = { type: "", message: "" },
}) {
  return loading ? (
    <Loading />
  ) : (
    <main className={`admin-screen`}>
      {message.message !== "" && (
        <Message type={message.type} message={message.message} />
      )}
      <a className="skip-link" href="#admin-main-content">Pular para o conteúdo</a>
      <div id="admin-main-content" tabIndex={-1} className="content">{children}</div>
    </main>
  );
}
