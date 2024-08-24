import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

function AddManos() {
  const { state } = useLocation();
  const [mail, setMail] = useState("");
  const [selectedNumbers, setSelectedNumbers] = useState({});
  const [emails, setEmails] = useState({}); // Estado para los correos
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [randomNumbers, setRandomNumbers] = useState({}); // Estado para números aleatorios

  const y = state[0].userData.noParticipantes;
  const sorteo = state[0].userData.sorteo;
  const cuchu = state[1].userData;
  const userId = localStorage.getItem("userId");

  const correo = localStorage.getItem("email");

  const arrayInputs = [];
  const add = (y) => {
    for (y; y > 0; y--) {
      arrayInputs.push(y);
    }
  };
  add(y);

  const handleNumberChange = (event, index) => {
    const { value } = event.target;

    // Actualizar el número seleccionado
    setSelectedNumbers((prevSelectedNumbers) => ({
      ...prevSelectedNumbers,
      [index]: value,
    }));
  };

  const handleEmailChange = (event, index) => {
    const { value } = event.target;

    // Actualizar el correo para cada índice
    setEmails((prevEmails) => ({
      ...prevEmails,
      [index]: value,
    }));
  };

  // Validar que todos los números sean únicos y dentro del rango
  useEffect(() => {
    const values = Object.values(selectedNumbers);
    const emailValues = Object.values(emails);

    // Verificar si hay valores duplicados
    const hasDuplicates = new Set(values).size !== values.length;

    // Verificar si todos los valores están dentro del rango válido
    const allInRange = values.every((value) => value >= 1 && value <= Math.max(...arrayInputs));

    // Verificar si todos los campos están completos
    const allFieldsFilled = values.length === arrayInputs.length && values.every((value) => value !== "");
    const allEmailsFilled = emailValues.length === arrayInputs.length && emailValues.every((value) => value !== "");

    // Habilitar o deshabilitar el botón según la validación
    setIsButtonDisabled(hasDuplicates || !allInRange || !allFieldsFilled || !allEmailsFilled);
  }, [selectedNumbers, arrayInputs, emails]);

  // Inicializar el campo de correo en el primer input con el valor almacenado en localStorage
  useEffect(() => {
    if (correo) {
      setMail(correo);
    }
  }, [correo]);

  const handleClick = () => {
    console.log(mail, selectedNumbers);
  };

  // Función para generar números aleatorios únicos
  const generateUniqueRandomNumbers = () => {
    const max = Math.max(...arrayInputs);
    const numbers = new Set();

    // Generar números únicos hasta que tengamos el tamaño requerido
    while (numbers.size < arrayInputs.length) {
      const random = Math.floor(Math.random() * max) + 1;
      numbers.add(random);
    }

    // Convertir el Set en un array y asignar los números a cada índice
    const uniqueNumbers = Array.from(numbers);
    const newRandomNumbers = {};
    arrayInputs.forEach((input, index) => {
      newRandomNumbers[index] = uniqueNumbers[index];
    });

    setRandomNumbers(newRandomNumbers);

    // Asignar los números aleatorios generados al estado selectedNumbers
    setSelectedNumbers(newRandomNumbers);
  };

  // Encontrar el valor más alto del arrayInputs
  const maxValue = Math.max(...arrayInputs);

  return (
    <>
      {arrayInputs.map((input, index) => (
        <div key={input}>
          <input
            type="text"
            placeholder="Correo"
            value={emails[index] || ""}  // Mostrar el correo ingresado
            onChange={(event) => handleEmailChange(event, index)} // Actualizar correo
          />
          <br />
          <input
            type="number"
            placeholder="Número de Cuota"
            hidden={sorteo === true}
            max={maxValue}  // Limitar el número de cuota al máximo valor de arrayInputs
            min={1}  // Evitar que el número de cuota sea menor de 1
            value={selectedNumbers[index] || ""}  // Mostrar el número aleatorio generado
            onChange={(event) => handleNumberChange(event, index)} // Actualizar número seleccionado
          />
          {/* Mostrar el número aleatorio */}
          {randomNumbers[index] !== undefined && <label>{randomNumbers[index]}</label>}
        </div>
      ))}
      <button onClick={generateUniqueRandomNumbers}>Generar Números Aleatorios</button>
      <button onClick={handleClick} disabled={isButtonDisabled}>Guardar</button>
    </>
  );
}

export default AddManos;
