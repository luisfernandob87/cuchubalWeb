import React from "react";
import { useLocation } from "react-router-dom";

function AddManos() {
  const { state } = useLocation();

  console.log(state);

  const y = state.userData.noParticipantes;

  const sorteo = state.userData.sorteo;

  console.log(sorteo);

  const arrayInputs = [];
  const add = (y) => {
    for (y; y > 0; y--) {
      arrayInputs.push(y);
      console.log(arrayInputs);
    }
  };
  add(y);

  return (
    <>
      {arrayInputs.map((input) => (
        <div key={input}>
          <input type="text" placeholder="Correo" />
          <br />
          <input
            type="number"
            placeholder="Número de Cuota"
            hidden={sorteo == true ? true : false}
          />
        </div>
      ))}
    </>
  );
}

export default AddManos;
