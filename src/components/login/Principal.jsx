import React from "react";
import logo from "../../assets/logo.png";
import { useNavigate } from "react-router-dom";
import api from "../../api/axios";
import { useForm } from "react-hook-form";
import { FiMail, FiLock, FiArrowRight } from "react-icons/fi";
import "./Principal.css";

function Principal() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const submit = (data) => {
    api.post("/login", data)
      .then((res) => {
        localStorage.setItem("usuario", res.data.data.user.nombre);
        localStorage.setItem("token", res.data.data.token);
        localStorage.setItem("userId", res.data.data.user.id);
        navigate("/cuchubal");
      })
      .catch((err) => {
        console.error("Login error", err);
        // Aquí podríamos agregar una notificación de error premium
      });
  };

  return (
    <div className="login-card animate-fade-in">
      <div className="login-header">
        <img
          src={logo}
          alt="Cuchubal Logo"
          className="login-logo"
          onClick={() => navigate("/")}
        />
        <h1>Bienvenido de nuevo</h1>
        <p>Gestiona tus ahorros en comunidad con estilo.</p>
      </div>

      <form onSubmit={handleSubmit(submit)} className="login-form">
        <div className="input-group">
          <FiMail className="input-icon" />
          <input
            type="email"
            placeholder="Correo Electrónico"
            {...register("correo", { required: "El correo es obligatorio" })}
            className={`form-input ${errors.correo ? "error" : ""}`}
          />
          {errors.correo && <span className="error-message">{errors.correo.message}</span>}
        </div>

        <div className="input-group">
          <FiLock className="input-icon" />
          <input
            type="password"
            placeholder="Contraseña"
            {...register("password", { required: "La contraseña es obligatoria" })}
            className={`form-input ${errors.password ? "error" : ""}`}
          />
          {errors.password && <span className="error-message">{errors.password.message}</span>}
        </div>

        <button type="submit" className="login-button">
          Iniciar Sesión <FiArrowRight />
        </button>

        <div className="login-footer-links">
          <button
            type="button"
            className="text-link"
            onClick={() => navigate("/add")}
          >
            ¿No tienes cuenta? Regístrate
          </button>
          <button
            type="button"
            className="text-link"
            onClick={() => navigate("/restart")}
          >
            Olvidé mi contraseña
          </button>
        </div>
      </form>
    </div>
  );
}

export default Principal;
