import { Pencil } from "phosphor-react";
import { Button } from "./ui/Button";
import { DialogOverplay, Dialog, DialogTrigger, DialogPortal, DialogContent } from "./ui/Dialog";
import { TextField } from "./ui/TextField";
import { Select } from "./ui/Select";
import { FormEvent, useEffect, useState } from "react";
import { api } from "../services/api";
import { useUser } from "../hooks/useUser";
import { isValidCpfNumber } from "../utils/validate-cpf";
import { isValidEmail } from "../utils/validate-email";
import { Toast } from "./ui/Toast";

interface User {
  infos: {
    id: string;
    name: string;
    cpf_number: string;
    work_card_number: string;
    office: string;
    email: string;
    password: string;
    created_at: Date;
    updated_at: Date | null;
    role: "COMMOM" | "ADMIN";
    userActionId: string
  }
  refresh: () => Promise<void>
}

export function UpdateWorker({ infos, refresh }: User) {

  const [name, setName] = useState(infos.name)
  const [role, setRole] = useState('admin')
  const [cpfNumber, setCpfNumber] = useState(infos.cpf_number)
  const [workCardNumber, setWorkCardNumber] = useState(infos.work_card_number)
  const [office, setOffice] = useState(infos.office)
  const [email, setEmail] = useState(infos.email)
  const [password, setPassword] = useState('')

  const [nameError, setNameError] = useState(false)
  const [cpfNumberError, setCpfNumberError] = useState(false)
  const [workCardNumberError, setWorkCardNumberError] = useState(false)
  const [officeError, setOfficeError] = useState(false)
  const [emailError, setEmailError] = useState(false)
  const [passwordError, setPasswordError] = useState(false)

  const [modalIsOpened, setModalOpended] = useState(false)

  const [messageError, setMessageError] = useState('')
  const [messageSuccess, setMessageSuccess] = useState('')
  const [openToast, setOpenToast] = useState(false)

  const { user } = useUser()

  function validateFields() {
    if (name.length === 0) {
      setMessageError('Nome inválido !')
      setNameError(true)
      setOpenToast(true)
      return false
    }

    if (isValidCpfNumber(cpfNumber)) {
      setMessageError('Cpf inválido')
      setCpfNumberError(true)
      setOpenToast(true)
      return false
    }

    if (workCardNumber.length === 0) {
      setMessageError('Número da carteira de trabalho inválido !')
      setWorkCardNumberError(true)
      setOpenToast(true)
      return false
    }

    if (office.length === 0) {
      setMessageError('Cargo inválido !')
      setOfficeError(true)
      setOpenToast(true)
      return false
    }

    if (isValidEmail(email)) {
      setMessageError('Email inválido')
      setEmailError(true)
      setOpenToast(true)
      return false
    }
  }

  function initInfos() {
    setName(infos.name)
    setRole(infos.role)
    setCpfNumber(infos.cpf_number)
    setWorkCardNumber(infos.work_card_number)
    setOffice(infos.office)
    setEmail(infos.email)
  }

  function reset() {
    setName('')
    setRole('')
    setCpfNumber('')
    setWorkCardNumber('')
    setOffice('')
    setEmail('')
    setPassword('')

    setNameError(false)
    setCpfNumberError(false)
    setWorkCardNumberError(false)
    setOfficeError(false)
    setEmailError(false)
    setPasswordError(false)
  }

  async function handleCreate(e: FormEvent) {
    e.preventDefault()
    if (!validateFields()) return
    try {
      const res = await api.put('/user', {
        role: "COMMOM",
        office,
        email,
        password,
        id: infos.id,
        user_action_id: user!.id
      })
      if (res.status === 201) {
        await refresh()
        setOpenToast(true)
        setMessageSuccess('Funcionário alterado com sucesso !')
        setModalOpended(false)
        reset()
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    initInfos()
  }, [])

  return (
    <>
      <Dialog
        open={modalIsOpened}
        onOpenChange={() => {
          setModalOpended(!modalIsOpened)
          initInfos()
        }}
      >
        <DialogTrigger asChild>
          <Pencil onClick={() => { setModalOpended(true) }} className="mr-10 text-bold text-lg text-gray-500 cursor-pointer " />
        </DialogTrigger>
        <DialogPortal>
          <DialogOverplay />
          <DialogContent>
            <form onSubmit={handleCreate}>
              <div className="flex justify-between gap-4 mb-5">
                <div className="w-1/2">
                  <p className="text-gray-500 font-normal text-sm  mb-1">Nome</p>
                  <TextField
                    error={nameError}
                    onChange={e => setName(e.target.value)}
                    value={name}
                    disabled
                  />
                </div>
                <div className="w-1/2">
                  <p className="text-gray-500 font-normal text-sm mb-1">Tipo</p>
                  <Select defaultValue="commom" value={role} onChange={e => setRole(e.target.value)}>
                    <option value="commom">Funcionário</option>
                    <option value="admin">Administrador</option>
                  </Select>
                </div>
              </div>
              <div className="flex justify-between gap-4 mb-5">
                <div className="w-1/3">
                  <p className="text-gray-500 font-normal text-sm mb-1">Número de cpf</p>
                  <TextField
                    error={cpfNumberError}
                    onChange={e => setCpfNumber(e.target.value)}
                    value={cpfNumber}
                    disabled
                  />
                </div>
                <div className="w-1/3">
                  <p className="text-gray-500 font-normal text-sm mb-1">Número da carteira de trabalho</p>
                  <TextField
                    error={workCardNumberError}
                    onChange={e => setWorkCardNumber(e.target.value)}
                    value={workCardNumber}
                    disabled
                  />
                </div>
                <div className="1/3">
                  <p className="text-gray-500 font-normal text-sm mb-1">Cargo</p>
                  <TextField
                    error={officeError}
                    onChange={e => setOffice(e.target.value)}
                    value={office}
                  />
                </div>
              </div>
              <div className="flex justify-between gap-4 mb-5">
                <div className="w-1/2">
                  <p className="text-gray-500 font-normal text-sm mb-1">Email</p>
                  <TextField
                    error={emailError}
                    onChange={e => setEmail(e.target.value)}
                    value={email}
                  />
                </div>
                <div className="w-1/2">
                  <p className="text-gray-500 font-normal text-sm mb-1">Senha</p>
                  <TextField
                    error={passwordError}
                    onChange={e => setPassword(e.target.value)}
                    value={password}
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
        color={messageSuccess.length === 0 ? "danger":"success"}
        description={messageError.length === 0 ? messageSuccess : messageError}
        onClose={()=>{setOpenToast(false)}}
        title=""
      />
    </>
  )
}