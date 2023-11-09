import { useState } from "react";
import { api } from "../../../services/api";

interface Workers {
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

export function useWorkers() {

  const [workers,setWorkers ] = useState<Workers[]>()

  async function gettingAllWorkers() {
    try {
      const res = await api.get('/all-users')
      if(res.status === 200 ) {
        setWorkers(res.data.users)
      }
    } catch (error) {
      console.log(error)
    }
  }


  return { workers,gettingAllWorkers }
}