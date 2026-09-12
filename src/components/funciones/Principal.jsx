import { useLanguage } from "../../context/LanguageContext.jsx";
import { useIcons } from "../../icons.js";
import "./Principal.css";

function Principal() {
  const { t } = useLanguage();
  const I = useIcons();

  const steps = [
    { icon: <I.UserPlus />, title: t("howItWorks.s1"), description: t("howItWorks.s1d") },
    { icon: <I.PlusSquare />, title: t("howItWorks.s2"), description: t("howItWorks.s2d") },
    { icon: <I.Users />, title: t("howItWorks.s3"), description: t("howItWorks.s3d") },
    { icon: <I.Settings />, title: t("howItWorks.s4"), description: t("howItWorks.s4d") },
    { icon: <I.CheckCircle />, title: t("howItWorks.s5"), description: t("howItWorks.s5d") }
  ];

  return (
    <div className="funciones-principal-container">
      <div className="section-header">
        <span className="section-subtitle">{t("howItWorks.subtitle")}</span>
        <h2>{t("howItWorks.title")} <span className="accent-text">{t("howItWorks.titleColor")}</span></h2>
        <p>{t("howItWorks.desc")}</p>
      </div>

      <div className="funciones-grid">
        {steps.map((step, index) => (
          <div className="funciones-feature-card" key={index}>
            <div className="funciones-icon-wrapper">
              {step.icon}
            </div>
            <h4 className="funciones-feature-title">{step.title}</h4>
            <p className="funciones-feature-description">{step.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Principal;
