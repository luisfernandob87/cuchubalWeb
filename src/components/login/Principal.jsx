import React from "react";
import logo from "../../assets/logo.png";
import { useNavigate } from "react-router-dom";
import api from "../../api/axios";
import { useForm } from "react-hook-form";
import { FiMail, FiLock, FiArrowRight } from "react-icons/fi";
import { useLanguage } from "../../context/LanguageContext.jsx";
import "./Principal.css";

function Principal() {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const submit = (data) => {
    api.post("/login", data)
      .then((res) => {
        localStorage.setItem("usuario", res.data.data.user.nombre);
        localStorage.setItem("token", res.data.data.token);
        localStorage.setItem("userId", res.data.data.user.id);
        navigate("/cuchubal");
      })
      .catch((err) => {
        console.error("Login error", err);
      });
  };

  return (
    <div className="login-card animate-fade-in">
      <div className="login-header">
        <img
          src={logo}
          alt="Cuchubal Logo"
          className="login-logo"
          onClick={() => navigate("/")}
        />
        <h1>{t("auth.welcome")}</h1>
        <p>{t("auth.welcomeSub")}</p>
      </div>

      <form onSubmit={handleSubmit(submit)} className="login-form">
        <div className="input-group">
          <input
            type="email"
            placeholder={t("common.email")}
            {...register("correo", { required: t("contact.reqEmail") })}
            className={`auth-input ${errors.correo ? "error" : ""}`}
          />
          <FiMail className="input-icon" />
          {errors.correo && <span className="error-message">{errors.correo.message}</span>}
        </div>

        <div className="input-group">
          <input
            type="password"
            placeholder={t("common.password")}
            {...register("password", { required: true })}
            className={`auth-input ${errors.password ? "error" : ""}`}
          />
          <FiLock className="input-icon" />
          {errors.password && <span className="error-message">{errors.password.message}</span>}
        </div>

        <button type="submit" className="login-button">
          {t("common.login")} <FiArrowRight />
        </button>

        <div className="login-footer-links">
          <button
            type="button"
            className="text-link"
            onClick={() => navigate("/add")}
          >
            {t("auth.noAccount")}
          </button>
          <button
            type="button"
            className="text-link"
            onClick={() => navigate("/restart")}
          >
            {t("auth.forgot")}
          </button>
        </div>
      </form>
    </div>
  );
}

export default Principal;
