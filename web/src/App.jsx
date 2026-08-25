import Home from "./pages/Home";
import User from "./pages/User";

import Navbar from "./components/Navbar";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import FeedbackEscolar from "./pages/subpages/FeedbackEscolar";
import CanalSeguro from "./pages/subpages/CanalSeguro";

function App() {
  return (
    <BrowserRouter>

      <Routes>

        <Route path="/" element={<Home />} />
        <Route path="/user" element={<User />} />
        <Route path="/feedbackescolar" element={<FeedbackEscolar />} />
        <Route path="/canalseguro" element={<CanalSeguro />} />

      </Routes>

      <Navbar />

    </BrowserRouter>
  );
}

export default App;
