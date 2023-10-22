import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Login } from "./pages/Login";
import { Dashboard } from "./pages/Dashboard";
import { UserContextProvider } from "./contexts/userProvider";
import { ToastContextProvider } from "./contexts/toastProvider";

export function Routers() {
  return (
    <UserContextProvider>
      <ToastContextProvider>
        <BrowserRouter basename="/">
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/dashboard" element={< Dashboard />} />
          </Routes>
        </BrowserRouter>
      </ToastContextProvider>
    </UserContextProvider>
  )
}