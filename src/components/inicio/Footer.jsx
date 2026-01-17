import React from "react";
import { Link } from "react-router-dom";
import "../../styles/Footer.css";
import logo from "../../assets/logo.png";
import { FiGithub, FiTwitter, FiInstagram } from "react-icons/fi";
import { useLanguage } from "../../context/LanguageContext.jsx";

function Footer() {
  const currentYear = new Date().getFullYear();
  const { t } = useLanguage();

  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-brand">
          <div className="footer-logo">
            <img src={logo} alt="Cuchubal" />
            <span>Cuchubal</span>
          </div>
          <p>{t("common.brandText")}</p>
          <div className="social-links">
            <a href="#"><FiTwitter /></a>
            <a href="#"><FiInstagram /></a>
            <a href="#"><FiGithub /></a>
          </div>
        </div>

        <div className="footer-grid">
          <div className="footer-column">
            <h3>{t("common.product")}</h3>
            <Link to="/functions">{t("common.functions")}</Link>
            <Link to="/faq">{t("common.faq")}</Link>
          </div>
          <div className="footer-column">
            <h3>{t("common.legal")}</h3>
            <Link to="/confidentiality">{t("common.privacy")}</Link>
            <Link to="/contact">{t("common.contact")}</Link>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© {currentYear} Cuchubal. {t("common.rights")}.</p>
      </div>
    </footer>
  );
}

export default Footer;
