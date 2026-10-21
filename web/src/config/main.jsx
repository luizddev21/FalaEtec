// Inicializa a árvore React dentro do elemento #root criado em index.html.
// A folha global é carregada aqui para valer também em telas sem o componente Screen.
// Inicializa React dentro de #root (index.html) e carrega os estilos globais.
import { createRoot } from 'react-dom/client'
import '../assets/stylesheets/index.css';
import App from '../App.jsx'

createRoot(document.getElementById('root')).render(
  <App />
)
