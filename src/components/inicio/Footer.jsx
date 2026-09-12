import { Link } from "react-router-dom";
import "../../styles/Footer.css";
import { useLanguage } from "../../context/LanguageContext.jsx";
import { useIcons } from "../../icons.js";
import { LogoFull } from "../Logo";

function Footer() {
  const currentYear = new Date().getFullYear();
  const { t } = useLanguage();
  const I = useIcons();

  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-brand">
          <div className="footer-logo">
            <LogoFull size={36} />
          </div>
          <p>{t("common.brandText")}</p>
          <div className="social-links">
            <a href="#" aria-label="Twitter" onClick={(e) => e.preventDefault()}>
              <I.Twitter />
            </a>
            <a href="#" aria-label="Instagram" onClick={(e) => e.preventDefault()}>
              <I.Instagram />
            </a>
            <a href="#" aria-label="GitHub" onClick={(e) => e.preventDefault()}>
              <I.Github />
            </a>
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
        <p>
          © {currentYear} Cuchubal. {t("common.rights")}.
        </p>
      </div>
    </footer>
  );
}

export default Footer;