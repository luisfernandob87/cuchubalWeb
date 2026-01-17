import React, { useState } from "react";
import logo from "../../assets/logo.png";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { FiMail, FiArrowLeft, FiSend } from "react-icons/fi";
import { useLanguage } from "../../context/LanguageContext.jsx";
import "./Principal.css";

function Principal() {
  const navigate = useNavigate();
  const { t } = useLanguage();
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
            <FiSend />
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
        <img
          src={logo}
          alt="Cuchubal Logo"
          className="reset-logo"
          onClick={() => navigate("/")}
        />
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
          <FiMail className="input-icon" />
          {errors.correo && <span className="error-message">{t("contact.reqEmail")}</span>}
        </div>

        <button type="submit" className="reset-button">
          {t("auth.resetBtn")} <FiSend />
        </button>

        <div className="reset-footer-links">
          <button
            type="button"
            className="text-link"
            onClick={() => navigate("/login")}
          >
            <FiArrowLeft /> {t("auth.backLogin")}
          </button>
        </div>
      </form>
    </div>
  );
}

export default Principal;
