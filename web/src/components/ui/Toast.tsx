import * as ToastComponent from '@radix-ui/react-toast';
import { X } from 'phosphor-react';

interface ToastType {
  color : "success" | "danger" | "primary",
  description : string
  title : string
  open : boolean
  onClose: ()=> void
}

export function Toast({color,description,onClose,title,open }:ToastType) {
  const colorObj = {
    success : "bg-green-500/90",
    danger : "bg-red-500/90",
    primary : "bg-white"
  }
  return (
    <ToastComponent.Provider swipeDirection="right">
      <ToastComponent.Root
        open={open}
        className={`${colorObj[color]} rounded-lg p-3 pb-6 border-solid border-gray-100 border right-1 absolute w-[350px] bottom-1`}
      >
        <ToastComponent.Close className='flex justify-end w-full' onClick={onClose}>
          <X onClick={onClose} size={16} weight='bold' className='cursor-pointer text-white font-bold'/>
        </ToastComponent.Close>
        <ToastComponent.Title>
          <h1 className='text-lg text-white font-bold'>{ title }</h1>
        </ToastComponent.Title>
        <ToastComponent.Description asChild>
          <p className='text-sm text-gray-200'>{description }</p>
        </ToastComponent.Description>
      </ToastComponent.Root>
      <ToastComponent.Viewport />
    </ToastComponent.Provider>
  )
}