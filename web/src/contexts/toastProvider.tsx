import { ReactNode, createContext, useState } from "react";

interface ToastContextProviderType {
  children : ReactNode
}

interface OpenToastParamsType {
  title : string
  description : string
  color : "success" | "danger" | "primary"
}

interface ToastContextType {
  openToast : ( { color,description,title } : OpenToastParamsType ) => void
  closeToast : () => void
  title : string
  color : "success" | "danger" | "primary"
  description : string
  isOpen: boolean
}

export const ToastContext = createContext({} as ToastContextType)

export function ToastContextProvider({ children }:ToastContextProviderType) {
  const [ isOpen, setIsOpen ] = useState(false)
  const [ title,setTile ] = useState('')
  const [ color,setColor ] = useState<"success" | "danger" | "primary">('success')
  const [ description,setDescription ] = useState('')

  function openToast({ color,description,title }:OpenToastParamsType) {
    setIsOpen(true)
    setTile(title)
    setDescription(description)
    setColor(color)
  }

  function closeToast() {
    setIsOpen(false)
    setTile("")
    setDescription("")
  }

  return (
    <ToastContext.Provider value={{ closeToast,openToast,color,description,title,isOpen }}>
      { children}
    </ToastContext.Provider>
  )
}