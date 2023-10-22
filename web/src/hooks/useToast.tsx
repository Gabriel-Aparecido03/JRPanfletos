import { useContext } from "react";
import { ToastContext } from "../contexts/toastProvider";

export function useToast() {
  const useHook = useContext(ToastContext)
  return useHook
}