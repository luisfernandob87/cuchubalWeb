import React from "react";
import { Link, Outlet } from "react-router-dom";

function Side() {
  return (
    <aside>
      <Link to="/cuchubal">Tablero Cuchubales</Link>
      <Link to="/cuchubal/manos">Tablero Manos</Link>
      <Link to="/cuchubal/addCuchubal">Crear Cuchubal</Link>
      <Link to="/cuchubal/profile">Perfil</Link>
      <Outlet />
    </aside>
  );
}

export default Side;
