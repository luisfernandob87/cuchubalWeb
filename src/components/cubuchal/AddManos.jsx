import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

function AddManos() {
  const { state } = useLocation();
  const [mail, setMail] = useState("");
  const [selectedNumbers, setSelectedNumbers] = useState({}); // Estado para guardar los números seleccionados
  const [isButtonDisabled, setIsButtonDisabled] = useState(true); // Estado para controlar si el botón está habilitado o no

  const y = state[0].userData.noParticipantes;
  const sorteo = state[0].userData.sorteo;
  const cuchu = state[1].userData;
  const userId = localStorage.getItem("userId");

  const arrayInputs = [];
  const add = (y) => {
    for (y; y > 0; y--) {
      arrayInputs.push(y);
    }
  };
  add(y);

  const handlechange = (event) => {
    setMail(event.target.value);
  };

  const handleNumberChange = (event, index) => {
    const { value } = event.target;

    // Actualizar el número seleccionado
    setSelectedNumbers((prevSelectedNumbers) => ({
      ...prevSelectedNumbers,
      [index]: value,
    }));
  };

  // Validar que todos los números sean únicos y dentro del rango
  useEffect(() => {
    const values = Object.values(selectedNumbers);

    // Verificar si hay valores duplicados
    const hasDuplicates = new Set(values).size !== values.length;

    // Verificar si todos los valores están dentro del rango válido
    const allInRange = values.every((value) => value >= 1 && value <= Math.max(...arrayInputs));

    // Verificar si todos los campos están llenos
    const allFieldsFilled = Object.keys(selectedNumbers).length === arrayInputs.length;

    // Habilitar o deshabilitar el botón según la validación
    setIsButtonDisabled(hasDuplicates || !allInRange || !allFieldsFilled || !mail);
  }, [selectedNumbers, arrayInputs, mail]);

  const handleClick = () => {
    console.log(mail, selectedNumbers, cuchu);
  };

  // Encontrar el valor más alto del arrayInputs
  const maxValue = Math.max(...arrayInputs);

  return (
    <>
      {arrayInputs.map((input, index) => (
        <div key={input}>
          <input type="text" placeholder="Correo" onChange={handlechange} />
          <br />
          <input
            type="number"
            placeholder="Número de Cuota"
            hidden={sorteo === true}
            max={maxValue}  // Limitar el número de cuota al máximo valor de arrayInputs
            min={1}  // Evitar que el número de cuota sea menor de 1
            onChange={(event) => handleNumberChange(event, index)} // Actualizar número seleccionado
          />
        </div>
      ))}
      <button onClick={handleClick} disabled={isButtonDisabled}>Guardar</button>
    </>
  );
}

export default AddManos;
