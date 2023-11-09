import {  Plus } from "phosphor-react";
import { Button } from "./ui/Button";
import { DialogOverplay, Dialog, DialogTrigger, DialogPortal, DialogContent } from "./ui/Dialog";
import { TextField } from "./ui/TextField";
import { FormEvent, useState } from "react";
import { Toast } from "./ui/Toast";

interface UpdateSectorType {
  handleCreate( name : string): Promise<void>
}

export function CreateSector({ handleCreate }: UpdateSectorType) {

  const [name, setName] = useState('')

  const [nameError, setNameError] = useState(false)

  const [modalIsOpened, setModalOpended] = useState(false)

  const [messageError, setMessageError] = useState('')
  const [openToast,setOpenToast ] = useState(false)

  function validateFiels() {

    if (name.length === 0) {
      setOpenToast(true)
      setNameError(true)
      setMessageError('Nome Inválido !')
      return false
    }

    setMessageError('')
    setOpenToast(false)

    return true
  }

  function reset() {
    setName('')
    setNameError(false)
  }


  async function handleUpdate(e: FormEvent) {
    e.preventDefault()
    if(!validateFiels()) return
    await handleCreate(name)
    reset()
    setModalOpended(false)
  }

  return (
    <>
      <Dialog open={modalIsOpened} onOpenChange={() => setModalOpended(!modalIsOpened)} >
        <DialogTrigger asChild>
        <Button onClick={() => { setModalOpended(true) }}><Plus className="mr-3" /> Adicionar</Button>
        </DialogTrigger>
        <DialogPortal>
          <DialogOverplay />
          <DialogContent>
            <form onSubmit={handleUpdate}>
              <div className="flex justify-between gap-4 mb-5">
                <div className="w-1/2">
                  <p className="text-gray-500 font-normal text-sm  mb-1">Nome</p>
                  <TextField
                    error={nameError}
                    value={name}
                    onChange={e => setName(e.target.value)}
                    
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