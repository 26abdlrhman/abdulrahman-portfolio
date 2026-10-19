import React from "react";
import { createRoot } from "react-dom/client";
import "./fonts.css";
import App from "./App";
import "./style.css";
if (import.meta.env.DEV) import("./devAudit");
createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
