import React from "react";
import imagen from "../../assets/react.svg";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useForm } from "react-hook-form";
import "./Principal.css"; // Import CSS for styling

function Principal() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const page = "http://localhost:3000";

  const submit = (data) => {
    axios.post(`${page}/login`, data).then((res) => {
      localStorage.setItem("usuario", res.data.data.user.nombre);
      localStorage.setItem("token", res.data.data.token);
      localStorage.setItem("userId", res.data.data.user.id);
      navigate("/cuchubal");
    });
  };

  return (
    <div className="login-container">
      <img
        src={imagen}
        alt="Logo"
        className="logo"
        onClick={() => {
          navigate("/");
        }}
      />
      <form onSubmit={handleSubmit(submit)} className="form-container">
        <input
          type="email"
          placeholder="Correo Electrónico"
          {...register("correo", { required: true })}
          className="form-input"
        />
        <input
          type="password"
          placeholder="Contraseña"
          {...register("password", { required: true })}
          className="form-input"
        />
        {errors.exampleRequired && <span>El campo es requerido</span>}

        <button type="submit" className="btnLogin">
          Iniciar Sesión
        </button>
      <div className="links-container">
        <span
          className="link"
          onClick={() => {
            navigate("/add");
          }}
        >
          Crear Cuenta
        </span>
        <span
          className="link"
          onClick={() => {
            navigate("/restart");
          }}
        >
          Reiniciar Contraseña
        </span>
      </div>
      </form>
    </div>
  );
}

export default Principal;
