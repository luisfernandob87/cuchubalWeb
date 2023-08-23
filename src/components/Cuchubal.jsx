import React from "react";
import { Routes, Route } from "react-router-dom";
import Top from "./cubuchal/Top";
import Side from "./cubuchal/Side";
import Cuchubales from "./cubuchal/Cuchubales";
import Manos from "./cubuchal/Manos";
import AddCuchubal from "./cubuchal/AddCuchubal";
import Profile from "./cubuchal/Profile";

function Cuchubal() {
  return (
    <>
      <Top />
      <Side />
      <Routes>
        <Route path="/" element={<Cuchubales />} />
        <Route path="/manos" element={<Manos />} />
        <Route path="/addCuchubal" element={<AddCuchubal />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </>
  );
}

export default Cuchubal;
