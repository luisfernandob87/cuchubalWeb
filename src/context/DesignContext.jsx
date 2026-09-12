import PropTypes from "prop-types";
import { createContext, useEffect } from "react";

export const DEFAULT_PALETTE = "emerald";
export const DEFAULT_ICON_SET = "tabler";
export const DEFAULT_HERO_VARIANT = "mockup";

const DesignContext = createContext({});

export function DesignProvider({ children }) {
  useEffect(() => {
    document.documentElement.setAttribute("data-palette", DEFAULT_PALETTE);
  }, []);

  return (
    <DesignContext.Provider
      value={{
        palette: DEFAULT_PALETTE,
        iconSet: DEFAULT_ICON_SET,
        heroVariant: DEFAULT_HERO_VARIANT,
      }}
    >
      {children}
    </DesignContext.Provider>
  );
}

export default DesignContext;

DesignProvider.propTypes = {
  children: PropTypes.node,
};