import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { FiMail, FiMessageSquare, FiSend, FiType } from "react-icons/fi";
import { useLanguage } from "../../context/LanguageContext.jsx";
import "./Principal.css";

function Principal() {
  const { t } = useLanguage();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <div className="contact-page-container">
      <div className="section-header">
        <span className="section-subtitle">{t("contact.subtitle")}</span>
        <h2>{t("contact.title")} <span className="gradient-text">{t("contact.titleColor")}</span></h2>
        <p>{t("contact.desc")}</p>
      </div>

      <div className="contact-card animate-fade-in">
        <form onSubmit={handleSubmit(onSubmit)} className="contact-form">
          <div className="form-group">
            <label htmlFor="username">
              <FiMail className="input-icon-label" /> {t("common.email")}
            </label>
            <div className="input-wrapper">
              <input
                type="email"
                id="username"
                className={`contact-input ${errors.username ? 'error' : ''}`}
                placeholder="tu@correo.com"
                {...register("username", { required: t("contact.reqEmail") })}
              />
            </div>
            {errors.username && <span className="error-message">{errors.username.message}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="asunto">
              <FiType className="input-icon-label" /> {t("contact.asunto")}
            </label>
            <div className="input-wrapper">
              <input
                type="text"
                id="asunto"
                className={`contact-input ${errors.asunto ? 'error' : ''}`}
                placeholder={t("contact.asuntoPlaceholder")}
                {...register("asunto", { required: t("contact.reqAsunto") })}
              />
            </div>
            {errors.asunto && <span className="error-message">{errors.asunto.message}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="mensaje">
              <FiMessageSquare className="input-icon-label" /> {t("contact.mensaje")}
            </label>
            <div className="input-wrapper">
              <textarea
                id="mensaje"
                className={`contact-input area ${errors.mensaje ? 'error' : ''}`}
                placeholder={t("contact.mensajePlaceholder")}
                rows="5"
                {...register("mensaje", { required: t("contact.reqMensaje") })}
              />
            </div>
            {errors.mensaje && <span className="error-message">{errors.mensaje.message}</span>}
          </div>

          <button type="submit" className="btn-primary-large w-full">
            {t("contact.btn")} <FiSend />
          </button>
        </form>
      </div>
    </div>
  );
}

export default Principal;
