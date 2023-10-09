import { CircleNotch } from "phosphor-react";

export function Loading() {
  return (
    <div className="absolute w-screen h-screen bg-black/80 flex items-center justify-center">
      <div className="flex items-center justify-center flex-col">
        <CircleNotch className="animate-spin text-white font-extrabold" size={64} />
        <p className="font-bold text-white text-md mt-5">Carregando Informações ...</p>
      </div>
    </div>
  )
}