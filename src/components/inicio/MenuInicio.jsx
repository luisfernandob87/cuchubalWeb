import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../../hooks/useTheme";
import { useLanguage } from "../../context/LanguageContext.jsx";
import { useIcons } from "../../icons.js";
import { LogoMark } from "../Logo";
import "./MenuInicio.css";

export default function MenuInicio() {
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();
  const { t, language, toggleLanguage } = useLanguage();
  const I = useIcons();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  useEffect(() => {
    const handleScroll = () => {
      const isHomePage = window.location.pathname === "/";
      setScrolled(window.scrollY > 20 || !isHomePage);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const navItems = [
    { name: t("common.home"), icon: <I.Home />, path: "/" },
    { name: t("common.functions"), icon: <I.Settings />, path: "/functions" },
    { name: t("common.faq"), icon: <I.HelpCircle />, path: "/faq" },
  ];

  return (
    <header className={`main-header ${scrolled ? "scrolled" : ""}`}>
      <nav className="nav-container">
        <div className="nav-left">
          <div className="mobile-toggle" onClick={toggleMenu}>
            {menuOpen ? <I.X /> : <I.Menu />}
          </div>
          <div className="nav-logo" onClick={() => navigate("/")}>
            <LogoMark size={40} />
            <span className="logo-text">Cuchubal</span>
          </div>
        </div>

        <div className="desktop-menu">
          {navItems.map((item) => (
            <a key={item.path} onClick={() => navigate(item.path)} className="nav-link">
              {item.name}
            </a>
          ))}

          <div className="nav-actions-group">
            <button className="theme-toggle-btn" onClick={toggleTheme} title={t("common.functions")}>
              {theme === "dark" ? <I.Sun /> : <I.Moon />}
            </button>

            <button className="lang-toggle-btn" onClick={toggleLanguage} title="Change Language">
              <I.Globe />
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
            {theme === "dark" ? <I.Sun /> : <I.Moon />}
          </button>

          <button className="lang-toggle-btn mobile" onClick={toggleLanguage}>
            <I.Globe />
            <span>{language.toUpperCase()}</span>
          </button>
        </div>

        <div className={`mobile-menu ${menuOpen ? "active" : ""}`}>
          <div className="mobile-menu-content">
            {navItems.map((item) => (
              <a
                key={item.path}
                onClick={() => {
                  navigate(item.path);
                  toggleMenu();
                }}
                className="mobile-nav-link"
              >
                {item.icon} {item.name}
              </a>
            ))}
            <hr className="menu-divider" />
            <button
              className="btn-secondary w-full"
              onClick={() => {
                navigate("/login");
                toggleMenu();
              }}
            >
              {t("common.login")}
            </button>
            <button
              className="btn-primary w-full"
              onClick={() => {
                navigate("/add");
                toggleMenu();
              }}
            >
              {t("common.signup")}
            </button>
          </div>
        </div>
      </nav>
    </header>
  );
}