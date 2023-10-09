import { useContext } from "react";
import { UserContext } from "../contexts/userProvider";

export function useUser() {
  const context = useContext(UserContext)
  return context
}