import Home from "./pages/Home";
import User from "./pages/User";

import Navbar from "./components/Navbar";

import ProtectedRoute from "./components/ProtectedRoute";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import FeedbackEscolar from "./pages/subpages/FeedbackEscolar";
import CanalSeguro from "./pages/subpages/CanalSeguro";
import Register from "./pages/debug/register";
import Login from "./pages/Login";
import Interaction from "./pages/subpages/Interaction";

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
        <Route path="/sub/interaction" element={
          <ProtectedRoute>
            <Interaction />
          </ProtectedRoute>
        } />
        <Route path="/sub/login" element={<Login />} />
        <Route path="/debug/register" element={<Register />} />

      </Routes>

      <Navbar />

    </BrowserRouter>
  );
}

export default App;
