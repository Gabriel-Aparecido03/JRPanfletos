import { FilePlus } from "phosphor-react";
import { Button } from "./ui/Button";
import { Dialog, DialogContent, DialogOverplay, DialogPortal, DialogTrigger } from "./ui/Dialog";
import { Select } from "./ui/Select";
import { TextField } from "./ui/TextField";
import { useUser } from "../hooks/useUser";
import { api } from "../services/api";
import { FormEvent, useState } from "react";
import { Toast } from "./ui/Toast";

interface CreateReportParamsType {
  authorizationId: string
}

export function CreateReport({ authorizationId }: CreateReportParamsType) {
  const { user } = useUser()

  
  const [toastOpen, setToastOpen] = useState(false)
  const [messageError, setMessageError] = useState('')
  const [messageSuccess, setMessageSuccess] = useState('')
  
  async function handleCreateReport(e:FormEvent) {
    e.preventDefault()
    try {
      api.post('/reports', {
        first_photo_url: "url",
        second_photo_url: "url",
        third_photo_url: "url",
        authorization_id: authorizationId,
        "user_created_id": user!.id
      })
    } catch (error) { /* empty */ }
  }
  return (
    <>
      <Dialog>
        <DialogTrigger asChild >
          <FilePlus className="mr-10 text-bold text-lg text-gray-500 cursor-pointer " />
        </DialogTrigger>
        <DialogPortal>
          <DialogOverplay />
          <DialogContent>
            <form onSubmit={handleCreateReport} className="flex flex-col">
              <div>
                <div className="flex w-full gap-4 mt-4">
                  <div className="w-full flex flex-col gap-3">
                    <div className="flex items-center justify-center gap-5 mt-4">
                      <div className="flex flex-col items-center justify-center">
                        <div className="w-[120px] h-[120px] bg-gray-200 rounded-lg mb-3" />
                        <Button variant="outline">Adicionar foto</Button>
                      </div>
                      <div className="flex flex-col items-center justify-center">
                        <div className="w-[120px] h-[120px] bg-gray-200 rounded-lg mb-3" />
                        <Button variant="outline">Adicionar foto</Button>
                      </div>
                      <div className="flex flex-col items-center justify-center">
                        <div className="w-[120px] h-[120px] bg-gray-200 rounded-lg mb-3" />
                        <Button variant="outline">Adicionar foto</Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <Button type="submit" className="mt-4 w-1/2 mx-auto"> Emitir relatório</Button>
            </form>
          </DialogContent>
        </DialogPortal>
      </Dialog>
      <Toast
        open={toastOpen}
        color={messageSuccess.length === 0 ? "danger" : "success"}
        description={messageSuccess.length === 0 ? messageSuccess : messageError}
        onClose={() => { setToastOpen(false) }}
        title=""
      />
    </>
  )
}