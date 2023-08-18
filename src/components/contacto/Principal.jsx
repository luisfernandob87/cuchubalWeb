import React from "react";
import { useForm } from "react-hook-form";

function Principal() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => console.log(data);
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <legend>Mensaje Nuevo</legend>
        <input type="email" {...register("username", { required: true })} />
        <input type="text" {...register("asunto", { required: true })} />
        <input type="text" {...register("mensaje", { required: true })} />
        {errors.exampleRequired && <span>El campo es requerido</span>}
        <input type="submit" value="Enviar" />
      </form>
    </>
  );
}

export default Principal;
