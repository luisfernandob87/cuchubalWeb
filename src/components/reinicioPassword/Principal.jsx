import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useLanguage } from "../../context/LanguageContext.jsx";
import { useIcons } from "../../icons.js";
import { LogoMark } from "../Logo";
import "./Principal.css";

function Principal() {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const I = useIcons();
  const [submitted, setSubmitted] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log("Reset password for:", data.correo);
    // Simular envío
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="reset-card animate-fade-in">
        <div className="reset-header">
          <div className="success-icon-wrapper">
            <I.Send />
          </div>
          <h1>{t("auth.resetSuccess")}</h1>
          <p>{t("auth.resetSuccessSub")}</p>
        </div>
        <button className="reset-button" onClick={() => navigate("/login")}>
          {t("auth.backLogin")}
        </button>
      </div>
    );
  }

  return (
    <div className="reset-card animate-fade-in">
      <div className="reset-header">
        <span
          className="reset-logo"
          onClick={() => navigate("/")}
          role="button"
          tabIndex={0}
        >
          <LogoMark size={80} />
        </span>
        <h1>{t("auth.resetTitle")}</h1>
        <p>{t("auth.resetSub")}</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="reset-form">
        <div className="input-group">
          <input
            type="email"
            placeholder={t("common.email")}
            {...register("correo", { required: true })}
            className={`auth-input ${errors.correo ? "error" : ""}`}
          />
          <I.Mail className="input-icon" />
          {errors.correo && <span className="error-message">{t("contact.reqEmail")}</span>}
        </div>

        <button type="submit" className="reset-button">
          {t("auth.resetBtn")} <I.Send />
        </button>

        <div className="reset-footer-links">
          <button
            type="button"
            className="text-link"
            onClick={() => navigate("/login")}
          >
            <I.ArrowLeft /> {t("auth.backLogin")}
          </button>
        </div>
      </form>
    </div>
  );
}

export default Principal;
