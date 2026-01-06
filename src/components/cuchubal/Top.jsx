import React from "react";
import logo from "../../assets/logo.png";
import { useNavigate } from "react-router-dom";
import { FiBell, FiSearch, FiUser } from "react-icons/fi";
import "./Top.css";

function Top() {
  const navigate = useNavigate();
  const username = localStorage.getItem("usuario");

  return (
    <header className="dashboard-top">
      <div className="top-left">
        <div className="top-logo" onClick={() => navigate("/")}>
          <img src={logo} alt="Cuchubal" />
          <span className="logo-text">Cuchubal</span>
        </div>
      </div>

      <div className="top-right">
        <div className="search-bar">
          <FiSearch />
          <input type="text" placeholder="Buscar..." />
        </div>

        <div className="icon-actions">
          <button className="icon-btn"><FiBell /></button>
        </div>

        <div className="user-profile">
          <div className="user-info">
            <span className="username">{username}</span>
            <span className="role">Miembro</span>
          </div>
          <div className="avatar">
            <FiUser />
          </div>
        </div>
      </div>
    </header>
  );
}

export default Top;
