import React from "react";
import { Link } from "react-router-dom";
import "../../styles/Footer.css";
import logo from "../../assets/logo.png";
import { FiGithub, FiTwitter, FiInstagram } from "react-icons/fi";

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-brand">
          <div className="footer-logo">
            <img src={logo} alt="Cuchubal" />
            <span>Cuchubal</span>
          </div>
          <p>La forma más moderna y segura de ahorrar en comunidad.</p>
          <div className="social-links">
            <a href="#"><FiTwitter /></a>
            <a href="#"><FiInstagram /></a>
            <a href="#"><FiGithub /></a>
          </div>
        </div>

        <div className="footer-grid">
          <div className="footer-column">
            <h3>Producto</h3>
            <Link to="/functions">Funciones</Link>
            <Link to="/faq">Preguntas Frecuentes</Link>
          </div>
          <div className="footer-column">
            <h3>Legal</h3>
            <Link to="/confidentiality">Privacidad</Link>
            <Link to="/contact">Contacto</Link>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© {currentYear} Cuchubal. Todos los derechos reservados.</p>
      </div>
    </footer>
  );
}

export default Footer;
