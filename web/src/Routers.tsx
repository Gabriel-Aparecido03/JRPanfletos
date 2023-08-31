import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Login } from "./page/Login";

export function Routers() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
      </Routes>
   </BrowserRouter>
  )
}