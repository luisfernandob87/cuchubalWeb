import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { useForm } from "react-hook-form";

function AddManos() {
  const { state } = useLocation();

  const [mail, setMail] = useState("");

  // console.log(mail);

  const y = state[0].userData.noParticipantes;

  const sorteo = state[0].userData.sorteo;

  const cuchu = state[1].userData;

  const userId = localStorage.getItem("userId");

  const arrayInputs = [];
  const add = (y) => {
    for (y; y > 0; y--) {
      arrayInputs.push(y);
      // console.log(arrayInputs);
    }
  };
  add(y);

  const handlechange = (event) => {
    setMail(event.target.value);
  };

  const handleClick = (event) => {
    console.log(mail);
  };

  return (
    <>
      {arrayInputs.map((input) => (
        <div key={input}>
          <input type="text" placeholder="Correo" onChange={handlechange} />
          <br />
          <input
            type="number"
            placeholder="Número de Cuota"
            hidden={sorteo == true ? true : false}
          />
        </div>
      ))}
      <button onClick={handleClick}>Guardar</button>
    </>
  );
}

export default AddManos;
