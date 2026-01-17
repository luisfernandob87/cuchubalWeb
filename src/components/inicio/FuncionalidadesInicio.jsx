import React from "react";
import "../../styles/FuncionalidadesInicio.css";
import { FiPlusCircle, FiUsers, FiMail, FiCalendar, FiSmartphone, FiActivity } from "react-icons/fi";
import { useLanguage } from "../../context/LanguageContext.jsx";

function FuncionalidadesInicio() {
  const { t } = useLanguage();

  const featuresList = [
    { icon: <FiPlusCircle />, title: t("features.f1"), desc: t("features.f1d") },
    { icon: <FiUsers />, title: t("features.f2"), desc: t("features.f2d") },
    { icon: <FiMail />, title: t("features.f3"), desc: t("features.f3d") },
    { icon: <FiCalendar />, title: t("features.f4"), desc: t("features.f4d") },
    { icon: <FiActivity />, title: t("features.f6"), desc: t("features.f6d") },
    { icon: <FiSmartphone />, title: t("features.f5"), desc: t("features.f5d") }
  ];

  return (
    <section className="features-section">
      <div className="section-header">
        <span className="section-subtitle">{t("features.subtitle")}</span>
        <h2>{t("features.title")} <span className="gradient-text">{t("features.titleColor")}</span></h2>
        <p>{t("features.desc")}</p>
      </div>

      <div className="features-grid">
        {featuresList.map((f, i) => (
          <div className="feature-card" key={i}>
            <div className="feature-icon-wrapper">
              {f.icon}
            </div>
            <h3>{f.title}</h3>
            <p>{f.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default FuncionalidadesInicio;
