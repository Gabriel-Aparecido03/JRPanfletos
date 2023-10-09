import { Plus } from "phosphor-react";
import { Button } from "./ui/Button";
import { DialogOverplay, Dialog, DialogTrigger, DialogPortal, DialogContent } from "./ui/Dialog";
import { TextField } from "./ui/TextField";
import { Select } from "./ui/Select";
import { FormEvent, useState } from "react";
import { api } from "../services/api";
import { useUser } from "../hooks/useUser";

export function CreateWorkers() {

  const [ name,setName ] = useState('')
  const [ role,setRole ] = useState('admin')
  const [ cpfNumber,setCpfNumber ] = useState('')
  const [ workCardNumber,setWorkCardNumber ] = useState('')
  const [ office,setOffice ] = useState('')
  const [ email,setEmail ] = useState('')
  const [ password,setPassword ] = useState('')

  const [ nameError,setNameError ] = useState(false)
  const [ cpfNumberError,setCpfNumberError ] = useState(false)
  const [ workCardNumberError,setWorkCardNumberError ] = useState(false)
  const [ officeError,setOfficeError ] = useState(false)
  const [ emailError,setEmailError ] = useState(false)
  const [ passwordError,setPasswordError ] = useState(false)

  const [modalIsOpened,setModalOpended ] = useState(false)

  const { user } = useUser()

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
    try { 
      const res = await api.post('/user',{
        name,
        role : "COMMOM",
        cpfNumber,
        workCardNumber,
        office,
        email,
        password,
        createdUserId : user!.id
      })
      if(res.status === 201) {
        reset()

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
                <p className="text-gray-500 font-normal text-sm  mb-1">Nome</p>
                <TextField 
                  error={nameError}
                  onChange={e => setName(e.target.value)}
                  value={name}
                />
              </div>
              <div className="w-1/2">
                <p className="text-gray-500 font-normal text-sm mb-1">Tipo</p>
                <Select defaultValue="commom" value={role} onChange={e => setRole(e.target.value)}>
                  <option value="commom">Usuário</option>
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
                />
              </div>
              <div className="w-1/3">
                <p className="text-gray-500 font-normal text-sm mb-1">Número da carteira de trabalho</p>
                <TextField 
                  error={workCardNumberError}
                  onChange={e => setWorkCardNumber(e.target.value)}
                  value={workCardNumber}
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
            <Button className="mt-5">Criar</Button>
          </form>
        </DialogContent>
      </DialogPortal>
    </Dialog>
  )
}