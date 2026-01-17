import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import api from "../../api/axios";
import {
  FiMail,
  FiSave,
  FiInfo,
  FiPhone,
  FiMapPin,
  FiMenu
} from "react-icons/fi";
import { useLanguage } from "../../context/LanguageContext.jsx";
import "./AddManos.css";

// DND Kit Imports
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  useSortable,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

function SortableParticipantCard({ id, index, participant, loading, handleInputChange, t }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging
  } = useSortable({ id: id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 102 : 1,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`participant-card horizontal ${isDragging ? 'dragging' : ''}`}
    >
      <div className="reorder-actions drag-handle" {...attributes} {...listeners}>
        <div className="drag-icon">
          <FiMenu />
        </div>
        <div className="turn-indicator">
          <span className="turn-label">{t("dashboard.turn")}</span>
          <span className="turn-val">#{index + 1}</span>
        </div>
      </div>

      <div className="card-content">
        <div className="input-group">
          <label><FiMail /> {t("common.email")}</label>
          <input
            type="email"
            placeholder="ejemplo@correo.com"
            value={participant.correo}
            onChange={(e) => handleInputChange(index, 'correo', e.target.value)}
            disabled={loading}
          />
        </div>

        <div className="input-row">
          <div className="input-group zone-input">
            <label><FiMapPin /> {t("common.zone")}</label>
            <input
              type="text"
              placeholder="+502"
              value={participant.zona}
              onChange={(e) => handleInputChange(index, 'zona', e.target.value)}
              disabled={loading}
            />
          </div>
          <div className="input-group phone-input">
            <label><FiPhone /> {t("common.phone")}</label>
            <input
              type="tel"
              placeholder="5555 5555"
              value={participant.telefono}
              onChange={(e) => handleInputChange(index, 'telefono', e.target.value)}
              disabled={loading}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

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

  const [participants, setParticipants] = useState(
    Array.from({ length: noParticipantes }, (_, i) => ({
      id: `participant-${i}`, // Static ID for DND kit
      correo: "",
      telefono: "",
      zona: ""
    }))
  );

  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [loading, setLoading] = useState(false);

  // Sensors for DND
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8, // Avoid accidental drags when clicking inputs
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

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
      if (defaultCode) {
        setParticipants(prev => prev.map(p => ({ ...p, zona: defaultCode })));
      }
    };
    detectZone();
  }, [userId]);

  const handleInputChange = (index, field, value) => {
    const updated = [...participants];
    updated[index][field] = value;
    setParticipants(updated);
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (active.id !== over.id) {
      setParticipants((items) => {
        const oldIndex = items.findIndex(i => i.id === active.id);
        const newIndex = items.findIndex(i => i.id === over.id);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  useEffect(() => {
    const mailsFilled = participants.every(p => p.correo.trim() !== "" && p.correo.includes('@'));
    setIsButtonDisabled(!mailsFilled || loading);
  }, [participants, loading]);

  const generateToken = () => Math.random().toString(36).substr(2, 8);

  const processParticipant = async (participant, turnNumber) => {
    try {
      const { correo, telefono, zona } = participant;
      const resUser = await api.post(`/usuario/`, { correo });
      let usuarioId;

      if (!resUser.data) {
        const token = generateToken();
        const resSignup = await api.post(`/signup`, {
          nombre: correo.split('@')[0],
          correo,
          password: token,
          telefono,
          zona
        });
        usuarioId = resSignup.data.data.id;
      } else {
        usuarioId = resUser.data.id;
        if (!resUser.data.telefono || !resUser.data.zona) {
          await api.put(`/usuario/${usuarioId}`, {
            telefono: resUser.data.telefono || telefono,
            zona: resUser.data.zona || zona
          });
        }
      }

      await api.post(`/cuota`, {
        numeroCuota: turnNumber,
        idCuchubal: cuchuId,
        idUsuario: usuarioId,
      });

    } catch (error) {
      console.error(`Error procesando participante ${participant.correo}:`, error);
      throw error;
    }
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      // Process in order of current state
      for (let i = 0; i < participants.length; i++) {
        await processParticipant(participants[i], i + 1);
      }
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
        <div className="info-text">
          <p>
            {sorteo
              ? t("dashboard.assignInfoAuto")
              : "Asigna los turnos arrastrando a los participantes a la posición deseada."}
          </p>
          {!sorteo && (
            <small className="info-hint">Mantén presionado el icono de la izquierda para arrastrar.</small>
          )}
        </div>
      </div>

      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <div className="participants-grid stack">
          <SortableContext
            items={participants.map(p => p.id)}
            strategy={verticalListSortingStrategy}
          >
            {participants.map((participant, index) => (
              <SortableParticipantCard
                key={participant.id}
                id={participant.id}
                index={index}
                participant={participant}
                loading={loading}
                handleInputChange={handleInputChange}
                t={t}
              />
            ))}
          </SortableContext>
        </div>
      </DndContext>

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
