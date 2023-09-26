import React from "react";
import { useLocation } from "react-router-dom";

function AddManos() {
  const { state } = useLocation();

  console.log(state.userData);
  return <div>AddManos</div>;
}

export default AddManos;
