import { Plus } from "phosphor-react";
import { Button } from "./ui/Button";
import { DialogOverplay, Dialog, DialogTrigger, DialogPortal, DialogContent } from "./ui/Dialog";
import { TextField } from "./ui/TextField";
import { FormEvent, useState } from "react";
import { api } from "../services/api";

export function CreateClient() {

  const [ socialName,setSocialName ] = useState('')
  const [ email,setEmail ] = useState('')
  const [ cnpjNumber,setCnpjNumber ] = useState('')
  const [ phone,setPhone ] = useState('')

  const [ socialNameError,setSocialNameError ] = useState(false)
  const [ cnpjNumberError,setCnpjNumberError ] = useState(false)
  const [ phoneError,setPhoneError ] = useState(false)
  const [ emailError,setEmailError ] = useState(false)

  const [modalIsOpened,setModalOpended ] = useState(false)

  function reset() {
    setSocialName('')
    setEmail('')
    setCnpjNumber('')
    setPhone('')

    setSocialNameError(false)
    setCnpjNumberError(false)
    setPhoneError(false)
    setEmailError(false)
  }

  async function handleCreate(e: FormEvent) {
    e.preventDefault()
    try { 
      const res = await api.post('/clients',{})
      if(res.status === 201) {
        reset()
        setModalOpended(false)
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <Dialog open={modalIsOpened} onOpenChange={()=>setModalOpended(!modalIsOpened)} >
      <DialogTrigger asChild>
        <Button onClick={()=>{setModalOpended(true)}}><Plus className="mr-3"/> Adicionar</Button>
      </DialogTrigger>
      <DialogPortal>
        <DialogOverplay />
        <DialogContent>
          <form onSubmit={handleCreate}>
            <div className="flex justify-between gap-4 mb-5">
              <div className="w-1/2">
                <p className="text-gray-500 font-normal text-sm  mb-1">Razão Social</p>
                <TextField 
                  error={socialNameError}
                  onChange={e => setSocialName(e.target.value)}
                  value={socialName}
                />
              </div>
              <div className="w-1/2">
              <p className="text-gray-500 font-normal text-sm  mb-1">Email</p>
                <TextField 
                  error={emailError}
                  onChange={e => setEmail(e.target.value)}
                  value={email}
                />
              </div>
            </div>
            <div className="flex justify-between gap-4 mb-5">
              <div className="w-1/2">
                <p className="text-gray-500 font-normal text-sm mb-1">Número de cnpj</p>
                <TextField 
                  error={cnpjNumberError}
                  onChange={e => setCnpjNumber(e.target.value)}
                  value={cnpjNumber}
                />
              </div>
              <div className="w-1/2">
                <p className="text-gray-500 font-normal text-sm mb-1">Número de telefone</p>
                <TextField 
                  error={phoneError}
                  onChange={e => setPhone(e.target.value)}
                  value={phone}
                />
              </div>
            </div>
            <Button className="mt-5">Criar</Button>
          </form>
        </DialogContent>
      </DialogPortal>
    </Dialog>
  )
}