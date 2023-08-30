import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Login } from "./page/Login";
import { Dashboard } from "./page/Dashboard";

export function Routers() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={< Dashboard/>} />
      </Routes>
   </BrowserRouter>
  )
}