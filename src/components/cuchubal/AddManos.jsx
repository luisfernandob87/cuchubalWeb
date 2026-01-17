import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import api from "../../api/axios";
import { FiMail, FiHash, FiSave, FiInfo, FiCheckCircle, FiPhone, FiMapPin } from "react-icons/fi";
import { useLanguage } from "../../context/LanguageContext.jsx";
import "./AddManos.css";

function AddManos() {
  const { t } = useLanguage();
  const { state } = useLocation();
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");

  if (!state || !state[0] || !state[1]) {
    navigate("/cuchubal");
    return null;
  }

  const noParticipantes = Number(state[0].userData.noParticipantes);
  const { sorteo, nombreCuchubal } = state[0].userData;
  const cuchuId = state[1].userData;

  const [mails, setMails] = useState(Array(noParticipantes).fill(""));
  const [phones, setPhones] = useState(Array(noParticipantes).fill(""));
  const [zones, setZones] = useState(Array(noParticipantes).fill(""));
  const [selectedNumbers, setSelectedNumbers] = useState({});
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [loading, setLoading] = useState(false);

  const arrayParticipantes = Array.from({ length: noParticipantes }, (_, i) => i + 1);

  useEffect(() => {
    // Intentar obtener la zona predeterminada
    const detectZone = async () => {
      let defaultCode = "";
      try {
        const res = await api.get(`/usuario/${userId}`);
        if (res.data && res.data.zona) {
          defaultCode = res.data.zona;
        } else {
          // Fallback a código según idioma del navegador
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

  const handleNumberChange = (index, value) => {
    setSelectedNumbers((prev) => ({
      ...prev,
      [index]: parseInt(value),
    }));
  };

  useEffect(() => {
    const values = Object.values(selectedNumbers);
    const hasDuplicates = new Set(values).size !== values.length;
    const allInRange = values.every((v) => v >= 1 && v <= noParticipantes);

    const numbersValid = sorteo ? true : (values.length === noParticipantes && !hasDuplicates && allInRange);
    const mailsFilled = mails.every(mail => mail.trim() !== "");

    setIsButtonDisabled(!numbersValid || !mailsFilled || loading);
  }, [selectedNumbers, mails, noParticipantes, sorteo, loading]);

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
        // Opcional: Actualizar teléfono/zona si no los tiene
        if (!resUser.data.telefono || !resUser.data.zona) {
          await api.put(`/usuario/${usuarioId}`, {
            telefono: resUser.data.telefono || phone,
            zona: resUser.data.zona || zone
          });
        }
      }

      const numeroCuota = sorteo ? index + 1 : selectedNumbers[index];
      await api.post(`/cuota`, {
        numeroCuota,
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
        <h1>{t("dashboard.assignTitle")}</h1>
        <p>Cuchubal: <strong>{nombreCuchubal}</strong> • {noParticipantes} {t("dashboard.payouts")}</p>
      </header>

      <div className="info-banner">
        <FiInfo />
        <p>
          {sorteo
            ? t("dashboard.assignInfoAuto")
            : t("dashboard.assignInfoManual")}
        </p>
      </div>

      <div className="participants-grid">
        {arrayParticipantes.map((_, index) => (
          <div className="participant-card" key={index}>
            <div className="participant-header">
              <div className="card-number">#{index + 1}</div>
              {!sorteo && (
                <div className="input-group small" style={{ flexDirection: 'row', alignItems: 'center', gap: '0.5rem', marginBottom: 0 }}>
                  <label style={{ marginBottom: 0 }}><FiHash /> {t("dashboard.turn")}</label>
                  <select
                    style={{ padding: '0.3rem 0.5rem', width: 'auto' }}
                    value={selectedNumbers[index] || ""}
                    onChange={(e) => handleNumberChange(index, e.target.value)}
                  >
                    <option value="">--</option>
                    {arrayParticipantes.map(n => (
                      <option key={n} value={n}>{n}</option>
                    ))}
                  </select>
                </div>
              )}
              {sorteo && (
                <div className="auto-turno">
                  <FiCheckCircle /> {t("dashboard.turn")} #{index + 1}
                </div>
              )}
            </div>

            <div className="input-group">
              <label><FiMail /> {t("common.email")}</label>
              <input
                type="email"
                placeholder="ejemplo@correo.com"
                value={mails[index]}
                onChange={(e) => handleMailChange(index, e.target.value)}
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
                />
              </div>
              <div className="input-group" style={{ flex: '1' }}>
                <label><FiPhone /> {t("common.phone")}</label>
                <input
                  type="tel"
                  placeholder="5555 5555"
                  value={phones[index] || ""}
                  onChange={(e) => handlePhoneChange(index, e.target.value)}
                />
              </div>
            </div>

          </div>
        ))}
      </div>

      <div className="form-actions">
        <button className="btn-secondary" onClick={() => navigate("/cuchubal")}>
          {t("addCuchubal.cancel")}
        </button>
        <button
          className="btn-primary-large"
          onClick={handleSave}
          disabled={isButtonDisabled}
        >
          {loading ? t("dashboard.saving") : t("dashboard.finishBtn")} <FiSave />
        </button>
      </div>
    </div>
  );
}

export default AddManos;
