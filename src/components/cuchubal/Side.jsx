import { useNavigate, Link, useLocation } from "react-router-dom";
import PropTypes from "prop-types";
import { useLanguage } from "../../context/LanguageContext.jsx";
import { useIcons } from "../../icons.js";
import "./Side.css";

function Side({ isOpen, closeSidebar }) {
  const { t } = useLanguage();
  const location = useLocation();
  const navigate = useNavigate();
  const I = useIcons();
  const currentPath = location.pathname;

  const menuItems = [
    { name: t("dashboardSidebar.myCuchubales"), path: "/cuchubal", icon: <I.Grid /> },
    { name: t("dashboardSidebar.myTurns"), path: "/cuchubal/misManos", icon: <I.List /> },
    { name: t("dashboardSidebar.create"), path: "/cuchubal/addCuchubal", icon: <I.PlusSquare /> },
    { name: t("dashboardSidebar.profile"), path: "/cuchubal/profile", icon: <I.User /> },
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
            <I.X />
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
            <I.LogOut /> <span>{t("dashboardSidebar.logout")}</span>
          </button>
        </div>
      </aside>
    </>
  );
}

export default Side;

Side.propTypes = {
  isOpen: PropTypes.bool,
  closeSidebar: PropTypes.func.isRequired,
};
