import { Plus } from "phosphor-react";
import { Button } from "./ui/Button";
import { DialogOverplay, Dialog, DialogTrigger, DialogPortal, DialogContent } from "./ui/Dialog";
import { TextField } from "./ui/TextField";
import { Select } from "./ui/Select";
import { FormEvent, useState } from "react";
import { api } from "../services/api";
import { useUser } from "../hooks/useUser";
import { isValidCpfNumber } from "../utils/validate-cpf";
import { isValidEmail } from "../utils/validate-email";
import { Toast } from "./ui/Toast";

export function CreateWorkers() {

  const [name, setName] = useState('')
  const [role, setRole] = useState('admin')
  const [cpfNumber, setCpfNumber] = useState('')
  const [workCardNumber, setWorkCardNumber] = useState('')
  const [office, setOffice] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const [nameError, setNameError] = useState(false)
  const [cpfNumberError, setCpfNumberError] = useState(false)
  const [workCardNumberError, setWorkCardNumberError] = useState(false)
  const [officeError, setOfficeError] = useState(false)
  const [emailError, setEmailError] = useState(false)
  const [passwordError, setPasswordError] = useState(false)

  const [modalIsOpened, setModalOpended] = useState(false)
  const [openToast, setOpenToast] = useState(false)
  const [messageSuccess, setMessageSuccess] = useState('')
  const [messageError, setMessageError] = useState('')

  const { user } = useUser()

  function validateFields() {
    if (name.length === 0) {
      setNameError(true)
      setOpenToast(true)
      setMessageError('Nome inválido !')
      return false
    }

    if (!isValidCpfNumber(cpfNumber)) {
      setCpfNumberError(true)
      setOpenToast(true)
      setMessageError('Cpf inválido !')
      return false
    }

    if (workCardNumber.length === 0) {
      setWorkCardNumberError(true)
      setOpenToast(true)
      setMessageError('Número da carteira de trabalho inválida !')
      return false
    }

    if (!isValidEmail(email)) {
      setEmailError(true)
      setOpenToast(true)
      setMessageError('Email inválido !')
      return false
    }

    if (password.length === 0) {
      setPasswordError(true)
      setOpenToast(true)
      setMessageError('Senha inválida !')
      return false
    }

    setMessageError('')
    setOpenToast(false)
    setNameError(false)
    setCpfNumberError(false)
    setWorkCardNumberError(false)
    setOfficeError(false)
    setEmailError(false)
    setPasswordError(false)

    return true
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
    if(!validateFields()) return
    try {
      const res = await api.post('/user', {
        name,
        role: "COMMOM",
        cpfNumber,
        workCardNumber,
        office,
        email,
        password,
        createdUserId: user!.id
      })
      if (res.status === 201) {
        setOpenToast(true)
        setMessageSuccess('Funcionário criado com sucesso !')
        reset()
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
                  <p className="text-gray-500 font-normal text-sm  mb-1">Nome</p>
                  <TextField
                    error={nameError}
                    onChange={e => {setName(e.target.value);setNameError(false)}}
                    value={name}
                  />
                </div>
                <div className="w-1/2">
                  <p className="text-gray-500 font-normal text-sm mb-1">Tipo</p>
                  <Select value={role} onChange={(e)=>{setRole(e.target.value)}}>
                      <option value="admin">Administrador</option>
                      <option value="commom">Funcionário</option>
                  </Select>
                </div>
              </div>
              <div className="flex justify-between gap-4 mb-5">
                <div className="w-1/3">
                  <p className="text-gray-500 font-normal text-sm mb-1">Número de cpf</p>
                  <TextField
                    error={cpfNumberError}
                    onChange={e => {setCpfNumber(e.target.value);setCpfNumberError(false)}}
                    value={cpfNumber}
                  />
                </div>
                <div className="w-1/3">
                  <p className="text-gray-500 font-normal text-sm mb-1">Número da carteira de trabalho</p>
                  <TextField
                    error={workCardNumberError}
                    onChange={e => {setWorkCardNumber(e.target.value);setWorkCardNumberError(false)}}
                    value={workCardNumber}
                  />
                </div>
                <div className="1/3">
                  <p className="text-gray-500 font-normal text-sm mb-1">Cargo</p>
                  <TextField
                    error={officeError}
                    onChange={e => {setOffice(e.target.value);setOfficeError(false)}}
                    value={office}
                  />
                </div>
              </div>
              <div className="flex justify-between gap-4 mb-5">
                <div className="w-1/2">
                  <p className="text-gray-500 font-normal text-sm mb-1">Email</p>
                  <TextField
                    error={emailError}
                    onChange={e => {setEmail(e.target.value);setEmailError(false)}}
                    value={email}
                  />
                </div>
                <div className="w-1/2">
                  <p className="text-gray-500 font-normal text-sm mb-1">Senha</p>
                  <TextField
                    error={passwordError}
                    onChange={e =>{ setPassword(e.target.value);setPasswordError(false)}}
                    value={password}
                  />
                </div>
              </div>
              <Button className="mt-5">Criar</Button>
            </form>
          </DialogContent>
        </DialogPortal>
        <Toast
          open={openToast}
          color={messageSuccess.length === 0 ? "danger" : "success"}
          description={messageSuccess.length === 0 ? messageError : messageSuccess}
          onClose={() => { setOpenToast(false) }}
          title=""
        />
      </Dialog>
    </>
  )
}