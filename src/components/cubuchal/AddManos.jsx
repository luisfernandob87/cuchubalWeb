import React from "react";
import { useLocation } from "react-router-dom";

function AddManos() {
  const { state } = useLocation();

  const y = state.userData;

  const arrayInputs = [];
  const add = (y) => {
    for (y; y > 0; y--) {
      arrayInputs.push(y);
    }
  };
  add(y);

  return (
    <>
      {arrayInputs.map((input) => (
        <div key={input}>
          <input type="text" />
        </div>
      ))}
    </>
  );
}

export default AddManos;
