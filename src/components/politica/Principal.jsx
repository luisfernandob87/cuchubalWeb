import { useLanguage } from "../../context/LanguageContext.jsx";
import { useIcons } from "../../icons.js";
import "./Principal.css";

function Principal() {
  const { t } = useLanguage();
  const I = useIcons();

  const sections = [
    { icon: <I.Shield />, title: t("privacyPage.s1"), content: t("privacyPage.s1d") },
    { icon: <I.Lock />, title: t("privacyPage.s2"), content: t("privacyPage.s2d") },
    { icon: <I.Database />, title: t("privacyPage.s3"), content: t("privacyPage.s3d") },
    { icon: <I.FileText />, title: t("privacyPage.s4"), content: t("privacyPage.s4d") }
  ];

  return (
    <div className="policy-page-container">
      <div className="section-header">
        <span className="section-subtitle">{t("privacyPage.subtitle")}</span>
        <h2>{t("privacyPage.title")} <span className="accent-text">{t("privacyPage.titleColor")}</span></h2>
        <p>{t("privacyPage.desc")}</p>
      </div>

      <div className="policy-grid">
        {sections.map((section, index) => (
          <div className="policy-card" key={index}>
            <div className="policy-icon-wrapper">
              {section.icon}
            </div>
            <div className="policy-content">
              <h4>{section.title}</h4>
              <p>{section.content}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Principal;
