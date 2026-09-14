import { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useLanguage } from "../../context/LanguageContext.jsx";
import { useIcons } from "../../icons.js";
import { LogoMark } from "../Logo";
import api from "../../api/axios";
import "./Principal.css";

function InvitePrincipal() {
  const navigate = useNavigate();
  const { token } = useParams();
  const { t } = useLanguage();
  const I = useIcons();

  const [state, setState] = useState("loading");
  const [user, setUser] = useState({ nombre: "", correo: "" });
  const [errorType, setErrorType] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const password = watch("password");

  const checkInvite = useCallback(async () => {
    setState("loading");
    setErrorType(null);
    try {
      const res = await api.get(`/invite/${token}`);
      setUser(res.data.data);
      setState("form");
    } catch (err) {
      if (!err.response) {
        setErrorType("network");
      } else {
        setErrorType(err.response.status === 410 ? "expired" : "invalid");
      }
      setState("error");
    }
  }, [token]);

  useEffect(() => {
    checkInvite();
  }, [checkInvite]);

  const onSubmit = async (data) => {
    setSubmitting(true);
    try {
      await api.post(`/invite/${token}`, { password: data.password });
      setState("success");
    } catch (err) {
      const status = err.response?.status;
      if (status === 410) {
        setErrorType("expired");
        setState("error");
      } else {
        setErrorType("generic");
        setState("error");
      }
    } finally {
      setSubmitting(false);
    }
  };

  if (state === "loading") {
    return (
      <div className="invite-card animate-fade-in">
        <div className="invite-header">
          <span
            className="invite-logo"
            onClick={() => navigate("/")}
            role="button"
            tabIndex={0}
          >
            <LogoMark size={80} />
          </span>
          <div className="invite-spinner" />
          <p className="invite-muted">{t("invite.loading")}</p>
        </div>
      </div>
    );
  }

  if (state === "error") {
    const isExpired = errorType === "expired";
    const isNetwork = errorType === "network";
    return (
      <div className="invite-card animate-fade-in">
        <div className="invite-header">
          <span
            className="invite-logo"
            onClick={() => navigate("/")}
            role="button"
            tabIndex={0}
          >
            <LogoMark size={80} />
          </span>
          <div className="invite-error-icon-wrapper">
            <I.HelpCircle />
          </div>
          <h1>
            {isNetwork
              ? t("invite.networkTitle")
              : isExpired
                ? t("invite.expiredTitle")
                : t("invite.invalidTitle")}
          </h1>
          <p>
            {isNetwork
              ? t("invite.networkSub")
              : isExpired
                ? t("invite.expiredSub")
                : t("invite.invalidSub")}
          </p>
          {errorType === "generic" && (
            <p className="invite-error-text">{t("invite.errorGeneric")}</p>
          )}
        </div>
        {isNetwork ? (
          <button className="invite-button" onClick={checkInvite}>
            {t("invite.retry")} <I.RefreshCw />
          </button>
        ) : (
          <button className="invite-button" onClick={() => navigate("/login")}>
            {t("auth.backLogin")}
          </button>
        )}
      </div>
    );
  }

  if (state === "success") {
    return (
      <div className="invite-card animate-fade-in">
        <div className="invite-header">
          <div className="invite-success-icon-wrapper">
            <I.CheckCircle />
          </div>
          <h1>{t("invite.successTitle")}</h1>
          <p>{t("invite.successSub")}</p>
        </div>
        <button className="invite-button" onClick={() => navigate("/login")}>
          {t("invite.goLogin")} <I.ArrowRight />
        </button>
      </div>
    );
  }

  return (
    <div className="invite-card animate-fade-in">
      <div className="invite-header">
        <span
          className="invite-logo"
          onClick={() => navigate("/")}
          role="button"
          tabIndex={0}
        >
          <LogoMark size={80} />
        </span>
        <h1>{t("invite.title")}</h1>
        <p>{t("invite.sub").replace("{nombre}", user.nombre)}</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="invite-form">
        <div className="input-group">
          <input
            type="email"
            value={user.correo}
            readOnly
            className="auth-input invite-readonly"
          />
          <I.Mail className="input-icon" />
        </div>

        <div className="input-group">
          <input
            type="password"
            placeholder={t("invite.newPassword")}
            {...register("password", { required: true })}
            className={`auth-input ${errors.password ? "error" : ""}`}
          />
          <I.Lock className="input-icon" />
          {errors.password && (
            <span className="error-message">{t("invite.required")}</span>
          )}
        </div>

        <div className="input-group">
          <input
            type="password"
            placeholder={t("invite.confirmPassword")}
            {...register("confirm", {
              required: true,
              validate: (value) => value === password || "Error",
            })}
            className={`auth-input ${errors.confirm ? "error" : ""}`}
          />
          <I.Lock className="input-icon" />
          {errors.confirm && (
            <span className="error-message">
              {errors.confirm.type === "validate"
                ? t("invite.confirmMatch")
                : t("invite.required")}
            </span>
          )}
        </div>

        <button type="submit" className="invite-button" disabled={submitting}>
          {submitting ? t("invite.loading") : t("invite.setBtn")}
          <I.Send />
        </button>
      </form>
    </div>
  );
}

export default InvitePrincipal;