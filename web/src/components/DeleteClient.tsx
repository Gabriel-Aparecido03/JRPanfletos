import { Button } from "./ui/Button";
import { DialogOverplay, Dialog, DialogTrigger, DialogPortal, DialogContent } from "./ui/Dialog";
import { Trash } from "phosphor-react";
import { useState } from "react";

interface DeleteClient {
  id: string
  handleDelete(id:string): Promise<void>
}

export function DeleteClient({ id, handleDelete }: DeleteClient) {

  const [showDialog, setShowDialog] = useState(false)

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
                <p className="text-center">Essa apagará o cliente da plataforma ! Deseja proseguir ?</p>
                <div className="flex justify-center items-center gap-5">
                  <Button variant="secondary" onClick={() => { setShowDialog(false) }}> Não </Button>
                  <Button onClick={()=>{handleDelete(id)}}> Sim </Button>
                </div>
              </div>
            </div>
          </DialogContent>
        </DialogPortal>
      </Dialog>
    </>
  )
}