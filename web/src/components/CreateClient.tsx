import { Plus } from "phosphor-react";
import { Button } from "./ui/Button";
import { DialogOverplay, Dialog, DialogTrigger, DialogPortal, DialogContent } from "./ui/Dialog";
import { TextField } from "./ui/TextField";
import { FormEvent, useState } from "react";
import { api } from "../services/api";
import { isValidCnpjNumber } from "../utils/validate-cnpj";
import { isValidEmail } from "../utils/validate-email";
import { Toast } from "./ui/Toast";
import { useUser } from "../hooks/useUser";
import { isValidPhoneFormat } from "../utils/validate-phone-number";

interface CreateClientInterface {
  refresh : ()=>void
}

export function CreateClient({ refresh }:CreateClientInterface) {

  const { user } = useUser()

  const [socialName, setSocialName] = useState('')
  const [email, setEmail] = useState('')
  const [cnpjNumber, setCnpjNumber] = useState('')
  const [phone, setPhone] = useState('')

  const [socialNameError, setSocialNameError] = useState(false)
  const [cnpjNumberError, setCnpjNumberError] = useState(false)
  const [phoneError, setPhoneError] = useState(false)
  const [emailError, setEmailError] = useState(false)

  const [modalIsOpened, setModalOpended] = useState(false)

  const [toastOpen, setToastOpen] = useState(false)
  const [messageError, setMessageError] = useState('')
  const [messageSuccess, setMessageSuccess] = useState('')

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

  function validateFields() {

    if (socialName.length === 0) {
      setSocialNameError(true)
      setToastOpen(true)
      setMessageError('Razão social inválida ! ')
      return false
    
    }

    if (!isValidEmail(email)) {
      setEmailError(true)
      setToastOpen(true)
      setMessageError('Email inválido !')
      return false
    
    }

    if (!isValidCnpjNumber(cnpjNumber)) {
      setCnpjNumberError(true)
      setToastOpen(true)
      setMessageError('Cpnj inválido ! ')
      return false
    
    }

    if (!isValidPhoneFormat(phone)) {
      setPhoneError(true)
      setToastOpen(true)
      setMessageError('Número de telefone inválido !')
      return false
    
    }

    setToastOpen(false)
    setSocialNameError(false)
    setEmailError(false)
    setPhoneError(false)
    setCnpjNumberError(false)

    return true
  }

  async function handleCreate(e: FormEvent) {
    e.preventDefault()
    if (!validateFields()) return
    try {
      const res = await api.post('/clients', {
        socialName,
        email,
        phone,
        cnpj : cnpjNumber,
        userCreatedId : user!.id
      })
      if (res.status === 200) {
        reset()
        refresh()
        setMessageSuccess('Cliente cadastrado com sucesso !')
        setToastOpen(true)
        setModalOpended(false)
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <Dialog open={modalIsOpened} onOpenChange={() =>{ setModalOpended(!modalIsOpened);reset()}} >
        <DialogTrigger asChild>
          <Button onClick={() => { setModalOpended(true) }}><Plus className="mr-3" /> Adicionar</Button>
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
                    onChange={e => {setSocialName(e.target.value);setSocialNameError(false)}}
                    value={socialName}
                  />
                </div>
                <div className="w-1/2">
                  <p className="text-gray-500 font-normal text-sm  mb-1">Email</p>
                  <TextField
                    error={emailError}
                    onChange={e => {setEmail(e.target.value);setEmailError(false)}}
                    value={email}
                  />
                </div>
              </div>
              <div className="flex justify-between gap-4 mb-5">
                <div className="w-1/2">
                  <p className="text-gray-500 font-normal text-sm mb-1">Número de cnpj</p>
                  <TextField
                    error={cnpjNumberError}
                    onChange={e => {setCnpjNumber(e.target.value);setCnpjNumberError(false)}}
                    value={cnpjNumber}
                  />
                </div>
                <div className="w-1/2">
                  <p className="text-gray-500 font-normal text-sm mb-1">Número de telefone</p>
                  <TextField
                    error={phoneError}
                    onChange={e => {setPhone(e.target.value);setPhoneError(false)}}
                    value={phone}
                  />
                </div>
              </div>
              <Button className="mt-5">Criar</Button>
            </form>
          </DialogContent>
          <Toast 
          open={toastOpen} 
          color={messageSuccess.length === 0 ? "danger":"success"}
          description={messageSuccess.length !== 0 ? messageSuccess : messageError}
          onClose={()=>{setToastOpen(false)}}
          title=""
        />
        </DialogPortal>
      </Dialog>
    </>
  )
}