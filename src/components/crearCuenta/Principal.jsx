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
    axios.post(`${page}/signup`, data).then((res) => {
      // console.log(res);
      navigate("/login");
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
        <input
          placeholder="Nombre"
          type="text"
          {...register("nombre", { required: true })}
        />
        <input
          placeholder="Correo"
          type="email"
          {...register("correo", { required: true })}
        />
        <input
          placeholder="Contraseña"
          type="password"
          {...register("password", { required: true })}
        />
        {errors.exampleRequired && <span>El campo es requerido</span>}

        <input type="submit" value="Enviar" />
      </form>
    </>
  );
}

export default Principal;
