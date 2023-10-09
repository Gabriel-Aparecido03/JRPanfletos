import { Pencil } from "phosphor-react";
import { Button } from "./ui/Button";
import { DialogOverplay, Dialog, DialogTrigger, DialogPortal, DialogContent } from "./ui/Dialog";
import { TextField } from "./ui/TextField";
import { FormEvent, useEffect, useState } from "react";
import { api } from "../services/api";
import { useUser } from "../hooks/useUser";

interface UpdateClientType {
  infos : {
    id:string
    socialName : string
    email : string
    phone : string
    cnpj : string
  }
  refresh : () => void
}

export function UpdateClient({ infos ,refresh }:UpdateClientType) {

  const [ socialName,setSocialName ] = useState(infos.socialName)
  const [ email,setEmail ] = useState(infos.email)
  const [ cnpjNumber,setCnpjNumber ] = useState(infos.cnpj)
  const [ phone,setPhone ] = useState(infos.phone)

  const [ socialNameError,setSocialNameError ] = useState(false)
  const [ cnpjNumberError,setCnpjNumberError ] = useState(false)
  const [ phoneError,setPhoneError ] = useState(false)
  const [ emailError,setEmailError ] = useState(false)

  const [modalIsOpened,setModalOpended ] = useState(false)

  const { user } = useUser()

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

  function initInfos() {
    setSocialName(infos.socialName)
    setEmail(infos.email)
    setPhone(infos.phone)
    setCnpjNumber(infos.cnpj)
  }

  async function handleUpdate(e: FormEvent) {
    e.preventDefault()
    try { 
      const res = await api.put('/clients',{
        id : infos.id,
        email,
        phone,
        userActionId : user!.id
      })
      if(res.status === 200) {
        reset()
        setModalOpended(false)
        refresh()
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(()=>{
    initInfos()
  },[])

  return (
    <Dialog open={modalIsOpened} onOpenChange={()=>setModalOpended(!modalIsOpened)} >
      <DialogTrigger asChild>
        <Pencil onClick={()=>{setModalOpended(true)}} className="mr-10 text-bold text-lg text-gray-500 cursor-pointer " />
      </DialogTrigger>
      <DialogPortal>
        <DialogOverplay />
        <DialogContent>
          <form onSubmit={handleUpdate}>
            <div className="flex justify-between gap-4 mb-5">
              <div className="w-1/2">
                <p className="text-gray-500 font-normal text-sm  mb-1">Razão Social</p>
                <TextField 
                  error={socialNameError}
                  value={socialName}
                  disabled
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
                  value={cnpjNumber}
                  disabled
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
            <Button className="mt-5">Salvar</Button>
          </form>
        </DialogContent>
      </DialogPortal>
    </Dialog>
  )
}