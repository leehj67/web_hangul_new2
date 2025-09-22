import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";   // ✅ Tailwind 스타일 연결

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
