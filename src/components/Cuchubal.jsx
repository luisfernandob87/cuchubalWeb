import React from "react";
import { Routes, Route } from "react-router-dom";
import Top from "./cubuchal/Top";
import Side from "./cubuchal/Side";
import Cuchubales from "./cubuchal/Cuchubales";
import Manos from "./cubuchal/Manos";
import AddCuchubal from "./cubuchal/AddCuchubal";
import Profile from "./cubuchal/Profile";
import MisManos from "./cubuchal/MisManos";
import AddManos from "./cubuchal/AddManos";
import AddManosSorteo from "./cubuchal/AddManosSorteo";

function Cuchubal() {
  return (
    <>
      <Top />
      <Side />
      <Routes>
        <Route path="/" element={<Cuchubales />} />
        <Route path="/manos/:id" element={<Manos />} />
        <Route path="/addCuchubal" element={<AddCuchubal />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/misManos" element={<MisManos />} />
        <Route path="/addManos" element={<AddManos />} />
        <Route path="/addManosSorteo" element={<AddManosSorteo />} />
      </Routes>
    </>
  );
}

export default Cuchubal;
