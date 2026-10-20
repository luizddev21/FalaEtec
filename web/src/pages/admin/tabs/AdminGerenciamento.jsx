import { useState } from "react";
import "../../../assets/stylesheets/pages/adminUsuarios.css";
import Users from "./sub/Users.jsx";
import Turmas from "./sub/Turmas.jsx";
import Cursos from "./sub/Cursos.jsx";

import Navbar from "../../../components/Navbar.jsx";

export default function AdminGerenciamento() {

  const [activeIndex, setActiveIndex] = useState("usuarios");

  return (
    <section>
      <Navbar
        admin
        type2
        value={activeIndex}
        onChange={setActiveIndex}
        links={[
          {
            name: "Usuários",
            path: "usuarios",
            icon: "chatbubbles",
          },
          {
            name: "Turmas",
            path: "turmas",
            icon: "grid",
          },
          {
            name: "Cursos",
            path: "cursos",
            icon: "school",
          }
        ]}
      />
      {activeIndex === "usuarios" && <Users />}
      {activeIndex === "turmas" && <Turmas />}
      {activeIndex === "cursos" && <Cursos />}
    </section>
  );
}
