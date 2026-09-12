import { useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";
import PropTypes from "prop-types";
import { COUNTRIES, flagEmoji } from "../../data/countries";
import { useLanguage } from "../../context/LanguageContext.jsx";
import { useIcons } from "../../icons.js";
import "./CountryCodePicker.css";

function CountryCodePicker({ value, onChange, disabled = false }) {
  const { t, language } = useLanguage();
  const I = useIcons();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [manualCode, setManualCode] = useState("");
  const [manualError, setManualError] = useState(false);

  const regionNames = useMemo(
    () => new Intl.DisplayNames([language], { type: "region" }),
    [language]
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return COUNTRIES;
    return COUNTRIES.filter(
      (c) =>
        c.name.toLowerCase().includes(q) ||
        c.iso.toLowerCase().includes(q) ||
        c.dial.includes(q) ||
        (regionNames.of(c.iso) || "").toLowerCase().includes(q)
    );
  }, [query, regionNames]);

  const selected = COUNTRIES.find((c) => c.dial === value) || null;

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e) => {
      if (e.key === "Escape") close();
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open]);

  const close = () => {
    setOpen(false);
    setQuery("");
    setManualCode("");
    setManualError(false);
  };

  const selectCountry = (dial) => {
    onChange(dial);
    close();
  };

  const applyManualCode = () => {
    const raw = manualCode.trim().replace(/\s+/g, "");
    const normalized = raw.startsWith("+") ? raw : `+${raw}`;
    if (!/^\+\d{1,6}$/.test(normalized)) {
      setManualError(true);
      return;
    }
    onChange(normalized);
    close();
  };

  return (
    <div className="country-picker">
      <button
        type="button"
        className="country-picker-input"
        onClick={() => {
          if (!disabled) setOpen(true);
        }}
        disabled={disabled}
      >
        {selected ? (
          <>
            <span className="cp-flag">{flagEmoji(selected.iso)}</span>
            <span className="cp-dial">{selected.dial}</span>
          </>
        ) : (
          <span className="cp-placeholder">{value || "+"}</span>
        )}
        <I.ChevronDown className="cp-caret" />
      </button>

      {open &&
        createPortal(
          <div className="cp-modal-overlay" onMouseDown={(e) => {
            if (e.target === e.currentTarget) close();
          }}>
            <div className="cp-modal" role="dialog" aria-modal="true">
              <div className="cp-modal-header">
                <h3>{t("common.pickCountry")}</h3>
                <button type="button" className="cp-close" onClick={close}>
                  <I.X />
                </button>
              </div>

              <div className="cp-search">
                <I.Search />
                <input
                  type="text"
                  autoFocus
                  placeholder={t("common.searchCountry")}
                  value={query}
                  onChange={(e) => {
                    setQuery(e.target.value);
                    setManualError(false);
                  }}
                />
              </div>

              <ul className="cp-list">
                {filtered.length === 0 && (
                  <li className="cp-empty">{t("common.noCountry")}</li>
                )}
                {filtered.map((c) => (
                  <li
                    key={c.iso}
                    className={`cp-item ${selected && selected.iso === c.iso ? "selected" : ""}`}
                    onClick={() => selectCountry(c.dial)}
                  >
                    <span className="cp-flag">{flagEmoji(c.iso)}</span>
                    <span className="cp-name">{regionNames.of(c.iso) || c.name}</span>
                    <span className="cp-dial">{c.dial}</span>
                  </li>
                ))}
              </ul>

              <div className="cp-manual">
                <p className="cp-manual-label">{t("common.manualCode")}</p>
                <div className="cp-manual-row">
                  <input
                    type="text"
                    inputMode="tel"
                    placeholder={t("common.manualCodePlaceholder")}
                    value={manualCode}
                    className={manualError ? "error" : ""}
                    onChange={(e) => {
                      setManualCode(e.target.value);
                      setManualError(false);
                    }}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") applyManualCode();
                    }}
                  />
                  <button
                    type="button"
                    className="cp-use-btn"
                    onClick={applyManualCode}
                    disabled={manualCode.trim() === ""}
                  >
                    {t("common.useCode")}
                  </button>
                </div>
                {manualError && <p className="cp-manual-error">{t("common.invalidCode")}</p>}
              </div>
            </div>
          </div>,
          document.body
        )}
    </div>
  );
}

CountryCodePicker.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
};

export default CountryCodePicker;