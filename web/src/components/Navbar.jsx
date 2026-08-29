import { useEffect, useRef, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { motion } from "framer-motion";

import "../assets/stylesheets/components/navbar.css";

export default function Navbar() {
  const location = useLocation();

  const links = [
    { name: "Início", path: "/", icon: "home" },
    { name: "Usuário", path: "/user", icon: "person" },
  ];

  const linksRef = useRef([]);

  const [indicator, setIndicator] = useState({
    left: 0,
    width: 0,
  });

  useEffect(() => {
    const activeIndex = links.findIndex(
      (link) => link.path === location.pathname
    );

    if (activeIndex === -1) return;

    const activeElement = linksRef.current[activeIndex];

    if (!activeElement) return;

    setIndicator({
      left: activeElement.offsetLeft,
      width: activeElement.offsetWidth,
    });
  }, [location.pathname]);

  return (
    <nav className="navbar">
      <div className="navbar-links">
        <motion.div
          className="nav-indicator"
          animate={{
            left: indicator.left,
            width: indicator.width,
          }}
          transition={{
            duration: 0.35,
            ease: [0.22, 1, 0.36, 1],
          }}
        />

        {links.map((link, index) => (
          <NavLink
            key={link.path}
            to={link.path}
            ref={(element) => {
              linksRef.current[index] = element;
            }}
            className={({ isActive }) =>
              `nav-link ${isActive ? "active" : ""}`
            }
          >
            <ion-icon name={link.icon}></ion-icon>
            {link.name}
          </NavLink>
        ))}
      </div>
    </nav>
  );
}