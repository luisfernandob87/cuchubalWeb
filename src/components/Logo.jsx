import PropTypes from "prop-types";

export function LogoMark({ size = 40, className = "" }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <rect x="2" y="2" width="44" height="44" rx="14" fill="var(--primary)" />
      <circle cx="24" cy="24" r="13.5" stroke="#ffffff" strokeOpacity="0.95" strokeWidth="3" />
      <path
        d="M18.5 28.5L23 24l2.2 2.2 5.3-5.9"
        stroke="#ffffff"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M30.5 20.3v3.6m0-3.6h-3.6"
        stroke="#ffffff"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function LogoFull({ size = 40, word = "Cuchubal", className = "logo-text" }) {
  return (
    <span className="logo-full">
      <LogoMark size={size} />
      <span className={className}>{word}</span>
    </span>
  );
}

LogoMark.propTypes = {
  size: PropTypes.number,
  className: PropTypes.string,
};

LogoFull.propTypes = {
  size: PropTypes.number,
  word: PropTypes.string,
  className: PropTypes.string,
};

export default LogoFull;