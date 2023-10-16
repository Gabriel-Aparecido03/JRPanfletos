import { useEffect, useState } from "react"
import { api } from "../../../services/api"

interface Sector {
  id : string
  name : string
}

export function useSectors() {
  const [ sectors, setSectors ] = useState<Sector[]>([])

  async function gettingSectors() {
    try {
      const res = await api.get('/all-sectors')
      if(res.status === 200 ) {
        setSectors(res.data.sectors)
      }
    } catch (error) {}
  }

  useEffect(()=>{
    gettingSectors()
  },[])

  return { gettingSectors , sectors}
}