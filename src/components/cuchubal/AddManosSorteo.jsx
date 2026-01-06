import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import api from "../../api/axios";
import { FiMail, FiHash, FiSave, FiInfo, FiShuffle, FiUserCheck } from "react-icons/fi";
import "./AddManos.css";

function AddManosSorteo() {
  const { state } = useLocation();
  const navigate = useNavigate();

  if (!state || !state[0] || !state[1]) {
    navigate("/cuchubal");
    return null;
  }

  const { noParticipantes, nombreCuchubal } = state[0].userData;
  const cuchuId = state[1].userData;

  const [mails, setMails] = useState(Array(noParticipantes).fill(""));
  const [selectedNumbers, setSelectedNumbers] = useState({});
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);
  const [isShuffleDisabled, setIsShuffleDisabled] = useState(true);
  const [loading, setLoading] = useState(false);
  const [numbersGenerated, setNumbersGenerated] = useState(false);

  const arrayParticipantes = Array.from({ length: noParticipantes }, (_, i) => i + 1);

  const handleMailChange = (index, value) => {
    const updatedMails = [...mails];
    updatedMails[index] = value;
    setMails(updatedMails);
    // Si se cambia un correo después de sortear, invalidamos el sorteo para que vuelvan a hacerlo si quieren o simplemente para consistencia
    if (numbersGenerated) {
      setNumbersGenerated(false);
      setSelectedNumbers({});
    }
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

  const processParticipant = async (mail, index) => {
    try {
      const resUser = await api.post(`/usuario/`, { correo: mail });
      let usuarioId;

      if (!resUser.data) {
        const token = generateToken();
        const resSignup = await api.post(`/signup`, {
          nombre: mail.split('@')[0],
          correo: mail,
          password: token,
        });
        usuarioId = resSignup.data.data.id;
      } else {
        usuarioId = resUser.data.id;
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
      await Promise.all(mails.map((mail, index) => processParticipant(mail, index)));
      navigate("/cuchubal");
    } catch (error) {
      alert("Error al guardar los participantes.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="add-manos-view animate-fade-in">
      <header className="view-header">
        <h1>Sorteo de Turnos</h1>
        <p>Cuchubal: <strong>{nombreCuchubal}</strong> • {noParticipantes} Participantes</p>
      </header>

      <div className="info-banner">
        <FiInfo />
        <p>
          1. Ingresa los correos de todos los participantes. <br />
          2. Presiona el botón de sorteo para asignar turnos al azar.
        </p>
      </div>

      <div className="participants-grid">
        {arrayParticipantes.map((_, index) => (
          <div className={`participant-card ${numbersGenerated ? 'highlight' : ''}`} key={index}>
            <div className="card-number">
              {numbersGenerated ? <FiHash /> : (index + 1)}
              <span className="number-val">{selectedNumbers[index] || ""}</span>
            </div>

            <div className="input-group">
              <label><FiMail /> Correo del Participante</label>
              <input
                type="email"
                placeholder="ejemplo@correo.com"
                value={mails[index]}
                onChange={(e) => handleMailChange(index, e.target.value)}
                disabled={loading}
              />
            </div>

            {numbersGenerated && (
              <div className="turno-badge">Turno #{selectedNumbers[index]}</div>
            )}
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
            <FiShuffle /> Realizar Sorteo
          </button>
        ) : (
          <div className="success-banner">
            <FiUserCheck /> ¡Sorteo completado! Revisa los turnos arriba.
          </div>
        )}
      </div>

      <div className="form-actions">
        <button className="btn-secondary" onClick={() => navigate("/cuchubal")}>
          Cancelar
        </button>
        <button
          className="btn-primary-large"
          onClick={handleSave}
          disabled={isSubmitDisabled}
        >
          {loading ? "Guardando..." : "Finalizar y Guardar"} <FiSave />
        </button>
      </div>
    </div>
  );
}

export default AddManosSorteo;
