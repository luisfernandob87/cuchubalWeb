import React from "react";
import { Routes, Route } from "react-router-dom";
import Top from "./cuchubal/Top";
import Side from "./cuchubal/Side";
import Cuchubales from "./cuchubal/Cuchubales";
import Manos from "./cuchubal/Manos";
import AddCuchubal from "./cuchubal/AddCuchubal";
import Profile from "./cuchubal/Profile";
import MisManos from "./cuchubal/MisManos";
import AddManos from "./cuchubal/AddManos";
import AddManosSorteo from "./cuchubal/AddManosSorteo";
import "./CuchubalView.css";

function Cuchubal() {
  return (
    <div className="dashboard-layout">
      <Top />
      <div className="dashboard-container">
        <Side />
        <main className="dashboard-main-content">
          <Routes>
            <Route path="/" element={<Cuchubales />} />
            <Route path="/manos/:id" element={<Manos />} />
            <Route path="/addCuchubal" element={<AddCuchubal />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/misManos" element={<MisManos />} />
            <Route path="/addManos" element={<AddManos />} />
            <Route path="/addManosSorteo" element={<AddManosSorteo />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}

export default Cuchubal;
