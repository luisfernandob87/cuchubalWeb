import { FiShield, FiLock, FiDatabase, FiFileText } from "react-icons/fi";
import { useLanguage } from "../../context/LanguageContext.jsx";
import "./Principal.css";

function Principal() {
  const { t } = useLanguage();

  const sections = [
    { icon: <FiShield />, title: t("privacyPage.s1"), content: t("privacyPage.s1d") },
    { icon: <FiLock />, title: t("privacyPage.s2"), content: t("privacyPage.s2d") },
    { icon: <FiDatabase />, title: t("privacyPage.s3"), content: t("privacyPage.s3d") },
    { icon: <FiFileText />, title: t("privacyPage.s4"), content: t("privacyPage.s4d") }
  ];

  return (
    <div className="policy-page-container">
      <div className="section-header">
        <span className="section-subtitle">{t("privacyPage.subtitle")}</span>
        <h2>{t("privacyPage.title")} <span className="gradient-text">{t("privacyPage.titleColor")}</span></h2>
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
