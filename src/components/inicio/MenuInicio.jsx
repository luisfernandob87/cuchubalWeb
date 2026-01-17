import React, { useState, useEffect } from "react";
import logo from "../../assets/logo.png";
import { useNavigate } from "react-router-dom";
import { FiMenu, FiX, FiUser, FiHome, FiHelpCircle, FiSettings, FiSun, FiMoon, FiGlobe } from "react-icons/fi";
import { useTheme } from "../../hooks/useTheme";
import { useLanguage } from "../../context/LanguageContext.jsx";
import "./MenuInicio.css";

export default function MenuInicio() {
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();
  const { t, language, toggleLanguage } = useLanguage();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  useEffect(() => {
    const handleScroll = () => {
      const isHomePage = window.location.pathname === "/";
      setScrolled(window.scrollY > 20 || !isHomePage);
    };
    handleScroll(); // Initial check
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [window.location.pathname]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  const navItems = [
    { name: t("common.home"), icon: <FiHome />, path: "/" },
    { name: t("common.functions"), icon: <FiSettings />, path: "/functions" },
    { name: t("common.faq"), icon: <FiHelpCircle />, path: "/faq" },
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

          <div className="nav-actions-group">
            <button className="theme-toggle-btn" onClick={toggleTheme} title={t("common.functions")}>
              {theme === 'dark' ? <FiSun /> : <FiMoon />}
            </button>

            <button className="lang-toggle-btn" onClick={toggleLanguage} title="Change Language">
              <FiGlobe />
              <span>{language.toUpperCase()}</span>
            </button>
          </div>

          <div className="auth-buttons">
            <button className="btn-secondary" onClick={() => navigate("/login")}>
              {t("common.login")}
            </button>
            <button className="btn-primary" onClick={() => navigate("/add")}>
              {t("common.getStarted")}
            </button>
          </div>
        </div>

        <div className="mobile-actions">
          <button className="theme-toggle-btn mobile" onClick={toggleTheme}>
            {theme === 'dark' ? <FiSun /> : <FiMoon />}
          </button>

          <button className="lang-toggle-btn mobile" onClick={toggleLanguage}>
            <FiGlobe />
            <span>{language.toUpperCase()}</span>
          </button>

          <div className="mobile-toggle" onClick={toggleMenu}>
            {menuOpen ? <FiX /> : <FiMenu />}
          </div>
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
              {t("common.login")}
            </button>
            <button className="btn-primary w-full" onClick={() => { navigate("/add"); toggleMenu(); }}>
              {t("common.signup")}
            </button>
          </div>
        </div>
      </nav>
    </header>
  );
}
