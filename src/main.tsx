import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import App from "./App.tsx";
import "./index.css";
import UserProfile from "./pages/UserProfile.tsx";
import Navbar from "./components/Navbar.tsx";
import TableProvider from "./context/TableProvider.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <TableProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/profile" element={<UserProfile />} />
        </Routes>
      </BrowserRouter>
    </TableProvider>
  </StrictMode>
);
