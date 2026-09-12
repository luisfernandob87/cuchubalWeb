import { useNavigate } from "react-router-dom";
import api from "../../api/axios";
import { useForm } from "react-hook-form";
import { useLanguage } from "../../context/LanguageContext.jsx";
import { useIcons } from "../../icons.js";
import { LogoMark } from "../Logo";
import "./Principal.css";

function Principal() {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const I = useIcons();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const submit = (data) => {
    api.post("/signup", data).then(() => {
      navigate("/login");
    }).catch(err => {
      console.error("Signup error", err);
    });
  };

  const password = watch("password");

  return (
    <div className="register-card animate-fade-in">
      <div className="register-header">
        <span
          className="register-logo"
          onClick={() => navigate("/")}
          role="button"
          tabIndex={0}
        >
          <LogoMark size={80} />
        </span>
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
            <I.User className="input-icon" />
            {errors.nombre && <span className="error-message">{t("common.name")}</span>}
          </div>

          <div className="input-group">
            <input
              placeholder={t("common.email")}
              type="email"
              {...register("correo", { required: true })}
              className={`auth-input ${errors.correo ? "error" : ""}`}
            />
            <I.Mail className="input-icon" />
            {errors.correo && <span className="error-message">{t("contact.reqEmail")}</span>}
          </div>

          <div className="input-group">
            <input
              placeholder={t("common.password")}
              type="password"
              {...register("password", { required: true })}
              className={`auth-input ${errors.password ? "error" : ""}`}
            />
            <I.Lock className="input-icon" />
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
            <I.CheckCircle className="input-icon" />
            {errors.confirmPassword && <span className="error-message">{errors.confirmPassword.message}</span>}
          </div>
        </div>

        <button type="submit" className="register-button">
          {t("auth.createBtn")} <I.ArrowRight />
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
