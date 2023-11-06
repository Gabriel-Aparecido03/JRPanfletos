import { Eye } from "phosphor-react";
import { Button } from "./ui/Button";
import { Dialog, DialogContent, DialogOverplay, DialogPortal, DialogTrigger } from "./ui/Dialog";
import { useEffect, useState } from "react";
import { api } from "../services/api";
import { getDownloadURL, ref } from "firebase/storage";
import { storage } from "../services/firebase";

interface ViewReportParamsType {
  idReport : string
}

export function ViewReport({ idReport }:ViewReportParamsType) {

  const [ firstPhotoUrl, setFirstPhotoUrl ] = useState('')
  const [ secondPhotoUrl, setSecondPhotoUrl ] = useState('')
  const [ thirdPhotoUrl, setThirdPhotoUrl ] = useState('')

  async function fetchPhotosByReportId() {
    try {
      const res = await api.get(`/report/${idReport}`)
      if(res.status === 200 ) {
        console.log(res.data)
        const {first_photo_url ,second_photo_url ,third_photo_url }  = res.data
        const refFirstImage = ref(storage,first_photo_url)
        const refSecondImage = ref(storage,second_photo_url)
        const refThirdImage = ref(storage,third_photo_url)
        const urlDownloadFirstImage = await getDownloadURL(refFirstImage)
        const urlDownloadSecondImage = await getDownloadURL(refSecondImage)
        const urlDownloadThirdImage = await getDownloadURL(refThirdImage)
        setFirstPhotoUrl(urlDownloadFirstImage)
        setSecondPhotoUrl(urlDownloadSecondImage)
        setThirdPhotoUrl(urlDownloadThirdImage)
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(()=>{
    fetchPhotosByReportId()
  },[])

  return (
    <Dialog>
      <DialogTrigger asChild >
        <Eye className="mr-10 text-bold text-lg text-gray-500 cursor-pointer " />
      </DialogTrigger>
      <DialogPortal>
        <DialogOverplay />
        <DialogContent>
          <form action="" className="flex flex-col">
            <div>
              <div className="flex w-full gap-4 mt-4">
                <div className="w-full flex flex-col gap-3">
                  <div className="flex items-center justify-center gap-5 mt-4">
                    <div className="flex flex-col items-center justify-center">
                      <img src={firstPhotoUrl} alt="" className="w-[120px] h-[120px] " />
                    </div>
                    <div className="flex flex-col items-center justify-center">
                      <img src={secondPhotoUrl} alt="" className="w-[120px] h-[120px] " />
                    </div>
                    <div className="flex flex-col items-center justify-center">
                      <img src={thirdPhotoUrl} alt="" className="w-[120px] h-[120px] " />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <Button className="mt-4 w-1/2 mx-auto"> Emitir relatório</Button>
          </form>
        </DialogContent>
      </DialogPortal>
    </Dialog>
  )
}