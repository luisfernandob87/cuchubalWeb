import { useLanguage } from "../../context/LanguageContext.jsx";
import { useIcons } from "../../icons.js";
import "../../styles/hero-mockup.css";

function HeroMockup() {
  const { language } = useLanguage();
  const I = useIcons();

  const copy =
    language === "es"
      ? {
          total: "Total ahorrado",
          progress: "Progreso del ciclo",
          turn: "Tu turno",
          payout: "Pagos",
          next: "Próximo",
        }
      : {
          total: "Total saved",
          progress: "Cycle progress",
          turn: "Your turn",
          payout: "Payouts",
          next: "Up next",
        };

  return (
    <div className="hero-mockup" aria-hidden="true">
      <div className="mock-glow"></div>
      <div className="mock-card mock-card-main">
        <div className="mock-card-top">
          <div className="mock-avatar">
            <I.User />
          </div>
          <div className="mock-greeting">
            <span className="mock-role">Miembro Gold</span>
            <span className="mock-name">María López</span>
          </div>
          <span className="mock-badge">Activo</span>
        </div>

        <div className="mock-amount">
          <span className="mock-amount-label">{copy.total}</span>
          <strong>Q 3,600</strong>
        </div>

        <div className="mock-progress">
          <div className="mock-progress-label">
            <span>{copy.progress}</span>
            <span>6/12</span>
          </div>
          <div className="mock-progress-track">
            <div className="mock-progress-fill" />
          </div>
        </div>

        <div className="mock-turns">
          <div className="mock-turn">
            <span className="mock-turn-dot done">
              <I.CheckCircle />
            </span>
            <span className="mock-turn-text">{copy.turn} #1 · 100%</span>
          </div>
          <div className="mock-turn">
            <span className="mock-turn-dot">
              <I.Calendar />
            </span>
            <span className="mock-turn-text">{copy.turn} #2 · 15 May</span>
          </div>
        </div>
      </div>

      <div className="mock-card mock-card-left">
        <div className="mock-mini">
          <I.Coins />
          <span>
            <small>{copy.payout}</small>
            <strong>8</strong>
          </span>
        </div>
      </div>

      <div className="mock-card mock-card-right">
        <div className="mock-mini">
          <I.Users />
          <span>
            <small>{copy.next}</small>
            <strong>3 {language === "es" ? "personas" : "people"}</strong>
          </span>
        </div>
      </div>

      <div className="mock-coin c1">
        <I.Wallet />
      </div>
      <div className="mock-coin c2">
        <I.TrendingUp />
      </div>
    </div>
  );
}

export default HeroMockup;