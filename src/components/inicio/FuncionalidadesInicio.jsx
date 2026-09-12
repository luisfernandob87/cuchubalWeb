import "../../styles/FuncionalidadesInicio.css";
import { useLanguage } from "../../context/LanguageContext.jsx";
import { useIcons } from "../../icons.js";

function FuncionalidadesInicio() {
  const { t } = useLanguage();
  const I = useIcons();

  const featuresList = [
    { icon: <I.PlusCircle />, title: t("features.f1"), desc: t("features.f1d") },
    { icon: <I.Users />, title: t("features.f2"), desc: t("features.f2d") },
    { icon: <I.Mail />, title: t("features.f3"), desc: t("features.f3d") },
    { icon: <I.Calendar />, title: t("features.f4"), desc: t("features.f4d") },
    { icon: <I.Activity />, title: t("features.f6"), desc: t("features.f6d") },
    { icon: <I.Smartphone />, title: t("features.f5"), desc: t("features.f5d") },
  ];

  return (
    <section className="features-section">
      <div className="section-header">
        <span className="section-subtitle">{t("features.subtitle")}</span>
        <h2>
          {t("features.title")} <span className="accent-text">{t("features.titleColor")}</span>
        </h2>
        <p>{t("features.desc")}</p>
      </div>

      <div className="features-grid">
        {featuresList.map((f, i) => (
          <div className="feature-card" key={i}>
            <div className="feature-icon-wrapper">{f.icon}</div>
            <h3>{f.title}</h3>
            <p>{f.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default FuncionalidadesInicio;