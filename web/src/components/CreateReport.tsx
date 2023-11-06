import { FilePlus } from "phosphor-react";
import { Button } from "./ui/Button";
import { Dialog, DialogContent, DialogOverplay, DialogPortal, DialogTrigger } from "./ui/Dialog";
import { useUser } from "../hooks/useUser";
import { api } from "../services/api";
import { FormEvent, useState } from "react";
import { Toast } from "./ui/Toast";

import { getStorage, ref, uploadBytes } from "firebase/storage";
import { storage } from "../services/firebase";

interface CreateReportParamsType {
  authorizationId: string
  refresh(): Promise<void>
}

export function CreateReport({ authorizationId, refresh }: CreateReportParamsType) {
  const { user } = useUser()

  const [openDialog, setOpenDialog] = useState(false)
  const [toastOpen, setToastOpen] = useState(false)
  const [messageSuccess, setMessageSuccess] = useState('')

  const [firstPhoto, setFirstPhoto] = useState<any>(null)
  const [secondPhoto, setSecondPhoto] = useState<any>(null)
  const [thirdPhoto, setThirdPhoto] = useState<any>(null)

  const [firstPhotoUrl , setFirstPhotoUrl ] = useState('')
  const [secondPhotoUrl , setSecondPhotoUrl ] = useState('')
  const [thirdPhotoUrl , setThirdPhotoUrl ] = useState('')

  async function uploadFirstImage() {
    try {
      const generateName = `${authorizationId}-${new Date().toUTCString()}-${firstPhoto.name}`
      const storageRef = ref(storage,generateName)
      await uploadBytes(storageRef,firstPhoto)
      return generateName
    } catch (error) {
      console.log(error)
    }
  }

  async function uploadSecondImage() {
    try {
      const generateName = `${authorizationId}-${new Date().toUTCString()}-${firstPhoto.name}`
      const storageRef = ref(storage,generateName)
      await uploadBytes(storageRef,thirdPhoto)
      return generateName
    } catch (error) {
      console.log(error)
    }
  }

  async function uploadThirdImage() {
    try {
      const generateName = `${authorizationId}-${new Date().toUTCString()}-${firstPhoto.name}`
      const storageRef = ref(storage,generateName)
      await uploadBytes(storageRef,thirdPhoto)
      return generateName
    } catch (error) {
      console.log(error)
    }
  }

  async function handleCreateReport(e: FormEvent) {
    e.preventDefault()
    uploadFirstImage()
    const firstUrl = await uploadFirstImage()
    const secondUrl = await uploadSecondImage()
    const thirdUrl = await uploadThirdImage()
    try {
      const res = await api.post('/reports', {
        first_photo_url:firstUrl,
        second_photo_url:secondUrl,
        third_photo_url:thirdUrl,
        authorization_id: authorizationId,
        user_created_id: user!.id
      })
      if (res.status === 202) {
        setToastOpen(true)
        setMessageSuccess('Relatório criado com sucesso !')
        setOpenDialog(false)
        refresh()
      }
    } catch (error) {}
  }

  return (
    <>
      <Dialog open={openDialog} onOpenChange={() => { setOpenDialog(!openDialog) }}>
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
                        {!firstPhoto && <div className="w-[120px] h-[120px] bg-gray-200 rounded-lg mb-3" />}
                        { firstPhoto && <img src={URL.createObjectURL(firstPhoto)} alt=""className="w-[120px] h-[120px] rounded-lg mb-3" />}
                        { firstPhoto && <Button onClick={()=>{setFirstPhoto(null)}} variant="outline">Remover</Button>}
                        { !firstPhoto && <Button type="button" variant="outline" className="flex items-center justify-center">
                          <label htmlFor="secondPhoto" className="hover:cursor-pointer">
                            Adicionar foto
                            <input onChange={e => setFirstPhoto(e.target.files![0])} type="file" id="secondPhoto" className="invisible w-0 h-0" accept="image/*" />
                          </label>
                        </Button> }
                      </div>
                      <div className="flex flex-col items-center justify-center">
                        { secondPhoto && <img src={URL.createObjectURL(secondPhoto)} alt=""className="w-[120px] h-[120px] rounded-lg mb-3" />}
                        {!secondPhoto && <div className="w-[120px] h-[120px] bg-gray-200 rounded-lg mb-3" />}
                        { secondPhoto && <Button onClick={()=>{setSecondPhoto(null)}} variant="outline" > Remover </Button> }
                        { !secondPhoto && <Button type="button" variant="outline" className="flex items-center justify-center">
                          <label htmlFor="secondPhoto" className="hover:cursor-pointer">
                            Adicionar foto
                            <input onChange={e => setSecondPhoto(e.target.files![0])} type="file" id="secondPhoto" className="invisible w-0 h-0" accept="image/*" />
                          </label>
                        </Button> }
                      </div>
                      <div className="flex flex-col items-center justify-center">
                        { thirdPhoto && <img src={URL.createObjectURL(thirdPhoto)} alt=""className="w-[120px] h-[120px] rounded-lg mb-3" />}
                        { !thirdPhoto && <div className="w-[120px] h-[120px] bg-gray-200 rounded-lg mb-3" />}
                        { thirdPhoto && <Button onClick={()=>{setThirdPhoto(null)}} variant="outline"> Remover </Button>}
                        { !thirdPhoto && <Button type="button" variant="outline" className="flex items-center justify-center">
                          <label htmlFor="secondPhoto" className="hover:cursor-pointer">
                            Adicionar foto
                            <input onChange={e => setThirdPhoto(e.target.files![0])} type="file" id="secondPhoto" className="invisible w-0 h-0" accept="image/*" />
                          </label>
                        </Button> }
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
        color={"success"}
        description={messageSuccess}
        onClose={() => { setToastOpen(false) }}
        title=""
      />
    </>
  )
}