import "../../styles/hero-illustration.css";

function HeroIllustration() {
  return (
    <div className="hero-illustration" aria-hidden="true">
      <svg viewBox="0 0 520 440" width="100%" role="presentation">
        <defs>
          <radialGradient id="hero-svg-glow" cx="0.5" cy="0.5" r="0.5">
            <stop offset="0" stopColor="var(--glow-primary)" stopOpacity="0.9" />
            <stop offset="1" stopColor="var(--glow-primary)" stopOpacity="0" />
          </radialGradient>
        </defs>

        <circle cx="260" cy="220" r="190" fill="url(#hero-svg-glow)" />

        {/* Sparkles */}
        <g stroke="#fbbf24" strokeWidth="5" strokeLinecap="round">
          <path d="M96 110v24M84 122h24" />
          <path d="M452 128v20M442 138h20" opacity="0.8" />
          <path d="M436 320v18M427 329h18" opacity="0.7" />
        </g>

        {/* Floating coins */}
        <g>
          <circle cx="368" cy="150" r="26" fill="#fbbf24" stroke="#f59e0b" strokeWidth="3" />
          <circle cx="368" cy="150" r="17" fill="none" stroke="#ffffff" strokeOpacity="0.55" strokeWidth="2" />
          <circle cx="416" cy="286" r="34" fill="#f59e0b" stroke="#d97706" strokeWidth="3" />
          <circle cx="416" cy="286" r="22" fill="none" stroke="#ffffff" strokeOpacity="0.5" strokeWidth="2.5" />
          <circle cx="340" cy="360" r="20" fill="#fbbf24" stroke="#f59e0b" strokeWidth="3" />
        </g>

        {/* Coin entering slot */}
        <g>
          <circle cx="258" cy="128" r="20" fill="#fbbf24" stroke="#f59e0b" strokeWidth="3" />
          <circle cx="258" cy="128" r="13" fill="none" stroke="#ffffff" strokeOpacity="0.5" strokeWidth="2" />
          <path
            d="M258 148v18"
            stroke="#fbbf24"
            strokeWidth="4"
            strokeDasharray="2 6"
            strokeLinecap="round"
          />
        </g>

        {/* Piggy bank */}
        <g>
          {/* back legs */}
          <path d="M186 332v38a12 12 0 0 0 24 0v-36z" fill="var(--text-main)" opacity="0.18" />
          <path d="M286 332v38a12 12 0 0 0 24 0v-36z" fill="var(--text-main)" opacity="0.18" />

          {/* body */}
          <ellipse cx="244" cy="252" rx="122" ry="96" fill="var(--primary)" />
          {/* ear */}
          <ellipse cx="176" cy="170" rx="24" ry="30" transform="rotate(-18 176 170)" fill="var(--primary)" />
          {/* snout */}
          <circle cx="122" cy="262" r="46" fill="var(--text-main)" opacity="0.9" />
          <circle cx="122" cy="262" r="46" fill="var(--bg-deep)" opacity="0.15" />
          <circle cx="104" cy="252" r="7" fill="var(--bg-deep)" />
          <circle cx="140" cy="252" r="7" fill="var(--bg-deep)" />

          {/* eye */}
          <circle cx="197" cy="222" r="8" fill="var(--bg-deep)" />
          <circle cx="199" cy="220" r="2.5" fill="#ffffff" />

          {/* slot */}
          <g transform="rotate(-6 218 150)">
            <path d="M196 148h44v9h-44z" rx="4" fill="var(--bg-deep)" opacity="0.55" />
          </g>

          {/* tail */}
          <path
            d="M358 210c22-4 26 22 6 27"
            fill="none"
            stroke="var(--primary)"
            strokeWidth="6"
            strokeLinecap="round"
          />

          {/* front legs */}
          <path d="M180 340v30a10 10 0 0 0 20 0v-30z" fill="var(--bg-deep)" opacity="0.55" />
          <path d="M262 340v30a10 10 0 0 0 20 0v-30z" fill="var(--bg-deep)" opacity="0.55" />

          {/* highlight */}
          <path
            d="M196 190a86 66 0 0 1 72-34"
            stroke="#ffffff"
            strokeWidth="10"
            strokeLinecap="round"
            fill="none"
            opacity="0.28"
          />
        </g>

        {/* Ground */}
        <ellipse cx="260" cy="404" rx="180" ry="12" fill="var(--text-main)" opacity="0.08" />
      </svg>
    </div>
  );
}

export default HeroIllustration;