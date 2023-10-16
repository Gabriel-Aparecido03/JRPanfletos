import { useEffect, useState } from "react";
import { api } from "../../../services/api";

interface SectorOutput {
  id : string ;
  name : string
}

interface AuthorizationsType {
  sectorsOfDistributions: SectorOutput[];
  userCreatedName: string;
  clientName: string;
  id: string;
  creation_user_id: string;
  client_id: string;
  created_at: Date;
  value_of_thousand_in_cents: number;
  report_id : string
}

export function useAuthorizations() {
  const [authorizations, setAuthorizations ] = useState<AuthorizationsType[]>([])

  async function gettingAuthorizations() {
    try {
      const res = await api.get('/all-authorizations')
      if(res.status === 200 ) {
        setAuthorizations([...res.data.auhtorizationOfDistributions])
      }
    } catch (error) { /* empty */ }
  }

  useEffect(()=>{
    gettingAuthorizations()
  },[])


  return { gettingAuthorizations , authorizations }
}