import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { UserProvider } from "./contexts/user-context.jsx";
import { GioHangProvider } from "./contexts/gio-hang-context.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <UserProvider>
      <GioHangProvider>
        <App />
      </GioHangProvider>
    </UserProvider>
  </StrictMode>
);
