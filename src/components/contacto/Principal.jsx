import React from "react";
import { useForm } from "react-hook-form";
import "./Principal.css"; // Import the CSS file we'll create

function Principal() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => console.log(data);
  return (
    <div className="contact-container">
      <form onSubmit={handleSubmit(onSubmit)} className="contact-form">
        <legend className="form-legend">Mensaje Nuevo</legend>
        
        <div className="form-group">
          <label htmlFor="username">Correo Electrónico</label>
          <input 
            type="email" 
            id="username"
            className={`form-control ${errors.username ? 'is-invalid' : ''}`}
            placeholder="Su correo electrónico"
            {...register("username", { required: true })} 
          />
          {errors.username && <span className="error-message">El correo electrónico es requerido</span>}
        </div>
        
        <div className="form-group">
          <label htmlFor="asunto">Asunto</label>
          <input 
            type="text" 
            id="asunto"
            className={`form-control ${errors.asunto ? 'is-invalid' : ''}`}
            placeholder="Asunto del mensaje"
            {...register("asunto", { required: true })} 
          />
          {errors.asunto && <span className="error-message">El asunto es requerido</span>}
        </div>
        
        <div className="form-group">
          <label htmlFor="mensaje">Mensaje</label>
          <textarea 
            id="mensaje"
            className={`form-control ${errors.mensaje ? 'is-invalid' : ''}`}
            placeholder="Escriba su mensaje aquí"
            rows="5"
            {...register("mensaje", { required: true })} 
          />
          {errors.mensaje && <span className="error-message">El mensaje es requerido</span>}
        </div>
        
        <button type="submit" className="submit-button">Enviar Mensaje</button>
      </form>
    </div>
  );
}

export default Principal;
