import "../assets/stylesheets/components/message.css";

export default function Message({ type = "error", form, message }) {
  return form ? (
    <div className={`camp message ${type}`}>
      <div className="input">
        <span>{message}</span>
      </div>
    </div>
  ) : (
    <div className={`top-message ${type}`}>
      <h2>{message}</h2>
    </div>
  );
}
