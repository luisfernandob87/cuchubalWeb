import { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import api from "../../api/axios";
import { useLanguage } from "../../context/LanguageContext.jsx";
import { useIcons } from "../../icons.js";
import { detectCountryCode } from "../../data/countries";
import CountryCodePicker from "./CountryCodePicker";
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

function SortableParticipantCard({ id, index, participant, loading, handleInputChange, t, isMe }) {
  const I = useIcons();
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
      {isMe && <div className="me-badge"><I.User /> {t("dashboard.meLabel")}</div>}
      <div className="reorder-actions drag-handle" {...attributes} {...listeners}>
        <div className="drag-icon">
          <I.Menu />
        </div>
        <div className="turn-indicator">
          <span className="turn-label">{t("dashboard.turn")}</span>
          <span className="turn-val">#{index + 1}</span>
        </div>
      </div>

      <div className="card-content">
        <div className="input-group">
          <label><I.Mail /> {t("common.email")}</label>
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
            <label><I.Globe /> {t("common.zone")}</label>
            <CountryCodePicker
              value={participant.zona || ""}
              onChange={(code) => handleInputChange(index, "zona", code)}
              disabled={loading}
            />
          </div>
          <div className="input-group phone-input">
            <label><I.Phone /> {t("common.phone")}</label>
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
  const I = useIcons();
  const { state } = useLocation();
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");

  const hasValidState = !!state && !!state[0];
  const noParticipantes = hasValidState ? Number(state[0].userData.noParticipantes) : 0;
  const { sorteo, nombreCuchubal } = hasValidState ? state[0].userData : {};
  const formData = hasValidState ? state[0].userData : null;

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
  const [meEntry, setMeEntry] = useState(null);
  const [includeMe, setIncludeMe] = useState(true);
  const idCounter = useRef(noParticipantes);
  const nextInviteeId = () => `participant-${idCounter.current++}`;

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
    const init = async () => {
      let defaultCode = detectCountryCode();
      try {
        const res = await api.get(`/usuario/${userId}`);
        if (res.data) {
          if (res.data.zona) defaultCode = res.data.zona;
          setMeEntry({
            id: "me",
            correo: res.data.correo || "",
            telefono: res.data.telefono || "",
            zona: res.data.zona || defaultCode,
          });
        }
      } catch (err) {
        console.error("Error obteniendo usuario:", err);
      }
      if (defaultCode) {
        setParticipants(prev => prev.map(p => (p.id === "me" ? p : { ...p, zona: defaultCode })));
      }
    };
    init();
  }, [userId]);

  useEffect(() => {
    setParticipants(prev => {
      if (includeMe && meEntry) {
        if (prev[0] && prev[0].id !== "me") {
          return [
            { id: "me", correo: meEntry.correo, telefono: meEntry.telefono, zona: meEntry.zona },
            ...prev.slice(1),
          ];
        }
        return prev;
      }
      if (!includeMe && prev[0] && prev[0].id === "me") {
        return [{ id: nextInviteeId(), correo: "", telefono: "", zona: "" }, ...prev.slice(1)];
      }
      return prev;
    });
  }, [includeMe, meEntry]);

  const handleInputChange = (index, field, value) => {
    setParticipants(prev => prev.map((p, i) => (i === index ? { ...p, [field]: value } : p)));
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

  const handleSave = async () => {
    setLoading(true);
    try {
      const payload = {
        ...formData,
        idUsuario: localStorage.getItem("userId"),
        noParticipantes: participants.length,
        participantes: participants.map((p, i) => ({
          correo: p.correo,
          telefono: p.telefono,
          zona: p.zona,
          numeroCuota: i + 1,
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
        <h1>{t("dashboard.assignTitle")}</h1>
        <p>Cuchubal: <strong>{nombreCuchubal}</strong> • {participants.length} {t("dashboard.payouts")}</p>
      </header>

      <div className="info-banner">
        <I.Info />
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

      <label className="include-me-check">
        <input
          type="checkbox"
          checked={includeMe}
          onChange={(e) => setIncludeMe(e.target.checked)}
        />
        {t("dashboard.includeMe")}
      </label>

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
                isMe={participant.id === "me"}
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
          {loading ? t("dashboard.saving") : t("dashboard.finishBtn")} <I.Save />
        </button>
      </div>
    </div>
  );
}

SortableParticipantCard.propTypes = {
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  index: PropTypes.number.isRequired,
  participant: PropTypes.shape({
    correo: PropTypes.string,
    telefono: PropTypes.string,
    zona: PropTypes.string,
  }).isRequired,
  loading: PropTypes.bool.isRequired,
  handleInputChange: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
  isMe: PropTypes.bool,
};

export default AddManos;
