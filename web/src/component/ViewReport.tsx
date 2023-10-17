import { Eye } from "phosphor-react";
import { Button } from "./ui/Button";
import { Dialog, DialogContent, DialogOverplay, DialogPortal, DialogTrigger } from "./ui/Dialog";

interface ViewReportParamsType {
  photo1 : string
  photo2 : string
  photo3 : string
}

export function ViewReport({ photo1,photo2,photo3 }:ViewReportParamsType) {
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
                      <div className="w-[120px] h-[120px] bg-gray-200 rounded-lg mb-3" />
                    </div>
                    <div className="flex flex-col items-center justify-center">
                      <div className="w-[120px] h-[120px] bg-gray-200 rounded-lg mb-3" />
                    </div>
                    <div className="flex flex-col items-center justify-center">
                      <div className="w-[120px] h-[120px] bg-gray-200 rounded-lg mb-3" />
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