import { Trash } from "phosphor-react";
import { Button } from "./ui/Button";
import { Dialog, DialogContent, DialogOverplay, DialogPortal, DialogTrigger } from "./ui/Dialog";
import { useState } from "react";
import { api } from "../services/api";
import { Toast } from "./ui/Toast";

interface DeleteReportParamsType {
  id: string
  refresh: () => void
}

export function DeleteReport({ id, refresh }: DeleteReportParamsType) {

  const [showDialog, setShowDialog] = useState(false)

  const [openToast, setOpenToast] = useState(false)
  const [messageSuccess, setMessageSuccess] = useState('')

  async function handleDelete() {
    try {
      const res = await api.delete(`/reports/${id}`)
      if (res.status === 202) {
        setOpenToast(true)
        setMessageSuccess('Cliente apagado com sucesso !')
        setShowDialog(false)
        refresh()
      }
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <>
      <Dialog open={showDialog} onOpenChange={() => { setShowDialog(!showDialog) }}>
        <DialogTrigger asChild>
          <Trash  onClick={() => { setShowDialog(true) }} className="ml-10 text-bold text-lg text-red-500 cursor-pointer " />
        </DialogTrigger>
        <DialogPortal>
          <DialogOverplay />
          <DialogContent>
            <div className="">
              <div className="flex justify-between gap-4 mb-5 flex-col">
                <p className="text-center">Essa apagará o usuário da plataforma ! Deseja proseguir ?</p>
                <div className="flex justify-center items-center gap-5">
                  <Button variant="secondary" onClick={() => { setShowDialog(false) }} > Não </Button>
                  <Button onClick={handleDelete} > Sim </Button>
                </div>
              </div>
            </div>
          </DialogContent>
        </DialogPortal>
      </Dialog>
      <Toast
        open={openToast}
        color={"success"}
        description={messageSuccess}
        onClose={() => { setOpenToast(false) }}
        title=""
      />
    </>
  )
}