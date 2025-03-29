import React from "react";
import imagen from "../../assets/react.svg";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useForm } from "react-hook-form";
import "./Principal.css"; // Import the new CSS file

function Principal() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const page = "http://localhost:3000";

  const submit = (data) => {
    axios.post(`${page}/signup`, data).then((res) => {
      navigate("/login");
    });
  };

  const password = watch("password");

  return (
    <div className="crearCuenta-container">
      <img
        src={imagen}
        alt="Logo"
        className="crearCuenta-logo"
        onClick={() => {
          navigate("/");
        }}
      />
      <h4 className="crearCuenta-title">Crea y administra tus cuchubales</h4>
      <form onSubmit={handleSubmit(submit)} className="crearCuenta-form">
        <input
          placeholder="Nombre"
          type="text"
          {...register("nombre", { required: "El nombre es requerido" })}
          className="crearCuenta-input"
        />
        {errors.nombre && (
          <span className="crearCuenta-error">{errors.nombre.message}</span>
        )}
        <input
          placeholder="Correo Electrónico"
          type="email"
          {...register("correo", { required: "El correo es requerido" })}
          className="crearCuenta-input"
        />
        {errors.correo && (
          <span className="crearCuenta-error">{errors.correo.message}</span>
        )}
        <input
          placeholder="Contraseña"
          type="password"
          {...register("password", { required: "La contraseña es requerida" })}
          className="crearCuenta-input"
        />
        {errors.password && (
          <span className="crearCuenta-error">{errors.password.message}</span>
        )}
        <input
          placeholder="Validar Contraseña"
          type="password"
          {...register("confirmPassword", {
            required: "La confirmación de contraseña es requerida",
            validate: (value) =>
              value === password || "Las contraseñas no coinciden",
          })}
          className="crearCuenta-input"
        />
        {errors.confirmPassword && (
          <span className="crearCuenta-error">
            {errors.confirmPassword.message}
          </span>
        )}
        <button type="submit" className="crearCuenta-submitButton">
          Crear Cuenta
        </button>
      </form>
      <div className="crearCuenta-links">
        <span onClick={() => navigate("/login")} className="crearCuenta-link">
          Iniciar Sesión
        </span>
        <span
          onClick={() => navigate("/reset-password")}
          className="crearCuenta-link"
        >
          Reiniciar Contraseña
        </span>
      </div>
    </div>
  );
}

export default Principal;
