import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { ProgramProvider } from "./context/ProgramContext.jsx";
import { ProgProvider } from "./context/ProgContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ProgramProvider>
      <ProgProvider>
        <App />
      </ProgProvider>
    </ProgramProvider>
  </React.StrictMode>
);
