import axios from "axios";
import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

function AddCuchubal() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  const page = "http://localhost:3000";

  const userId = localStorage.getItem("userId");

  const submit = (data) => {
    axios.post(`${page}/cuchubal`, data).then((res) => {
      console.log(res);
      navigate("/cuchubal");
    });
  };

  return (
    <>
      <form onSubmit={handleSubmit(submit)}>
        <label>Nombre de Cuchubal</label>
        <input
          type="text"
          {...register("nombreCuchubal", { required: true })}
        />
        <label>Forma de Pago</label>
        <input type="text" {...register("formaPago", { required: true })} />
        <label>Fecha de Inicio</label>
        <input type="date" {...register("fechaInicio", { required: true })} />
        <label htmlFor="">No. de Participantes</label>
        <input
          type="number"
          {...register("noParticipantes", { required: true })}
        />
        <label htmlFor="">Cuota por Participante</label>
        <input
          type="number"
          {...register("cuotaPorParticipante", { required: true })}
        />
        <label htmlFor="">Sorteo</label>
        <input type="checkbox" {...register("sorteo")} />
        <input type="hidden" defaultValue={userId} {...register("idUsuario")} />
        {errors.exampleRequired && <span>El campo es requerido</span>}
        <input type="submit" value="Enviar" />
      </form>
    </>
  );
}

export default AddCuchubal;
