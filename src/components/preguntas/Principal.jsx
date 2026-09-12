import { useLanguage } from "../../context/LanguageContext.jsx";
import { useIcons } from "../../icons.js";
import "./Principal.css";

function Principal() {
  const { t } = useLanguage();
  const I = useIcons();

  const faqs = [
    { question: t("faqPage.q1"), answer: t("faqPage.a1") },
    { question: t("faqPage.q2"), answer: t("faqPage.a2") },
    { question: t("faqPage.q3"), answer: t("faqPage.a3") },
    { question: t("faqPage.q4"), answer: t("faqPage.a4") },
    { question: t("faqPage.q5"), answer: t("faqPage.a5") }
  ];

  return (
    <div className="faq-page-container">
      <div className="section-header">
        <span className="section-subtitle">{t("faqPage.subtitle")}</span>
        <h2>{t("faqPage.title")} <span className="accent-text">{t("faqPage.titleColor")}</span></h2>
        <p>{t("faqPage.desc")}</p>
      </div>

      <div className="faq-grid">
        {faqs.map((faq, index) => (
          <div className="faq-card" key={index}>
            <div className="faq-question-row">
              <I.HelpCircle className="faq-icon" />
              <h4>{faq.question}</h4>
            </div>
            <p className="faq-answer">{faq.answer}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Principal;
