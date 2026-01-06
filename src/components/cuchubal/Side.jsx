import React from "react";
import { Link, useLocation } from "react-router-dom";
import { FiGrid, FiUser, FiPlusSquare, FiList, FiLogOut } from "react-icons/fi";
import "./Side.css";

function Side() {
  const location = useLocation();
  const currentPath = location.pathname;

  const menuItems = [
    { name: "Mis Cuchubales", path: "/cuchubal", icon: <FiGrid /> },
    { name: "Mis Manos", path: "/cuchubal/misManos", icon: <FiList /> },
    { name: "Crear Cuchubal", path: "/cuchubal/addCuchubal", icon: <FiPlusSquare /> },
    { name: "Mi Perfil", path: "/cuchubal/profile", icon: <FiUser /> },
  ];

  return (
    <aside className="dashboard-sidebar">
      <div className="sidebar-links">
        {menuItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`sidebar-link ${currentPath === item.path ? "active" : ""}`}
          >
            <span className="icon">{item.icon}</span>
            <span className="text">{item.name}</span>
          </Link>
        ))}
      </div>

      <div className="sidebar-footer">
        <button
          className="logout-button"
          onClick={() => {
            localStorage.clear();
            window.location.href = "/";
          }}
        >
          <FiLogOut /> <span>Cerrar Sesión</span>
        </button>
      </div>
    </aside>
  );
}

export default Side;
