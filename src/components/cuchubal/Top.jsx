import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { LogoMark } from "../Logo";
import { useTheme } from "../../hooks/useTheme";
import { useLanguage } from "../../context/LanguageContext.jsx";
import { useIcons } from "../../icons.js";
import "./Top.css";

function Top({ toggleSidebar, isSidebarOpen }) {
  const navigate = useNavigate();
  const I = useIcons();
  const { theme, toggleTheme } = useTheme();
  const { t, language, toggleLanguage } = useLanguage();
  const username = localStorage.getItem("usuario");

  return (
    <header className="dashboard-top">
      <div className="top-left">
        <div className="mobile-toggle" onClick={toggleSidebar}>
          {isSidebarOpen ? <I.X /> : <I.Menu />}
        </div>
        <div className="top-logo" onClick={() => navigate("/")}>
          <LogoMark size={34} />
          <span className="logo-text">Cuchubal</span>
        </div>
      </div>

      <div className="top-right">
        <div className="search-bar">
          <I.Search />
          <input type="text" placeholder={t("common.search")} />
        </div>

        <div className="top-actions">
          <div className="icon-actions">
            <button className="icon-btn" onClick={toggleTheme} title="Cambiar tema">
              {theme === 'dark' ? <I.Sun /> : <I.Moon />}
            </button>

            <button className="icon-btn lang-toggle" onClick={toggleLanguage} title="Change Language">
              <I.Globe />
              <span className="lang-text">{language.toUpperCase()}</span>
            </button>
          </div>

          <div className="user-profile">
            <div className="user-info">
              <span className="username">{username}</span>
              <span className="role">{t("common.member")}</span>
            </div>
            <div className="avatar">
              <I.User />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Top;

Top.propTypes = {
  toggleSidebar: PropTypes.func.isRequired,
  isSidebarOpen: PropTypes.bool.isRequired,
};
