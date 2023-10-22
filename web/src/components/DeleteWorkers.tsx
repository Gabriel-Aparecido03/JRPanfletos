import { Button } from "./ui/Button";
import { DialogOverplay, Dialog, DialogTrigger, DialogPortal, DialogContent } from "./ui/Dialog";
import { useUser } from "../hooks/useUser";
import { Trash } from "phosphor-react";
import { useState } from "react";

interface handleDeleteWorkerParamsType {
  id:string;
  userId:string;
}

interface DeleteWorkerType {
  id: string
  handleDeleteWorker({ id, userId }: handleDeleteWorkerParamsType): Promise<void>
}

export function DeleteWorker({ id, handleDeleteWorker }: DeleteWorkerType) {

  const [showDialog, setShowDialog] = useState(false)

  const { user } = useUser()

  async function handleDelete() {
    handleDeleteWorker({id,userId : user!.id})
    setShowDialog(false)
  }

  return (
    <>
      <Dialog open={showDialog} onOpenChange={() => { setShowDialog(!showDialog) }}>
        <DialogTrigger asChild>
          <Trash onClick={() => { setShowDialog(true) }} className="ml-10 text-bold text-lg text-red-500 cursor-pointer " />
        </DialogTrigger>
        <DialogPortal>
          <DialogOverplay />
          <DialogContent>
            <div className="">
              <div className="flex justify-between gap-4 mb-5 flex-col">
                <p className="text-center">Essa acção apagará o usuário da plataforma ! Deseja proseguir ?</p>
                <div className="flex justify-center items-center gap-5">
                  <Button variant="secondary" onClick={() => { setShowDialog(false) }}> Não </Button>
                  <Button onClick={handleDelete}> Sim </Button>
                </div>
              </div>
            </div>
          </DialogContent>
        </DialogPortal>
      </Dialog>
    </>
  )
}