import React from "react";
import "../../styles/InfoInicio.css";
import heroImage from "../../assets/hero.png";
import { FiTrendingUp, FiShield, FiUsers } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "../../context/LanguageContext.jsx";

function InfoInicio() {
  const navigate = useNavigate();
  const { t } = useLanguage();

  return (
    <section className="hero-container animate-fade-in">
      <div className="hero-content">
        <div className="badge">{t("hero.badge")}</div>
        <h1>{t("hero.title")} <span className="gradient-text">{t("hero.subtitle")}</span></h1>
        <p>
          {t("hero.description")}
        </p>

        <div className="hero-actions">
          <button className="btn-primary-large" onClick={() => navigate("/add")}>
            {t("hero.cta")}
          </button>
          <button className="btn-outline-large" onClick={() => navigate("/functions")}>
            {t("hero.secondary")}
          </button>
        </div>

        <div className="hero-stats">
          <div className="stat">
            <FiShield />
            <span>{t("hero.statSec")}</span>
          </div>
          <div className="stat">
            <FiUsers />
            <span>{t("hero.statUsers")}</span>
          </div>
          <div className="stat">
            <FiTrendingUp />
            <span>{t("hero.statReal")}</span>
          </div>
        </div>
      </div>

      <div className="hero-visual">
        <img src={heroImage} alt="Cuchubal Digital" className="float-animation" />
        <div className="visual-glow"></div>
      </div>
    </section>
  );
}

export default InfoInicio;
