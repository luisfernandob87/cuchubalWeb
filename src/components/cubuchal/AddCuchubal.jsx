import axios from "axios";
import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

function AddCuchubal() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm();

  const navigate = useNavigate();

  const page = "http://localhost:3000";
  const userId = localStorage.getItem("userId");

  const submit = (data) => {
    axios.post(`${page}/cuchubal`, data).then((res) => {
      console.log(res);

      
      // Verificar el valor del checkbox
      const isSorteo = getValues("sorteo");

      // Redirigir según el valor del checkbox
      if (isSorteo) {
        navigate("/cuchubal/addManosSorteo", {
          state: [{ userData: data }, { userData: res.data.id }],
        });
      } else {
        navigate("/cuchubal/addManos", {
          state: [{ userData: data }, { userData: res.data.id }],
        });
      }
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
        <label htmlFor="formaPago">Forma de Pago</label>
        <select id="formaPago" {...register("formaPago", { required: true })}>
          <option></option>
          <option value="Mensual">Mensual</option>
          <option value="Quincenal">Quincenal</option>
          <option value="Semanal">Semanal</option>
        </select>

        <label>Fecha de Inicio</label>
        <input type="date" {...register("fechaInicio", { required: true })} />
        <label htmlFor="">No. de Participantes</label>
        <input
          type="number"
          step="0.01"
          {...register("noParticipantes", { required: true })}
        />
        <label htmlFor="">Cuota por Participante</label>
        <input
          type="text"
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
