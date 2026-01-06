import React, { useState, useEffect } from "react";
import logo from "../../assets/logo.png";
import { useNavigate } from "react-router-dom";
import { FiMenu, FiX, FiUser, FiHome, FiHelpCircle, FiSettings } from "react-icons/fi";
import "./MenuInicio.css";

export default function MenuInicio() {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  const navItems = [
    { name: "Inicio", icon: <FiHome />, path: "/" },
    { name: "Funciones", icon: <FiSettings />, path: "/functions" },
    { name: "FAQ", icon: <FiHelpCircle />, path: "/faq" },
  ];

  return (
    <header className={`main-header ${scrolled ? 'scrolled' : ''}`}>
      <nav className="nav-container">
        <div className="nav-logo" onClick={() => navigate("/")}>
          <img src={logo} alt="Cuchubal" />
          <span className="logo-text">Cuchubal</span>
        </div>

        <div className="desktop-menu">
          {navItems.map((item) => (
            <a key={item.path} onClick={() => navigate(item.path)} className="nav-link">
              {item.name}
            </a>
          ))}
          <div className="auth-buttons">
            <button className="btn-secondary" onClick={() => navigate("/login")}>
              Login
            </button>
            <button className="btn-primary" onClick={() => navigate("/add")}>
              Empezar gratis
            </button>
          </div>
        </div>

        <div className="mobile-toggle" onClick={toggleMenu}>
          {menuOpen ? <FiX /> : <FiMenu />}
        </div>

        <div className={`mobile-menu ${menuOpen ? 'active' : ''}`}>
          <div className="mobile-menu-content">
            {navItems.map((item) => (
              <a key={item.path} onClick={() => { navigate(item.path); toggleMenu(); }} className="mobile-nav-link">
                {item.icon} {item.name}
              </a>
            ))}
            <hr className="menu-divider" />
            <button className="btn-secondary w-full" onClick={() => { navigate("/login"); toggleMenu(); }}>
              Iniciar Sesión
            </button>
            <button className="btn-primary w-full" onClick={() => { navigate("/add"); toggleMenu(); }}>
              Crear Cuenta
            </button>
          </div>
        </div>
      </nav>
    </header>
  );
}
