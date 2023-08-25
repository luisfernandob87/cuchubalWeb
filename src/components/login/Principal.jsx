import React from "react";
import imagen from "../../assets/react.svg";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useForm } from "react-hook-form";

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
      localStorage.setItem("usuario", res.data.data.user.nombre),
        localStorage.setItem("token", res.data.data.token);
      navigate("/cuchubal");
    });
  };
  return (
    <>
      <img
        src={imagen}
        alt="Imagen"
        onClick={() => {
          navigate("/");
        }}
      />
      <h4>Crea y administra tus cuchubales</h4>
      <form onSubmit={handleSubmit(submit)}>
        <input type="email" {...register("correo", { required: true })} />
        <input
          type="password"
          inputMode="current-password"
          {...register("password", { required: true })}
        />
        {errors.exampleRequired && <span>El campo es requerido</span>}

        <input type="submit" value="Iniciar Sesión" />
      </form>
      <a
        onClick={() => {
          navigate("/add");
        }}
      >
        Crear Cuenta
      </a>
      <a href="#">Reiniciar Contraseña</a>
    </>
  );
}

export default Principal;
