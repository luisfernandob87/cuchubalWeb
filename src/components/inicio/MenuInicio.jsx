import React, { useState, useEffect } from "react";
import imagen from "../../assets/react.svg";
import { useNavigate } from "react-router-dom";

export default function MenuInicio() {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  return (
    <header>
      <nav>
        <div className="nav-logo">
          <img
            src={imagen}
            alt="React"
            onClick={() => {
              navigate("/");
            }}
          />
        </div>
        
        <div className="hamburger-menu" onClick={toggleMenu}>
          <div className={`hamburger-icon ${menuOpen ? 'open' : ''}`}>
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
        
        <div className={`nav-links ${menuOpen ? 'active' : ''}`}>
          <a
            onClick={() => {
              navigate("/functions");
              setMenuOpen(false);
            }}
          >
            Funciones
          </a>
          <a
            onClick={() => {
              navigate("/faq");
              setMenuOpen(false);
            }}
          >
            Preguntas Frecuentes
          </a>
          <a className="btnLogin"
            onClick={() => {
              navigate("/login");
              setMenuOpen(false);
            }}
          >
            Iniciar Sesión
          </a>
          <a className="btnRegister"
            onClick={() => {
              navigate("/add");
              setMenuOpen(false);
            }}
          >
            Crear Cuenta
          </a>
        </div>
      </nav>
    </header>
  );
}
