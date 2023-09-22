import React from "react";
import { useParams } from "react-router-dom";

function Manos() {
  const { id } = useParams();

  console.log(id);

  return (
    <section>
      <h1>Manos</h1>
    </section>
  );
}

export default Manos;
