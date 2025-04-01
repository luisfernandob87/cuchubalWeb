import React from "react";
import "./Principal.css"; // Import the CSS file we'll create

function Principal() {
  return (
    <div className="policy-container">
      <div className="policy-section">
        <h4 className="policy-title">Política de confidencialidad</h4>
        <p className="policy-content">
          En Cuchubal la confidencialidad de sus informaciones personales es una
          prioridad. Somos conscientes que la confianza en nuestro software
          adquirida en el curso de los años ha sido ganada en gran parte por el
          respeto de las informaciones personales, por esta razón le damos una
          atención particular a la protección de la vida privada. Es por eso que
          nos comprometemos a respetar la confidencialidad de las informaciones
          personales que recolectamos.
        </p>
      </div>

      <div className="policy-section">
        <h4 className="policy-title">Derecho de acceso</h4>
        <p className="policy-content">
          El programa ofrece la opción de elimanar un grupo que le permite a un
          organizador borrar todas sus informaciones así como las de todos los
          miembros de su grupo. pikkado.com no guarda el historial sobre los datos
          suprimidos por los usuarios en el curso de los años. si tiene alguna
          pregunta con respecto a las informaciones recolectadas en este portal,
          por favor escríbanos a :
        </p>
      </div>

      <div className="policy-section">
        <h4 className="policy-title">Colecta de informaciones personales</h4>
        <p className="policy-content">Recolectamos la siguiente información:</p>
        <ul className="policy-list">
          <li>Nombre</li>
          <li>Correo Electrónico</li>
          <li>Contraseña</li>
        </ul>
        <p className="policy-content">
          Las informaciones personales que recolectamos son recogidas a través de
          formularios y gracias a la interactividad establecida entre usted y
          nuestro portal. También utilizamos, como indicado en la sección
          siguiente, los archivos testigos (cookie) y/o periódicos para reunir las
          informaciones. Por favor tenga en cuenta que las contraseñas de los
          usuarios son almacenadas de tal modo que sea imposible poder leerlos
          directamente.
        </p>
      </div>
    </div>
  );
}

export default Principal;
