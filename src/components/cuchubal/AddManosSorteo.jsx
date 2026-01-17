import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import api from "../../api/axios";
import { FiMail, FiHash, FiSave, FiInfo, FiShuffle, FiUserCheck, FiPhone, FiMapPin } from "react-icons/fi";
import { useLanguage } from "../../context/LanguageContext.jsx";
import "./AddManos.css";

function AddManosSorteo() {
  const { t } = useLanguage();
  const { state } = useLocation();
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");

  if (!state || !state[0] || !state[1]) {
    navigate("/cuchubal");
    return null;
  }

  const noParticipantes = Number(state[0].userData.noParticipantes);
  const { nombreCuchubal } = state[0].userData;
  const cuchuId = state[1].userData;

  const [mails, setMails] = useState(Array(noParticipantes).fill(""));
  const [phones, setPhones] = useState(Array(noParticipantes).fill(""));
  const [zones, setZones] = useState(Array(noParticipantes).fill(""));
  const [selectedNumbers, setSelectedNumbers] = useState({});
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);
  const [isShuffleDisabled, setIsShuffleDisabled] = useState(true);
  const [loading, setLoading] = useState(false);
  const [numbersGenerated, setNumbersGenerated] = useState(false);

  const arrayParticipantes = Array.from({ length: noParticipantes }, (_, i) => i + 1);

  useEffect(() => {
    const detectZone = async () => {
      let defaultCode = "";
      try {
        const res = await api.get(`/usuario/${userId}`);
        if (res.data && res.data.zona) {
          defaultCode = res.data.zona;
        } else {
          const lang = navigator.language;
          if (lang.includes('GT')) defaultCode = "+502";
          else if (lang.includes('MX')) defaultCode = "+52";
          else if (lang.includes('ES')) defaultCode = "+34";
          else defaultCode = "+";
        }
      } catch (err) {
        console.error("Error detectando código:", err);
      }
      if (defaultCode) setZones(Array(noParticipantes).fill(defaultCode));
    };
    detectZone();
  }, [userId, noParticipantes]);

  const handleMailChange = (index, value) => {
    const updatedMails = [...mails];
    updatedMails[index] = value;
    setMails(updatedMails);
    if (numbersGenerated) {
      setNumbersGenerated(false);
      setSelectedNumbers({});
    }
  };

  const handlePhoneChange = (index, value) => {
    const updatedPhones = [...phones];
    updatedPhones[index] = value;
    setPhones(updatedPhones);
  };

  const handleZoneChange = (index, value) => {
    const updatedZones = [...zones];
    updatedZones[index] = value;
    setZones(updatedZones);
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
    const mailsFilled = mails.every(mail => mail.trim() !== "" && mail.includes('@'));
    setIsShuffleDisabled(!mailsFilled);
    setIsSubmitDisabled(!mailsFilled || !numbersGenerated || loading);
  }, [mails, numbersGenerated, loading]);

  const generateToken = () => Math.random().toString(36).substr(2, 8);

  const processParticipant = async (mail, phone, zone, index) => {
    try {
      const resUser = await api.post(`/usuario/`, { correo: mail });
      let usuarioId;

      if (!resUser.data) {
        const token = generateToken();
        const resSignup = await api.post(`/signup`, {
          nombre: mail.split('@')[0],
          correo: mail,
          password: token,
          telefono: phone,
          zona: zone
        });
        usuarioId = resSignup.data.data.id;
      } else {
        usuarioId = resUser.data.id;
        if (!resUser.data.telefono || !resUser.data.zona) {
          await api.put(`/usuario/${usuarioId}`, {
            telefono: resUser.data.telefono || phone,
            zona: resUser.data.zona || zone
          });
        }
      }

      await api.post(`/cuota`, {
        numeroCuota: selectedNumbers[index],
        idCuchubal: cuchuId,
        idUsuario: usuarioId,
      });
    } catch (error) {
      console.error(`Error procesando participante ${mail}:`, error);
      throw error;
    }
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      await Promise.all(
        mails.map((mail, index) =>
          processParticipant(mail, phones[index], zones[index], index)
        )
      );
      navigate("/cuchubal");
    } catch (error) {
      alert(t("dashboard.saveError"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="add-manos-view animate-fade-in">
      <header className="view-header">
        <h1>{t("dashboard.drawTitle")}</h1>
        <p>Cuchubal: <strong>{nombreCuchubal}</strong> • {noParticipantes} {t("dashboard.participants")}</p>
      </header>

      <div className="info-banner">
        <FiInfo />
        <p dangerouslySetInnerHTML={{ __html: t("dashboard.drawInfo") }} />
      </div>

      <div className="participants-grid">
        {arrayParticipantes.map((_, index) => (
          <div className={`participant-card ${numbersGenerated ? 'highlight' : ''}`} key={index}>
            <div className="participant-header">
              <div className="card-number">
                {numbersGenerated ? <FiHash /> : (index + 1)}
              </div>
              {numbersGenerated && (
                <div className="auto-turno">
                  <FiCheckCircle /> {t("dashboard.turn")} #{selectedNumbers[index]}
                </div>
              )}
            </div>

            <div className="input-group">
              <label><FiMail /> {t("dashboard.participantEmail")}</label>
              <input
                type="email"
                placeholder="ejemplo@correo.com"
                value={mails[index]}
                onChange={(e) => handleMailChange(index, e.target.value)}
                disabled={loading}
              />
            </div>

            <div className="input-row">
              <div className="input-group" style={{ flex: '0 0 100px' }}>
                <label><FiMapPin /> {t("common.zone")}</label>
                <input
                  type="text"
                  placeholder="+502"
                  value={zones[index] || ""}
                  onChange={(e) => handleZoneChange(index, e.target.value)}
                  disabled={loading}
                />
              </div>
              <div className="input-group" style={{ flex: '1' }}>
                <label><FiPhone /> {t("common.phone")}</label>
                <input
                  type="tel"
                  placeholder="5555 5555"
                  value={phones[index] || ""}
                  onChange={(e) => handlePhoneChange(index, e.target.value)}
                  disabled={loading}
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="sorteo-actions step-actions">
        {!numbersGenerated ? (
          <button
            className="btn-shuffle"
            onClick={generateUniqueRandomNumbers}
            disabled={isShuffleDisabled}
          >
            <FiShuffle /> {t("dashboard.performDraw")}
          </button>
        ) : (
          <div className="success-banner">
            <FiUserCheck /> {t("dashboard.drawCompleted")}
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
          {loading ? t("dashboard.saving") : t("dashboard.finishAndSave")} <FiSave />
        </button>
      </div>
    </div>
  );
}

export default AddManosSorteo;
