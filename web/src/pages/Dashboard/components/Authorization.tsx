import { Button } from "../../../component/ui/Button";
import { TextField } from "../../../component/ui/TextField";
import { Select } from "../../../component/ui/Select";
import { useClients } from "../hooks/useClients";
import { useSectors } from "../hooks/useSectors";
import { FormEvent, useState } from "react";
import { useUser } from "../../../hooks/useUser";
import { api } from "../../../services/api";
import { Toast } from "../../../component/ui/Toast";

export function Authorization() {

  const { clients } = useClients()
  const { sectors } = useSectors()
  const { user } = useUser()

  const [ sectorIdSelected,setSectorIdSelected ] = useState('')
  const [ clientIdSelected,setClientIdSelected ] = useState('')

  const [ thousandValue,setThousandValue ] = useState('')
  const [ thousandValueError,setThousandValueError] = useState(false)

  const [toastOpen,setToastOpen] = useState(false)
  const [messageError,setMessageError] = useState('')
  const [messageSuccess,setMessageSuccess] = useState('')

  function valitedFiels() {
    if(!Number(thousandValue) || Number(thousandValue) <= 0) {
      setMessageError('Valor do milheiro inválido')
      setToastOpen(true)
      setThousandValueError(true)
      return false
    }

    setThousandValueError(false)
    setToastOpen(false)
    setMessageError('')
    return true
  }

  async function handleSubmit(e:FormEvent) {
    e.preventDefault()
    if(!valitedFiels()) return
    setSectorIdSelected(sectors[0].id)
    setClientIdSelected(clients[0].id)
    try {
      const res = await api.post('/authorization',{
        clientId : clientIdSelected,
        sectorsOfDistributions : [sectorIdSelected],
        creationUserId : user!.id,
        valueOfThousandInCents : Number(thousandValue) * 100
      })
      if(res.status === 201) {
        setToastOpen(true)
        setMessageSuccess('Autorização criada com sucesso !')
      }
    }
    catch { /* empty */}
  }

  return (
    <div className="h-[calc(100vh-50px)] w-full bg-white mx-auto p-10 rounded-lg flex flex-col">
      <h4 className="text-3xl font-extrabold ">Autorização de distribuição</h4>
      <div className="mt-4">
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col gap-4">
            <div>
              <p className="text-gray-500 font-normal text-sm  mb-1">Cliente</p>
              <Select placeholder="Selecione o cliente" onChange={e => setClientIdSelected(e.target.value)}>
                {clients.map( item => 
                <option 
                  key={item.id} 
                  value={item.id}
                >
                  { item.socialName } 
                </option>
              )}
              </Select>
            </div>
            <div>
              <p className="text-gray-500 font-normal text-sm  mb-1">Setor</p>
              <Select 
                placeholder="Selecione o setor de distribuição"  
                onChange={e => setSectorIdSelected(e.target.value)}
              >
                {sectors.map( item => 
                  <option 
                    key={item.id} 
                    value={item.id}
                  >
                    { item.name } 
                  </option>
                )}
              </Select>
            </div>
            <TextField 
              placeholder="Valor do milheiro" 
              value={thousandValue}
              onChange={e => setThousandValue(e.target.value)}  
            />
          </div>
          <Button type="submit" className="mt-2"> Gerar autorização</Button>
        </form>
      </div>
      <Toast
          open={toastOpen}
          color={messageSuccess.length === 0 ? "danger" : "success"}
          description={messageError.length === 0 ? messageSuccess : messageError}
          onClose={() => { setToastOpen(false) }}
          title=""
        />
    </div>
  )
}