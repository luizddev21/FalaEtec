// Mensagem inline ou de topo. O tipo escolhe a classe visual e o papel de
// anúncio para leitores de tela; form seleciona a apresentação dentro do formulário.
import "../assets/stylesheets/components/message.css";

export default function Message({ type = "error", form, message }) {
  return form ? (
    <div className={`camp message ${type}`} role={type === "error" ? "alert" : "status"} aria-atomic="true">
      <div className="input">
        <span>{message}</span>
      </div>
    </div>
  ) : (
    <div className={`top-message ${type}`} role={type === "error" ? "alert" : "status"} aria-atomic="true">
      <h2>{message}</h2>
    </div>
  );
}
