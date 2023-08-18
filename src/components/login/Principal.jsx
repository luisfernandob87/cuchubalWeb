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
  const onSubmit = (data) => console.log(data);
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
      <form onSubmit={handleSubmit(onSubmit)}>
        <input type="email" {...register("username", { required: true })} />
        <input
          type="password"
          inputMode="current-password"
          {...register("password", { required: true })}
        />
        {errors.exampleRequired && <span>El campo es requerido</span>}

        <input
          type="submit"
          value="Iniciar Sesión"
          onClick={() => {
            navigate("/cuchubal");
          }}
        />
      </form>
      <a href="#">Crear Cuenta</a>
      <a href="#">Reiniciar Contraseña</a>
    </>
  );
}

export default Principal;
