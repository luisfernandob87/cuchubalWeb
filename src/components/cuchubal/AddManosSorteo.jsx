import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import api from "../../api/axios";
import { useLanguage } from "../../context/LanguageContext.jsx";
import { useIcons } from "../../icons.js";
import { detectCountryCode } from "../../data/countries";
import CountryCodePicker from "./CountryCodePicker";
import "./AddManos.css";

function AddManosSorteo() {
  const { t } = useLanguage();
  const I = useIcons();
  const { state } = useLocation();
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");

  const hasValidState = !!state && !!state[0];
  const noParticipantes = hasValidState ? Number(state[0].userData.noParticipantes) : 0;
  const { nombreCuchubal } = hasValidState ? state[0].userData : {};
  const formData = hasValidState ? state[0].userData : null;

  const [entries, setEntries] = useState(
    Array.from({ length: noParticipantes }, (_, i) => ({
      id: `participant-${i}`,
      correo: "",
      telefono: "",
      zona: "",
    }))
  );
  const [me, setMe] = useState(null);
  const [includeMe, setIncludeMe] = useState(true);
  const [selectedNumbers, setSelectedNumbers] = useState({});
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);
  const [isShuffleDisabled, setIsShuffleDisabled] = useState(true);
  const [loading, setLoading] = useState(false);
  const [numbersGenerated, setNumbersGenerated] = useState(false);

  const arrayParticipantes = Array.from({ length: entries.length }, (_, i) => i + 1);

  useEffect(() => {
    const init = async () => {
      let defaultCode = detectCountryCode();
      try {
        const res = await api.get(`/usuario/${userId}`);
        if (res.data) {
          setMe(res.data);
          if (res.data.zona) defaultCode = res.data.zona;
        }
      } catch (err) {
        console.error("Error obteniendo usuario:", err);
      }
      if (defaultCode) {
        setEntries(prev => prev.map(e => ({ ...e, zona: defaultCode })));
      }
    };
    init();
  }, [userId]);

  useEffect(() => {
    setEntries(prev => {
      if (includeMe && me) {
        return [
          { ...prev[0], correo: me.correo || "", telefono: me.telefono || "", zona: me.zona || detectCountryCode() },
          ...prev.slice(1),
        ];
      }
      if (!includeMe) {
        return prev.map((e, i) => (i === 0 ? { ...e, correo: "", telefono: "", zona: "" } : e));
      }
      return prev;
    });
  }, [includeMe, me]);

  const handleMailChange = (index, value) => {
    setEntries(prev => prev.map((e, i) => (i === index ? { ...e, correo: value } : e)));
    if (numbersGenerated) {
      setNumbersGenerated(false);
      setSelectedNumbers({});
    }
  };

  const handlePhoneChange = (index, value) => {
    setEntries(prev => prev.map((e, i) => (i === index ? { ...e, telefono: value } : e)));
  };

  const handleZoneChange = (index, value) => {
    setEntries(prev => prev.map((e, i) => (i === index ? { ...e, zona: value } : e)));
  };

  const generateUniqueRandomNumbers = () => {
    const numbers = [...arrayParticipantes].sort(() => Math.random() - 0.5);
    const newSelectedNumbers = {};
    numbers.forEach((num, index) => {
      newSelectedNumbers[index] = num;
    });
    setSelectedNumbers(newSelectedNumbers);
    setNumbersGenerated(true);
  };

  useEffect(() => {
    const mailsFilled = entries.every(e => (e.correo || "").trim() !== "" && (e.correo || "").includes('@'));
    setIsShuffleDisabled(!mailsFilled);
    setIsSubmitDisabled(!mailsFilled || !numbersGenerated || loading);
  }, [entries, numbersGenerated, loading]);

  const handleSave = async () => {
    setLoading(true);
    try {
      const payload = {
        ...formData,
        idUsuario: localStorage.getItem("userId"),
        noParticipantes: entries.length,
        participantes: entries.map((e, i) => ({
          correo: e.correo,
          telefono: e.telefono,
          zona: e.zona,
          numeroCuota: selectedNumbers[i],
        })),
      };
      await api.post("/cuchubal/complete", payload);
      navigate("/cuchubal");
    } catch (error) {
      console.error(error);
      alert(t("dashboard.saveError"));
    } finally {
      setLoading(false);
    }
  };

  if (!hasValidState) {
    navigate("/cuchubal");
    return null;
  }

  return (
    <div className="add-manos-view animate-fade-in">
      <header className="view-header">
        <h1>{t("dashboard.drawTitle")}</h1>
        <p>Cuchubal: <strong>{nombreCuchubal}</strong> • {entries.length} {t("dashboard.participants")}</p>
      </header>

      <div className="info-banner">
        <I.Info />
        <p dangerouslySetInnerHTML={{ __html: t("dashboard.drawInfo") }} />
      </div>

      <label className="include-me-check">
        <input
          type="checkbox"
          checked={includeMe}
          onChange={(e) => setIncludeMe(e.target.checked)}
        />
        {t("dashboard.includeMe")}
      </label>

      <div className="participants-grid">
        {arrayParticipantes.map((_, index) => {
          const entry = entries[index];
          const isMe = index === 0 && includeMe && !!me;
          return (
            <div className={`participant-card ${numbersGenerated ? 'highlight' : ''}`} key={entry.id}>
              <div className="participant-header">
                <div className="card-number">
                  {numbersGenerated ? <I.Hash /> : (index + 1)}
                </div>
                {isMe && <div className="me-badge"><I.User /> {t("dashboard.meLabel")}</div>}
                {numbersGenerated && (
                  <div className="auto-turno">
                    <I.CheckCircle /> {t("dashboard.turn")} #{selectedNumbers[index]}
                  </div>
                )}
              </div>

              <div className="input-group">
                <label><I.Mail /> {t("dashboard.participantEmail")}</label>
                <input
                  type="email"
                  placeholder="ejemplo@correo.com"
                  value={entry.correo || ""}
                  onChange={(e) => !isMe && handleMailChange(index, e.target.value)}
                  disabled={loading || isMe}
                />
              </div>

              <div className="input-row">
                <div className="input-group" style={{ flex: '0 0 130px' }}>
                  <label><I.Globe /> {t("common.zone")}</label>
                  <CountryCodePicker
                    value={entry.zona || ""}
                    onChange={(code) => !isMe && handleZoneChange(index, code)}
                    disabled={loading || isMe}
                  />
                </div>
                <div className="input-group" style={{ flex: '1' }}>
                  <label><I.Phone /> {t("common.phone")}</label>
                  <input
                    type="tel"
                    placeholder="5555 5555"
                    value={entry.telefono || ""}
                    onChange={(e) => !isMe && handlePhoneChange(index, e.target.value)}
                    disabled={loading || isMe}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="sorteo-actions step-actions">
        {!numbersGenerated ? (
          <button
            className="btn-shuffle"
            onClick={generateUniqueRandomNumbers}
            disabled={isShuffleDisabled}
          >
            <I.Shuffle /> {t("dashboard.performDraw")}
          </button>
        ) : (
          <div className="success-banner">
            <I.UserCheck /> {t("dashboard.drawCompleted")}
          </div>
        )}
      </div>

      <div className="form-actions">
        <button className="btn-secondary" onClick={() => navigate("/cuchubal")}>
          {t("addCuchubal.cancel")}
        </button>
        <button
          className="btn-primary-large"
          onClick={handleSave}
          disabled={isSubmitDisabled}
        >
          {loading ? t("dashboard.saving") : t("dashboard.finishAndSave")} <I.Save />
        </button>
      </div>
    </div>
  );
}

export default AddManosSorteo;