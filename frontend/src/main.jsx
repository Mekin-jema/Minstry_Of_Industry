import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import CSVProvider from './components/helpers/CSVContext.jsx';
import LoginProvider from "./components/helpers/LoginContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <CSVProvider>
      <LoginProvider>
      <App />
      </LoginProvider>
    </CSVProvider>
  </StrictMode>
);
