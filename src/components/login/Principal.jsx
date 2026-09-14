import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import api from "../../api/axios";
import { useForm } from "react-hook-form";
import { useLanguage } from "../../context/LanguageContext.jsx";
import { useIcons } from "../../icons.js";
import { LogoMark } from "../Logo";
import "./Principal.css";

function Principal() {
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useLanguage();
  const I = useIcons();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [serverError, setServerError] = useState("");
  const created = !!location.state?.registered;

  const submit = (data) => {
    setServerError("");
    api.post("/login", data)
      .then((res) => {
        localStorage.setItem("usuario", res.data.data.user.nombre);
        localStorage.setItem("token", res.data.data.token);
        localStorage.setItem("userId", res.data.data.user.id);
        navigate("/cuchubal");
      })
      .catch((err) => {
        const code = err?.response?.data?.message;
        if (code === "USER_NOT_FOUND") setServerError(t("auth.errorUserNotFound"));
        else if (code === "INVALID_PASSWORD") setServerError(t("auth.errorInvalidPassword"));
        else setServerError(t("auth.errorGeneric"));
        console.error("Login error", err);
      });
  };

  return (
    <div className="login-card animate-fade-in">
      <div className="login-header">
        <span
          className="login-logo"
          onClick={() => navigate("/")}
          role="button"
          tabIndex={0}
        >
          <LogoMark size={80} />
        </span>
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
          <I.Mail className="input-icon" />
          {errors.correo && <span className="error-message">{errors.correo.message}</span>}
        </div>

        <div className="input-group">
          <input
            type="password"
            placeholder={t("common.password")}
            {...register("password", { required: true })}
            className={`auth-input ${errors.password ? "error" : ""}`}
          />
          <I.Lock className="input-icon" />
          {errors.password && <span className="error-message">{errors.password.message}</span>}
        </div>

        {created && <div className="success-alert">{t("auth.accountCreatedLogin")}</div>}
        {serverError && <div className="error-alert">{serverError}</div>}

        <button type="submit" className="login-button">
          {t("common.login")} <I.ArrowRight />
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
