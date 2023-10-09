import { Button } from "./ui/Button";
import { DialogOverplay, Dialog, DialogTrigger, DialogPortal, DialogContent } from "./ui/Dialog";
import { api } from "../services/api";
import { useUser } from "../hooks/useUser";
import { Trash } from "phosphor-react";
import { set } from "js-cookie";
import { useState } from "react";

interface DeleteWorkerType {
  id:string
  refresh : () => Promise<void>
}

export function DeleteWorker({ id ,refresh}: DeleteWorkerType) {

  const [showDialog,setShowDialog] = useState(false)

  const { user } = useUser()

  async function handleDelete() {
    try { 
      await api.delete(`/user/${id}/${user!.id}`)
      setShowDialog(false)
      await refresh()
    } catch (error) {}
  }

  return (
    <Dialog open={showDialog} onOpenChange={()=>{setShowDialog(!showDialog)}}>
      <DialogTrigger asChild>
        <Trash onClick={()=>{setShowDialog(true)}} className="ml-10 text-bold text-lg text-red-500 cursor-pointer " />
      </DialogTrigger>
      <DialogPortal>
        <DialogOverplay />
        <DialogContent>
          <div className="">
            <div className="flex justify-between gap-4 mb-5 flex-col">
              <p className="text-center">Essa apagará o usuário da plataforma ! Deseja proseguir ?</p>
              <div className="flex justify-center items-center gap-5">
                <Button variant="secondary" onClick={()=>{setShowDialog(false)}}> Não </Button>
                <Button onClick={handleDelete}> Sim </Button>
              </div>
            </div>
          </div>
        </DialogContent>
      </DialogPortal>
    </Dialog>
  )
}