// Orienta quem esqueceu a senha a procurar um gestor; o sistema não executa
// redefinição automática, e o link retorna à rota inicial.
import { Link } from "react-router-dom";
import "../assets/stylesheets/pages/forgot-password.css";

export default function ForgotPassword() {
    return (
        <div className="forgot-password">
            <h1 className="">
                Por favor, entre em contato com algum gestor para redefinir a sua senha.
            </h1>
            <Link to="/"><ion-icon name="arrow-back-outline"></ion-icon> Voltar</Link>
        </div>
    );
}
