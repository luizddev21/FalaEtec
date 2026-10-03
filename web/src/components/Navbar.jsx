import { useEffect, useRef, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { motion } from "framer-motion";

import "../assets/stylesheets/components/navbar.css";

const defaultLinks = [
  { name: "Início", path: "/", icon: "home" },
  { name: "Usuário", path: "/user", icon: "person" },
];

export default function Navbar({
  admin,
  type2,
  value,
  onChange,
  links = defaultLinks,
}) {
  const location = useLocation();

  // Se "value" foi passado, usa modo controlado
  const controlled = value !== undefined;

  const show = admin
    ? true
    : links.some((link) => link.path === location.pathname);

  const linksRef = useRef([]);

  const [indicator, setIndicator] = useState({
    left: 0,
    width: 0,
  });

  useEffect(() => {
    const activeIndex = controlled
      ? links.findIndex((link) => link.path === value)
      : links.findIndex((link) => link.path === location.pathname);

    if (activeIndex === -1) return;

    const element = linksRef.current[activeIndex];

    if (!element) return;

    setIndicator({
      left: element.offsetLeft,
      width: element.offsetWidth,
    });
  }, [location.pathname, value, controlled, links]);

  if (!show) return null;

  return (
    <nav className={`navbar ${type2 ? "type2" : ""}`}>
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

        {links.map((link, index) => {
          const active = controlled
            ? value === link.path
            : location.pathname === link.path;

          if (controlled) {
            return (
              <button
                key={link.path}
                ref={(el) => (linksRef.current[index] = el)}
                className={`nav-link ${active ? "active" : ""}`}
                onClick={() => onChange?.(link.path)}
                type="button"
              >
                <ion-icon name={link.icon}></ion-icon>
                {link.name}
              </button>
            );
          }

          return (
            <NavLink
              key={link.path}
              to={link.path}
              ref={(el) => (linksRef.current[index] = el)}
              className={`nav-link ${active ? "active" : ""}`}
            >
              <ion-icon name={link.icon}></ion-icon>
              {link.name}
            </NavLink>
          );
        })}
      </div>
    </nav>
  );
}