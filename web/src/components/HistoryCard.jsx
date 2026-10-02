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