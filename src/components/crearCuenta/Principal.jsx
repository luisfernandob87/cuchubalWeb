import React from "react";
import logo from "../../assets/logo.png";
import { useNavigate } from "react-router-dom";
import api from "../../api/axios";
import { useForm } from "react-hook-form";
import { FiUser, FiMail, FiLock, FiCheckCircle, FiArrowRight, FiPhone, FiMapPin } from "react-icons/fi";
import { useLanguage } from "../../context/LanguageContext.jsx";
import { useEffect } from "react";
import "./Principal.css";

function Principal() {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    // Signup process remains clean as requested
  }, [setValue]);

  const submit = (data) => {
    api.post("/signup", data).then((res) => {
      navigate("/login");
    }).catch(err => {
      console.error("Signup error", err);
    });
  };

  const password = watch("password");

  return (
    <div className="register-card animate-fade-in">
      <div className="register-header">
        <img
          src={logo}
          alt="Cuchubal Logo"
          className="register-logo"
          onClick={() => navigate("/")}
        />
        <h1>{t("auth.join")}</h1>
        <p>{t("auth.joinSub")}</p>
      </div>

      <form onSubmit={handleSubmit(submit)} className="register-form">
        <div className="input-grid">
          <div className="input-group">
            <input
              placeholder={t("common.name")}
              type="text"
              {...register("nombre", { required: true })}
              className={`auth-input ${errors.nombre ? "error" : ""}`}
            />
            <FiUser className="input-icon" />
            {errors.nombre && <span className="error-message">{t("common.name")}</span>}
          </div>

          <div className="input-group">
            <input
              placeholder={t("common.email")}
              type="email"
              {...register("correo", { required: true })}
              className={`auth-input ${errors.correo ? "error" : ""}`}
            />
            <FiMail className="input-icon" />
            {errors.correo && <span className="error-message">{t("contact.reqEmail")}</span>}
          </div>

          <div className="input-group">
            <input
              placeholder={t("common.password")}
              type="password"
              {...register("password", { required: true })}
              className={`auth-input ${errors.password ? "error" : ""}`}
            />
            <FiLock className="input-icon" />
            {errors.password && <span className="error-message">{t("common.password")}</span>}
          </div>

          <div className="input-group">
            <input
              placeholder={t("common.confirmPassword")}
              type="password"
              {...register("confirmPassword", {
                required: true,
                validate: (value) => value === password || "Error",
              })}
              className={`auth-input ${errors.confirmPassword ? "error" : ""}`}
            />
            <FiCheckCircle className="input-icon" />
            {errors.confirmPassword && <span className="error-message">{errors.confirmPassword.message}</span>}
          </div>
        </div>

        <button type="submit" className="register-button">
          {t("auth.createBtn")} <FiArrowRight />
        </button>

        <div className="register-footer-links">
          <button
            type="button"
            className="text-link"
            onClick={() => navigate("/login")}
          >
            {t("auth.hasAccount")}
          </button>
        </div>
      </form>
    </div>
  );
}

export default Principal;
