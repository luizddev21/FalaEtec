// Cartão semântico de histórico: o conteúdo é fornecido pela lista e acionado
// pelo botão, que repassa o clique para abrir os detalhes.
import "../assets/stylesheets/components/history-card.css";

export default function HistoryCard({ key, onClick, children }) {
    return (
        <li key={key} className="history-card">
            <button
                onClick={onClick}
            >
                {children}
            </button>
        </li>
    )
}
