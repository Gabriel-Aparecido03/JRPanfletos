import Cookies from "js-cookie";
import { ReactNode, createContext, useState } from "react";
import { api } from "../services/api";

interface UserContextProviderContext {
  children : ReactNode
}

interface User {
  id: string;
  name: string;
  cpf_number: string;
  work_card_number: string;
  office: string;
  email: string;
  password_hash: string;
  created_at: Date;
  updated_at: Date | null;
  role: "COMMOM" | "ADMIN";
}

interface ContextTyppe {
  user : User | null
  hasLogginSaveAtCookies: () => boolean
  saveTokenAtCookie : (token : string ) => void
  updateUserInfos : ( data : User) => void
  getUserProfile : () => Promise<void>
  logout : () => void
}

export const UserContext = createContext({} as ContextTyppe)

export function UserContextProvider({ children } : UserContextProviderContext) {

  const [user,setUser ] = useState<User | null>(null)

  function hasLogginSaveAtCookies() {
    const hasJwtSavedAtStorage = !!Cookies.get('@jrpanfletos-1.0.0')
    return hasJwtSavedAtStorage
  }

  async function getUserProfile() {
    try {
      const res = await api.get('/session/me')
      updateUserInfos(res.data.user)
    } catch (error) { /* empty */ }
  }

  function saveTokenAtCookie(token : string ) {
    console.log(token)
    Cookies.set('@jrpanfletos-1.0.0', token , { expires: 7 });
  }

  function updateUserInfos(data : User) {
    setUser(data)
  }

  function logout() {
    setUser(null)
    Cookies.remove('@jrpanfletos-1.0.0')
  }

  return (
    <UserContext.Provider 
      value={{
        getUserProfile,
        hasLogginSaveAtCookies,
        saveTokenAtCookie,
        updateUserInfos,
        user,
        logout
      }}>
      { children }
    </UserContext.Provider>
  )
}