import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { HashRouter } from "react-router-dom";

import { LanguageProvider } from "./context/LanguageContext.jsx";
import { DesignProvider } from "./context/DesignContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <HashRouter>
      <LanguageProvider>
        <DesignProvider>
          <App />
        </DesignProvider>
      </LanguageProvider>
    </HashRouter>
  </React.StrictMode>
);