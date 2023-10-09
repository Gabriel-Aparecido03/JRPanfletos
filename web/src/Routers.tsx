import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Login } from "./pages/Login";
import { Dashboard } from "./pages/Dashboard";
import { UserContextProvider } from "./contexts/userProvider";

export function Routers() {
  return (
    <UserContextProvider>
      <BrowserRouter basename="/">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/dashboard" element={< Dashboard />} />
        </Routes>
      </BrowserRouter>
    </UserContextProvider>
  )
}