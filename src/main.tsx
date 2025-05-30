import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import App from "./App.tsx";
import "./index.css";
import UserProfile from "./pages/UserProfile.tsx";
import TableProvider from "./context/TableProvider.tsx";
import AuthProvider from "./context/AuthProvider.tsx";
import Auth from "./pages/Auth.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AuthProvider>
      <TableProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<App />} />
            <Route path="/profile" element={<UserProfile />} />
            <Route path="/auth" element={<Auth />} />
          </Routes>
        </BrowserRouter>
      </TableProvider>
    </AuthProvider>
  </StrictMode>
);
