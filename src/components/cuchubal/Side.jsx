import { useNavigate, Link, useLocation } from "react-router-dom";
import { FiGrid, FiUser, FiPlusSquare, FiList, FiLogOut } from "react-icons/fi";
import { useLanguage } from "../../context/LanguageContext.jsx";
import "./Side.css";

function Side() {
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
        <button className="logout-button" onClick={handleLogout}>
          <FiLogOut /> <span>{t("dashboardSidebar.logout")}</span>
        </button>
      </div>
    </aside>
  );
}

export default Side;
