import { Pencil } from "phosphor-react";
import { Button } from "./ui/Button";
import { DialogOverplay, Dialog, DialogTrigger, DialogPortal, DialogContent } from "./ui/Dialog";
import { TextField } from "./ui/TextField";
import { FormEvent, useEffect, useState } from "react";
import { useUser } from "../hooks/useUser";
import { isValidCnpjNumber } from "../utils/validate-cnpj";
import { isValidEmail } from "../utils/validate-email";
import { Toast } from "./ui/Toast";

interface handleUpdateClientParmsType {
  id:string;
  phone :string;
  userActionId:string;
  email:string;
}

interface UpdateClientType {
  infos: {
    id: string
    socialName: string
    email: string
    phone: string
    cnpj: string
  }
  handleUpdateClient({ email, id, phone, userActionId }: handleUpdateClientParmsType): Promise<void>
}

export function UpdateClient({ infos, handleUpdateClient }: UpdateClientType) {

  console.log(infos)

  const [socialName, setSocialName] = useState(infos.socialName)
  const [email, setEmail] = useState(infos.email)
  const [cnpjNumber, setCnpjNumber] = useState(infos.cnpj)
  const [phone, setPhone] = useState(infos.phone)

  const [socialNameError, setSocialNameError] = useState(false)
  const [cnpjNumberError, setCnpjNumberError] = useState(false)
  const [phoneError, setPhoneError] = useState(false)
  const [emailError, setEmailError] = useState(false)

  const [modalIsOpened, setModalOpended] = useState(false)

  const [messageError, setMessageError] = useState('')
  const [openToast,setOpenToast ] = useState(false)

  const { user } = useUser()

  function validateFiels() {

    if (socialName.length === 0) {
      setOpenToast(true)
      setSocialNameError(true)
      setMessageError('Razão social inválida !')
      return false
    }

    if (!isValidCnpjNumber(cnpjNumber)) {
      setOpenToast(true)
      setMessageError('Cnpj inválido !')
      setCnpjNumberError(true)
      return false
    }

    if (phone.length === 0) {
      setOpenToast(true)
      setMessageError('Número de telefone inválido')
      setPhoneError(true)
      return false
    }

    if (!isValidEmail(email)) {
      setOpenToast(true)
      setMessageError('Email inválido')
      setEmailError(false)
      return false
    }

    setMessageError('')
    setSocialNameError(false)
    setCnpjNumberError(false)
    setPhoneError(false)
    setEmailError(false)
    setOpenToast(false)

    return true
  }

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
    if(!validateFiels()) return
    await handleUpdateClient({email,id : infos.id,phone,userActionId: user!.id})
    reset()
    setModalOpended(false)
  }

  useEffect(() => {
    initInfos()
    console.log('...')
  }, [handleUpdateClient])

  return (
    <>
      <Dialog open={modalIsOpened} onOpenChange={() => setModalOpended(!modalIsOpened)} >
        <DialogTrigger asChild>
          <Pencil onClick={() => { setModalOpended(true) }} className="mr-10 text-bold text-lg text-gray-500 cursor-pointer " />
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
      <Toast 
        open={openToast} 
        color={"danger"}
        description={messageError}
        onClose={()=>{setOpenToast(false)}}
        title=""
      />
    </>
  )
}