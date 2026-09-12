import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useLanguage } from "../../context/LanguageContext.jsx";
import { useIcons } from "../../icons.js";
import "./AddCuchubal.css";

function AddCuchubal() {
  const { t } = useLanguage();
  const I = useIcons();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  const submit = (data) => {
    if (data.sorteo) {
      navigate("/cuchubal/addManosSorteo", {
        state: [{ userData: data }],
      });
    } else {
      navigate("/cuchubal/addManos", {
        state: [{ userData: data }],
      });
    }
  };

  return (
    <div className="add-view animate-fade-in">
      <div className="view-header">
        <h1>{t("addCuchubal.title")}</h1>
        <p>{t("addCuchubal.desc")}</p>
      </div>

      <div className="form-card-container">
        <form onSubmit={handleSubmit(submit)} className="premium-form">
          <div className="form-grid">
            <div className="form-group full-width">
              <label><I.Edit /> {t("addCuchubal.nameLabel")}</label>
              <input
                type="text"
                placeholder={t("addCuchubal.namePlaceholder")}
                {...register("nombreCuchubal", { required: true })}
              />
              {errors.nombreCuchubal && <span className="error">{t("addCuchubal.nameLabel")}</span>}
            </div>

            <div className="form-group">
              <label><I.Calendar /> {t("addCuchubal.periodLabel")}</label>
              <select {...register("formaPago", { required: true })}>
                <option value="">{t("addCuchubal.select")}</option>
                <option value="Mensual">{t("addCuchubal.monthly")}</option>
                <option value="Quincenal">{t("addCuchubal.biweekly")}</option>
                <option value="Semanal">{t("addCuchubal.weekly")}</option>
              </select>
            </div>

            <div className="form-group">
              <label><I.Calendar /> {t("addCuchubal.startDate")}</label>
              <input
                type="date"
                {...register("fechaInicio", { required: true })}
              />
            </div>

            <div className="form-group">
              <label><I.Users /> {t("addCuchubal.participants")}</label>
              <input
                type="number"
                placeholder="0"
                {...register("noParticipantes", { required: true, min: 2, valueAsNumber: true })}
              />
              <small className="form-hint">{t("addCuchubal.participantsHint")}</small>
            </div>

            <div className="form-group">
              <label><I.DollarSign /> {t("addCuchubal.quota")}</label>
              <input
                type="number"
                placeholder="0.00"
                step="0.01"
                {...register("cuotaPorParticipante", { required: true, valueAsNumber: true })}
              />
            </div>

            <div className="form-group full-width checkbox-group">
              <div className="checkbox-wrapper">
                <input
                  type="checkbox"
                  id="sorteo"
                  {...register("sorteo")}
                />
                <label htmlFor="sorteo">
                  <div className="custom-check">
                    <I.Check />
                  </div>
                  {t("addCuchubal.autoDraw")}
                </label>
              </div>
              <p className="helper-text">{t("addCuchubal.autoDrawDesc")}</p>
            </div>
          </div>

          <div className="form-actions">
            <button type="button" className="btn-secondary" onClick={() => navigate("/cuchubal")}>
              {t("addCuchubal.cancel")}
            </button>
            <button type="submit" className="btn-primary-large">
              {t("addCuchubal.next")}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddCuchubal;
