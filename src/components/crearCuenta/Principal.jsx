import React from "react";
import logo from "../../assets/logo.png";
import { useNavigate } from "react-router-dom";
import api from "../../api/axios";
import { useForm } from "react-hook-form";
import { FiUser, FiMail, FiLock, FiCheckCircle, FiArrowRight } from "react-icons/fi";
import "./Principal.css";

function Principal() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const submit = (data) => {
    api.post("/signup", data).then((res) => {
      navigate("/login");
    }).catch(err => {
      console.error("Signup error", err);
    });
  };

  const password = watch("password");

  return (
    <div className="register-card animate-fade-in">
      <div className="register-header">
        <img
          src={logo}
          alt="Cuchubal Logo"
          className="register-logo"
          onClick={() => navigate("/")}
        />
        <h1>Únete a Cuchubal</h1>
        <p>Empieza a ahorrar en comunidad hoy mismo.</p>
      </div>

      <form onSubmit={handleSubmit(submit)} className="register-form">
        <div className="input-grid">
          <div className="input-group">
            <FiUser className="input-icon" />
            <input
              placeholder="Nombre Completo"
              type="text"
              {...register("nombre", { required: "El nombre es requerido" })}
              className={`form-input ${errors.nombre ? "error" : ""}`}
            />
            {errors.nombre && <span className="error-message">{errors.nombre.message}</span>}
          </div>

          <div className="input-group">
            <FiMail className="input-icon" />
            <input
              placeholder="Correo Electrónico"
              type="email"
              {...register("correo", { required: "El correo es requerido" })}
              className={`form-input ${errors.correo ? "error" : ""}`}
            />
            {errors.correo && <span className="error-message">{errors.correo.message}</span>}
          </div>

          <div className="input-group">
            <FiLock className="input-icon" />
            <input
              placeholder="Contraseña"
              type="password"
              {...register("password", { required: "La contraseña es requerida" })}
              className={`form-input ${errors.password ? "error" : ""}`}
            />
            {errors.password && <span className="error-message">{errors.password.message}</span>}
          </div>

          <div className="input-group">
            <FiCheckCircle className="input-icon" />
            <input
              placeholder="Confirmar Contraseña"
              type="password"
              {...register("confirmPassword", {
                required: "La confirmación es requerida",
                validate: (value) => value === password || "Las contraseñas no coinciden",
              })}
              className={`form-input ${errors.confirmPassword ? "error" : ""}`}
            />
            {errors.confirmPassword && <span className="error-message">{errors.confirmPassword.message}</span>}
          </div>
        </div>

        <button type="submit" className="register-button">
          Crear mi cuenta <FiArrowRight />
        </button>

        <div className="register-footer-links">
          <button
            type="button"
            className="text-link"
            onClick={() => navigate("/login")}
          >
            ¿Ya tienes cuenta? Inicia sesión
          </button>
        </div>
      </form>
    </div>
  );
}

export default Principal;
