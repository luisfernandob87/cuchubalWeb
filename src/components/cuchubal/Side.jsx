import { useNavigate, Link, useLocation } from "react-router-dom";
import { FiGrid, FiUser, FiPlusSquare, FiList, FiLogOut, FiX } from "react-icons/fi";
import { useLanguage } from "../../context/LanguageContext.jsx";
import "./Side.css";

function Side({ isOpen, closeSidebar }) {
  const { t } = useLanguage();
  const location = useLocation();
  const navigate = useNavigate();
  const currentPath = location.pathname;

  const menuItems = [
    { name: t("dashboardSidebar.myCuchubales"), path: "/cuchubal", icon: <FiGrid /> },
    { name: t("dashboardSidebar.myTurns"), path: "/cuchubal/misManos", icon: <FiList /> },
    { name: t("dashboardSidebar.create"), path: "/cuchubal/addCuchubal", icon: <FiPlusSquare /> },
    { name: t("dashboardSidebar.profile"), path: "/cuchubal/profile", icon: <FiUser /> },
  ];

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <>
      {/* Overlay for mobile */}
      <div className={`sidebar-overlay ${isOpen ? "active" : ""}`} onClick={closeSidebar} />

      <aside className={`dashboard-sidebar ${isOpen ? "open" : ""}`}>
        <div className="sidebar-header mobile-only">
          <span className="logo-text">Cuchubal</span>
          <button className="close-sidebar" onClick={closeSidebar}>
            <FiX />
          </button>
        </div>

        <div className="sidebar-links">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`sidebar-link ${currentPath === item.path ? "active" : ""}`}
              onClick={() => { if (isOpen) closeSidebar(); }}
            >
              <span className="icon">{item.icon}</span>
              <span className="text">{item.name}</span>
            </Link>
          ))}
        </div>

        <div className="sidebar-footer">
          <button className="logout-button" onClick={handleLogout}>
            <FiLogOut /> <span>{t("dashboardSidebar.logout")}</span>
          </button>
        </div>
      </aside>
    </>
  );
}

export default Side;
