import Home from "./pages/Home";
import User from "./pages/User";

import Navbar from "./components/Navbar";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import FeedbackEscolar from "./pages/subpages/FeedbackEscolar";
import CanalSeguro from "./pages/subpages/CanalSeguro";
import Register from "./pages/debug/register";
import Login from "./pages/login";

function App() {
  return (
    <BrowserRouter>

      <Routes>

        <Route path="/" element={<Home />} />
        <Route path="/user" element={<User />} />
        <Route path="/feedbackescolar" element={<FeedbackEscolar />} />
        <Route path="/canalseguro" element={<CanalSeguro />} />
        <Route path="/sub/login" element={<Login />} />
        <Route path="/debug/register" element={<Register />} />

      </Routes>

      <Navbar />

    </BrowserRouter>
  );
}

export default App;
