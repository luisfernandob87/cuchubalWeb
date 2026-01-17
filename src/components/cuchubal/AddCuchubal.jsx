import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import api from "../../api/axios";
import { FiEdit3, FiCalendar, FiUsers, FiDollarSign, FiCheck } from "react-icons/fi";
import { useLanguage } from "../../context/LanguageContext.jsx";
import "./AddCuchubal.css";

function AddCuchubal() {
  const { t } = useLanguage();
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm();

  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");

  const submit = (data) => {
    api.post("/cuchubal", { ...data, idUsuario: userId }).then((res) => {
      const isSorteo = getValues("sorteo");
      if (isSorteo) {
        navigate("/cuchubal/addManosSorteo", {
          state: [{ userData: data }, { userData: res.data.id }],
        });
      } else {
        navigate("/cuchubal/addManos", {
          state: [{ userData: data }, { userData: res.data.id }],
        });
      }
    }).catch(err => console.error(err));
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
              <label><FiEdit3 /> {t("addCuchubal.nameLabel")}</label>
              <input
                type="text"
                placeholder={t("addCuchubal.namePlaceholder")}
                {...register("nombreCuchubal", { required: true })}
              />
              {errors.nombreCuchubal && <span className="error">{t("addCuchubal.nameLabel")}</span>}
            </div>

            <div className="form-group">
              <label><FiCalendar /> {t("addCuchubal.periodLabel")}</label>
              <select {...register("formaPago", { required: true })}>
                <option value="">{t("addCuchubal.select")}</option>
                <option value="Mensual">{t("addCuchubal.monthly")}</option>
                <option value="Quincenal">{t("addCuchubal.biweekly")}</option>
                <option value="Semanal">{t("addCuchubal.weekly")}</option>
              </select>
            </div>

            <div className="form-group">
              <label><FiCalendar /> {t("addCuchubal.startDate")}</label>
              <input
                type="date"
                {...register("fechaInicio", { required: true })}
              />
            </div>

            <div className="form-group">
              <label><FiUsers /> {t("addCuchubal.participants")}</label>
              <input
                type="number"
                placeholder="0"
                {...register("noParticipantes", { required: true, min: 2 })}
              />
            </div>

            <div className="form-group">
              <label><FiDollarSign /> {t("addCuchubal.quota")}</label>
              <input
                type="number"
                placeholder="0.00"
                step="0.01"
                {...register("cuotaPorParticipante", { required: true })}
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
                    <FiCheck />
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
