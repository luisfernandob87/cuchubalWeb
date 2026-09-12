import "../../styles/InfoInicio.css";
import HeroMockup from "./HeroMockup";
import HeroIllustration from "./HeroIllustration";
import HeroPhoto from "./HeroPhoto";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "../../context/LanguageContext.jsx";
import { useDesign } from "../../hooks/useDesign.js";
import { useIcons } from "../../icons.js";

function InfoInicio() {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const { heroVariant } = useDesign();
  const I = useIcons();

  const heroVisual =
    heroVariant === "photo" ? (
      <HeroPhoto />
    ) : heroVariant === "illustration" ? (
      <HeroIllustration />
    ) : (
      <HeroMockup />
    );

  return (
    <section className="hero-container animate-fade-in">
      <div className="hero-content">
        <div className="badge">{t("hero.badge")}</div>
        <h1>
          {t("hero.title")} <span className="accent-text">{t("hero.subtitle")}</span>
        </h1>
        <p>{t("hero.description")}</p>

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
            <I.Shield />
            <span>{t("hero.statSec")}</span>
          </div>
          <div className="stat">
            <I.Users />
            <span>{t("hero.statUsers")}</span>
          </div>
          <div className="stat">
            <I.TrendingUp />
            <span>{t("hero.statReal")}</span>
          </div>
        </div>
      </div>

      <div className="hero-visual">{heroVisual}</div>
    </section>
  );
}

export default InfoInicio;