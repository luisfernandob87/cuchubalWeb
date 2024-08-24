import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";


function AddManos() {
  const { state } = useLocation();
  const [mails, setMails] = useState([]);
  const [selectedNumbers, setSelectedNumbers] = useState({});
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  
  const navigate = useNavigate();

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

  const handleMailChange = (index, event) => {
    const updatedMails = [...mails];
    updatedMails[index] = event.target.value;
    setMails(updatedMails);
  };

  const handleNumberChange = (event, index) => {
    const { value } = event.target;
    setSelectedNumbers((prevSelectedNumbers) => ({
      ...prevSelectedNumbers,
      [index]: value,
    }));
  };

  useEffect(() => {
    const values = Object.values(selectedNumbers);
    const hasDuplicates = new Set(values).size !== values.length;
    const allInRange = values.every((value) => value >= 1 && value <= Math.max(...arrayInputs));
    const allFieldsFilled = Object.keys(selectedNumbers).length === arrayInputs.length;
    const allMailsFilled = mails.length === arrayInputs.length && mails.every(mail => mail);
    setIsButtonDisabled(hasDuplicates || !allInRange || !allFieldsFilled || !allMailsFilled);
  }, [selectedNumbers, arrayInputs, mails]);

  const generateToken = () => {
    return Math.random().toString(36).substr(2);
  };

  const checkAndCreateUser = (mail) => {
    return fetch(`http://localhost:3000/usuario`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ correo: mail }),
    })
      .then(response => response.json())
      .then(data => {
        if (data === null) {
          console.log(`El usuario ${mail} no existe. Creando usuario...`);
          const token = generateToken();
          return fetch(`http://localhost:3000/signup`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              nombre: mail,
              correo: mail,
              password: token,
            }),
          })
            .then(signupResponse => signupResponse.json())
            .then(signupData => {
              console.log(`Usuario ${mail} creado:`, signupData);
              return signupData.id; // Retorna el id del usuario recién creado
            });
        } else {
          console.log(`El usuario ${mail} ya existe.`);
          return data.id; // Retorna el id del usuario existente
        }
      })
      .catch(error => {
        console.error(`Error al verificar o crear el usuario ${mail}:`, error);
      });
  };

  const insertCuota = (numeroCuota, idUsuario) => {
    return fetch(`http://localhost:3000/cuota`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        numeroCuota: numeroCuota,
        idCuchubal: cuchu,
        idUsuario: idUsuario,
      }),
    })
      .then(response => response.json())
      .then(data => {
        console.log(`Cuota insertada para usuario ${idUsuario}:`, data);
        return data;
      })
      .catch(error => {
        console.error(`Error al insertar la cuota para el usuario ${idUsuario}:`, error);
      });
  };

  const handleClick = () => {
    Promise.all(mails.map((mail, index) =>
      checkAndCreateUser(mail).then(idUsuario =>
        insertCuota(selectedNumbers[index], idUsuario)
      )
    ))
      .then(results => {
        console.log("Todas las cuotas han sido insertadas:", results);
        navigate("/cuchubal");
      })
      .catch(error => {
        console.error("Error al procesar las cuotas:", error);
      });
  };

  const maxValue = Math.max(...arrayInputs);

  return (
    <>
      {arrayInputs.map((input, index) => (
        <div key={input}>
          <input
            type="text"
            placeholder="Correo"
            value={mails[index] || ""}
            onChange={(event) => handleMailChange(index, event)}
          />
          <br />
          <input
            type="number"
            placeholder="Número de Cuota"
            hidden={sorteo === true}
            max={maxValue}
            min={1}
            onChange={(event) => handleNumberChange(event, index)}
          />
        </div>
      ))}
      <button onClick={handleClick} disabled={isButtonDisabled}>Guardar</button>
    </>
  );
}

export default AddManos;
