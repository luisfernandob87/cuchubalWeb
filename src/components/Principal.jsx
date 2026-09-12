import Footer from "./inicio/Footer";
import FuncionalidadesInicio from "./inicio/FuncionalidadesInicio";
import InfoInicio from "./inicio/InfoInicio";
import MenuInicio from "./inicio/MenuInicio";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext.jsx";
import { useIcons } from "../icons.js";
import "../styles/Principal.css";

function Principal() {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const I = useIcons();

  return (
    <div className="principal-container">
      <MenuInicio />

      <main>
        <InfoInicio />

        <FuncionalidadesInicio />

        <section className="cta-section animate-fade-in">
          <div className="cta-card">
            <div className="cta-content">
              <h2>{t("cta.title")} <span className="accent-text">{t("cta.titleColor")}</span></h2>
              <p>{t("cta.desc")}</p>
              <button className="btn-primary-large" onClick={() => navigate("/add")}>
                {t("cta.button")} <I.ArrowRight />
              </button>
            </div>
            <div className="cta-glow"></div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default Principal;
