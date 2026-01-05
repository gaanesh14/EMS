import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { AuthProvider } from "./components/common/AuthContext.jsx";
import { DataProvider } from "./components/common/DataProvider.jsx";
import { PayrollProvider } from "./components/common/PayrollProvider.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <DataProvider>
        <PayrollProvider>
          <App />
        </PayrollProvider>
      </DataProvider>
    </AuthProvider>
  </StrictMode>
);
