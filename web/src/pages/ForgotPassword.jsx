import { Link } from "react-router-dom"

export default function ForgotPassword() {
    return (
        <div className="forgot-password">
            <h2 className="">
                Por favor, entre em contato com algum gestor para redefinir a sua senha.
            </h2>
            <Link to="/"><ion-icon name="arrow-back-outline"></ion-icon> Voltar</Link>
        </div>
    );
}