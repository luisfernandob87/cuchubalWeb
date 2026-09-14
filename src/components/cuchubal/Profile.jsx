import { useEffect, useState } from "react";
import api from "../../api/axios";
import { useForm } from "react-hook-form";
import { useLanguage } from "../../context/LanguageContext.jsx";
import { useIcons } from "../../icons.js";
import { detectCountryCode } from "../../data/countries";
import CountryCodePicker from "./CountryCodePicker";
import "./Profile.css";

function Profile() {
  const { t } = useLanguage();
  const I = useIcons();
  const userId = localStorage.getItem("userId");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [zona, setZona] = useState(detectCountryCode());
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    api
      .get(`/usuario/${userId}`)
      .then((res) => {
        const u = res.data;
        reset({ nombre: u.nombre || "", correo: u.correo || "", telefono: u.telefono || "" });
        if (u.zona) setZona(u.zona);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError(t("profile.saveError"));
        setLoading(false);
      });
  }, [userId, reset, t]);

  const onSubmit = async (data) => {
    setSaving(true);
    setSaved(false);
    setError("");
    try {
      const res = await api.put(`/usuario/${userId}`, {
        nombre: data.nombre,
        correo: data.correo,
        telefono: data.telefono || null,
        zona,
      });
      localStorage.setItem("usuario", res.data.nombre);
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch (err) {
      console.error(err);
      setError(t("profile.saveError"));
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="loader">{t("dashboard.loading")}</div>;

  return (
    <div className="profile-view animate-fade-in">
      <header className="view-header">
        <div>
          <h1>{t("profile.title")}</h1>
          <p>{t("profile.subtitle")}</p>
        </div>
      </header>

      <div className="profile-card">
        <form onSubmit={handleSubmit(onSubmit)} className="profile-form">
          <div className="profile-grid">
            <div className="input-group">
              <label><I.User /> {t("common.name")}</label>
              <input
                type="text"
                placeholder={t("common.name")}
                {...register("nombre", { required: true })}
                className={errors.nombre ? "error" : ""}
              />
            </div>

            <div className="input-group">
              <label><I.Mail /> {t("common.email")}</label>
              <input
                type="email"
                placeholder="ejemplo@correo.com"
                {...register("correo", { required: true })}
                className={errors.correo ? "error" : ""}
              />
            </div>

            <div className="input-group">
              <label><I.Globe /> {t("common.zone")}</label>
              <CountryCodePicker value={zona} onChange={setZona} />
            </div>

            <div className="input-group">
              <label><I.Phone /> {t("common.phone")}</label>
              <input
                type="tel"
                placeholder="5555 5555"
                {...register("telefono")}
              />
            </div>
          </div>

          {error && <div className="error-alert">{error}</div>}
          {saved && <div className="success-alert">{t("profile.saveSuccess")}</div>}

          <div className="form-actions">
            <button type="submit" className="btn-primary-large" disabled={saving}>
              {saving ? t("profile.saving") : t("profile.saveBtn")} <I.Save />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Profile;