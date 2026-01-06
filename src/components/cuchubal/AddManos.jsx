import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import api from "../../api/axios";
import { FiMail, FiHash, FiSave, FiInfo, FiCheckCircle } from "react-icons/fi";
import "./AddManos.css";

function AddManos() {
  const { state } = useLocation();
  const navigate = useNavigate();

  if (!state || !state[0] || !state[1]) {
    navigate("/cuchubal");
    return null;
  }

  const { noParticipantes, sorteo, nombreCuchubal } = state[0].userData;
  const cuchuId = state[1].userData;

  const [mails, setMails] = useState(Array(noParticipantes).fill(""));
  const [selectedNumbers, setSelectedNumbers] = useState({});
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [loading, setLoading] = useState(false);

  const arrayParticipantes = Array.from({ length: noParticipantes }, (_, i) => i + 1);

  const handleMailChange = (index, value) => {
    const updatedMails = [...mails];
    updatedMails[index] = value;
    setMails(updatedMails);
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

    // Si no es sorteo, todos deben tener número
    const numbersValid = sorteo ? true : (values.length === noParticipantes && !hasDuplicates && allInRange);
    const mailsFilled = mails.every(mail => mail.trim() !== "");

    setIsButtonDisabled(!numbersValid || !mailsFilled || loading);
  }, [selectedNumbers, mails, noParticipantes, sorteo, loading]);

  const generateToken = () => Math.random().toString(36).substr(2, 8);

  const processParticipant = async (mail, index) => {
    try {
      // 1. Verificar si el usuario existe
      const resUser = await api.post(`/usuario/`, { correo: mail });
      let usuarioId;

      if (!resUser.data) {
        // 2. Si no existe, crearlo
        const token = generateToken();
        const resSignup = await api.post(`/signup`, {
          nombre: mail.split('@')[0], // Nombre temporal del correo
          correo: mail,
          password: token,
        });
        usuarioId = resSignup.data.data.id;
      } else {
        usuarioId = resUser.data.id;
      }

      // 3. Crear la cuota/mano
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
      await Promise.all(mails.map((mail, index) => processParticipant(mail, index)));
      navigate("/cuchubal");
    } catch (error) {
      alert("Error al guardar los participantes. Revisa la consola.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="add-manos-view animate-fade-in">
      <header className="view-header">
        <h1>Asignar Participantes</h1>
        <p>Cuchubal: <strong>{nombreCuchubal}</strong> • {noParticipantes} Manos</p>
      </header>

      <div className="info-banner">
        <FiInfo />
        <p>
          {sorteo
            ? "Los turnos se han asignado automáticamente secuencial según el orden de ingreso."
            : "Asigna un correo y un turno único a cada participante."}
        </p>
      </div>

      <div className="participants-grid">
        {arrayParticipantes.map((_, index) => (
          <div className="participant-card" key={index}>
            <div className="card-number">#{index + 1}</div>

            <div className="input-group">
              <label><FiMail /> Correo Electrónico</label>
              <input
                type="email"
                placeholder="ejemplo@correo.com"
                value={mails[index]}
                onChange={(e) => handleMailChange(index, e.target.value)}
              />
            </div>

            {!sorteo && (
              <div className="input-group small">
                <label><FiHash /> Turno</label>
                <select
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
                <FiCheckCircle /> Turno #{index + 1}
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="form-actions">
        <button className="btn-secondary" onClick={() => navigate("/cuchubal")}>
          Cancelar
        </button>
        <button
          className="btn-primary-large"
          onClick={handleSave}
          disabled={isButtonDisabled}
        >
          {loading ? "Guardando..." : "Finalizar y Crear Cuchubal"} <FiSave />
        </button>
      </div>
    </div>
  );
}

export default AddManos;
