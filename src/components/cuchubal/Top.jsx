import React from "react";
import logo from "../../assets/logo.png";
import { useNavigate } from "react-router-dom";
import { FiBell, FiSearch, FiUser, FiSun, FiMoon, FiGlobe } from "react-icons/fi";
import { useTheme } from "../../hooks/useTheme";
import { useLanguage } from "../../context/LanguageContext.jsx";
import "./Top.css";

function Top() {
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();
  const { t, language, toggleLanguage } = useLanguage();
  const username = localStorage.getItem("usuario");

  return (
    <header className="dashboard-top">
      <div className="top-left">
        <div className="top-logo" onClick={() => navigate("/")}>
          <img src={logo} alt="Cuchubal" />
          <span className="logo-text">Cuchubal</span>
        </div>
      </div>

      <div className="top-right">
        <div className="search-bar">
          <FiSearch />
          <input type="text" placeholder={t("common.search")} />
        </div>

        <div className="icon-actions">
          <button className="icon-btn" onClick={toggleTheme} title="Cambiar tema">
            {theme === 'dark' ? <FiSun /> : <FiMoon />}
          </button>

          <button className="icon-btn lang-toggle" onClick={toggleLanguage} title="Change Language">
            <FiGlobe />
            <span className="lang-text">{language.toUpperCase()}</span>
          </button>

          <button className="icon-btn"><FiBell /></button>
        </div>

        <div className="user-profile">
          <div className="user-info">
            <span className="username">{username}</span>
            <span className="role">{t("common.member")}</span>
          </div>
          <div className="avatar">
            <FiUser />
          </div>
        </div>
      </div>
    </header>
  );
}

export default Top;
