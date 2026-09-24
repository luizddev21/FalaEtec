import Home from "./pages/Home";
import User from "./pages/User";

import Navbar from "./components/Navbar";

import ProtectedRoute from "./components/ProtectedRoute";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import FeedbackEscolar from "./pages/subpages/FeedbackEscolar";
import CanalSeguro from "./pages/subpages/CanalSeguro";
import Register from "./pages/debug/register";
import Login from "./pages/Login";
import Avaliacao from "./pages/subpages/Avaliacao";
import Solicitacao from "./pages/subpages/Solicitacao";
import Sugestao from "./pages/subpages/Sugestao";
import Relato from "./pages/subpages/Relato";
import ForgotPassword from "./pages/ForgotPassword";

import Relatos from "./pages/subpages/history/Relatos";
import Sugestoes from "./pages/subpages/history/Sugestoes";
import Solicitacoes from "./pages/subpages/history/Solicitacoes";
import Avaliacoes from "./pages/subpages/history/Avaliacoes";
import Info from "./pages/subpages/history/info/[id]";

function App() {
  return (
    <BrowserRouter>

      <Routes>

        <Route path="/" element={ 
          <ProtectedRoute>
            <Home />
          </ProtectedRoute> 
        } />
        <Route path="/user" element={
          <ProtectedRoute>
            <User />
          </ProtectedRoute>
        } />
        <Route path="/sub/feedbackescolar" element={
          <ProtectedRoute>
            <FeedbackEscolar />
          </ProtectedRoute>
        } />
        <Route path="/sub/canalseguro" element={
          <ProtectedRoute>
            <CanalSeguro />
          </ProtectedRoute>
        } />
        <Route path="/sub/avaliacao" element={
          <ProtectedRoute>
            <Avaliacao />
          </ProtectedRoute>
        } />
        <Route path="/sub/solicitacao" element={
          <ProtectedRoute>
            <Solicitacao />
          </ProtectedRoute>
        } />
        <Route path="/sub/sugestao" element={
          <ProtectedRoute>
            <Sugestao />
          </ProtectedRoute>
        } />
        <Route path="/sub/relato" element={
          <ProtectedRoute>
            <Relato />
          </ProtectedRoute>
        } />
        <Route path="sub/history/relatos" element={
          <ProtectedRoute>
            <Relatos />
          </ProtectedRoute>
        } />
        <Route path="sub/history/sugestoes" element={
          <ProtectedRoute>
            <Sugestoes />
          </ProtectedRoute>
        } />
        <Route path="sub/history/solicitacoes" element={
          <ProtectedRoute>
            <Solicitacoes />
          </ProtectedRoute>
        } />
        <Route path="sub/history/avaliacoes" element={
          <ProtectedRoute>
            <Avaliacoes />
          </ProtectedRoute>
        } />
        <Route path="interaction/:id" element={
          <ProtectedRoute>
            <Info />
          </ProtectedRoute>
        } />
        <Route path="/sub/login" element={ <Login /> } />
        <Route path="/sub/forgot-password" element={ <ForgotPassword /> } />
        <Route path="/debug/register" element={<Register />} />

      </Routes>

      <Navbar />

    </BrowserRouter>
  );
}

export default App;
