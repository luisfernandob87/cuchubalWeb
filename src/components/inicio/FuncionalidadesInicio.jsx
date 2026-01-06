import React from "react";
import "../../styles/FuncionalidadesInicio.css";
import { FiPlusCircle, FiUsers, FiMail, FiCalendar, FiSmartphone, FiActivity } from "react-icons/fi";

function FuncionalidadesInicio() {
  const features = [
    {
      icon: <FiPlusCircle />,
      title: "Cuchubales Ilimitados",
      desc: "Crea tantos grupos como necesites. Sin límites, totalmente gratis."
    },
    {
      icon: <FiUsers />,
      title: "Gestión de Participantes",
      desc: "Administra fácilmente quién entra, sale y participa en cada ciclo."
    },
    {
      icon: <FiMail />,
      title: "Notificaciones Inteligentes",
      desc: "Avisos automáticos por correo para que nadie olvide su turno de pago."
    },
    {
      icon: <FiCalendar />,
      title: "Calendario de Pagos",
      desc: "Cronograma visual claro de cuándo toca pagar y cuándo recibir."
    },
    {
      icon: <FiActivity />,
      title: "Estado en Tiempo Real",
      desc: "Sigue el progreso del ahorro y los pagos pendientes al instante."
    },
    {
      icon: <FiSmartphone />,
      title: "Acceso Multiplataforma",
      desc: "Gestiona tu ahorro desde tu celular, tablet o computadora."
    }
  ];

  return (
    <section className="features-section">
      <div className="section-header">
        <span className="section-subtitle">PODER Y SIMPLICIDAD</span>
        <h2>Todo lo que necesitas para <span className="gradient-text">ahorrar mejor</span></h2>
        <p>Olvídate del papel y las hojas de cálculo. Nuestra plataforma hace el trabajo pesado por ti.</p>
      </div>

      <div className="features-grid">
        {features.map((f, i) => (
          <div className="feature-card" key={i}>
            <div className="feature-icon-wrapper">
              {f.icon}
            </div>
            <h3>{f.title}</h3>
            <p>{f.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default FuncionalidadesInicio;
