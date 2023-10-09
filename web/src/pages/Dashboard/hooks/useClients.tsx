import { useState } from "react";
import { api } from "../../../services/api";

interface Client {
  id: string;
  socialName: string;
  email: string;
  phone: string;
  cnpj: string;
  user_created_id: string;
  created_at: Date;
  updated_at: Date | null;
}

export function useClients() {
  
  const [clients,setClients ] = useState<Client[]>([])

  async function gettingClients() {
    try {
      const res  = await api.get('/all-clients')
      res.status === 200 ? setClients(res.data.clients) : []
    } catch (error) {
      console.log(error)
    }
  }

  return { clients , gettingClients }
}