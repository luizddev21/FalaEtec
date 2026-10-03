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
      <div className="content">{children}</div>
    </main>
  );
}
